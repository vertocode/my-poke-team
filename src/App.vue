<script setup lang="ts">

import HeaderApp from "./components/header/HeaderApp.vue";
import { onBeforeMount } from "vue";
import { useStore } from "vuex";

const store = useStore()

onBeforeMount(() => {
  store.commit('clearPokemons', [])
  store.dispatch('getApi', 'pokemon?limit=20&offset=0')
})
</script>
<template>
  <!-- Application -->
  <div v-if="store.state.loading">
    <header-app />
    <router-view/>
  </div>
  <!-- Loading -->
  <div class="text-center loading" v-else>
    <div class="spinner-border" style="width: 4rem; height: 4rem;" role="status">
      <span class="sr-only"></span>
    </div>
  </div>
</template>

<style>
#app {
  overflow-x: hidden;
  height: 100%;
}
.loading {
  margin-top: 45vh;
}
</style>
