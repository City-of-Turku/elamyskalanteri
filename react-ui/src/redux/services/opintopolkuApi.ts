import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const opintopolkuApi = createApi({
  reducerPath: 'opintopolkuApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://testiopintopolku.fi/konfo-backend/external/' }),
  endpoints: (builder) => ({
    koulutukset: builder.query<any, string>({
      query: (name) => `search/toteutukset-koulutuksittain?keyword=Turun%20ammatti-instituutti%20${name}`,
    }),
  }),
})

export const { useKoulutuksetQuery } = opintopolkuApi