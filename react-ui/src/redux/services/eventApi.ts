import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface GetEventResponse {
  meta: any,
  data: [
    {
      id: string;
      name: {
        fi: string;
      };
    }
  ]
}

export const fetchApi = createApi({
  reducerPath: "eventApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://testilinkedevents-api.turku.fi/v1",
  }),
  endpoints: (builder) => ({
    events: builder.query<GetEventResponse, void>({
      query: () => "/event/",
    }),
  }),
});

export const { useEventsQuery } = fetchApi;
