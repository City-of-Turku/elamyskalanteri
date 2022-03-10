import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetEventResponse } from "../types/Event";

interface Options {
  page: number,
  searchTerm: string,
}

export const eventApi = createApi({
  reducerPath: "eventApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://testilinkedevents-api.turku.fi/v1",
  }),
  endpoints: (builder) => ({
    events: builder.query<GetEventResponse, Options>({
      query: (options) => `/event/?page=${options.page}&text=${options.searchTerm}`,
    }),
    event: builder.query<GetEventResponse, string>({
      query: (id) => `/event/${id}/?include=keywords`,
    }),
  }),
});

export const { useEventsQuery, useEventQuery } = eventApi;
