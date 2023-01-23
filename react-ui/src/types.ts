import { DataAttributes } from './constants';

export type appDataAttributes = Record<DataAttributes, string>;

export type Translatable<T = string> = {
  fi: T;
  sv: T;
  en: T;
};
