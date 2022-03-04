import { ICategory, IOrdersResponse, ISpec } from "../../types/types";
import { baseApi } from "../../store/rtk-api/baseApi";

const endpoints = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<ICategory[], string>({
      query: () => ({
        url: `/category`
      }),
      providesTags: ['categories']
    }),
    getOrders: builder.query<IOrdersResponse, number>({
      query: (shopId) => ({
        url: `/order/shop/${shopId}`
      }),
      providesTags: ['orders']
    }),
    getSpecs: builder.query<ISpec[], string>({
      query: (categoryId) => ({
        url: `/spec/${categoryId}`
      }),
      providesTags: ['orders']
    }),
  })
})

export const { useGetCategoriesQuery, useGetOrdersQuery, useGetSpecsQuery } = endpoints;