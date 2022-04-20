import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Data {
  id: string;
  name: {
    fi: string;
  };
}

interface GetHobbyResponse {
  meta: any;
  data: Data[];
}

export const hobbyApi = createApi({
  reducerPath: "hobbyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://testilinkedevents-api.turku.fi/v1",
  }),
  endpoints: (builder) => ({
    hobbies: builder.query<GetHobbyResponse, void>({
      query: () => "/event/",
    }),
  }),
});

export const { useHobbiesQuery } = hobbyApi;
