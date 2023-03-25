import { useEffect, useState } from "react";
import { Box, CircularProgress, Pagination } from "@mui/material"

import { CardPokemon } from "@atoms";
import { getPokemons } from "@services";
import { ModalPokemon } from "@molecules";

import { IPokemon } from "@/interfaces/pokemons";
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
    // si es la pagina uno y son los datos entregados por el SSR no hagas fetch, si cambias de page entonces si haz una peticion
    if (page === 1 && pokemones[0]?.id === 1) return;
    (async () => {
      setIsLoading(true)
      const { pokemons } = await getPokemons((page - 1) * 10)
      setPokemones(pokemons)
      setIsLoading(false)
    })();
  }, [page])

  const onChangePage = (event: React.ChangeEvent<unknown>, value: number) => setPage(value);

  return (
    <>
      <Box sx={styles.main}>
        {/* --------------loading------------------- */}
        {isLoading ?
          <Box sx={styles.main}><CircularProgress color="primary" /></Box>
          :
          // ---------------------listado de pokemones---------------
          <Box sx={styles.containerPokemons}>
            {pokemones.map((pokemon: IPokemon) => (
              <CardPokemon key={pokemon.id} onOpen={() => setModalData({ isOpen: true, id: pokemon.id })} pokemon={pokemon} />
            ))}
          </Box>
        }
        {/* --------------paginacion-------------- */}
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
      {/* ---------------------Modal Info Pokemon-------------- */}
      {modalData.isOpen && <ModalPokemon idPokemon={modalData.id} onClose={() => setModalData(initValueModal)} />}
    </>
  )
}
