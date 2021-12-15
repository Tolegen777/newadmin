import { IOrdersResponse } from "../types/types";
import { baseApi } from "./baseApi";

export const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query<IOrdersResponse, number>({
      query: (shopId) => ({
        url: `/order/shop/${shopId}`
      }),
      providesTags: ['orders']
    }),
  })
})

export const { useGetOrdersQuery } = orderApi;