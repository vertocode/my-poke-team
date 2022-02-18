import axios from "axios";

const api = axios.create({
  baseURL: "https://pokeapi.co/api/v2/",
});

export default class ServicesPokemon {
  static async getPokemon(id: number | string) {
    return await api.get(`pokemon/${id}`);
  }
  static async getListPokemon(payload: any) {
    return await api.get(
      `pokemon?limit=${payload.limit}&offset=${payload.offset}`
    );
  }
}
