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
</style>