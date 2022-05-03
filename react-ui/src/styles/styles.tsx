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
        //card heading
        h5: {
            fontWeight: 900,
            fontSize: 20,
            fontStyle: 'normal',
            color: '#F16834',
        },
        //event content heading
        h4: {
            fontWeight: 900,
            fontSize: 30,
            letterSpacing: 0.01,
            color: '#F26835', 
        },
        //box headings
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
        //box content text
        subtitle1: {
            color: '#fff',
            fontWeight: 400,
            fontSize: 14,
            fontStyle: 'normal',
            paddingBottom: 25,
            letterSpacing: '0.015em',
            fontFamily: "forma-djr-micro, sans-serif",
        },
        subtitle2: {//date
            color: "#193773",
            fontFamily: "forma-djr-micro, sans-serif",
            fontSize: 15
        }
    }
});

export const whiteLabelTheme = createTheme({
    palette:{
        primary: {
            main: '#dcdcdc',
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

export const naantaliTheme = createTheme({
    palette:{
        primary: {
            main: '#1D6052',// dark green
            dark: '#CF8097', //pink
        },
    },
    typography: {
        h6: {
            fontSize: 16,
            fontWeight: 900,
            color: '#FFF',
            letterSpacing: '0.01em',
          
        },
        h5: {
            color: '#1D6052', 
            fontWeight: 700,
        },
        h4: {
            fontWeight: 900,
            color: '#1D6052', 
        },
        subtitle1: {
            color: '#fff',
            fontWeight: 400,
            fontSize: 14,
            fontStyle: 'normal',
            paddingBottom: 25,
            letterSpacing: '0.015em'
        },
        subtitle2: {//date
            color: '#CF8097',
        },
        body2: { //short,long desc, location
            fontSize: 15,
            color: '#000',
            fontStyle: 'normal',
            fontWeight: 400,
            letterSpacing: '0.015em',
            lineHeight: '21px',
        },
    }
});

export const raisioTheme = createTheme({
    palette:{
        primary: {
            main: '#003C71',//dark blue
            dark: '#00C389',// green
        },
        background: {
            default: "#e4f0e2"
          }
    },
    typography: {
        fontFamily: "museo-sans, sans-serif",
        h6: {
            fontFamily: "museo-sans, sans-serif",
            fontSize: 16,
            fontWeight: 900,
            color: '#fff',
            letterSpacing: '0.01em',
          
        },
        h5: {
            color: '#003C71', 
            fontWeight: 700,
        },
        h4: {
            fontWeight: 900,
            color: '#003C71', 
        },
        subtitle1: {
            color: '#fff',
            fontWeight: 400,
            fontSize: 14,
            fontStyle: 'normal',
            paddingBottom: 25,
            letterSpacing: '0.015em'
        },
    },

});

export const taiTheme = createTheme({
    palette:{
        primary: {
            main: '#ed1a3b',//red
            dark: '#000',
        },
    },
    typography: {
        fontFamily: "tussilago, sans-serif",
        h6: {
            fontFamily: "tussilago, sans-serif",
            fontSize: 16,
            fontWeight: 900,
            color: '#ed1a3b',
            letterSpacing: '0.01em',
          
        },
        h5: {
            fontFamily: "tussilago, sans-serif",
            fontWeight: 900,
            fonStyle: 'normal',
            color: '#ed1a3b',
            fontSize: 20
        },
        h4: {
            fontWeight: 900,
            fontSize: 35,
            letterSpacing: 0.01,
            color: '#ed1a3b', 
        },
        subtitle1: {
            color: '#fff',
            fontWeight: 400,
            fontSize: 14,
            fontStyle: 'normal',
            paddingBottom: 25,
            letterSpacing: '0.015em',
            fontFamily: 'arial, sans-serif'
        },
        subtitle2: {//date
            color: '#000',
            fontFamily: 'arial, sans-serif',
            fontSize: 15
        },
        body2: {
            fontSize: 15,
            color: '#000',
            fontStyle: 'normal',
            fontWeight: 400,
            letterSpacing: '0.015em',
            lineHeight: '21px',
            fontFamily: 'arial, sans-serif'
        }
    }
});