import {baseApi} from "../baseApi";

const endpoints = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        removeProduct: builder.mutation<any, any>({
            query: (id) => ({
                url: `shop/product/${id}`,
                method: 'DELETE'
            }),


        })
    })
})

export const {useRemoveProductMutation} = endpoints