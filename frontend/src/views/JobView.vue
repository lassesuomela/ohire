<template>
<div class="container">
    <h1>Jobs</h1>
    <JobComponent/>
</div>
</template>

<script>

import JobComponent from "@/components/JobsComponent.vue"

export default {
    components: {
        JobComponent,
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