<template>
  <div>
    <button-modal class="edit" @trigger="showEditModal = true">Update</button-modal>

    <modal v-if="showEditModal">
      <div slot="header">
        <h3>Edit User</h3>
      </div>
      <div slot="body">
        <user-form 
          :users="users" 
          :userInfo="user"
          @change="changeUsers($event)"
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
import ButtonModal from '@/components/ButtonModal';
import UserForm from '@/components/user/UserForm';
import userSchema from '@/api/userSchema';

export default {
  name: 'edit-user-modal',

  components: {
    UserForm,
    Modal,
    ButtonModal,
  },

  data() {
    return {
      showEditModal: false,
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
    changeUsers(usersChanged) {
      this.users = usersChanged;
    },

    close() {
      this.showEditModal = false;
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

