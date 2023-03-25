import { IpokemonApi } from "@/interfaces/pokemonApi";
import axios from "axios";

export const getPokemons = async (offset = 0) => {
    const response: any = await axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=10`);
    const { results, count } = response.data;

    //Obtener la información necesaria de cada pokemon
    const pokemonPromises = results.map(async (pokemon: any) => {
        const { data } = await axios.get(pokemon.url);
        const { id, name, moves, weight } = data;

        return { id, name, moves: [moves[0], moves[1]], weight };
    });
    const pokemons = await Promise.all(pokemonPromises);

    // Devolver los datos de los pokemones para que estén disponibles en la página
    return { count: count, pokemons: pokemons };
}

export const getPokemon = async (id = 0) => {
    let isError = false;
    const response: IpokemonApi = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);

    const { data } = response;
    if (response.status !== 200) {
        isError = true
    }
    return { isError, data }
}