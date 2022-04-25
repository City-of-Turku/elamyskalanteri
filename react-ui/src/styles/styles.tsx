import { createTheme } from "@mui/material/styles";

export const vinkTheme = createTheme({
    palette:{
        primary: {
            main: '#F26835', // dark orange
            dark: '#193773' // dark blue
        },
            background: {
                paper: '#fff',
                default: '#193773'
            }
    },
    typography: {
        fontFamily: "halogen, sans-serif",
        h5: {
            fontWeight: 900,
            //fontSize: 28,
            //lineHeight: 34,
            fontStyle: 'normal',
            color: '#F16834',
        },
        h4: {
            fontWeight: 900,
            fontSize: 35,
            letterSpacing: 0.01,
            color: '#F26835', 
        },
        h6: {
            fontSize: 16,
            fontWeight: 700,
            color: '#FFF',
            letterSpacing: '0.01em',
          
        },
        body2: { //short,long desc, location
            fontSize: 15,
            color: '#000',
            fontStyle: 'normal',
            fontWeight: 400,
            letterSpacing: '0.015em',
            lineHeight: '21px',
            fontFamily: "forma-djr-micro, sans-serif",
        },
        subtitle1: {
            color: '#fff',
            fontWeight: 400,
            fontSize: 14,
            fontStyle: 'normal',
            paddingBottom: 25,
            letterSpacing: '0.015em',
            fontFamily: "forma-djr-micro, sans-serif",
        },
    }
});

export const theme = createTheme({
    palette:{
        primary: {
            main: '#fff',
            dark: '#808080',
        },
        secondary: {
            main: '#808080', // dark blue
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
        h4: {
            fontWeight: 900,
            fontSize: 35,
            letterSpacing: 0.01,
            color: '#000' 
        },
        h6: {
            fontSize: 16,
            fontWeight: 900,
            color: '#FFF',
            letterSpacing: '0.01em',
          
        },
        body2: { //short,long desc, location
            fontSize: 15,
            color: '#000',
            fontStyle: 'normal',
            fontWeight: 400,
            letterSpacing: '0.015em',
            lineHeight: '21px',
        },
        subtitle1: {
            color: '#fff',
            fontWeight: 400,
            fontSize: 14,
            fontStyle: 'normal',
            paddingBottom: 25,
            letterSpacing: '0.015em'
        },
    }
});