<script setup lang="ts">
import card from '../list/card.vue'
import leftArrow from '../../assets/images/arrow-left.svg'
import { useStore } from "vuex";

const store = useStore();

defineProps<{
  teamId: any
}>()

const editTeamName = (teamId: number) => {
  const newName = prompt('What will be the new name of this team?')
  store.commit('editTeamName', { teamId, newName })
  console.log(teamId, newName)
}

const deletePokemons = (teamId: object, pokeId: number) => {
  store.commit('deletePokemon', {teamId, pokeId})
}
</script>

<template >
  <div class="p-4 row">
    <div class="col-3">
      <img @click="$emit('back')" class="arrow-left" :src="leftArrow" alt="<- Back">
    </div>
    <div class="col-6">
      <h2 class="text-center title">
        {{ store.state.teams[teamId].name }}
        <button
            class="btn btn-sm btn-outline-secondary"
            @click="editTeamName(teamId)"
        >
          Edit
        </button>
      </h2>
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
