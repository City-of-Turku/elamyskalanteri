import { alpha, styled, Theme, useTheme } from '@mui/material/styles';
import React, { ReactNode } from 'react';

type CSSVariableProviderProps = {
  children: ReactNode;
};

type StyledCSSVariablesProps = {
  theme: Theme;
};

// Prefix CSS variables with 'ece-' (event calendar embed)
const StyledCSSVariables = styled('div')(
  ({ theme }: StyledCSSVariablesProps) => `
    --ece-primary-font: ${theme.typography.fontFamily};
    --ece-headings-font: ${theme.typography.h2.fontFamily};
    --ece-text-primary-color: ${theme.palette.text.primary};
    --ece-text-secondary-color: ${theme.palette.text.secondary};
    --ece-primary: ${theme.palette.primary.main};
    --ece-primary-dark: ${theme.palette.primary.dark};
    --ece-primary-light: ${theme.palette.primary.light};
    --ece-primary-bg: ${alpha(theme.palette.primary.main, 0.08)};
    --ece-secondary: ${theme.palette.secondary.main};
    --ece-secondary-dark: ${theme.palette.secondary.dark};
    --ece-secondary-light: ${theme.palette.secondary.light};
    --ece-secondary-bg: ${alpha(theme.palette.secondary.main, 0.08)};
  `,
);

const CSSVariableProvider = ({ children }: CSSVariableProviderProps) => {
  const theme = useTheme();
  return <StyledCSSVariables theme={theme}>{children}</StyledCSSVariables>;
};

export default CSSVariableProvider;
