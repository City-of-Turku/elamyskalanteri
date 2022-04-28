import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface IOptions {
  page: number,
  searchTerm: string,
  keyword: string[],
  features: string,
  bbox: string,
  start_time?: string,
  end_time?: string,
  audiences: string[]
}

export const eventApi = createApi({
  reducerPath: "eventApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://testilinkedevents-api.turku.fi/v1",
  }),
  endpoints: (builder) => ({
    events: builder.query<any, IOptions>({
      query: (options: IOptions) =>
        `/event/?page=${options.page}&text=${options.searchTerm}&keyword=${options.keyword.concat(options.audiences)}&${options.features}&bbox=${options.bbox}&start=${options.start_time}&end=${options.end_time}`,
    }),
    event: builder.query<any, string>({
      query: (id: any) => `/event/${id}/?include=keywords`,
    }),
  }),
});

export const { useEventsQuery, useEventQuery } = eventApi;
