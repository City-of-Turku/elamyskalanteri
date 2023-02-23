import { Feature } from './types';

export const LAYOUT_OPTIONS = {
  GRID: 'grid',
  LIST: 'list',
  COMPACT: 'compact',
} as const;

export type LayoutOptions = (typeof LAYOUT_OPTIONS)[keyof typeof LAYOUT_OPTIONS];

export const THEMES = {
  WHITELABEL: 'whitelabel',
  VINK: 'vink',
  NAANTALI: 'naantali',
  RAISIO: 'raisio',
  KAARINA: 'kaarina',
  TAI: 'tai',
  TURKU: 'turku',
} as const;

export type Themes = (typeof THEMES)[keyof typeof THEMES];

export const DATA_ATTRIBUTES = [
  'audience',
  'description',
  'features',
  'isDetailView',
  'keywords',
  'language',
  'layout',
  'linkText',
  'linkUrl',
  'localities',
  'numOfVisibleResults',
  'openInNewWindow',
  'search',
  'showEmbedTool',
  'showPastEvents',
  'showSearch',
  'theme',
  'timeEnd',
  'timeStart',
  'title',
  'typeId',
] as const;

export type DataAttributes = (typeof DATA_ATTRIBUTES)[number];

export const CONTENT_TYPES = {
  EVENTS: 'eventgeneral',
  HOBBIES: 'eventhobbies',
  COURSES: 'eventcourse',
} as const;

export type ContentTypesType = (typeof CONTENT_TYPES)[keyof typeof CONTENT_TYPES];

export const freeTranslated = {
  fi: 'ilmainen',
  sv: 'gratis',
  en: 'free',
};

export const virtualEventTranslated = {
  fi: 'virtuaalinen',
  sv: 'virtuell',
  en: 'virtual',
};

export const features: Feature[] = [
  {
    label: freeTranslated,
    value: 'is_free=true',
  },
  {
    label: virtualEventTranslated,
    value: 'virtual=true',
  },
];

export const DateShortcut = {
  TODAY: 'today',
  TOMORROW: 'tomorrow',
  THIS_WEEK: 'thisWeek',
  CURRENT_MONTH: 'currentMonth',
  RESET: 'reset',
} as const;

export type DateShortcutType = (typeof DateShortcut)[keyof typeof DateShortcut];
