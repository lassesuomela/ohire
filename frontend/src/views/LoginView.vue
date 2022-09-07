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

@media only screen and (max-width: 600px) {
    .container {
        padding-top: 0rem;
    }
}
</style>