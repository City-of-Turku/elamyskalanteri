import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { GetKeywordSetResponse } from '../../types';

export const keywordApi = createApi({
  reducerPath: 'keywordApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_LINKEDEVENTS_BASE_URL}`,
  }),
  endpoints: (builder) => ({
    keywordSet: builder.query<GetKeywordSetResponse, void>({
      query: () => '/keyword_set/?include=keywords',
    }),
  }),
});

export const { useKeywordSetQuery } = keywordApi;
