import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetEventResponse } from "../types/Event";

export const eventApi = createApi({
  reducerPath: "eventApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://testilinkedevents-api.turku.fi/v1",
  }),
  endpoints: (builder) => ({
    events: builder.query<GetEventResponse, void>({
      query: () => "/event/",
    }),
    event: builder.query<GetEventResponse, string>({
      query: (id) => `/events/${id}`,
    }),
  }),
});

export const { useEventsQuery, useEventQuery } = eventApi;
