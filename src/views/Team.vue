<script setup lang="ts">
import card from '../components/list/card.vue'
import {reactive} from "vue";

const deletedPokemon = (e: number) => {
  console.log(e)
  data.pokemons.splice(e, 1)
}
const data = reactive<{buttonPlaceholder: string; titleMyTeam: string; pokemons: Record<string, any>[]}> ({
  buttonPlaceholder: 'Add Pokemon',
  titleMyTeam: 'My Team',
  pokemons: [
    {
      id: 0,
      pokemon_name: 'spark1',
      default_name: 'pikachu',
      type_pokemon: 'trovão'
    },
    {
      id: 1,
      pokemon_name: 'spar2',
      default_name: 'pikachu',
      type_pokemon: 'trovão'
    },
    {
      id: 2,
      pokemon_name: 'spark3',
      default_name: 'pikachu',
      type_pokemon: 'trovão'
    },
    {
      id: 3,
      pokemon_name: 'spark4',
      default_name: 'pikachu',
      type_pokemon: 'trovão'
    },
    {
      id: 4,
      pokemon_name: 'spark5',
      default_name: 'pikachu',
      type_pokemon: 'trovão'
    },
    {
      id: 5,
      pokemon_name: 'spark6',
      default_name: 'pikachu',
      type_pokemon: 'trovão'
    }
  ]
})
</script>

<template >
  <div class="p-4">
    <div class="text-center">
      <h2 class="text-center title ">{{ data.title_my_team }}</h2>
    </div>
  </div>
  <div class="list-group">
    <div class="row">
      <div class="col-4" v-if="data.pokemons.length > 0" v-for="(pokemon, index) in data.pokemons">
        <card
            :pokemon_index="index"
            :pokemon_name="pokemon.pokemon_name"
            :default_name="pokemon.default_name"
            :type_pokemon="pokemon.type_pokemon"
            @delete="deletedPokemon"
        >
        </card>
      </div>
    </div>
  </div>
</template>

<style scoped>
.title {
  font-size: 1.9em;
  font-weight: bolder;
}
</style>
