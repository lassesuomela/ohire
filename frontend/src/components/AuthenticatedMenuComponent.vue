<template>
<div>
    <TabMenu :model="links" v-if="role === 1"/>
    <TabMenu :model="corporateLinks" v-if="role === 2"/>
</div>
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
            role: null,
            uuid: null,
            links: [
                {label: 'Job Listings', to: '/jobs'},
                {label: 'Meetings', to: '/meetings'},
                {label: 'Applications', to: '/applications'},
                {label: 'Profile', to: '/profile'},
                {label: 'Logout', to: '/logout'},
            ],
            corporateLinks: [
                {label: 'Job Listings', to: '/jobs'},
                {label: 'Create Jobs', to: '/createJobs'},
                {label: 'My jobs', to: '/companyJobs'},
                {label: 'Meetings', to: '/meetings'},
                {label: 'Profile', to: '/profile'},
                {label: 'Logout', to: '/logout'},
            ]
        }
    },
    methods: {
        FetchProfileData () {
            axios.get('/user/profile').then(response => {

                if(response.data.status === "success"){
                    this.role = response.data.data.role;
                    this.uuid = response.data.data.uuid;

                    if(this.role === 1){
                        this.$store.commit('normalUser');
                    }else if(this.role === 2){
                        this.$store.commit('corporateUser');
                    }

                    this.$store.commit('changeUuid', this.uuid);
                }

            }).catch(error => {
                console.log(error);
            })
        },
    },
    created () {
        this.FetchProfileData();
    }
}
</script>
