<template>
  <div class="w-100">
    <button id="show-modal" class="create" @click="showModal = true">Create User</button>

    <modal v-if="showModal" @close="close">
      <div slot="header">
        <h3>New User</h3>
      </div>
      <div slot="body">
        <user-form :users="users" @close="close"></user-form>
      </div>
      <div slot="footer"></div>
    </modal>
  </div>
</template>

<script>
import userService from '@/api/userService';
import Modal from '@/components/Modal';
import UserForm from '@/components/user/UserForm';

export default {
  name: 'new-user-modal',

  components: {
    UserForm,
    Modal,
  },

  props: {
    title: '',
    users: {
      type: Array,
      default: () => [],
    },
  },

  data () {
    return {
      showModal: false, 
    };
  },

  methods: {
    close() {
      this.showModal = false;
    },
  },
}
</script>

<style scoped>
.create {
  width: 100%;
  padding: .5rem;
  cursor: pointer;
  margin-right: 20px;
  background-color: #5da6ff;
  border-color: #5da6ff;
  color: #FFF;
}
</style>

