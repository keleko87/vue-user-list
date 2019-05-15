<template>
  <div class="home">
    <user-list :users="users"></user-list>
  </div>
</template>

<script>

import UserList from '@/components/user/UserList';
import UserForm from '@/components/user/UserForm';
import NewUserModal from '@/components/user/NewUserModal';
import userService from '@/api/userService';

export default {
  name: 'home',

  components: {
    UserList,
    UserForm,
    NewUserModal,
  },

  data() {
    return {
      users: [],
    };
  },
  
  mounted() {
		this.$nextTick(async () => {
      this.users = await this.getUsers();
		});
	},

  methods: {
    getUsers() {
      return userService.getUsers().then(res => res.data);
    },
  },
};
</script>
