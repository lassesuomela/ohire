<template>
<div v-if="role === 1">
    <el-menu mode="horizontal" router class="menu" :ellipsis="true">
        <el-menu-item class="menuItem" index="/jobs">Jobs</el-menu-item>
        <el-menu-item class="menuItem" index="/applications">Applications</el-menu-item>
        <el-menu-item class="menuItem" index="/profile">Profile</el-menu-item>
        <el-menu-item class="menuItem" index="/logout">Logout</el-menu-item>
    </el-menu>
</div>
<div v-else>
    <el-menu mode="horizontal" router class="menu" :ellipsis="true">
        <el-menu-item class="menuItem" index="/jobs">Jobs</el-menu-item>
        <el-menu-item class="menuItem" index="/createJobs">Create Jobs</el-menu-item>
        <el-menu-item class="menuItem" index="/companyJobs">My jobs</el-menu-item>
        <el-menu-item class="menuItem" index="/profile">Profile</el-menu-item>
        <el-menu-item class="menuItem" index="/logout">Logout</el-menu-item>
    </el-menu>
</div> 
</template>

<script>
import axios from '../axios';

export default {
    components: {
    },
    data () {
        return {
            role: null,
            uuid: null,
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
<style scoped>
.menu{
    padding: 0rem;
    overflow: hidden;
}
.menuItem {
    font-size: 1.2rem;
    font-family: "Roboto Condensed";
}

</style>