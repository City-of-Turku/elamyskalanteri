import { createApi, fetchBaseQuery, FetchBaseQueryError } from "@reduxjs/toolkit/query/react"
import { GetOrganizationsResponse, Organization } from "../types/Organizations";

export const organizationApi = createApi({
  reducerPath: "organizatitonApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_LINKEDEVENTS_BASE_URL
  }),
  endpoints: (builder) => ({
    organizations: builder.query<Organization[], void> ({
      async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
        const getOrganizationsPage = async (page: number): Promise<GetOrganizationsResponse> => {
          const result = await fetchWithBQ(`organization/?page=${page}`)
          if (result.error) {
            return { error: result.error as FetchBaseQueryError }
          }
          const data = result.data as GetOrganizationsResponse
          return data 
        }
        let organizations : Organization[] = []
        let page = 1
        while (true) {
          let orgResponse = await getOrganizationsPage(page)
          page = page + 1
          if (!!orgResponse.data) {
            organizations = organizations.concat(orgResponse.data)
          }
          else {
            return orgResponse
          }
          if (!orgResponse.meta?.next) {
            break
          }
        }
        return {
          data: organizations
        }
      }
    })
  })
})

export const { useOrganizationsQuery } = organizationApi
