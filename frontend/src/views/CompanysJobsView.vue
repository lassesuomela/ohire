<template>
<div class="container">
    <h1>My jobs</h1>
    <CompanysJobsComponent/>
</div>
</template>

<script>

import CompanysJobsComponent from "@/components/CompanysJobsComponent.vue"

export default {
    components: {
        CompanysJobsComponent,
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