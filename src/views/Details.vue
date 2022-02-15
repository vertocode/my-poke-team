<script setup lang="ts">
import leftArrow from '../assets/images/arrow-left.svg'
import { useStore } from "vuex";
import { computed, onMounted, reactive } from "vue";
import { router } from "../router";
import { useRoute } from "vue-router";

const store = useStore()
const routes = useRoute()

const infoPokemon: any = reactive(computed(() => {
  return store.state.pokeDetails
}))

const pokemon: any = reactive({
  info: infoPokemon
})

const backButton = () => {
  router.back()
}

onMounted(async () => {
  const id = routes.params.id as string
  store.dispatch('getPokemon', id)
})
</script>

<template>
  <div class="pt-4">
    <img @click="backButton" class="arrow-left" :src="leftArrow" alt="<- Back">
  </div>
  <div class="card">
    <div class="image-pokemon">
      <img
          :src="pokemon.info[0].sprites.other['official-artwork'].front_default"
          alt="image"
      >
    </div>

    <div>
      <h1 class="card-title text-center">{{ pokemon.info[0].name }}</h1>
      <div class="row">
        <div class="col-6">
          <h3>Feature:</h3>
          <span class="info-pokemon d-block"> Height: {{ pokemon.info[0].height }}</span>
          <span class="info-pokemon d-block"> Weight: {{ pokemon.info[0].weight }}</span>
        </div>
        <div class="types-pokemon col-6">
          <h3>Types:</h3>
          <span class="info-pokemon d-block" v-for="(type, index) in pokemon.info[0].types">{{ index+1 }}° Type: {{ type.type.name }}</span>
        </div>
        <div class="col-6 mt-2">
          <h3>Stats:</h3>
          <span class="info-pokemon d-block" v-for="stats in pokemon.info[0].stats"> {{ stats.stat.name }}: {{ stats.base_stat }}</span>
        </div>
        <div class="abilities-pokemon col-6 mt-4">
          <h3>Abilities:</h3>
          <span class="info-pokemon d-block" v-for="(ability, index) in pokemon.info[0].abilities">{{ index+1 }}° Ability: {{ ability.ability.name }}</span>
          <img
              style="width: 50px; height: 50px"
              class="img-modal mt-4"
              :src="pokemon.info[0].sprites.versions['generation-v']['black-white'].animated.back_default"
              alt="Card image cap"
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  width: max-content;
  margin: 50px auto;
  padding: 50px 150px;
}
img{
  width: 200px;
}
.image-pokemon {
  background: url("https://st2.depositphotos.com/1906711/11944/v/450/depositphotos_119441904-stock-illustration-pokeball-hanging-in-the-air.jpg") center;
  margin: auto;
  border-radius: 100px;
}
.arrow-left {
  height: 50px;
  margin-left: 50px;
  cursor: pointer;
}
h3 {
  text-align: center;
  text-decoration: underline;
}
</style>
