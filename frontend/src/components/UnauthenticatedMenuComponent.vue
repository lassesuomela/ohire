<template>
    <el-menu mode="horizontal" router class="menu" :ellipsis="true">
        <el-menu-item class="menuItem" index="/jobs">Jobs</el-menu-item>
        <el-menu-item class="menuItem" index="/login">Login</el-menu-item>
        <el-menu-item class="menuItem" index="/register">Register</el-menu-item>
        <el-menu-item class="menuItem" index="/registerCompany">Register Company</el-menu-item>
    </el-menu>
</template>

<script>

export default {
    components: {
    },
    data () {
        return {
        }
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
