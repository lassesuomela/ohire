<template>
<div class="container">
    <h1>Profile</h1>
    <ProfileComponent/>
</div>
</template>

<script>

import ProfileComponent from "@/components/ProfileComponent.vue"

export default {
    components: {
        ProfileComponent,
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