import { createTheme } from '@mui/material/styles';

const baseTypography = {
  root: {
    htmlFontSize: 16,
    fontWeightBold: 700,
    fontWeightLight: 400,
    fontWeightMedium: 700,
    fontWeightRegular: 400,
  },
  h2: {
    fontSize: 22,
    fontWeight: 'bold',
    lineHeight: 'normal',
  },
  h3: {
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 'normal',
  },
  h4: {
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 'normal',
  },
  h5: {
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 'normal',
  },
  h6: {
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 'normal',
  },
  body1: {
    lineHeight: 1.5,
    fontSize: 16,
  },
  body2: {
    lineHeight: 1.5,
    fontSize: 18,
  },
};

export const vinkTheme = createTheme({
  palette: {
    primary: {
      main: '#F26835', // orange
    },
    secondary: {
      main: '#193773', // blue
    },
    text: {
      primary: '#2B2B2B',
    },
    contrastThreshold: 4.5,
  },
  typography: {
    ...baseTypography.root,
    fontFamily: 'forma-djr-micro, sans-serif',
    h2: {
      ...baseTypography.h2,
      fontFamily: 'halogen, sans-serif',
      color: '#193773', // blue
      fontWeight: 900,
      letterSpacing: 1,
    },
    h3: {
      ...baseTypography.h3,
      fontFamily: 'halogen, sans-serif',
      color: '#193773', // blue
    },
    h4: {
      ...baseTypography.h4,
    },
    h5: {
      ...baseTypography.h5,
    },
    h6: {
      ...baseTypography.h6,
    },
    body1: {
      ...baseTypography.body1,
      color: '#2B2B2B',
    },
    body2: {
      ...baseTypography.body2,
      color: '#2B2B2B',
    },
  },
});

export const whiteLabelTheme = createTheme({
  palette: {
    primary: {
      main: '#202020',
    },
    secondary: {
      main: '#202020',
    },
    text: {
      primary: '#202020',
    },
    contrastThreshold: 4.5,
  },
  typography: {
    ...baseTypography.root,
    fontFamily: 'inherit',
    h2: {
      ...baseTypography.h2,
      color: '#505050',
    },
    h3: {
      ...baseTypography.h3,
      color: '#505050',
    },
    h4: {
      ...baseTypography.h4,
      color: '#505050',
    },
    h5: {
      ...baseTypography.h5,
      color: '#505050',
    },
    h6: {
      ...baseTypography.h6,
      color: '#505050',
    },
    body1: {
      ...baseTypography.body1,
      color: '#202020',
    },
    body2: {
      ...baseTypography.body2,
      color: '#202020',
    },
  },
});

export const naantaliTheme = createTheme({
  palette: {
    primary: {
      main: '#1D6052', // petrol
    },
    secondary: {
      main: '#1D6052', // petrol
    },
    text: {
      primary: '#2c2a29',
    },
    contrastThreshold: 4.5,
  },
  typography: {
    ...baseTypography.root,
    fontFamily: 'Myriad Pro, myriad-pro, Arial, Helvetica, sans-serif',
    h2: {
      ...baseTypography.h2,
      color: '#2c2a29',
    },
    h3: {
      ...baseTypography.h3,
      color: '#2c2a29',
    },
    h4: {
      ...baseTypography.h4,
    },
    h5: {
      ...baseTypography.h5,
    },
    h6: {
      ...baseTypography.h6,
    },
    body1: {
      color: '#2c2a29',
    },
    body2: {
      color: '#2c2a29',
    },
  },
});

export const raisioTheme = createTheme({
  palette: {
    primary: {
      main: '#003C71', // dark blue
    },
    secondary: {
      main: '#003C71', // dark blue
    },
    text: {
      primary: '#2c2a29',
    },
    contrastThreshold: 4.5,
  },
  typography: {
    ...baseTypography.root,
    fontWeightBold: 700,
    fontWeightLight: 300,
    fontWeightMedium: 700,
    fontWeightRegular: 500,
    fontFamily: 'museo-sans, sans-serif',
    h2: {
      ...baseTypography.h2,
      color: '#001C35',
    },
    h3: {
      ...baseTypography.h3,
      color: '#001C35',
    },
    h4: {
      ...baseTypography.h4,
    },
    h5: {
      ...baseTypography.h5,
    },
    h6: {
      ...baseTypography.h6,
    },
    body1: {
      ...baseTypography.body1,
      color: '#2c2a29',
    },
    body2: {
      ...baseTypography.body2,
      color: '#2c2a29',
    },
  },
});

export const taiTheme = createTheme({
  palette: {
    primary: {
      main: '#ed1a3b', //red
    },
    secondary: {
      main: '#ed1a3b', // red
    },
    text: {
      primary: '#1d1d1a',
    },
    contrastThreshold: 4,
  },
  typography: {
    ...baseTypography.root,
    fontFamily: 'Open Sans, sans-serif',
    fontWeightBold: 700,
    fontWeightLight: 300,
    fontWeightMedium: 600,
    fontWeightRegular: 400,
    h2: {
      ...baseTypography.h2,
    },
    h3: {
      ...baseTypography.h3,
    },
    h4: {
      ...baseTypography.h4,
    },
    h5: {
      ...baseTypography.h5,
    },
    h6: {
      ...baseTypography.h6,
    },
    body1: {
      ...baseTypography.body1,
      color: '#1d1d1a',
    },
    body2: {
      ...baseTypography.body2,
      color: '#1d1d1a',
    },
  },
});

export const kaarinaTheme = createTheme({
  palette: {
    primary: {
      main: '#0071B4', // blue
    },
    secondary: {
      main: '#0071B4',
    },
    text: {
      primary: '#151515',
    },
    contrastThreshold: 4.5,
  },
  typography: {
    ...baseTypography.root,
    fontFamily: 'Montserrat, sans-serif',
    fontWeightBold: 700,
    fontWeightLight: 400,
    fontWeightMedium: 700,
    fontWeightRegular: 400,
    h2: {
      ...baseTypography.h2,
      color: '#0071B4', // main
    },
    h3: {
      ...baseTypography.h3,
      color: '#0071B4', // main
    },
    h4: {
      ...baseTypography.h4,
    },
    h5: {
      ...baseTypography.h5,
    },
    h6: {
      ...baseTypography.h6,
    },
    body1: {
      ...baseTypography.body1,
      color: '#151515',
    },
    body2: {
      ...baseTypography.body2,
      color: '#151515',
    },
  },
});
