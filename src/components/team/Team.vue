<script setup lang="ts">
import card from '../list/card.vue'
import { useStore } from "vuex";

const store = useStore();

defineProps<{
  teamId: any
}>()

const deletePokemons = (teamId: object, pokeId: number) => {
  store.commit('deletePokemon', {teamId, pokeId})
}

</script>

<template >
  <div class="p-4 row">
    <div class="col-3">
      <img @click="$emit('back')" class="arrow-left " src="src/assets/images/arrow-left.svg" alt="<- Back">
    </div>
    <div class="col-6">
      <h2 class="text-center title">{{ store.state.teams[teamId].name }}</h2>
    </div>
    <div class="col-3 text-center">
      <router-link to="/pokelist"><button class="btn-lg btn-primary">Add Pokemon</button></router-link>
    </div>
  </div>
  <div class="list-group">
    <div class="row">
      <div class="col-4" v-if="store.state.teams[teamId].pokemons.length > 0" v-for="(pokemon, index) in store.state.teams[teamId].pokemons">
        <card
            :teamId="teamId"
            :pokemonIndex="index"
            :pokemonName="pokemon.pokemon_name"
            :defaultName="pokemon.default_name"
            :typePokemon="pokemon.type_pokemon"
            @delete="deletePokemons(teamId, index)"
        >
        </card>
      </div>
    </div>
  </div>
</template>

<style scoped>
.title {
  font-size: 2em;
  font-family: "Droid Sans",sans-serif;
  font-weight: bold;
}
.arrow-left {
  height: 50px;
  margin-left: 50px;
  cursor: pointer;
}
</style>
