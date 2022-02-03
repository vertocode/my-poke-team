<script lang="ts" setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

const data = {
  hello_name: 'Hello Everton',
  my_teams: 'My Team',
  pokedex: 'Pokedex'
}
const routeActual = computed(() => {
  const route = useRoute()
  return route.path
})

</script>
<template class="sub-header">
  <nav class="navbar navbar-light row" style="background-color: #FFFFFF;">
    <div class="col-6 row">
      <div class="col-2 text-end mt-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="red" class="bi-person-circle" viewBox="0 0 16 16">
          <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
          <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
        </svg>
      </div>
      <div class="col-10">
        <h2 class="text-start pt-1"><strong>{{ data.hello_name }}</strong></h2>
      </div>
    </div>
    <div class="col-6 row p-1">
      <div class="col-8">
        <h2 class="text-end pt-1"><router-link to="/" class="link-nav" :class="{ 'link-active': routeActual === '/' }">{{ data.my_teams }}</router-link></h2>
      </div>
      <div class="col-2">
        <h2 class="text-start pt-1"><router-link to="/pokelist" class="link-nav" :class="{ 'link-active': routeActual === '/pokelist' }">{{ data.pokedex }}</router-link></h2>
      </div>
    </div>
  </nav>
</template>

<style>
.link-nav {
  color: black;
  text-decoration: none;
}
.link-active {
  text-decoration: underline red;
}
</style>
