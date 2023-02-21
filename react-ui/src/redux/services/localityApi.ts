import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { GetLocalitiesResponse } from '../../types';

export const localitiesApi = createApi({
  reducerPath: 'localitiesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_LINKEDEVENTS_BASE_URL,
  }),
  endpoints: (builder) => ({
    localities: builder.query<GetLocalitiesResponse, void>({
      query: () => `/place_locality/`,
    }),
  }),
});

export const { useLocalitiesQuery } = localitiesApi;
