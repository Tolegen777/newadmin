import {baseApi} from "../baseApi";

const endpoints = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        removeProductImage: builder.mutation<any,any>({
            query: (id) => ({
                url: `product/delete-photo/${id}`,
                method: 'DELETE'
            }),

        })
    })
})

export const {useRemoveProductImageMutation} = endpoints