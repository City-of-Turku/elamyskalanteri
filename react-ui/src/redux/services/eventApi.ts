import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Event, GetEventsResponse } from '../../types';

interface IOptions {
  page: number;
  searchTerm: string;
  keyword: string[];
  features: string;
  bbox: string;
  start_time?: string;
  end_time?: string;
  audiences: string[];
  type_id?: string;
}

export const eventApi = createApi({
  reducerPath: 'eventApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_LINKEDEVENTS_BASE_URL,
  }),
  endpoints: (builder) => ({
    events: builder.query<GetEventsResponse, IOptions>({
      query: (options: IOptions) => {
        const q = `/event/?include=location&type_id=${options.type_id}&page=${options.page}&text=${
          options.searchTerm
        }&keyword_AND=${options.keyword.concat(options.audiences)}&${options.features}&bbox=${
          options.bbox
        }&start=${options.start_time}&end=${options.end_time}`;
        return q;
      },
    }),
    event: builder.query<Event, string>({
      query: (id: string) => `/event/${id}/?include=location`,
    }),
  }),
});

export const { useEventsQuery, useEventQuery } = eventApi;
