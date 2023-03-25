export const styles = {
    card: {
        boxShadow: '0px -1px 10px 0px #0e4b8e70',
        margin: { xs: "2% auto", md: "2%" },
        width: { xs: "90%", md: "21%" },
        height: { xs: "50%", md: "30%" },
        background: "#40456c1f",
        minHeight: "270px",
        cursor: "pointer"
    },
    cardImage: {
        width: { xs: '80%', md: "100%" },
        height: { xs: "66%", md: "65%" },
        margin: '0 auto',
        objectFit: "contain",
        padding: "2%"
    },
    name: {
        fontWeight: 700
    },
    abilities: {
        display: "flex"
    },
    ability: {
        marginRight: '2%',
    },
    cardContainerText: {
        backgroundColor: '#fff',
        height: { xs: "26%", md: "32%" },
        padding: "2% 6%"
    },
    weight: {
        width: "100%",
        display: "flex",
        justifyContent: "flex-end",
        padding: "0 10%",
        alignItems: "center"
    },
    weightTag: {
        width: '25%',
        height: "2.5rem",
        background: "#656999",
        position: "relative",
        bottom: "0.5rem",
        display: "flex",
        justifyContent: "center",
        alignItems: 'center',
        borderRadius: "1rem"
    },
    weightText: {
        fontSize: "1rem",
        color: "white",

    },
    containerPagination: {
        height: "7%",
        display: "flex",
        alignItems: 'center',
    },
    cardActionArea: {
        width: "100%",
        height: "100%"
    }
}