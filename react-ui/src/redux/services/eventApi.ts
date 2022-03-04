import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Data {
  id: string;
  name: {
    fi: string;
  }
}

interface GetEventResponse {
  meta: any,
  data: Data[]
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
