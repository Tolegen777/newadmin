import { createAsyncThunk } from '@reduxjs/toolkit';
import { ILogin, ILoginResponse } from '../../types/ILogin';
import { IUser } from '../../types/IProfile';
import { IShop } from '../../types/IShop';
import { baseApi } from './baseApi';

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<ILoginResponse, ILogin>({
      query: (creds) => ({
        url: `/auth/login`,
        method: 'POST',
        body: creds,
      }),
      transformResponse: (rawResult: ILoginResponse) => {
        const { access_token } = rawResult;
        localStorage.setItem('access_token', access_token);
        return rawResult;
      },
      invalidatesTags: ['auth'],
    }),
    getMyProfile: builder.query<IUser, string>({
      query: () => ({
        url: `/user/me`
      }),
      providesTags: ['user'],
    }),
    getMyShop: builder.query<IShop[], string>({
      query: () => ({
        url: `/shop`
      }),
      providesTags: ['shop'],
    }),
  })
})

export const { useGetMyProfileQuery, useGetMyShopQuery } = authApi;