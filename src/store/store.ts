import { createStore } from 'vuex'
import axios from "axios";

export default createStore({
    state: {
        teams: [],
        allPokemons: [],
        teamOpen: 1
    },
    mutations: {
        deletePokemon(state: any, payLoad: any) {
            state.teams[payLoad.teamId].pokemons.splice(payLoad.pokeId, 1)
        },
        deleteTeam(state: any, teamId: number) {
            state.teams.splice(teamId, 1)
        },
        editTeamName(state: any, payLoad: any) {
            console.log(payLoad)
            state.teams[payLoad.teamId].name = payLoad.newName
        },
        editNamePokemon(state: any, payLoad: any) {
            console.log(state.teams[payLoad.teamId].pokemons[payLoad.pokeId])
            state.teams[payLoad.teamId].pokemons[payLoad.pokeId].pokemon_name = payLoad.newName
            console.log(state.teams[payLoad.teamId].pokemons[payLoad.pokeId])
        },
        setPokemons(state, payload) {
            state.allPokemons.push(payload)
        },
        clearPokemons(state, payload) {
            state.allPokemons = payload
        },
        setTeamOpen(state, payload) {
            state.teamOpen = payload
        },
        saveTeam(state, payload) {
            state.teams.push(payload)
        }
    },
    actions: {
        getApi({commit}, payload) {
            const url = `https://pokeapi.co/api/v2/pokemon/${payload}`
            axios(url).then(response => {
                commit('setPokemons', response.data)
            })
        }
    },
    getters: {

    }
})
