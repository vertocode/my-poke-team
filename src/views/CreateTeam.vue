<script setup lang="ts">
import Card from "../components/list/card.vue";
import ModalPokemon from '../components/modal/ModalPokemon.vue'
import { computed, reactive, ref } from "vue";
import { useStore } from "vuex";
import { router } from "../router";

const store = useStore()

const AllInfosPokemon: any = reactive(computed(() => {
  return store.state.allPokemons
}))

const createdTeam: any = reactive([])
const allPokemonSelected: Array<number> = reactive([])
const toggleModal: any = ref(false)
let questionName: any = reactive({isOpen: false, newName: '', index: 0})
let alertModal: any = reactive({isOpen: false, msg: ''})
let pokeOpenDetails: any = reactive({index: 0})
let pokeName: any = reactive([])
let pageOffSet: any = reactive({innitialValue: 0})

const toggleModalButton = (pokeId: number): void => {
  toggleModal.value = !toggleModal.value
  pokeOpenDetails.index = pokeId - 1
}

const setPokemonName: any = (pokeId: number) => {
  questionName.isOpen = true
  questionName.index = pokeId
}
const setNewName: any = () => {
  const newName: any = document.querySelector('#newName')
  createdTeam.forEach((pokemon: any, index: any) => {
    if (pokemon.id === questionName.index) {
      pokeName[index] = newName.value
      createdTeam[index].pokemon_name = newName.value
    }
  })
  questionName.isOpen = false
}

const saveTeam = () => {
  const name: any = document.querySelector('.teamNameInput')
  if (createdTeam.length === 0) {
    alertModal.msg = 'To save a team it is necessary to add at least 1 pokemon.'
    alertModal.isOpen = !alertModal.isOpen
  } else if (name.value === '') {
    alertModal.msg = 'Give a name for your pokemon team'
    alertModal.isOpen = !alertModal.isOpen
  } else {
    store.commit('saveTeam', { id: store.state.teams.length+1, name: name.value, pokemons: createdTeam })
    window.location.replace("/");
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

const previousPage = (): void => {
  pageOffSet.innitialValue -= 20
  store.commit('clearPokemons', [])
  store.dispatch('getApi', `pokemon?limit=20&offset=${pageOffSet.innitialValue}`)
}
const nextPage = (): void => {
  pageOffSet.innitialValue += 20
  store.commit('clearPokemons', [])
  store.dispatch('getApi', `pokemon?limit=20&offset=${pageOffSet.innitialValue}`)
  console.log(AllInfosPokemon)
}
</script>

<template>
  <div id="createTeam">
    <!-- MODAL -->
    <ModalPokemon @closeModal="alertModal.isOpen = !alertModal.isOpen"  v-if="alertModal.isOpen">
      <h1 class="mt-5 alert-danger">
        {{ alertModal.msg }}
      </h1>
    </ModalPokemon>
    <ModalPokemon v-if="questionName.isOpen" @closeModal="questionName.isOpen = !questionName.isOpen">
      <h3 class="mt-4 msgNewName">What will be the new name of this pokemon?</h3>
      <input id="newName" class="mt-3" type="text">
      <button class="d-block m-auto btn btn-primary mt-4" @click="setNewName">Set new name</button>
    </ModalPokemon>
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
        <div class="row">
          <div>
            <span class="info-pokemon d-block"> Height: {{ AllInfosPokemon[pokeOpenDetails.index].height }}</span>
            <span class="info-pokemon d-block"> Weight: {{ AllInfosPokemon[pokeOpenDetails.index].weight }}</span>
          </div>
          <div class="row mt-5">
            <div class="types-pokemon col-6">
              <span class="info-pokemon d-block" v-for="(type, index) in AllInfosPokemon[pokeOpenDetails.index].types">{{ index+1 }}° Type: {{ type.type.name }}</span>
            </div>
            <div class="abilities-pokemon col-6">
              <span class="info-pokemon d-block" v-for="(ability, index) in AllInfosPokemon[pokeOpenDetails.index].abilities">{{ index+1 }}° Ability: {{ ability.ability.name }}</span>
            </div>
          </div>
        </div>
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
            <ul class="pagination">
              <li class="page-item"><a class="page-link" @click="previousPage">Previous</a></li>
              <li class="page-item"><a class="page-link" @click="nextPage">Next</a></li>
            </ul>
            <ul class="list-group item-list" v-for="(pokemon, index) in AllInfosPokemon">
              <li class="list-group-item" :id="`item-${pokemon.id}-pokemon`">
                <div class="item-pokemon">
                  <button class="btn-sm btn-info text-end" @click="toggleModalButton(pokemon.id)">
                    Details
                  </button>
                  <span class="m-3">
                  {{ pokemon.id }}
                  |
                  <img class="img-list" :src="pokemon.sprites.front_default"/>
                  {{ pokemon.name }}
                </span>
                  <button
                    class="btn m-2 btn-primary"
                    @click="selectPokemon({
                    id: pokemon.id,
                    default_name: pokemon.name,
                    type_pokemon: pokemon.types[0].type.name,
                    srcImg: pokemon.sprites.front_default
                    })"
                  >
                    Add
                  </button>
                </div>
              </li>
            </ul>
            <nav>
              <ul class="pagination">
                <li class="page-item"><a class="page-link" @click="previousPage" href="#">Previous</a></li>
                <li class="page-item"><a class="page-link" @click="nextPage" href="#">Next</a></li>
              </ul>
            </nav>
          </div>
          <div class="col-6">
            <div class="row">
              <card
                  v-for="(card, index) in createdTeam"
                  @editPokemon="setPokemonName(card.id)"
                  @delete="deletePokemon(card.id)"
                  :pokemonName="pokeName[index]"
                  :defaultName="card.default_name"
                  :typePokemon="card.type_pokemon"
                  :srcImg="card.srcImg"
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
  margin-top: 2px;
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
.item-pokemon {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.info-pokemon {
  border: 1px solid black;
  color: #0a53be;
  padding-top: 5px;
  text-align: center;
  font-size: 1.2em;
}
button {
  align-self: center;
}
.pagination {
  justify-content: end;
}
</style>
