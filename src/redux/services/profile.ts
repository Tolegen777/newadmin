import { IUser } from "../../types/IProfile";
import { IClientsResponse } from "../../types/types";
import { baseApi } from "./baseApi";

export const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfiles: builder.query<IClientsResponse, string>({
      query: () => ({
        url: `/profile`
      })
    }),
    createProfile: builder.query<IUser, IUser>({
      query: (profile) => ({
        url: `/profile`,
        method: 'POST',
        body: profile
      })
    }),
    updateProfile: builder.query<IUser, IUser>({
      query: (profile) => ({
        url: `/profile/${profile.id}`,
        method: 'PUT',
        body: profile
      })
    }),
  })
})

export const { useGetProfilesQuery, useCreateProfileQuery, useUpdateProfileQuery } = profileApi;