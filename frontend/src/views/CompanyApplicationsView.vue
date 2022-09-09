<template>
<div class="container">
    <h1>Application Details</h1>
    <CompanyApplications/>
</div>
</template>

<script>

import CompanyApplications from "@/components/CompanyApplications.vue"

export default {
    components: {
        CompanyApplications,
    }
}
</script>

<style scoped>

.container {
    padding-top: 2rem;
}
@media screen and (max-width: 600px) {
  .container {
    padding: 0rem;
  }
}
</style>