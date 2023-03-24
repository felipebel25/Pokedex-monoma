import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    switch (req.method) {
        case "GET":
            return getPokemons(req,res)
        default:
            res.status(400).json({
                message: "Not methods or bad request"
            })
            break;
    }

}
const getPokemons = async (req: NextApiRequest, res: NextApiResponse<any>) => {

    try {
        // Hacer una solicitud a la API de Pokemon para obtener el listado de los primeros 10 pokemones
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon/?limit=10');
        const { results } = response.data;

        // Obtener la información detallada de cada pokemon
        const pokemonPromises = results.map(async (pokemon: any) => {
            const { data } = await axios.get(pokemon.url);
            const { id, name,  abilities, sprites, weight } = data;
            return { id, name, abilities, ...sprites.dream_world, weight };
        });
        const pokemonData = await Promise.all(pokemonPromises);


        // Devolver la información detallada de los pokemones
        return res.status(200).json(pokemonData);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }

}


