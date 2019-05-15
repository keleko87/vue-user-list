<template>
  <div class="container px-5">
    <div class="card">
        <div class="card-header">
            <h3>Add User</h3>
        </div>
        <div class="card-body">
          <form @submit.prevent="addUser">
              <div class="form-group row">
                <div class="col-md-6">
                  <label>Name</label>
                  <input type="text" class="form-control" 
                    :value="user.name || ''"
                    @input="user.name = $event.target.value"/>
                  <br>
                  <label>BirthDate</label>
                  <input type="date" date-format="DD-MM-YYYY" class="form-control" 
                    :value="user.birthDate || ''"
                    @input="user.birthDate = $event.target.value"/>
                </div>
                <div class="col-md-6">
                  <label>Email</label>
                  <input type="email" class="form-control" 
                    :value="user.email || ''"
                    @input="user.email = $event.target.value"/>
                </div>
              </div>

              <div class="form-group mt-5">
                <label>Address</label>
              </div> 
              <div class="form-group row">
                <div class="col-md-6">
                  <label>Street</label>
                  <input type="text" class="form-control"
                    :value="user.address.street || ''"
                    @input="user.address.street = $event.target.value"/>
                  <br>
                  <label>City</label>
                  <input type="text" class="form-control"
                    :value="user.address.city || ''"
                    @input="user.address.city = $event.target.value"/>
                  <br>
                  <label>State</label>
                  <input type="text" class="form-control" v-model="user.address.state"/>
                </div>
                <div class="col-md-6">  
                  <label>Country</label>
                  <input type="text" class="form-control"
                    :value="user.address.country || ''"
                    @input="user.address.country = $event.target.value"/>
                  <br>
                  <label>Zip</label>
                  <input type="text" class="form-control"
                    :value="user.address.zip || ''"
                    @input="user.address.zip = $event.target.value"/>
                </div>
              </div>
              <div class="form-group mt-5">
                  <input type="submit" class="btn btn-primary" value="Add User"/>
              </div>
          </form>
        </div>
    </div>
  </div>
</template>

<script>
import userService from '@/api/userService';
import UserList from '@/components/user/UserList';
import userUtils from '@/mixins/userUtils';
import userSchema from '@/api/userSchema';

const uuidv1 = require('uuid/v1');

export default {
  name: 'user-form',

  components: {
    UserList,
  },

  props: {
    userInfo: {},
    users: {
      type: Array,
      default: () => [],
    },
  },

  mixins: [userUtils],

  data() {
    return {
      user: userSchema,
    };
  },

  created() {
    if (this.userInfo) this.user = this.userInfo;
    else this.user = userSchema;
  },
  
  methods: {
    closeModal() {
      this.$emit('close');
    },

    updateUser() {
      // Mock server will response the Postman example
      return userService.updateUser(this.user.id, this.user)
        .then((res) => res.data)
        .then(data => { 
          console.log(data);
          const usersWithoutUserUpdated = this.users.filter(user => user.id !== this.user.id); 
          this.users = usersWithoutUserUpdated.push(this.user);
          this.close();
        });
    },

    createUser() {
      this.user.id = this.addId();
      this.user.birthDate = this.transformDate(this.user.birthDate);
      const user = Object.assign({}, this.user);
      delete this.user;
      this.users.push(user);
    
      event.target.reset();
      
      // Mock server will response the Postman example
      return userService.createUser(user)
        .then((res) => res.data)
        .then(data => { 
          console.log(data) 
          this.user = {};
          this.closeModal();
        });
    },

    addUser() {
      if (!this.userInfo) {
        this.createUser();
      } else {
        this.updateUser();
      }
    },
  },
};
</script>

<style scoped>
  div {
    border-radius: 0;
  }

  input {
    border-radius: 0;
    border-top: 0;
    border-right: 0;
    border-left: 0; 
  }
  .card {
    text-align: left;
  }

  h3 {
    margin: 0;
  }

  label {
    font-weight: bold;
  }
</style>
