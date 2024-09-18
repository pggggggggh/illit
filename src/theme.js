'use client';
import {Noto_Serif} from "@next/font/google";
import {createTheme} from "@mui/material";

const notoSerif = Noto_Serif ({
    weight: ['300', '400', '500', '700'],
    subsets: ['latin'],
    display: 'swap',
});

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: "#C68FE6",
            contrastText: "#fff",
        },
    },
    typography: {
        fontFamily: notoSerif.style.fontFamily
    },
    components: {
    },
});

export default theme;