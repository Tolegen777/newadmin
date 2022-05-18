import {baseApi} from "../baseApi";
import {IUpdateSpecArr, IUpdateSpecs} from "../../../types/types";

const endpoints = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        updateSpecs: builder.mutation<any, IUpdateSpecArr>({
            query: (sellingData) => ({
                url: `spec/product-spec`,
                method: 'PUT',
                body: {...sellingData}
            }),

        })
    })
})

export const {useUpdateSpecsMutation} = endpoints