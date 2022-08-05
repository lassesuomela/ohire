<template>
  <div class="field">
    <i class="material-symbols-outlined">account_circle</i>
    <InputText class="customText" type="text" v-model="username" disabled name="username"/>
  </div>

  <div class="field">
    <i class="material-symbols-outlined">email</i>
    <InputText class="customText" type="text" v-model="email" disabled name="email"/>
  </div>

  <div class="field">
    <i class="material-symbols-outlined">badge</i>
    <InputText class="customText" type="text" v-model="accountType" disabled name="accountType"/>
  </div>

  <div class="field">
    <i class="material-symbols-outlined">calendar_month</i>
    <InputText class="customText" type="text" v-model="createdAt" disabled name="createdAt"/>
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
    Toast,
  },
  data () {
    return {
      username: null,
      email: null,
      createdAt: null,
      status: null,
      accountType: null,
    }
  },
  methods: {
    FetchProfileData () {

      axios.get('/user/profile').then(response => {
        console.log(response);

        if(response.data.status === "success"){
          this.username = response.data.data.username;
          this.email = response.data.data.email;

          this.createdAt = this.FormatDate(response.data.data.createdAt);

          // check for role
          if(response.data.data.role === 1){
            this.accountType = "User";
          }else if(response.data.data.role === 2){
            this.accountType = "Corporate User";
          }
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

@import "/node_modules/primeflex/primeflex.css";
@import "/node_modules/primeflex/themes/arya-blue.css";
.field i {
  padding-right: 1rem;
  font-size: 2rem;
}

.field{
  justify-content: center;
  text-align: center;
  display: flex;
  padding: 0.5rem;
}

.customText {
  color: black;
  font-size: 16px;
}

</style>
