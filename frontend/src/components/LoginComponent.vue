<template>
  <div class="field">
    <i class="pi pi-user"></i>
    <InputText type="text" v-model="username" placeholder="Username" name="username"/>
  </div>
  <div class="field">
    <i class="pi pi-key"></i>
    <Password v-model="password" :feedback="false" placeholder="Password"/>
  </div>
  <div class="field">
    <Button label="Login" icon="pi pi-sign-in" iconPos="right" @click="Login"/>
  </div>

  <div class="registerField">
    <span>New user? <router-link to="/register">Register now</router-link></span>
  </div>
  <Toast />
</template>

<script>

import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Button from 'primevue/button';
import Toast from 'primevue/toast';

import axios from '../axios';

export default {
  name: 'LoginComponent',
  components: {
    InputText,
    Button,
    Password,
    Toast
  },
  data () {
    return {
      username: null,
      password: null,
      loginStatus: null,
    }
  },
  methods: {
    Login () {

      if(this.username === null || this.password === null){
        this.$toast.add({severity:'error', summary: 'One or more fields must be provided', detail:'', life: 3000});
        return;
      }

      let data = {
        username:this.username,
        password:this.password
      }

      axios.post('/login', data).then(response => {
        console.log(response);

        if(response.data.status === "success"){
          this.loginStatus = response.data.message;

          localStorage.setItem("token", response.data.token);3

          // send success toast msg
          this.$toast.add({severity:'success', summary: this.loginStatus, life: 2000});

          // redirect to job listings
          this.$router.push('jobListings');
        }

        if(response.data.status === "error"){
          this.loginStatus = response.data.message;

          // send error toast msg
          this.$toast.add({severity:'error', summary: this.loginStatus, life: 2000});
        }

      }).catch(error => {
        console.log(error);
      })
    }
  }
}
</script>

<style scoped>

.field i {
  padding-right: 1rem;
}

.field {
  padding: 0.5rem;
}

.registerField {
  padding-top: 1rem;
}

</style>
