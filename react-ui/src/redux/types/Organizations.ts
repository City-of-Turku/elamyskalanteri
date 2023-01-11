import { Meta } from './Meta';

export interface Organization {
  id: string;
  data_source: string;
  classification: string;
  name: string;
  sub_organizations: string[];
  affiliated_organizations: string[];
}

export interface GetOrganizationsResponse {
  meta?: Meta;
  data?: Organization[];
  details?: any;
  error?: any;
}
