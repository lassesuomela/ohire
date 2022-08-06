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
</style>