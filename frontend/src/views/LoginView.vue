<template>
<Card>

    <template #title>
        <h2>Login</h2>
    </template>
    <template #content>
        <LoginComponent/>
    </template>
</Card>
</template>

<script>

import LoginComponent from "@/components/LoginComponent.vue"
import Card from 'primevue/card';

export default {
    components: {
        LoginComponent,
        Card,
    }
}
</script>

<style>

</style>