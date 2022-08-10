<template>
<div class="container">
    <h1>Register Company</h1>
    <RegisterCompanyComponent/>
</div>
</template>

<script>

import RegisterCompanyComponent from "@/components/RegisterCompanyComponent.vue"

export default {
    components: {
        RegisterCompanyComponent,
    }
}
</script>

<style scoped>

.container {
    padding-top: 2rem;
}
</style>