<script setup lang="ts">
import Card from "../components/list/card.vue";
import ModalPokemon from "../components/modal/ModalPokemon.vue";
import { computed, reactive, ref, watch, onUnmounted, onMounted } from 'vue'
import { useStore } from "vuex";
import { router } from "../router";
import { useRoute } from "vue-router";

const store = useStore();
const routes = useRoute();

const pokemonList: any = reactive(
  computed(() => {
    return store.state.allPokemons;
  })
);

const teamName: any = ref(store.state.createdTeam.teamName);

watch(teamName, (newValue) => {
  store.state.createdTeam.teamName = newValue;
});

let questionName: any = reactive({ isOpen: false, newName: "", index: 0 });
let alertModal: any = reactive({ isOpen: false, msg: "" });
let offset: any = ref(0);

const detailsButton = (pokeId: number): void => {
  router.push(`/details/${pokeId}`);
};

const setPokemonName: any = (pokeId: number) => {
  questionName.isOpen = true;
  questionName.index = pokeId;
};
const setNewName: any = () => {
  const newName: any = document.querySelector("#newName");
  store.state.createdTeam.forEach((pokemon: any, index: any) => {
    if (pokemon.id === questionName.index) {
      store.commit("newNameCreated", { index, newName: newName.value });
    }
  });
  questionName.isOpen = false;
};

const saveTeam = () => {
  const name: any = store.state.createdTeam.teamName;
  if (store.state.createdTeam.length === 0) {
    alertModal.msg =
      "To save a team it is necessary to add at least 1 pokemon.";
    alertModal.isOpen = !alertModal.isOpen;
  } else if (name.value === "") {
    alertModal.msg = "Give a name for your pokemon team";
    alertModal.isOpen = !alertModal.isOpen;
  } else {
    store.commit("saveTeam", {
      id: store.state.teams.length + 1,
      name,
      pokemons: store.state.createdTeam,
    });
    window.location.replace("/");
    store.commit("unMountedCreated");
  }
};
const deletePokemon = (id: number) => {
    store.state.allPokemons.map((pokemonOfList: any) => {
      if (pokemonOfList.id === id) {
        const addButton: any = document.querySelector(`.add-button-${id}`);
        addButton.setAttribute("class", `btn btn-primary add-button-${id} m-2`);
      }
    })
    store.state.createdTeam.map((pokemonOfTeam: any, index: number) => {
      if (pokemonOfTeam.id === id) {
        store.commit("deletePokemonCreated", index);
      }
    })
};

const selectPokemon = (payload: { id: number; }) => {
  const addButton: any = document.querySelector(`.add-button-${payload.id}`);
  addButton.setAttribute("class", `btn disabled add-button-${payload.id}`);
  const isRepeated = store.state.createdTeam
    .map((pokemon: any) => {
      return pokemon.id === payload.id;
    })
    .includes(true);

  if (!isRepeated) {
    store.commit('addPokemonCreated', payload)
  }
};

const previousPage = (): void => {
  if (offset.value > 9) {
    offset.value -= 10;
    store.dispatch("getApi", { limit: 10, offset: offset.value });
  }
  setTimeout(() =>  {
    store.state.createdTeam.forEach((pokemon: { id: number; }) => {
      store.state.allPokemons.forEach((pokemonOfList: { id: number}) => {
        if (pokemonOfList.id === pokemon.id) {
          const addButton: any = document.querySelector(`.add-button-${pokemon.id}`);
          addButton.setAttribute("class", `btn disabled add-button-${pokemon.id}`);
        }
      })
    })
  }, 200)
};
const nextPage = (): void => {
  offset.value += 10;
  store.dispatch("getApi", { limit: 10, offset: offset.value });
  setTimeout(() =>  {
    store.state.createdTeam.forEach((pokemon: { id: number; }) => {
      store.state.allPokemons.forEach((pokemonOfList: { id: number}) => {
        if (pokemonOfList.id === pokemon.id) {
          const addButton: any = document.querySelector(`.add-button-${pokemon.id}`);
          addButton.setAttribute("class", `btn disabled add-button-${pokemon.id}`);
        }
      })
    })
  }, 200)
};
onMounted(() => {
  setTimeout(() =>  {
    store.state.createdTeam.forEach((pokemon: { id: number; }) => {
      store.state.allPokemons.forEach((pokemonOfList: { id: number}) => {
        if (pokemonOfList.id === pokemon.id) {
          const addButton: any = document.querySelector(`.add-button-${pokemon.id}`);
          addButton.setAttribute("class", `btn disabled add-button-${pokemon.id}`);
        }
      })
    })
  }, 200)
})
onUnmounted(() => {
  if (!routes.path.includes("details")) {
    store.commit("unMountedCreated");
  }
});
</script>

<template>
  <div id="createTeam">
    <!-- MODAL -->
    <ModalPokemon
      @closeModal="alertModal.isOpen = !alertModal.isOpen"
      v-if="alertModal.isOpen"
    >
      <h1 class="mt-5 alert-danger">
        {{ alertModal.msg }}
      </h1>
    </ModalPokemon>
    <ModalPokemon
      v-if="questionName.isOpen"
      @closeModal="questionName.isOpen = !questionName.isOpen"
    >
      <h3 class="mt-4 msgNewName">
        What will be the new name of this pokemon?
      </h3>
      <input id="newName" class="mt-3" type="text" />
      <button class="d-block m-auto btn btn-primary mt-4" @click="setNewName">
        Set new name
      </button>
    </ModalPokemon>
    <!-- CREATE TEAM -->
    <div class="row mx-md-n5">
      <div class="col-12 text-center">
        <h4 class="mt-4">What will be the name of your pokemon team?</h4>
        <input
          v-model="teamName"
          type="text"
          class="mt-2"
          placeholder="Name Team"
        />
      </div>
    </div>
    <hr />
    <div class="mt-4">
      <div class="row">
        <div class="col-8">
          <h5 class="text-center">
            Choose the pokemons you want on your team when you're done. Click
            save team.
          </h5>
        </div>
        <div class="col-4">
          <button class="btn btn-primary mb-4" @click="saveTeam()">
            Save Team
          </button>
        </div>
      </div>
      <div class="row">
        <div class="col-4">
          <ul class="pagination">
            <li class="page-item">
              <a class="page-link" @click="previousPage">Previous</a>
            </li>
            <li class="page-item">
              <a class="page-link" @click="nextPage">Next</a>
            </li>
          </ul>
          <ul class="list-group item-list" v-for="pokemon in pokemonList">
            <li class="list-group-item">
              <div class="item-pokemon">
                <button
                  class="btn btn-sm btn-outline-secondary"
                  @click="detailsButton(pokemon.id)"
                >
                  Details
                </button>
                <span class="m-3">
                  <img
                    class="img-list"
                    :src="pokemon.front_default"
                    alt="img-pokemon"
                  />
                  {{ pokemon.name }}
                </span>
                <button
                  class="btn m-2 btn-primary"
                  :class="(`add-button-${pokemon.id}`)"
                  @click="
                    selectPokemon({
                      id: pokemon.id,
                      default_name: pokemon.name,
                      type_pokemon: pokemon.types[0].type.name,
                      srcImg: pokemon.front_default,
                    })
                  "
                >
                  Add
                </button>
              </div>
            </li>
          </ul>
          <nav>
            <ul class="pagination">
              <li class="page-item">
                <a class="page-link" @click="previousPage">Previous</a>
              </li>
              <li class="page-item">
                <a class="page-link" @click="nextPage">Next</a>
              </li>
            </ul>
          </nav>
        </div>
        <div class="col-8">
          <h2 class="text-center text-decoration-underline">Your new team:</h2>
          <div class="row">
            <card
              class="col-3"
              v-for="(card, index) in store.state.createdTeam"
              @editPokemon="setPokemonName(card.id)"
              @delete="deletePokemon(card.id)"
              :pokemonName="store.state.createdTeam[index].pokemon_name"
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
  width: 380px;
  margin: 1px auto;
}
.img-list {
  height: 60px;
  width: 60px;
}
.item-pokemon {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
button {
  align-self: center;
}
.pagination {
  justify-content: center;
  cursor: pointer;
}
</style>
