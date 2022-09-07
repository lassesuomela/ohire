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
@media screen and (max-width: 600px) {
  .container{
    padding: 0rem;
  }
}
</style>