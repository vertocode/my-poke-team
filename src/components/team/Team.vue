<script setup lang="ts">
import card from '../list/card.vue'
import ModalPokemon from '../modal/ModalPokemon.vue'
import leftArrow from '../../assets/images/arrow-left.svg'
import { useStore } from "vuex";
import {computed, reactive, ref} from "vue";

const store = useStore();

defineProps<{
  teamId: any
}>()

let pokeOpenDetails: any = reactive({index: 0})
let pokeAlert: any = reactive({isAlert: false})
let questionName: any = reactive({isOpen: false, msg: '', index: 0})
let listTeamModal: any = reactive({isOpen: false})
let pageOffSet: any = reactive({innitialValue: 0})
let detailsModal: any = reactive({isOpen: false})

const detailsButton = (pokeId: number) => {
  detailsModal.isOpen = !detailsModal.isOpen
  pokeOpenDetails.index = pokeId
}

const AllInfosPokemon: any = computed(() => {
  return store.state.allPokemons
})

const openEditTeamName = (payload: any) => {
  questionName.isOpen = true
  questionName.msg = payload.msg
  questionName.index = payload.index
}

const setNewName = (teamId: number, pokeId: number) => {
  const newName: any = document.querySelector('#newName')
  const msg: any = document.querySelector('.msgNewName')
  const isTeam: any = msg.innerText.indexOf('team')
  if (isTeam === -1) {
    store.commit('editNamePokemon', { teamId, pokeId, newName: newName.value })
  } else {
    store.commit('editTeamName', { teamId, newName: newName.value })
  }
  questionName.isOpen = false
}


const deletePokemons = (teamId: object, pokeId: number) => {
  store.commit('deletePokemon', { teamId, pokeId })
}

const addPokemon = (payload: any) => {
  for (let n: number = 0; n < store.state.teams[payload.teamId].pokemons.length; n++) {
    if(store.state.teams[payload.teamId].pokemons[n].id == payload.pokemon.id) {
      pokeAlert.isAlert = true
      setTimeout(() => {
        pokeAlert.isAlert = false
      }, 5000)
      return
    }
  }
    store.commit('addPokemon', payload)
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
  <!-- ALERT -->
  <div class="alert alert-danger overlay-alert" v-if="pokeAlert.isAlert">
    <h5><strong>This pokemon is already in your team, select another pokemon!</strong></h5>
  </div>
  <!-- MODAL -->
  <ModalPokemon v-if="questionName.isOpen" @closeModal="questionName.isOpen = !questionName.isOpen">
    <h3 class="mt-4 msgNewName">{{ questionName.msg }}</h3>
    <input id="newName" class="mt-3" type="text">
    <button class="d-block m-auto btn btn-primary mt-4" @click="setNewName(teamId, questionName.index)">Set new name</button>
  </ModalPokemon>
  <ModalPokemon v-if="detailsModal.isOpen" @closeModal="detailsModal.isOpen = !detailsModal.isOpen">
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
  <ModalPokemon v-if="listTeamModal.isOpen" @closeModal="listTeamModal.isOpen = !listTeamModal.isOpen">
    <h1>Pokemon List</h1>
    <ul class="pagination">
      <li class="page-item"><a class="page-link" @click="previousPage">Previous</a></li>
      <li class="page-item"><a class="page-link" @click="nextPage">Next</a></li>
    </ul>
    <div>
      <ul class="list-group item-list" v-for="(pokemon) in AllInfosPokemon">
        <li class="list-group-item" :id="`item-${pokemon.id}-pokemon`">
          <div class="item-pokemon">
            <span class="m-3">
                  {{ pokemon.id }}
                  |
                  <img class="img-list" :src="pokemon.sprites.front_default"/>
                  {{ pokemon.name }}
                </span>
            <button
                class="btn m-2 btn-primary"
                @click="addPokemon({
                    teamId,
                    pokemon: {
                    id: pokemon.id,
                    default_name: pokemon.name,
                    type_pokemon: pokemon.types[0].type.name,
                    srcImg: pokemon.sprites.front_default
                    }})"
            >
              Add
            </button>
          </div>
        </li>
      </ul>
      <ul class="pagination">
        <li class="page-item"><a class="page-link" @click="previousPage">Previous</a></li>
        <li class="page-item"><a class="page-link" @click="nextPage">Next</a></li>
      </ul>
    </div>
  </ModalPokemon>
  <div class="p-4 row">
    <div class="col-3">
      <img @click="$emit('back')" class="arrow-left" :src="leftArrow" alt="<- Back">
    </div>
    <div class="col-6">
      <h2 class="text-center title">
        {{ store.state.teams[teamId].name }}
        <button
            class="btn btn-sm btn-outline-secondary"
            @click="openEditTeamName({msg: 'What will be the new name of this team?', teamId})"
        >
          Edit PokeTeam Name
        </button>
      </h2>
    </div>
    <div class="col-3 text-center">
      <button class="btn-lg btn-primary" @click="listTeamModal.isOpen = !listTeamModal.isOpen">Add Pokemon</button>
    </div>
  </div>
  <div class="list-group">
    <div class="row">
      <div class="col-4" v-if="store.state.teams[store.state.teamOpen].pokemons.length > 0" v-for="(pokemon, index) in store.state.teams[store.state.teamOpen].pokemons">
        <card
            :pokemonIndex="index"
            :defaultName="pokemon.default_name"
            :typePokemon="pokemon.type_pokemon"
            :pokemonName="pokemon.pokemon_name"
            :srcImg="pokemon.srcImg"
            :teamScreen="true"
            @details="detailsButton(pokemon.id-1)"
            @delete="deletePokemons(teamId, index)"
            @editPokemon="openEditTeamName({msg:'What will be the new name of this pokemon?',teamId, index})"
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
.overlay-alert {
  z-index: 2;
  position: fixed !important;
  display: flex;
  justify-content: center;
  align-content: center;
  top: 0;
  right: 0;
  left: 0;
}
</style>
