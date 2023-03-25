import axios from 'axios'

const pokeApi = axios.create({
    baseURL: `http://localhost:${process.env.NEXT_PUBLIC_PORT}/api`
})

export default pokeApi