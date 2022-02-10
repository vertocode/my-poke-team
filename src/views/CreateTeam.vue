<script setup lang="ts">
import Card from "../components/list/card.vue";
import ModalPokemon from '../components/modal/ModalPokemon.vue'
import { computed, reactive, ref } from "vue";
import { useStore } from "vuex";
import { router } from "../router";

const store = useStore()

const AllInfosPokemon: any = computed(() => {
  return store.state.allPokemons
})

const createdTeam: any = reactive([])
const allPokemonSelected: Array<number> = reactive([])
const toggleModal: any = ref(false)
let pokeOpenDetails: any = reactive({index: 0})
let pokeName: any = reactive([])

const toggleModalButton = (pokeId: number): void => {
  toggleModal.value = !toggleModal.value
  pokeOpenDetails.index = pokeId - 1
  console.log(pokeOpenDetails)
}

const setPokemonName: any = (id: number) => {
  pokeName[id] = prompt('What will be the new name of this pokemon?')
  createdTeam[id-1].pokemon_name = pokeName[id]
}

const saveTeam = () => {
  const name: any = document.querySelector('.teamNameInput')
  if (createdTeam.length === 0) {
    alert('To save a team it is necessary to add at least 1 pokemon.')
  } else if (name.value === '') {
    alert('Give a name for your pokemon team')
  } else {
    store.commit('saveTeam', { id: 3, name: name.value, pokemons: createdTeam })
    router.push({path: '/'})
  }
}
const deletePokemon = (id: any) => {
  allPokemonSelected.findIndex((element, index) => {
    if (element === id) {
      allPokemonSelected.splice(index, 1)
      createdTeam.splice(index, 1)
    }
  })
}

const selectPokemon = (payload: any) => {
  if (allPokemonSelected.includes(payload.id)) {
    return
  } else {
    allPokemonSelected.push(payload.id)
    createdTeam.push(payload)
  }
}
</script>

<template>
  <div id="createTeam">
    <!-- MODAL -->
    <ModalPokemon
        v-if="toggleModal"
        @closeModal="toggleModalButton"
    >
      <div class="pokemon-modal">
        <img
            class="img-modal"
            :src="AllInfosPokemon[pokeOpenDetails.index].sprites.front_default"
            alt="Card image cap"
        >
      </div>
      <div>
        <h1 class="card-title">{{ AllInfosPokemon[pokeOpenDetails.index].name }}</h1>
        <span class="info-pokemon d-block" v-for="(ability, index) in AllInfosPokemon[pokeOpenDetails.index].abilities">{{ index+1 }}° Ability: {{ ability.ability.name }}</span>
      </div>
    </ModalPokemon>
    <!-- CREATE TEAM -->
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
            <button class="btn btn-primary mb-4" @click="saveTeam()">Save Team</button>
          </div>
        </div>
        <div class="row">
          <div class="col-6">
            <ul class="list-group item-list" v-for="pokemon in AllInfosPokemon">
              <li class="list-group-item" :id="`item-${pokemon.id}-pokemon`">
                <div class="">
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
                  <img class="img-list" :src="pokemon.sprites.front_default"/>
                  {{ pokemon.name }}
                </span>
                </div>
                <div class="text-end">
                  <button class="btn btn-info text-end" @click="toggleModalButton(pokemon.id)">
                    Details
                  </button>
                </div>
              </li>
            </ul>
          </div>
          <div class="col-6">
            <div class="row">
              <card
                  v-for="(card) in allPokemonSelected"
                  @editPokemon="setPokemonName(card)"
                  @delete="deletePokemon(card)"
                  :pokemonName="pokeName[card]"
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
  width: 400px;
  margin: auto;
}
.img-list {
  height: 60px;
  width: 60px;
}
.img-modal {
  height: 220px;
  width: 220px;

}
.pokemon-modal {
  background: url("https://unite.pokemon.com/images/home/team-up/background.jpg");
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
