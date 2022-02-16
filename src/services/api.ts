import axios from "axios";

const api = axios.create({
    baseURL: 'https://pokeapi.co/api/v2/'
})

export default class ServicesPokemon {
    static async getPokemon(id: number | string) {
        return await api.get(`pokemon/${id}`)
    }
    static async getListPokemon(payload: string) {
         return await api.get(`pokemon?limit=10&offset=${payload}`)
    }
}
