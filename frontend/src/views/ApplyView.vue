<template>
<div class="container">
    <h1>Job application</h1>
    <ApplyComponent/>
</div>
</template>

<script>

import ApplyComponent from "@/components/ApplyComponent.vue"

export default {
    components: {
        ApplyComponent,
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