<template>
  <div class="field">
    <i class="material-symbols-outlined">account_circle</i>
    <InputText type="text" v-model="username" placeholder="Username" name="username"/>
  </div>

  <div class="field">
    <i class="material-symbols-outlined">email</i>
    <InputText type="text" v-model="email" placeholder="Email" name="email"/>
  </div>

  <div class="field">
    <i class="material-symbols-outlined">lock</i>
    <Password v-model="password"  placeholder="Password"/>
  </div>

  <div class="field">
    <i class="material-symbols-outlined">lock</i>
    <Password v-model="password2" :feedback="false" placeholder="Repeat Password"/>
  </div>

  <div class="field">
    <Button label="Register" icon="pi pi-sign-in" iconPos="right" @click="Register"/>
  </div>

  <div class="registerField">
    <span>Already have an account? <router-link to="/login">Login here</router-link></span>
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
      password2: null,
      email: null,
      registerStatus: null,
    }
  },
  methods: {
    Register () {

      if(!this.username || !this.password || !this.password2 || !this.email){
        this.$toast.add({severity:'warn', summary: 'One or more fields must be provided', detail:'', life: 3000});
        return;
      }

      if(this.password !== this.password2){
        this.$toast.add({severity:'warn', summary: 'Passwords don\'t match', detail:'', life: 3000});
        return;
      }

      let data = {
        username:this.username,
        password:this.password,
        email:this.email
      }

      axios.post('/register', data).then(response => {
        console.log(response);

        if(response.data.status === "success"){
          this.loginStatus = response.data.message;

          // send success toast msg
          this.$toast.add({severity:'success', summary: this.loginStatus, life: 2000});
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
  font-size: 2rem;
  padding-right: 1rem;
}

.field {
  justify-content: center;
  text-align: center;
  display: flex;
  padding: 0.5rem;
}

.registerField {
  padding-top: 1rem;
  
}

</style>
