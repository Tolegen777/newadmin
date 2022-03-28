import { ICategory, IOrdersResponse, ISpec } from "../../types/types";
import { baseApi } from "../../store/rtk-api/baseApi";
import {StatusOfOrder} from "../enum";

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
    createDelivery: builder.mutation<any, number>({
      query: (id) => ({
        url: `shop/create-delivery/${id}`,
        method: 'POST'
      }),
      invalidatesTags: ['orders']
    }),
    cancelOrder: builder.mutation<any, number>({
      query: (id) => ({
        url: `order/change-status/${id}`,
        method: 'PUT',
        body: {status:StatusOfOrder.CANCELED}
      }),
      invalidatesTags: ['orders']
    })
  })
})

export const { useGetCategoriesQuery, useGetOrdersQuery, useGetSpecsQuery, useCancelOrderMutation,useCreateDeliveryMutation} = endpoints;