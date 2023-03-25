export const styles = {
    main: {
        height: "94%",
        display: 'flex',
        flexDirection: "column",
        justifyContent: "center",
        margin: "0 auto",

    },
    containerPokemons: {
        height: "calc(100% - 8%)",
        display: "flex",
        flexDirection: { xs: "row", md: "row" },
        flexWrap: 'wrap',
        overflow: "auto",
        width: "100%",
    },
    containerPagination: {
        height: "7%",
        display: "flex",
        alignItems: 'center',
    }


}