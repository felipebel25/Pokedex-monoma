import { PersonOutline } from "@mui/icons-material"
import { Box, IconButton, Typography } from "@mui/material"
import Image from "next/image"
import { styles } from "./stylesNavbarDashboard"

export const NavBarDashboard = () => {
    return (
        <Box component='header' sx={styles.header}>
            <Box sx={styles.logo}>
                <Box sx={styles.logoImg}>
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
                <Typography style={{ marginLeft: "1rem" }}>Pokedex</Typography>
            </Box>
            <IconButton>
                <PersonOutline color="primary" sx={{ width: "2.5rem", height: "2.5rem" }} />
            </IconButton>
        </Box>

    )
}
