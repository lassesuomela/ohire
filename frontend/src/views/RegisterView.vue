<template>
<div class="container">
    <h1>Register</h1>
    <RegisterComponent/>
</div>
</template>

<script>

import RegisterComponent from "@/components/RegisterComponent.vue"

export default {
    components: {
        RegisterComponent,
    }
}
</script>

<style scoped>

.container {
    padding-top: 2rem;
}
</style>