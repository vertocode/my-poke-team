<script setup lang="ts">

import HeaderApp from "./components/header/HeaderApp.vue";

</script>

<template id="app" class="text-center">
  <header-app />
  <router-view/>
</template>

<style>
#app {
  background-color: #E5E5E5;
  height: 100vh;
  overflow: hidden;
}
</style>
