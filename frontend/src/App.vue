<template>
    <div>
      <MenuComponent />

      <div>
        <router-view></router-view>
      </div>
    </div>
</template>

<script>

import 'primevue/resources/themes/lara-light-indigo/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

import MenuComponent from '@/components/MenuComponent.vue';

export default {
  name: 'App',
  components: {
    MenuComponent
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
