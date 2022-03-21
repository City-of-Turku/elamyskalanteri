import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Options {
  page: number;
  searchTerm: string;
  keyword: string;
  features: string;
  bbox: string;
}

export const eventApi = createApi({
  reducerPath: "eventApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://testilinkedevents-api.turku.fi/v1",
  }),
  endpoints: (builder) => ({
    events: builder.query<any, Options>({
      query: (options) =>
        `/event/?page=${options.page}&text=${options.searchTerm}&keyword=${options.keyword}&${options.features}&bbox=${options.bbox}`,
    }),
    event: builder.query<any, string>({
      query: (id) => `/event/${id}/?include=keywords`,
    }),
  }),
});

export const { useEventsQuery, useEventQuery } = eventApi;
