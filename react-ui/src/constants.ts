export const THEMES = {
  WHITELABEL: 'whitelabel',
  VINK: 'vink',
  NAANTALI: 'naantali',
  RAISIO: 'raisio',
  KAARINA: 'kaarina',
  TAI: 'tai',
} as const;

export type Themes = (typeof THEMES)[keyof typeof THEMES];

export const DATA_ATTRIBUTES = [
  'audience',
  'description',
  'features',
  'keywords',
  'language',
  'layout',
  'linkText',
  'linkUrl',
  'numOfVisibleResults',
  'openInNewWindow',
  'search',
  'showEmbedTool',
  'showSearch',
  'theme',
  'timeEnd',
  'timeStart',
  'title',
  'typeId',
] as const;

export type DataAttributes = (typeof DATA_ATTRIBUTES)[number];
