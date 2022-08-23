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

</style>