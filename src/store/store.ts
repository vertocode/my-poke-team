import { createStore } from 'vuex'
import axios from "axios";

export default createStore({
    state: {
        teams: [],
        allPokemons: [],
        teamOpen: 1
    },
    mutations: {
        deletePokemon(state: any, payLoad: any): void {
            state.teams[payLoad.teamId].pokemons.splice(payLoad.pokeId, 1)
        },
        deleteTeam(state: any, teamId: number): void {
            state.teams.splice(teamId, 1)
        },
        editTeamName(state: any, payLoad: any): void {
            console.log(payLoad)
            state.teams[payLoad.teamId].name = payLoad.newName
        },
        editNamePokemon(state: any, payLoad: any): void {
            console.log(state.teams[payLoad.teamId].pokemons[payLoad.pokeId])
            state.teams[payLoad.teamId].pokemons[payLoad.pokeId].pokemon_name = payLoad.newName
            console.log(state.teams[payLoad.teamId].pokemons[payLoad.pokeId])
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
                }
            })
        }
    },
})
