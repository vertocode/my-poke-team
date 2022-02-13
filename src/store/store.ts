import { createStore } from 'vuex'
import axios from "axios";
import VuexPersistence from 'vuex-persist'

export default createStore({
    state: {
        teams: [],
        allPokemons: [],
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
            const url = `https://pokeapi.co/api/v2/${payload}`
            axios(url).then(response => {
                for (let n: number = 0; n < response.data.results.length; n++) {
                    const urlPokemon = response.data.results[n].url
                    axios(urlPokemon).then((allInfoPokemon: any) => {
                        commit('setPokemons', allInfoPokemon.data)
                    })
                    if (n === response.data.results.length) {
                        commit('loading', true)
                    }
                }
            })

        }
    },
    plugins: [
        new VuexPersistence({
            storage: window.localStorage
        }).plugin
    ]
})
