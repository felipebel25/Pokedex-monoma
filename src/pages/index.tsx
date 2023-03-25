import { useContext, useEffect} from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import Head from "next/head";

import { DashboardView } from "@organisms"
import { pokeApi, getPokemons } from "@services";
import { AuthContext } from '@context';

interface Props {
  pokemons: any;
}

const DashboardPage = ({ pokemons }: Props) => {
  const { push } = useRouter();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      const cookie = Cookies.get('token')
      if (!cookie) {
        push('/auth/login')
      }
      const { data = { token: undefined } } = await pokeApi.get('/user/validate-token');
      if (!data.user.name) {
        push('/auth/login')
      }
    })();
  }, [])
  return (
    <>
      <Head>
        <title>Dashboard : Monoma</title>
      </Head>
      {user?.name ? <DashboardView data={pokemons} /> : ""}
    </>
  )
}
export default DashboardPage

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
// peticion para traer los primeros 10 pokemones
export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    // Hacer una solicitud a la API de Pokemon para obtener el listado de los primeros 10 pokemones
    const { pokemons, count } = await getPokemons()

    return { props: { pokemons: { pokemons, count } } };
  } catch (error) {
    console.error(error);
    // Devolver un mensaje de error si ocurre algún problema
    return { props: { error: 'Error interno del servidor' } };
  }

};