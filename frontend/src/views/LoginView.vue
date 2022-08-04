<template>
<div class="loginContainer">
    <h1>Login</h1>
    <LoginComponent/>
</div>
</template>

<script>

import LoginComponent from "@/components/LoginComponent.vue"

export default {
    components: {
        LoginComponent,
    }
}
</script>

<style scoped>

.loginContainer {
    padding-top: 2rem;
}
</style>