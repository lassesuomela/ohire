<template>
    <TabMenu :model="itemsAuthenticated" v-if="isAuthenticated"/>
    <TabMenu :model="itemsUnauthenticated" v-if="!isAuthenticated"/>
  
</template>

<script>
import TabMenu from 'primevue/tabmenu';
import axios from '../axios';

export default {
    components: {
        TabMenu
    },
    data () {
        return {
            itemsAuthenticated: [
                {label: 'Job Listings', to: 'jobs'},
                {label: 'Meetings', to: 'meetings'},
                {label: 'Profile', to: 'profile'},
                {label: 'Logout', to: 'logout'},
            ],
            itemsUnauthenticated: [
                {label: 'Login', to: 'login'},
                {label: 'Register', to: 'register'},
            ],
            isAuthenticated: false,
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

</style>