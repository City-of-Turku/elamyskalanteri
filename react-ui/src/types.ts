import { DataAttributes } from './constants';

export type appDataAttributes = Record<DataAttributes, string>;

export type Translatable<T = string> = {
  fi: T;
  sv: T;
  en: T;
};

export type PayloadMeta = {
  count: number;
  next: string | null;
  previous: string | null;
};

export type Organization = {
  id: string;
  data_source: string;
  classification: string;
  name: string;
  sub_organizations: string[];
  affiliated_organizations: string[];
};

export type GetOrganizationsResponse = {
  meta: PayloadMeta;
  data: Organization[];
};

export type Event = {
  id: string;
  name: Translatable;
  short_description: Translatable;
  start_time: Date;
  end_time: Date;
  location_extra_info: Translatable;
  info_url: Translatable;
  provider: Translatable;
  description: Translatable;
  offers: Array<{
    price: Translatable;
  }>;
  images: Array<{
    url: string;
    alt_text: Translatable;
  }>;
};

export type GetEventResponse = {
  meta: PayloadMeta;
  data: Event[];
};
