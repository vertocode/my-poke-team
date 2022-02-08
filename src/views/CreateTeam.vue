<script setup lang="ts">

import { computed, reactive } from "vue";
import { useStore } from "vuex";
import Card from "../components/list/card.vue";

const store = useStore()

const AllInfosPokemon: any = computed(() => {
  return store.state.allPokemons
})

const newTeam: any = computed(() => {
  return store.state.createTeam
})

const allPokemonSelected: Array<number> = reactive([])

const saveTeam = () => {
  // TODO Implement
  store.dispatch('saveTeam', {id: 3, name: 'test'})
}
const deletePokemon = (id: any) => {
  allPokemonSelected.findIndex((element, index) => {
    if (element === id) {
      allPokemonSelected.splice(index, 1)
      store.dispatch('deleteNewTeam', {id: index})
      console.log(store.state.createTeam)
    }
  })
}

const selectPokemon = (payload: any) => {
  if (allPokemonSelected.includes(payload.id)) {
    return
  } else {
    allPokemonSelected.push(payload.id)
    store.commit('setNewTeam', payload)
    console.log(store.state.createTeam)
  }
}
</script>

<template>
  <div id="createTeam">
      <div class="row mx-md-n5">
        <div class="col-12 text-center">
          <h4 class="mt-4">What will be the name of your pokemon team?</h4>
          <input type="text" class="mt-2" placeholder="Name Team">
        </div>
      </div>
    <hr>
      <div class="mt-4">
        <div class="row">
          <div class="col-8">
            <h5 class="text-center">Choose the pokemons you want on your team when you're done. Click save team.</h5>
          </div>
          <div class="col-4">
            <button class="btn btn-primary mb-4" @click="saveTeam({})">Save Team</button>
          </div>
        </div>
        <div class="row">
          <div class="col-6">
            <ul class="list-group item-list" v-for="pokemon in AllInfosPokemon">
              <li class="list-group-item" :id="`item-${pokemon.id}-pokemon`">
                <button
                    class="btn btn-primary"
                    @click="selectPokemon({
                    id: pokemon.id,
                    pokemons_name: pokemon.name,
                    type_pokemon: pokemon.types[0].type.name,
                    srcImg: pokemon.sprites.front_default
                    })"
                >
                  Add
                </button>
                <span class="m-3">
                  {{ pokemon.id }}
                  |
                  <img :src="pokemon.sprites.front_default"/>
                  {{ pokemon.name }}
                </span>
              </li>
            </ul>
          </div>
          <div class="col-6">
            <div class="row">
              <card
                  v-for="(card) in allPokemonSelected"
                  @delete="deletePokemon(card)"
                  :defaultName="AllInfosPokemon[card-1].name"
                  :typePokemon="AllInfosPokemon[card-1].types[0].type.name"
                  :srcImg="AllInfosPokemon[card-1].sprites.front_default"
              />
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<style>
#createTeam {
  display: block;
}
.item-list {
  border-radius: 8px;
  width: 350px;
  margin: auto;
}
img {
  height: 60px;
  width: 60px;
}
</style>
