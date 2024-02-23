import {createTheme} from "@mui/material";

export const themeOptions= createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#fafafa',
            contrastText: 'rgba(255,255,255,0.87)',
        },
        secondary: {
            main: '#f9f9f9',
        },
        background: {
            default: '#000000',
            paper: '#2b220b',
        },
        text: {
            primary: '#c9c9c9',
            secondary: '#ffff00',
        },
        divider: '#616161',
    }
});
