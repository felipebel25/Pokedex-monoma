import { useContext, useEffect } from "react"
import { Box, Typography } from "@mui/material"
import { useRouter } from "next/router"
import Cookies from "js-cookie"

import { AuthContext } from "@context"
import { pokeApi } from "@services"
import { AppLayout } from "@atoms"

const styles = {
    mainProfile: {
        padding: "5%"
    },
    title: {
        fontSize: "2.5rem",
    },
    text: {
        margin: "2% 0"
    }

}
const ProfilePage = () => {
    const { user } = useContext(AuthContext)
    const { push } = useRouter();

    useEffect(() => {
        (async () => {
            const cookie = Cookies.get('token')
            if (!cookie) push('/auth/login')
            const { data } = await pokeApi.get('/user/validate-token');
            if (!data.user.name) push('/auth/login')
        })();
    }, [])

    return (
        <AppLayout title="Profile : Monoma" pageDescription="profile Monoma pokedex">
            {user?.name ?
                <Box sx={styles.mainProfile}>
                    <Typography sx={styles.title} variant='h2' component='h2'>Tu Información</Typography>
                    <Typography sx={styles.text}>
                        <strong> Name:  </strong>{user?.name ?? ''}
                    </Typography>
                    <Typography sx={styles.text}>
                        <strong>Email:  </strong>{user?.email ?? ''}
                    </Typography>
                    <Typography>Prueba tecnica hecha con  ❤ por Felipe Medina</Typography>
                </Box>
                : ''
            }
        </AppLayout>
    )
}
export default ProfilePage
