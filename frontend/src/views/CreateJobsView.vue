<template>
<div class="container">
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

.container {
    padding-top: 2rem;
}
@media screen and (max-width: 600px) {
  .container {
    padding: 0rem;
  }
}
</style>