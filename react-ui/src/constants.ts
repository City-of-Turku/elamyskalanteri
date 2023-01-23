export const THEMES = {
  WHITELABEL: 'whitelabel',
  VINK: 'vink',
  NAANTALI: 'naantali',
  RAISIO: 'raisio',
  KAARINA: 'kaarina',
  TAI: 'tai',
} as const;

export type Themes = (typeof THEMES)[keyof typeof THEMES];
