import { IPokemon } from "@/interfaces/pokemons"
import { useState } from "react";
import { Box, capitalize, Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material"
import { styles } from "./stylesCardPokemon"

interface Props {
    pokemon: IPokemon;
    onOpen: () => void;
}

export const CardPokemon = ({ pokemon, onOpen = () => { } }: Props) => {
    const [isErrorImage, setIsErrorImage] = useState(false)
    const image = isErrorImage ? '/images/pokeball.png' : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`
    return (
        <Card key={pokemon.name} sx={styles.card} onClick={() => onOpen()}>
            <CardActionArea sx={styles.cardActionArea}>
                <CardMedia
                    component='img'
                    sx={styles.cardImage}
                    onError={() => setIsErrorImage(true)}
                    src={image}
                />
                <Box sx={styles.weight}>
                    {/* <Button    variant="outlined" disabled </Button> */}
                    <Box sx={styles.weightTag}>
                        <Typography sx={styles.weightText}>{pokemon.weight} lbs</Typography>
                    </Box>
                </Box>
                <CardContent sx={styles.cardContainerText}>
                    <Typography sx={styles.name}>{capitalize(pokemon.name)}</Typography>
                    {pokemon.moves[0] &&
                        <Box sx={styles.abilities}>
                            {pokemon.moves?.map((moves) => (
                                <Typography key={moves?.move?.name} sx={styles.ability}>#{moves?.move?.name ?? ''}</Typography>
                            ))}
                        </Box>
                    }
                </CardContent>
            </CardActionArea>
        </Card>
    )
}
