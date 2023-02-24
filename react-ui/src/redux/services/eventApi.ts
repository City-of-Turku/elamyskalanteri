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
          if (
            options.audiences.length ||
            options.keyword.length ||
            options.extraKeyword ||
            options.organization
          ) {
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
            if (options.organization) {
              keywordArray = keywordArray.concat(options.organization);
            }
            console.log(keywordArray);
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
        const pSize = `&page_size=${options.page_size}`;
        const pNum = `&page=${options.page}`;

        return `/event/?include=location${s}${type}${kwds()}${maxDistance}${start}${end}${loc}${feats}${pSize}${pNum}`;
      },
    }),
    event: builder.query<Event, string>({
      query: (id: string) => `/event/${id}/?include=location`,
    }),
  }),
});

export const { useEventsQuery, useEventQuery } = eventApi;
