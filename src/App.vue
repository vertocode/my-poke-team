<script setup lang="ts">

import HeaderApp from "./components/header/HeaderApp.vue";
import { onBeforeMount, reactive } from "vue";
import { useStore } from "vuex";

let load: any = reactive({isLoad: false})

const store = useStore()

onBeforeMount(() => {
  store.commit('clearPokemons', [])
  store.dispatch('getApi', 'pokemon?limit=501&offset=0')
  load.isLoad = !load.isLoad
})
</script>
<template>
  <!-- Loading -->
  <div class="text-center loading" v-if="load.isLoad === false">
    <div class="spinner-border" style="width: 4rem; height: 4rem;" role="status">
      <span class="sr-only"></span>
    </div>
  </div>
  <!-- Application -->
  <div v-else>
    <header-app />
    <router-view/>
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
