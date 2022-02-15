import axios from "axios";

const api = axios.create({
    baseURL: 'https://pokeapi.co/api/v2/'
})

export default class ServicesPokemon {
    static getPokemon(id: number | string) {
        return api.get(`pokemon/${id}`)
    }
    static getListPokemon(payload: string) {
        return api.get(`pokemon?limit=20&offset=${payload}`)
    }
}
