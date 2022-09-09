<template>
<div class="container">
    <h1>Job listing</h1>
    <ViewMoreJobComponent/>
</div>
</template>

<script>

import ViewMoreJobComponent from "@/components/ViewMoreJobComponent.vue"

export default {
    components: {
        ViewMoreJobComponent,
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