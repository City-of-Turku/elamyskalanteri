import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Event, GetEventsResponse } from '../../types';

interface IOptions {
  page: number;
  searchTerm: string;
  keyword: string[];
  features: string;
  latitude: string;
  longitude: string;
  radius: string;
  start_time?: string;
  end_time?: string;
  audiences: string[];
  type_id?: string;
  page_size: number;
  localities: string[];
  extraKeyword: string;
  organization: string;
  suitable_for: string;
}

export const eventApi = createApi({
  reducerPath: 'eventApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_LINKEDEVENTS_BASE_URL,
  }),
  endpoints: (builder) => ({
    events: builder.query<GetEventsResponse, IOptions>({
      query: (options: IOptions) => {
        const kwds = () => {
          if (options.audiences.length || options.keyword.length || options.extraKeyword) {
            let keywordArray: string[] = [];
            if (options.keyword) {
              keywordArray = keywordArray.concat(options.keyword);
            }
            if (options.audiences) {
              keywordArray = keywordArray.concat(options.audiences);
            }
            if (options.extraKeyword) {
              keywordArray = keywordArray.concat(options.extraKeyword);
            }
            return `&keyword_AND=${keywordArray}`;
          } else {
            return '';
          }
        };
        const s = options.searchTerm ? `&text=${options.searchTerm}` : '';
        const type = options.type_id ? `&type_id=${options.type_id}` : '';
        const maxDistance =
          options.radius && options.latitude && options.longitude
            ? `&lat=${options.latitude}&lon=${options.longitude}&radius=${options.radius}`
            : '';
        const start = `&start=${options.start_time}`;
        const end = options.end_time ? `&end=${options.end_time}` : '';
        const loc = options.localities.length ? `&locality=${options.localities}` : '';
        const feats = options.features && `&${options.features}`;
        const org = options.organization ? `&publisher=${options.organization}` : '';
        const pSize = `&page_size=${options.page_size}`;
        const pNum = `&page=${options.page}`;
        const suitableFor = options.suitable_for && `&suitable_for=${options.suitable_for}`;

        return `/event/?include=location${s}${type}${kwds()}${maxDistance}${start}${end}${loc}${feats}${org}${pSize}${pNum}${suitableFor}`;
      },
    }),
    event: builder.query<Event, string>({
      query: (id: string) => `/event/${id}/?include=keywords,location,audience,in_language`,
    }),
  }),
});

export const { useEventsQuery, useEventQuery } = eventApi;
