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

</style>