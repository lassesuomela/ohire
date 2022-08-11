<template>
<div class="container">
    <h1>Test Your Webcam</h1>
    <TestWebcamComponent/>
</div>
</template>

<script>

import TestWebcamComponent from "@/components/TestWebcamComponent.vue"

export default {
    components: {
        TestWebcamComponent,
    }
}
</script>

<style scoped>

.container {
    padding-top: 2rem;
}

</style>