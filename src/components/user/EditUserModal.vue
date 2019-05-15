<template>
  <div>
    <button :id="`show-modal-${user.id}`" class="edit" @click="showEditModal = true">Edit</button>

    <modal v-if="showEditModal" @close="close">
      <div slot="header">
        <h3>Edit User</h3>
      </div>
      <div slot="body">
        <user-form 
          :users="users" 
          :userInfo="user" 
          @close="close">
        </user-form>
      </div>
      <div slot="footer"></div>
    </modal>
  </div>
</template>

<script>
import userService from '@/api/userService';
import Modal from '@/components/Modal';
import UserForm from '@/components/user/UserForm';
import userSchema from '@/api/userSchema';

export default {
  name: 'edit-user-modal',

  components: {
    UserForm,
    Modal,
  },

  props: {
    title: '',
    showEditModal: false,
    user: userSchema,
    users: {
      type: Array,
      default: () => [userSchema],
    },
  },

  methods: {
    close() {
      this.showEditModal = false;
      this.$emit('close', true);
    },
  },
}
</script>

<style scoped>
.edit {
  width: 100%;
  cursor: pointer;
  margin-right: 20px;
  background-color: #5da6ff;
  border-color: #5da6ff;
  color: #FFF;
}
</style>

