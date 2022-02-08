import { createStore } from 'vuex'
import axios from "axios";

export default createStore({
    state: {
        teams: [
            {
                id: 1,
                name: 'Pegasus Team (Default)',
                pokemons: [
                    {
                        id: 0,
                        pokemon_name: 'spark1',
                        default_name: 'pikachu',
                        type_pokemon: 'trovão',
                        srcImg: ''
                    },
                    {
                        id: 1,
                        pokemon_name: 'spark2',
                        default_name: 'pikachu',
                        type_pokemon: 'trovão',
                        srcImg: ''
                    },
                    {
                        id: 2,
                        pokemon_name: 'spark3',
                        default_name: 'pikachu',
                        type_pokemon: 'trovão',
                        srcImg: ''
                    },
                    {
                        id: 3,
                        pokemon_name: 'spark4',
                        default_name: 'pikachu',
                        type_pokemon: 'trovão',
                        srcImg: ''
                    },
                    {
                        id: 4,
                        pokemon_name: 'spark5',
                        default_name: 'pikachu',
                        type_pokemon: 'trovão',
                        srcImg: ''
                    },
                    {
                        id: 5,
                        pokemon_name: 'spark6',
                        default_name: 'pikachu',
                        type_pokemon: 'trovão',
                        srcImg: ''
                    }
                ]
            },
            {
                id: 2,
                name: '22222sus Team (Default)',
                pokemons: [
                    {
                        id: 0,
                        pokemon_name: 'disney1',
                        default_name: 'pikachu',
                        type_pokemon: 'trovão',
                        srcImg: ''
                    },
                    {
                        id: 1,
                        pokemon_name: 'disney2',
                        default_name: 'pikachu',
                        type_pokemon: 'trovão',
                        srcImg: ''
                    },
                ],
            }
        ],
        allPokemons: [],
        createTeam: []
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
        },
        setPokemons(state, payload) {
            state.allPokemons.push(payload)
        },
        clearPokemons(state, payload) {
            state.allPokemons = payload
        },
        setNewTeam(state, payload) {
            state.createTeam[payload.id] = payload
        }
    },
    actions: {
        deleteNewTeam({state}, payload) {
            console.log(payload)
            state.createTeam.splice(payload.id+1, 1)
        },
        saveTeam({state}, payload) {
            state.teams.push({
                id: payload.id,
                name: payload.name,
                pokemons: [state.createTeam]
            })
            console.log(state.teams)
        },
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
