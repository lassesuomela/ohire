<template>
<div class="container">
    <h1>Meetings</h1>
    <MeetingsComponent/>
</div>
</template>

<script>

import MeetingsComponent from "@/components/MeetingsComponent.vue"

export default {
  components: {
      MeetingsComponent,
  }
}
</script>

<style scoped>

.container {
  padding-top: 2rem;
}
@media screen and (max-width: 600px) {
  .container{
    padding: 0rem;
  }
}
</style>