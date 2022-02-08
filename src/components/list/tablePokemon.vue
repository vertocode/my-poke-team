<script setup lang="ts">

import { useStore } from "vuex";
import { computed } from "vue";

const store = useStore()

const AllInfosPokemon = computed(() => {
  return store.state.allPokemons
})

</script>

<template>
  <table class="table table-striped table-hover">
    <thead>
    <tr>
      <th scope="col">Id</th>
      <th scope="col">Pokemon</th>
      <th scope="col">Type</th>
      <th scope="col"></th>
    </tr>
    </thead>
    <tbody v-for="(pokemon) in AllInfosPokemon">
    <tr>
      <th scope="row">{{ pokemon.id }}</th>
      <td>
        <img
            :src="pokemon.sprites.front_default"
            alt="Card image cap"
        >
        {{ pokemon.name }}
      </td>
      <td>{{ pokemon.types[0].type.name }}</td>
      <td class="text-center"><button class="btn btn-primary">See more details</button></td>
    </tr>
    </tbody>
  </table>
</template>

<style>
img {
  width: 80px;
}
</style>
