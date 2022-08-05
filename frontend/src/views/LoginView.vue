<template>
<div class="container">
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

.container {
    padding-top: 2rem;
}
</style>