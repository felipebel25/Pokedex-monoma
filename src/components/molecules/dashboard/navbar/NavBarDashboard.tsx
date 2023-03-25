import { useContext, useState } from "react"
import { useRouter } from "next/router"
import Image from "next/image"
import { AuthContext } from "@context"

import { AccountCircleOutlined, LoginOutlined, PersonOutline } from "@mui/icons-material"
import { Box, Drawer, IconButton, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material"

import { styles } from "./stylesNavbarDashboard"

export const NavBarDashboard = () => {
    const { push, replace } = useRouter()
    const { logout } = useContext(AuthContext)
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const navigateTo = (url: string) => {
        push(url)
        setIsMenuOpen(false)
    }
    // function to logout action
    const onLogout = () => {
        logout()
        replace('/auth/login')
    }

    return (
        <>
            <Box component='header' sx={styles.header}>
                <Box sx={styles.logo}>
                    <Box sx={styles.logoImg} onClick={() => push('/')} >
                        <Image
                            alt="bussines card, smart cards, qr code, NFC technology"
                            quality={100}
                            style={{ width: "20%", height: "20%" }}
                            src='/images/pokeball.png'
                            width={40}
                            height={40}
                            layout="responsive"
                        />
                    </Box>
                    <Typography component='h1' style={{ marginLeft: "1rem" }}>Pokedex</Typography>
                </Box>
                {/* -------------------Menu Profile------------------- */}
                <IconButton id="profile" onClick={() => setIsMenuOpen(true)}>
                    <PersonOutline color="primary" sx={{ width: "2.5rem", height: "2.5rem" }} />
                </IconButton>
            </Box>
            {/* -------------------Sidebar o drawer o menu burguer-------------- */}
            <Drawer
                open={isMenuOpen}
                onClose={() => setIsMenuOpen(false)}
                anchor='right'
                sx={{ backdropFilter: 'blur(4px)', transition: 'all 0.5s ease-out' }}
            >
                <Box sx={{ width: 250, paddingTop: 5 }}>
                    {/* ---------------Login-------------- */}
                    <ListItem>
                        <ListItemIcon>
                            <AccountCircleOutlined />
                        </ListItemIcon>
                        <ListItemText onClick={() => navigateTo('/profile')} primary={'Profile'} />
                    </ListItem>
                    {/* ---------------Logout-------------- */}
                    <ListItem id='logout'>
                        <ListItemIcon>
                            <LoginOutlined />
                        </ListItemIcon>
                        <ListItemText onClick={onLogout} primary={'Salir'} />
                    </ListItem>
                </Box>
            </Drawer>
        </>
    )
}
