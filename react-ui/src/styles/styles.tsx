import { createTheme } from "@mui/material/styles";
import { lineHeight } from "@mui/system";

export const vinkTheme = createTheme({
    palette:{
        primary: {
            main: '#F16834',
            dark: '#193773'
        },
            background: {
                paper: '#fff',
                default: '#193773'
            }
    },
    typography: {
        h5: {
            fontWeight: 900,
            //fontSize: 28,
            //lineHeight: 34,
            fontStyle: 'normal',
            color: '#F16834',
        },
        h6: {
            fontSize: 16,
            fontWeight: 900,
            color: '#FFF',
            letterSpacing: '0.01em',
          
        },
        body2: {
            fontSize: 15,
            color: '#000',
            fontStyle: 'normal',
            fontWeight: 400,
            letterSpacing: '0.015em',
            lineHeight: '21px'
        },
        subtitle1: {
            color: '#fff',
            fontWeight: 400,
            fontSize: 14,
            fontStyle: 'normal',
            paddingBottom: 15,
            letterSpacing: '0.015em'
        },
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