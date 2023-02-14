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
  page_size: number;
}

export const eventApi = createApi({
  reducerPath: 'eventApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_LINKEDEVENTS_BASE_URL,
  }),
  endpoints: (builder) => ({
    events: builder.query<GetEventsResponse, IOptions>({
      query: (options: IOptions) => {
        const {
          audiences,
          bbox,
          end_time,
          features,
          keyword,
          page,
          searchTerm,
          start_time,
          type_id,
          page_size,
        } = options;
        const keywords = keyword.concat(audiences);
        const renderFeatures = features && `&${features}`;
        return `/event/?include=location&type_id=${type_id}&page_size=${page_size}&page=${page}&text=${searchTerm}&keyword_AND=${keywords}&bbox=${bbox}&start=${start_time}&end=${end_time}${renderFeatures}`;
      },
    }),
    event: builder.query<Event, string>({
      query: (id: string) => `/event/${id}/?include=location`,
    }),
  }),
});

export const { useEventsQuery, useEventQuery } = eventApi;
