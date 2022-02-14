<script lang="ts" setup>

defineProps<{
  teamId: number
  srcImg: string
  pokemonName: string
  defaultName: string
  typePokemon: string
  teamScreen: boolean
}>()
</script>

<template>
  <div class="card m-3 p-3 text-center">
    <img class="card-img-top" :src="srcImg" alt="Card image cap">
    <div class="card-body">
      <h5 class="card-title name-pokemon">{{ pokemonName }}
        <button
            class="btn btn-sm btn-outline-secondary"
            @click="$emit('editPokemon', teamId)"
        >
          Edit Name
        </button>
      </h5>
    </div>
    <ul class="text-start">
      <li>Default name: {{ defaultName }}</li>
      <li>Type: {{ typePokemon }}</li>
    </ul>
    <div class="card-body text-center">
      <button class="btn-sm btn-primary m-2" @click="$emit('details')" v-if="teamScreen === true">Details</button>
      <button class="btn-sm btn-danger" @click="$emit('delete')">Delete Pokemon</button>
    </div>
  </div>
</template>

<style>
.card {
  border-radius: 18%;
  box-shadow: 12px 12px 2px 1px rgba(182, 70, 70, 0.2);
}
.card-img-top {
  margin: auto;
  height: 150px;
  width: 150px;
}
ul {
  list-style-type: none;
}
</style>

