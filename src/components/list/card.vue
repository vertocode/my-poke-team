<script lang="ts" setup>
import { useStore } from "vuex";

const store = useStore()

const changeName = (teamId: number, pokeId: number) => {
  const newName = prompt('What will be the new name of this pokemon?')
  store.commit('editName', { teamId, pokeId, newName })
}

defineProps<{
  teamId: number
  pokemonIndex: number
  pokemonName: string
  defaultName: string
  typePokemon: string
}>()
</script>

<template>
  <div class="card m-3 p-3 text-center">
    <img class="card-img-top" src="https://www.pngmart.com/files/2/Pikachu-PNG-Transparent-Image.png" alt="Card image cap">
    <div class="card-body">
      <h5 class="card-title name-pokemon">{{ pokemonName }}
        <button
            class="btn btn-sm btn-outline-secondary"
            @click="changeName(teamId, pokemonIndex)"
        >
          Edit
        </button>
      </h5>
    </div>
    <ul class="text-start">
      <li>Default name: {{ defaultName }}</li>
      <li>Type: {{ typePokemon }}</li>
    </ul>
    <div class="card-body text-center">
      <button class="btn-sm btn-danger" @click="$emit('delete', pokemonIndex)">Delete Pokemon</button>
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
ul {
  list-style-type: none;
}
</style>
