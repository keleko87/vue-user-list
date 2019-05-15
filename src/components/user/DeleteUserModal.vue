<template>
  <div>
    <button class="delete" @click="showDeleteModal = true">Delete</button>

    <modal v-if="showDeleteModal" @close="showDeleteModal = false">
      <div slot="header">
        <h3>Delete User</h3>
      </div>
      <div slot="body">
       <h4>Are you sure delete user '<b>{{ user.name }}</b>' ?</h4>
       <div>
        <span><button class="btn btn-danger w-50 m-2 p-2" @click="deleteUser">Delete</button></span>
        <span><button class="btn btn-default w-50 m-2 p-2" @click="showDeleteModal = false">Cancel</button></span>
       </div>
      </div>
      <div slot="footer">
      </div>
    </modal>
  </div>
</template>

<script>
import userService from '@/api/userService';
import Modal from '@/components/Modal';
import UserForm from '@/components/user/UserForm';
import userSchema from '@/api/userSchema';

export default {
  name: 'delete-user-modal',

  components: {
    UserForm,
    Modal,
  },

  props: {
    title: '',
    showDeleteModal: false,
    user: userSchema,
    users: {
      type: Array,
      default: () => [userSchema],
    },
  },

  methods: {
    close() {
      this.showDeleteModal = false;
    },

    deleteUser() {
      const users = this.users.filter(user => user.id !== this.user.id);
      this.users = users;

      // Mock server responses the Postman example
      return userService.deleteUser(this.user.id)
        .then((res) => res.data)
        .then(data => {
          // console.log('delete', this.users);
          // const users = this.users.filter(user => user.id !== this.user.id);
          // this.users = users;
          // console.log(this.users);
          this.close();
        });
    },
  },
}
</script>

<style scoped>
.delete {
  margin-top: 1rem;
  width: 100%;
  cursor: pointer;
  background-color: #8c8c8c;
  border-color: #8c8c8c;
  color: #FFF;
}
</style>

