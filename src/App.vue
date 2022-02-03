<script setup lang="ts">

import HeaderApp from "./components/header/HeaderApp.vue";

</script>

<template id="app" class="text-center">
  <header-app />
  <router-view/>
</template>

<style>
#app {
  overflow-x: hidden;
  height: 100%;
}
</style>
