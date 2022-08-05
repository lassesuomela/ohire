<template>
    <div>
      <AuthenticatedMenu v-if="isAuthenticated"/>
      <UnauthenticatedMenu v-else/>

      <div>
        <router-view></router-view>
      </div>
    </div>
    
</template>

<script>

import AuthenticatedMenu from '@/components/AuthenticatedMenuComponent.vue';
import UnauthenticatedMenu from '@/components/UnauthenticatedMenuComponent.vue';

import axios from './axios';

export default {
  name: 'App',
  components: {
    AuthenticatedMenu,
    UnauthenticatedMenu
  },
  data () { 
    return {
      isAuthenticated: null,
    }
  },
  methods: {
    CheckLogin () {
      axios.get('/user').then((response) => {
        if(response.data.status === "success"){
            this.isAuthenticated = true;

        }else{
            // incase of error status we dont let the user in
            this.isAuthenticated = false;
        }
      }).catch(error => {
        console.log(error);
        this.isAuthenticated = false;
      })
    }
  },
  mounted () {
    this.CheckLogin();
  }
}
</script>

<style>

@import url('https://fonts.googleapis.com/css?family=Roboto+Condensed');
@import url('https://fonts.googleapis.com/css?family=Material+Symbols+Outlined');

#app {
  font-family: 'Roboto Condensed';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
