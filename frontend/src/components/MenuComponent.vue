<template>
    <TabMenu :model="items" />
  
</template>

<script>
import TabMenu from 'primevue/tabmenu';


export default {
    components: {
        TabMenu
    },
    data () {
        return {
            items: [
                {label: 'Login', to: 'login'},
                {label: 'Register', to: 'register'},
                {label: 'Job Listings', to: 'jobs'},
                {label: 'Meetings', to: 'meetings'},
                {label: 'Profile', to: 'profile'},
                {label: 'Logout', to: 'logout'},
            ]
        }
    }
}
</script>

<style>

</style>