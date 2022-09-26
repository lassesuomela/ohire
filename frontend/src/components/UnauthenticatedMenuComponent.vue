<template>
    <el-menu mode="horizontal" router class="menu" :ellipsis="true" :default-active="$route.path">
        <el-menu-item class="menuItem" index="/jobs">Jobs</el-menu-item>
        <el-menu-item class="menuItem" index="/login">Login</el-menu-item>
        <el-menu-item class="menuItem" index="/register">Register</el-menu-item>
        <el-menu-item class="menuItem" index="/registerCompany">Register Company</el-menu-item>
    </el-menu>
</template>

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
