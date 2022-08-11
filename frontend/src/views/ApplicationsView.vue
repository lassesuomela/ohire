<template>
<div class="container">
    <h1>My Applications</h1>
    <ApplicationsComponent/>
</div>
</template>

<script>

import ApplicationsComponent from "@/components/ApplicationsComponent.vue"

export default {
    components: {
        ApplicationsComponent,
    }
}
</script>

<style scoped>

.container {
    padding-top: 2rem;
}

</style>