<script lang="ts" setup>
defineProps<{
  pokemon_index: number
  pokemon_name: string
  default_name: string
  type_pokemon: string
}>()
</script>

<template>
  <div class="card m-3 text-center">
    <img class="card-img-top" src="src/assets/logo.png" alt="Card image cap">
    <div class="card-body">
      <h5 class="card-title">{{ pokemon_name }}</h5>
    </div>
    <ul class="list-group list-group-flush text-start">
      <li class="list-group-item">Default name: {{ default_name }}</li>
      <li class="list-group-item">Type: {{ type_pokemon }}</li>
    </ul>
    <div class="card-body text-center">
      <button class="btn-sm btn-danger" @click="$emit('delete', pokemon_index)">Delete Pokemon</button>
    </div>
  </div>
</template>

<style>
.card {
  border-radius: 10%;
  max-width: 500px;
  max-height: 500px;
}
.card-img-top {
  margin: auto;
  height: 80px;
  width: 90px;
}
</style>
