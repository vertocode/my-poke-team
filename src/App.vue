<script setup lang="ts">
import HeaderApp from "./components/header/HeaderApp.vue";
import { onBeforeMount } from "vue";
import { useStore } from "vuex";

const store = useStore();

onBeforeMount(() => {
  store.commit("loading", false);
  store.commit("clearPokemons", []);
  store.dispatch("getApi", { limit: 10, offset: 0 });
  setTimeout(() => {
    store.commit("loading", true);
  }, 500);
});
</script>
<template>
  <!-- Application -->
  <div v-if="store.state.loading">
    <header-app />
    <router-view />
  </div>
  <!-- Loading -->
  <div v-else class="text-center loading">
    <div class="spinner-border" style="width: 4rem; height: 4rem" role="status">
      <span class="sr-only"></span>
    </div>
  </div>
</template>

<style>
#app {
  overflow-x: hidden;
  height: 100%;
  font-family: times new roman, sans-serif;
}
.loading {
  margin-top: 45vh;
}
.pagination {
  cursor: pointer;
  justify-content: center;
  margin: 25px;
}
.previous {
  background-color: #f1f1f1;
  color: black;
}

.next {
  background-color: #dc3545;
  color: white;
}
</style>
