import { IFullPokemon } from "@/interfaces/fullPokemon";
import { getPokemon } from "@/services/pokemons";
import { Box, Button, capitalize, Chip, CircularProgress, Modal, Typography } from "@mui/material"
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { styles } from "./stylesModalPokemon"

interface Props {
    onClose: () => void;
    idPokemon: number;
}

export const ModalPokemon = ({ onClose, idPokemon }: Props) => {
    const [pokemon, setPokemon] = useState({} as IFullPokemon)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        (async () => {
            setIsLoading(true)
            const { isError, data } = await getPokemon(idPokemon)
            setPokemon(data)
            setIsLoading(false)
        })();
    }, [])


    return (
        <Modal open={true} onClose={onClose}>
            <Box sx={styles.modalContainer}>
                {isLoading ?
                    <Box sx={styles.loading}>
                        <CircularProgress color="primary" />
                    </Box>
                    :
                    <Box sx={styles.pokemon}>
                        <Box sx={styles.imgSection}>
                            <Image
                                width={40}
                                height={40}
                                alt="bussines card, smart cards, qr code, NFC technology"
                                quality={100}
                                style={{ width: "20%", height: "20%" }}
                                layout="responsive"
                                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
                            />
                        </Box>
                        <Typography variant="h2" component="h2">
                            {capitalize(pokemon.name)}
                        </Typography>
                        <Box sx={styles.types}>
                            {pokemon.types.map(({ type }) => (
                                <Chip key={type.name} sx={styles.typesButton} label={type.name} />
                            ))}
                        </Box>
                        <Box>
                            <Typography>Peso: {pokemon.weight} lbs</Typography>
                            <Typography>Altura: {pokemon.height}</Typography>

                            {pokemon.stats.map((stat) => (
                                <Typography key={stat.stat.name}>{stat.stat.name} : {stat.base_stat}</Typography>
                            ))}
                        </Box>
                        <Box>
                            <Button onClick={onClose} variant="outlined" color="primary">Cerrar</Button>
                        </Box>
                    </Box>
                }
            </Box>
        </Modal>
    )
}
