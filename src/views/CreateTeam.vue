<script setup lang="ts">

import { computed, reactive } from "vue";
import { useStore } from "vuex";
import Card from "../components/list/card.vue";

const store = useStore()

const AllInfosPokemon: any = computed(() => {
  console.log(store.state.allPokemons)
  return store.state.allPokemons
})

const createdTeam: any = reactive([])
const allPokemonSelected: Array<number> = reactive([])
let pokeName: any = reactive([])

const setDefaultName: any = (id: number) => {
  pokeName[id] = prompt('What will be the new name of this pokemon?')
  console.log(pokeName, createdTeam)
}

const saveTeam = () => {
  const name: any = document.querySelector('.teamNameInput')
  store.commit('saveTeam', { id: 3, name: name.value, pokemons: createdTeam })
}
const deletePokemon = (id: any) => {
  allPokemonSelected.findIndex((element, index) => {
    if (element === id) {
      allPokemonSelected.splice(index, 1)
      createdTeam.splice(id, 1)
      console.log(createdTeam)
    }
  })
}

const selectPokemon = (payload: any) => {
  if (allPokemonSelected.includes(payload.id)) {
    return
  } else {
    allPokemonSelected.push(payload.id)
    createdTeam.push(payload)
    console.log(payload)
  }
}
</script>

<template>
  <div id="createTeam">
      <div class="row mx-md-n5">
        <div class="col-12 text-center">
          <h4 class="mt-4">What will be the name of your pokemon team?</h4>
          <input type="text" class="mt-2 teamNameInput" placeholder="Name Team">
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
                    default_name: pokemon.name,
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
                  @editPokemon="setDefaultName(card)"
                  @delete="deletePokemon(card)"
                  :pokemon-name="pokeName[card]"
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
