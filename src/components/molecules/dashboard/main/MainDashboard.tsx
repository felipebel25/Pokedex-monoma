import { CardPokemon } from "@/components/atoms/cardPokemon/CardPokemon";
import { IPokemon } from "@/interfaces/pokemons";
import { getPokemons } from "@/services/pokemons";
import { Box, CircularProgress, Pagination } from "@mui/material"
import { useEffect, useState } from "react";
import { ModalPokemon } from "../../modals/ModalPokemon";
import { styles } from "./stylesMainDashboard"

interface Props {
  data: { count: number, pokemons: IPokemon[] },
}
const initValueModal = {
  isOpen: false,
  id: 0
}

export const MainDashboard = ({ data = { count: 0, pokemons: [] } }: Props) => {
  const [pokemones, setPokemones] = useState<IPokemon[]>(data.pokemons as IPokemon[])
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [modalData, setModalData] = useState(initValueModal)


  const totalPages = Math.floor(data.count / 10)

  useEffect(() => {
    if (page === 1 && pokemones[0]?.id === 1) return;
    (async () => {
      setIsLoading(true)
      const { pokemons } = await getPokemons((page - 1) * 10)
      console.log('asd');


      setPokemones(pokemons)
      setIsLoading(false)
    })();
  }, [page])

  const onChangePage = (event: React.ChangeEvent<unknown>, value: number) => setPage(value);

  return (
    <>
      <Box sx={styles.main}>
        {isLoading ?
          <Box sx={styles.main}>
            <CircularProgress color="primary" />
          </Box>
          :
          <Box sx={styles.containerPokemons}>
            {pokemones.map((pokemon: IPokemon) => (
              <CardPokemon key={pokemon.id} onOpen={() => setModalData({ isOpen: true, id: pokemon.id })} pokemon={pokemon} />
            ))}
          </Box>
        }
        {data.count !== 0 &&
          <Box sx={styles.containerPagination}>
            <Pagination
              count={totalPages}
              defaultPage={1}
              page={page}
              onChange={onChangePage}
              siblingCount={1}
            />
          </Box>
        }
      </Box>
      {modalData.isOpen &&
        <ModalPokemon idPokemon={modalData.id} onClose={() => setModalData(initValueModal)} />
      }

    </>
  )
}
