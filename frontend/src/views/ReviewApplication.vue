<template>
<div class="container">
    <h1>Review Application</h1>
    <ReviewApplicationComponent/>
</div>
</template>

<script>

import ReviewApplicationComponent from "@/components/ReviewApplicationComponent.vue"

export default {
    components: {
        ReviewApplicationComponent,
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