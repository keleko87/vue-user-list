<template>
  <div>    
    <button-modal @trigger="showDeleteModal = true">Delete</button-modal>

    <modal v-if="showDeleteModal" @close="showDeleteModal = false">
      <div slot="header">
        <h3>Delete User</h3>
      </div>
      <div slot="body">
       <h4>Are you sure delete user '<b>{{ user.name }}</b>' ?</h4>
       <div>
        <span><button class="btn btn-danger w-50 m-2 p-2" @click="deleteUser(user.id)">Delete</button></span>
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
import ButtonModal from '@/components/ButtonModal';
import UserForm from '@/components/user/UserForm';
import userSchema from '@/api/userSchema';

export default {
  name: 'delete-user-modal',

  components: {
    UserForm,
    ButtonModal,
    Modal,
  },
  
  data() {
    return {
      showDeleteModal: false,
    };
  },

  props: {
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

    deleteUser(userId) {
      // Mock server responses the Postman example
      return userService.deleteUser('28e3cb460-770f-11e9-814a-e7308885276f')
        .then((res) => res.data)
        .then(() => {
          window.console.log('OK delete', userId);
          // Simulate users has been deleted in BBDD and this.users has changed
          let users = this.users.slice();
          users = users.filter(user => user.id !== userId);
          this.$emit('change', users);
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

