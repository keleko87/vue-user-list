<template>
  <div class="users-list">
    <h2>{{ title }}</h2>
    <p>Data from Postman Mock server</p>

    <div v-if="!users.length">
      <loader></loader>
    </div>

    <div v-if="users.length" class="users-container">

      <div class="row">
        <div class="col-7 search">
          <span>Search by name</span>
          <input type="text" v-model="search" placeholder="Search">
        </div>

        <div class="col-4 create-user">
          <new-user-modal :users="users"></new-user-modal>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th :class="{ 'sort' : currentSort === 'name' }" @click="sort('name')">
              <sort-field
                :field="'name'"
                :currentSort="currentSort"
                :currentSortDir="currentSortDir">
              </sort-field>
            </th>
            <th :class="{ 'sort' : currentSort === 'email' }" @click="sort('email')">
              <sort-field
                :field="'email'"
                :currentSort="currentSort"
                :currentSortDir="currentSortDir">
              </sort-field>
            </th>
            <th :class="{ 'sort' : currentSort === 'birthDate' }" @click="sort('birthDate')">
              <sort-field
                :field="'birthDate'"
                :currentSort="currentSort"
                :currentSortDir="currentSortDir">
              </sort-field>
            </th>
            <th>
              <span>address</span>
            </th>
            <th class="text__center">
              <span>manage</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in filteredusers" :key="user.id">
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>{{ getDateStamp(user.birthDate) }}</td>
            <td>{{ user.address.street }}, {{ user.address.state }}, {{ user.address.country }}, {{ user.address.zip }}</td>
            <td class="text__center">
              <edit-user-modal :users="users" :user="user"></edit-user-modal>  
              <delete-user-modal :users="users" :user="user"></delete-user-modal>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="my-4">
        <span><button @click="prevPage">Previous</button></span>
        <span><small class="paginate">page {{currentPage}} / {{totalPages}}</small></span>
        <span><button @click="nextPage">Next</button></span>
      </div>

      <div class="search">
        <span>Set pagination</span>
        <select class="page" name="pageSize" v-model="pageSize" placeholder="Page size">
          <option value="5" selected>5</option>
          <option value="10">10</option>
          <option value="25">25</option>
        </select>
      </div>

    </div>
  </div>
</template>

<script>

import userService from '@/api/userService';
import NewUserModal from '@/components/user/NewUserModal';
import EditUserModal from '@/components/user/EditUserModal';
import DeleteUserModal from '@/components/user/DeleteUserModal';
import Modal from '@/components/Modal';
import SortField from '@/components/SortField';
import Loader from '@/components/Loader';
import userUtils from '@/mixins/userUtils';

export default {
  name: 'userList',

  components: {
    NewUserModal,
    EditUserModal,
    DeleteUserModal,
    Modal,
    SortField,
    Loader
  },

  props: {
    user: {},
    users: {
      type: Array,
      default: () => [],
    },
  },

  mixins: [userUtils],

  data () {
    return {
      title: 'List of users',
      userInfo: {},
      currentSort: 'name',
      currentSortDir: 'asc',
      pageSize: 5,
      currentPage: 1,
      search: '',
    };
  },
  
  methods: {
    parentHandler() {
      this.$refs.modal1.close();
    },

    sort (s) {
      // Toggle direction sort
      if (s === this.currentSort) {
        this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc';
      }
      this.currentSort = s;
    },

    nextPage() {
      if ((this.currentPage * this.pageSize) < this.users.length) this.currentPage++;
    },

    prevPage() {
      if (this.currentPage > 1) this.currentPage--;
    }
  },

  computed: {
    // Computed prop to sorted users data
    sortedusers() {
      return this.users.sort((a, b) => {
        let modifier = 1;

        if (this.currentSortDir === 'desc') modifier = -1;
        if (a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
        if (a[this.currentSort] > b[this.currentSort]) return 1 * modifier;

        return 0;
      }).filter((row, index) => {
        const start = (this.currentPage - 1) * this.pageSize;
        const end = this.currentPage * this.pageSize;

        if (index >= start && index < end) return true;
        return false;
      });
    },

    // Calculate total pages
    totalPages() {
      return Math.ceil(this.users.length / this.pageSize);
    },

    // Change page size
    setPageSize(size) {
      this.pageSize = size;
    },

    // Search user by name
    filteredusers() {
      if (this.sortedusers && this.sortedusers.length) {
        return this.sortedusers.filter(user => user.name.toLowerCase().match(this.search));
      }
      return '';
    },
  },

};
</script>

<style scoped>

[v-cloak] {
  display: none;
}

h2 {
  font-family: unset;
  color: #929292;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

table, td, th {
  border: 1px solid #ddd;
  text-align: left;
}

table {
  border-collapse: collapse;
  table-layout: fixed;
  width: 100%;
}


thead {
  background-color: #a8e6ca;
}

tr {
  border: 1px solid;
}

td, th {
  padding: 15px;
  width: 100px;
}

th {
  cursor: pointer;
}

button {
  background-color: #ffcf7b;
  border: 1px solid #ffcf7b;
}

th.sort {
  background-color: #ffcf7b;
}


.paginate {
  font-weight: bold;
}

.search {
  font-weight: bold;
  margin: 2rem;
  text-align: left;
}

.search input {
  padding: 10px;
}

span {
  margin: 0 10px;
}

.text__center {
  text-align: center;
}

.create-user {
  display: flex;
  align-self: center;
  justify-content: flex-end;
}
</style>
