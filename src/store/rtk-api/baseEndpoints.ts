import {IBasketUser, ICategory, IOneOrder, IOrdersResponse, ISpec} from "../../types/types";
import {baseApi} from "../../store/rtk-api/baseApi";
import {StatusOfOrder} from "../enum";

const endpoints = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getCategories: builder.query<ICategory[], string>({
            query: () => ({
                url: `/category`
            }),
            providesTags: ['categories']
        }),
        getOrders: builder.query<IOrdersResponse, number|null>({
            query: (shopId) => ({
                url: `/order/shop/${shopId}`
            }),
            providesTags: ['orders']
        }),
        getSpecs: builder.query<ISpec[], string>({
            query: (categoryId) => ({
                url: `/spec/category/${categoryId}`
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
                body: {status: StatusOfOrder.CANCELED}
            }),
            invalidatesTags: ['orders']
        }),
        getOneOrder: builder.query<IOneOrder, number | undefined>({
            query: (oneOrderId) => ({
                url: `/order/shop-order/${oneOrderId}`
            }),
            providesTags: ['orders']
        }),
        getBasketUserData: builder.query<IBasketUser, number | undefined>({
            query: (basketId) => ({
                url: `/basket/user/${basketId}`
            }),
            providesTags: ['orders']
        }),

    })
})

export const {
    useGetCategoriesQuery, useGetOrdersQuery, useGetSpecsQuery,
    useCancelOrderMutation, useCreateDeliveryMutation, useGetOneOrderQuery, useGetBasketUserDataQuery
} = endpoints;