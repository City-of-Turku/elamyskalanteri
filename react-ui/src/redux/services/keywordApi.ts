import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const keywordApi = createApi({
  reducerPath: "keywordApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://testilinkedevents-api.turku.fi/v1/keyword_set/"
  }),
  endpoints: (builder) => ({
    topics: builder.query({
      query: () => "?include=keywords"
    }),
  }),
})

export const { useTopicsQuery } = keywordApi