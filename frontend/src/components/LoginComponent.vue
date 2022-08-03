<template>
<div class="grid p-fluid">
    <InputText type="text" v-model="username" placeholder="Username"/>

    <Password v-model="password" placeholder="Password"/>

    <Button label="Login" @click="Login()" class="p-button-success"/>
</div>
</template>

<script>

import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Button from 'primevue/button';

export default {
  name: 'LoginComponent',
  components: {
    InputText,
    Button,
    Password,
  },
  data () {
    return {
      username: null,
      password: null
    }
  },
  methods: {
    Login () {
      console.log(this.username + ' ' + this.password);
    }
  }
}
</script>

<style scoped>

</style>
