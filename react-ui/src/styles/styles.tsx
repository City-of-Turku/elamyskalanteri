import { createTheme } from "@mui/material/styles";

export const vinkTheme = createTheme({
    palette:{
        primary: {
            main: '#F16834',
            dark: '#193773'
        },
        
    },
    typography: {
        h5: {
            fontWeight: 900,
            //fontSize: 28,
            //lineHeight: 34,
            fontStyle: 'normal',
            color: '#F16834',
        },
        body2: {
            fontSize: 15,
            color: '#000',
            fontStyle: 'normal',
            fontWeight: 400,
            letterSpacing: '0.015em',
            lineHeight: '21px'
        }
    }
});

export const theme = createTheme({
    palette:{
        primary: {
            main: '#fff',
            dark: '#808080',
        },
    },
    typography: {
        h5: {
            fontWeight: 900,
            //fontSize: 28,
            //lineHeight: 34,
            fontStyle: 'normal',
            color: '#000',
        },
    }
});