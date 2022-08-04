<template>
  <div class="field">
    <i class="material-symbols-outlined">account_circle</i>
    <InputText type="text" v-model="username" disabled name="username"/>
  </div>

  <div class="field">
    <i class="material-symbols-outlined">email</i>
    <InputText type="text" v-model="email" disabled name="email"/>
  </div>

  <div class="field">
    <i class="material-symbols-outlined">calendar_month</i>
    <InputText type="text" v-model="createdAt" disabled name="createdAt"/>
  </div>

  <Toast />
</template>

<script>

import InputText from 'primevue/inputtext';
import Toast from 'primevue/toast';

import axios from '../axios';

export default {
  name: 'LoginComponent',
  components: {
    InputText,
    Toast
  },
  data () {
    return {
      username: null,
      email: null,
      createdAt: null,
      status: null,
    }
  },
  methods: {
    FetchProfileData () {

      axios.get('/user/profile').then(response => {
        console.log(response);

        if(response.data.status === "success"){
          this.status = response.data.message;
          this.username = response.data.data[0].username;
          this.email = response.data.data[0].email;
          this.createdAt = this.FormatDate(response.data.data[0].createdAt);
        }

        if(response.data.status === "error"){
          this.status = response.data.message;

          // send error toast msg
          this.$toast.add({severity:'error', summary: this.status, life: 2000});
        }

      }).catch(error => {
        console.log(error);
      })
    },
    FormatDate(timestamp){

      const date = new Date(timestamp);
            
      return date.toLocaleString('fi');
    },
  },
  mounted () {
    this.FetchProfileData();
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
