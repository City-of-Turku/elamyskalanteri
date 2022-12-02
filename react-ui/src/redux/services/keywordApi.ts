import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const keywordApi = createApi({
  reducerPath: "keywordApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_LINKEDEVENTS_BASE_URL}/keyword_set/`
  }),
  endpoints: (builder) => ({
    topics: builder.query({
      query: () => "?include=keywords"
    }),
  }),
})

export const { useTopicsQuery } = keywordApi