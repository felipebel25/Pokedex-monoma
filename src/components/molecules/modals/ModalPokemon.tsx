import { useEffect, useState } from "react"
import Image from "next/image";
import { Box, Button, capitalize, Chip, CircularProgress, Modal, Typography } from "@mui/material"

import { IFullPokemon } from "@/interfaces/pokemonApi";
import { getPokemon } from "@services";

import { styles } from "./stylesModalPokemon"

interface Props {
    onClose: () => void;
    idPokemon: number;
}

export const ModalPokemon = ({ onClose, idPokemon }: Props) => {
    const [pokemon, setPokemon] = useState({} as IFullPokemon)
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)

    useEffect(() => {
        (async () => {
            setIsLoading(true)
            const { isError, data } = await getPokemon(idPokemon)
            setPokemon(data)
            setIsLoading(false)
            setIsError(isError)
        })();
    }, [])

    // -----------si hay un error-----------------
    if (isError) return (
        <Modal sx={styles.modal} open={true} onClose={onClose}>
            <Box sx={styles.modalContainer}>
                <Typography>An error ocurred, please try again later.</Typography>
                <Box>
                    <Button sx={styles.button} onClick={onClose} variant="outlined" color="primary">Cerrar</Button>
                </Box>
            </Box>
        </Modal>
    )
    return (
        <Modal sx={styles.modal} open={true} onClose={onClose}>
            <Box sx={styles.modalContainer}>
                {/* --------------loading-------------- */}
                {isLoading ?
                    <Box sx={styles.loading}>
                        <CircularProgress color="primary" />
                    </Box>
                    :
                    // --------------info pokemon----------------
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
                        <Typography variant="h2" component="h2">{capitalize(pokemon.name)}</Typography>
                        <Box sx={styles.types}>
                            {pokemon.types.map(({ type }) => (
                                <Chip key={type.name} sx={styles.typesButton} label={type.name} />
                            ))}
                        </Box>
                        <Box sx={styles.stats}>
                            <Typography>Peso: {pokemon.weight} lbs</Typography>
                            <Typography>Altura: {pokemon.height}</Typography>
                            {pokemon.stats.map((stat) => (
                                <Typography key={stat.stat.name}>{stat.stat.name} : {stat.base_stat}</Typography>
                            ))}
                        </Box>
                        <Box>
                            <Button sx={styles.button} onClick={onClose} variant="outlined" color="primary">Cerrar</Button>
                        </Box>
                    </Box>
                }
            </Box>
        </Modal>
    )
}
