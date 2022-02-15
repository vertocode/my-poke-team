import { createStore } from 'vuex'
import VuexPersistence from 'vuex-persist'
import ServicesPokemon from "../services/api";
import { Pokemon } from "../Interface";

export default createStore({
    state: {
        teams: [],
        allPokemons: [],
        pokeDetails: [] as Pokemon[],
        teamOpen: 1,
        loading: false
    },
    mutations: {
        deletePokemon(state: any, payLoad: any): void {
            state.teams[payLoad.teamId].pokemons.splice(payLoad.pokeId, 1)
        },
        deleteTeam(state: any, teamId: number): void {
            state.teams.splice(teamId, 1)
        },
        addPokemon(state, payload): void {
            state.teams[payload.teamId].pokemons.push(payload.pokemon)
        },
        editTeamName(state: any, payLoad: any): void {
            state.teams[payLoad.teamId].name = payLoad.newName
        },
        editNamePokemon(state: any, payLoad: any): void {
            state.teams[payLoad.teamId].pokemons[payLoad.pokeId].pokemon_name = payLoad.newName
        },
        setPokemons(state, payload): void {
            state.allPokemons.push(payload)
        },
        setOpenTeam(state, payload): void {
            state.teamOpen = payload
        },
        setPokemonDetails(state, payload): void {
            state.pokeDetails = []
            state.pokeDetails.push(payload)
        },
        clearPokemons(state, payload): void {
            state.allPokemons = payload
        },
        setTeamOpen(state, payload): void {
            state.teamOpen = payload
        },
        saveTeam(state, payload): void {
            state.teams.push(payload)
        },
        loading(state, payload): void {
            state.loading = payload
        }
    },
    actions: {
        getApi({commit}, payload): void {
            commit('clearPokemons', [])
            ServicesPokemon.getListPokemon(payload).then(response => {
                response.data.results.forEach((pokemon: any) => {
                    ServicesPokemon.getPokemon(pokemon.name).then(response => {
                        commit('setPokemons', response.data)
                    })
                })
            })
        },
        getPokemon({commit}, payload): void {
            ServicesPokemon.getPokemon(payload).then(response => {
                commit('setPokemonDetails', response.data)
            })
        }
    },
    plugins: [
        new VuexPersistence({
            storage: window.localStorage
        }).plugin
    ]
})
