import { createStore } from "vuex";
import VuexPersistence from "vuex-persist";
import ServicesPokemon from "../services/api";
import { Pokemon } from "../Interface";

export default createStore({
  state: {
    teams: [],
    allPokemons: [],
    pokeDetails: [] as Pokemon[],
    createdTeam: [],
    teamOpen: 0,
    loading: false,
  },
  mutations: {
    deletePokemon(state: any, payLoad: any): void {
      state.teams[payLoad.teamId].pokemons.splice(payLoad.pokeId, 1);
    },
    deleteTeam(state: any, teamId: number): void {
      state.teams.splice(teamId, 1);
    },
    deletePokemonCreated(state: any, payload: any): void {
      state.createdTeam.splice(payload, 1);
    },
    newNameCreated(state: any, payload: any): void {
      state.createdTeam[payload.index].pokemon_name = payload.newName;
    },
    unMountedCreated(state: any): void {
      state.createdTeam = [];
    },
    addPokemon(state: any, payload: any): void {
      state.teams[payload.teamId].pokemons.push(payload.pokemon);
    },
    editTeamName(state: any, payLoad: any): void {
      state.teams[payLoad.teamId].name = payLoad.newName;
    },
    editNamePokemon(state: any, payLoad: any): void {
      state.teams[payLoad.teamId].pokemons[payLoad.pokeId].pokemon_name =
        payLoad.newName;
    },
    setPokemons(state: any, payload: any): void {
      state.allPokemons.push(payload);
    },
    setPokemonDetails(state: any, payload: any): void {
      state.pokeDetails = payload;
    },
    clearPokemons(state: any, payload: any): void {
      state.allPokemons = payload;
    },
    setTeamOpen(state: any, payload: any): void {
      state.teamOpen = payload;
    },
    saveTeam(state: any, payload: any): void {
      state.teams.push(payload);
    },
    loading(state: any, payload: any): void {
      state.loading = payload;
    },
  },
  actions: {
    getApi({ commit }: any, payload: any): void {
      commit("clearPokemons", []);
      ServicesPokemon.getListPokemon(payload).then((response: any) => {
        response.data.results.forEach((pokemon: any) => {
          ServicesPokemon.getPokemon(pokemon.name).then((response: any) => {
            const { name, id, types } = response.data;
            const { front_default } =
              response.data.sprites.other["official-artwork"];
            commit("setPokemons", { name, id, types, front_default });
          });
        });
      });
    },
    getPokemon({ commit }: any, payload: any): void {
      ServicesPokemon.getPokemon(payload).then((response: any) => {
        const { id, name, height, weight, types, stats, abilities } =
          response.data;
        const { front_default } =
          response.data.sprites.other["official-artwork"];
        const { back_default } =
          response.data.sprites.versions["generation-v"]["black-white"]
            .animated;
        commit("setPokemonDetails", {
          id,
          name,
          height,
          weight,
          types,
          stats,
          abilities,
          front_default,
          back_default,
        });
      });
    },
  },
  plugins: [
    new VuexPersistence({
      storage: window.localStorage,
    }).plugin,
  ],
});
