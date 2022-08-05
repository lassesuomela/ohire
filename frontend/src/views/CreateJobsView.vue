<template>
<div class="loginContainer">
    <h1>Create Job Listing</h1>
    <CreateJobsComponent/>
</div>
</template>

<script>

import CreateJobsComponent from "@/components/CreateJobsComponent.vue"

export default {
    components: {
        CreateJobsComponent,
    }
}
</script>

<style scoped>

.loginContainer {
    padding-top: 2rem;
}
</style>