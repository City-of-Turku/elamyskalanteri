import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { EventKeyword, GetKeywordSearchResponse, GetKeywordSetResponse } from '../../types';

interface IKeywordSearch {
  locale: string;
  text: string;
}

export const keywordApi = createApi({
  reducerPath: 'keywordApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_LINKEDEVENTS_BASE_URL}`,
  }),
  endpoints: (builder) => ({
    keywordSet: builder.query<GetKeywordSetResponse, void>({
      query: () => '/keyword_set/?include=keywords',
    }),
    keyword: builder.query<EventKeyword, string>({
      query: (keyword) => `/keyword/${keyword}/`,
    }),
    keywordSearch: builder.query<GetKeywordSearchResponse, IKeywordSearch>({
      query: (search) =>
        `/keyword/?data_source=yso&show_all_keywords=1&locale=${search.locale}&text=${search.text}`,
    }),
  }),
});

export const { useKeywordSetQuery, useKeywordQuery, useKeywordSearchQuery } = keywordApi;
