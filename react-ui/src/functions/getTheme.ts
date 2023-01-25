import { Theme } from '@mui/material';
import { THEMES } from '../constants';
import {
  kaarinaTheme,
  naantaliTheme,
  raisioTheme,
  taiTheme,
  vinkTheme,
  whiteLabelTheme,
} from '../themes/themes';

export const getTheme = (theme: string): Theme => {
  switch (theme) {
    case THEMES.WHITELABEL:
      return whiteLabelTheme;
    case THEMES.VINK:
      return vinkTheme;
    case THEMES.NAANTALI:
      return naantaliTheme;
    case THEMES.RAISIO:
      return raisioTheme;
    case THEMES.KAARINA:
      return kaarinaTheme;
    case THEMES.TAI:
      return taiTheme;
    default:
      return vinkTheme;
  }
};
