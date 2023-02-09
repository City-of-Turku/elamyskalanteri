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

export type Event = {
  id: string;
  location: EventLocation | null;
  keywords: EventKeyword[];
  super_event: Record<'@id', string> | null;
  event_status: string;
  type_id: string;
  external_links: EventExternalLink[];
  offers: EventOffer[];
  data_source: string;
  publisher: string;
  sub_events: Record<'@id', string>[];
  images: EventImage[];
  videos: EventVideo[];
  in_language: Record<'@id', string>[];
  audience: Record<'@id', string>[];
  created_time: Date | null;
  last_modified_time: Date | null;
  date_published: Date | null;
  start_time: Date | null;
  end_time: Date | null;
  is_virtualevent: boolean;
  is_owner: boolean;
  custom_data: Record<string, string | null>;
  audience_min_age: number | null;
  audience_max_age: number | null;
  maximum_attendee_capacity: number | null;
  minimum_attendee_capacity: number | null;
  enrolment_start_time: Date | null;
  enrolment_end_time: Date | null;
  enrolment_url: string | null;
  super_event_type: string | null;
  sub_event_type: string | null;
  deleted: boolean;
  virtualevent_url: string | null;
  replaced_by: string | null;
  name: Translatable;
  provider: Translatable;
  description: Translatable;
  location_extra_info: Translatable | null;
  provider_contact_info: string | null;
  short_description: Translatable;
  info_url: Translatable;
  '@id': string;
  '@context': string;
  '@type': string;
};

export type EventExternalLink = {
  name: string;
  link: string;
  language: string;
};

export type EventOffer = {
  payment_methods: string[];
  is_free: boolean;
  description: Translatable | null;
  price: Translatable | null;
  info_url: string | null;
};

export type EventImage = {
  id: number;
  license: string | null;
  created_time: Date;
  last_modified_time: Date;
  publisher_name: string;
  url: string | null;
  cropping: string;
  photographer_name: string;
  data_source: string | null;
  publisher: string | null;
  alt_text: Translatable;
  name: Translatable;
};

export type EventVideo = {
  url: string;
};

export type EventLocation = {
  address_country: unknown | null; // Todo: Fix unknown
  address_locality: Translatable;
  address_region: unknown | null; // Todo: Fix unknown
  contact_type: unknown | null; // Todo: Fix unknown
  created_time: Date | null;
  custom_data: unknown | null; // Todo: Fix unknown
  data_source: string;
  deleted: boolean;
  description: Translatable;
  divisions: Array<{
    type: string;
    ocd_id: string;
    municipality: string | null;
    name: Translatable;
  }>;
  email: string | null;
  id: string;
  image: number | null;
  info_url: string | null;
  last_modified_time: Date | null;
  n_events: number;
  name: Translatable;
  parent: unknown | null; // Todo: Fix unknown
  position: {
    type: string;
    coordinates: [number, number];
  };
  post_office_box_num: unknown | null; // Todo: Fix unknown
  postal_code: string | null;
  publisher: string;
  replaced_by: unknown | null; // Todo: Fix unknown
  street_address: Translatable;
  telephone: string | null;
  '@context': string;
  '@id': string;
  '@type': string;
};

export type RelatedEventKeyWord = {
  id: EventKeyword['id'];
  ontology_type: EventKeyword['ontology_type'];
  name: EventKeyword['name'];
};

export type EventKeyword = {
  id: string;
  alt_labels: string[];
  created_time: Date | null;
  last_modified_time: Date | null;
  parents: RelatedEventKeyWord[];
  children: RelatedEventKeyWord[];
  ontology_type: string;
  aggregate: boolean;
  deprecated: boolean;
  n_events: number;
  is_hidden: boolean;
  image: unknown | null; // Todo: Fix unknown
  data_source: string | null;
  publisher: string | null;
  replaced_by: unknown | null; // Todo: Fix unknown
  name: Translatable;
  '@id': string;
  '@context': string;
  '@type': string;
};

export type KeywordSet = {
  id: string;
  keywords: EventKeyword[];
  usage: string;
  created_time: Date | null;
  last_modified_time: Date | null;
  image: unknown | null; // Todo: fix unknown
  data_source: string;
  organization: string | null;
  name: Translatable;
  '@id': string;
  '@context': string;
  '@type': string;
};

export type Feature = {
  label: Translatable;
  value: string;
};

export type Category = {
  name: Translatable;
  yso: string;
};

export type GetOrganizationsResponse = {
  meta: PayloadMeta;
  data: Organization[];
};

export type GetEventsResponse = {
  meta: PayloadMeta;
  data: Event[];
};

export type GetKeywordSetResponse = {
  meta: PayloadMeta;
  data: KeywordSet[];
};
