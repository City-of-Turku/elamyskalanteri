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
}

export const eventApi = createApi({
  reducerPath: 'eventApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_LINKEDEVENTS_BASE_URL,
  }),
  endpoints: (builder) => ({
    events: builder.query<GetEventsResponse, IOptions>({
      query: (options: IOptions) => {
        const s = `&text=${options.searchTerm}`;
        const type = `&type_id=${options.type_id}`;
        const kwds = `&keyword_AND=${options.keyword.concat(options.audiences)}`;
        const maxDistance = `&lat=${options.latitude}&lon=${options.longitude}&radius=${options.radius}`;
        const start = `&start=${options.start_time}`;
        const end = `&end=${options.end_time}`;
        const loc = `&locality=${options.localities}`;
        const feats = options.features && `&${options.features}`;
        const pSize = `&page_size=${options.page_size}`;
        const pNum = `&page=${options.page}`;

        return `/event/?include=location${s}${type}${kwds}${maxDistance}${start}${end}${loc}${feats}${pSize}${pNum}`;
      },
    }),
    event: builder.query<Event, string>({
      query: (id: string) => `/event/${id}/?include=location`,
    }),
  }),
});

export const { useEventsQuery, useEventQuery } = eventApi;
