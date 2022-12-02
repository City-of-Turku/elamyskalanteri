import { createApi, fetchBaseQuery, FetchBaseQueryError } from "@reduxjs/toolkit/query/react"
import { GetOrganizationsResponse, Organization } from "../types/Organizations";

export const organizationApi = createApi({
  reducerPath: "organizatitonApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_LINKEDEVENTS_BASE_URL
  }),
  endpoints: (builder) => ({
    organizations: builder.query({
      async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
        const getOrganizationsPage = async (page: number): Promise<GetOrganizationsResponse> => {
          const result = await fetchWithBQ(`organization/?page=${page}`) ;
          if (result.error) {
            return { error: result.error as FetchBaseQueryError }
          }
          const data = result.data as GetOrganizationsResponse
          return data 
        }
        let organizations : Organization[] = [];
        let page = 1
        while (true) {
          let data = await getOrganizationsPage(page)
          if (!!data.data) {
            organizations = organizations.concat(data.data)
          }
          if (!data.meta?.next) {
            break;
          }
        }
        const randomResult = await fetchWithBQ('organization')
        if (randomResult.error)
          return { error: randomResult.error as FetchBaseQueryError }
        const user = randomResult.data as User
        const result = await fetchWithBQ(`user/${user.id}/posts`)
        return result.data
          ? { data: result.data as Post }
          : { error: result.error as FetchBaseQueryError }
      },
    }),
})

export const { useOrganizationsQuery } = organizationApi
