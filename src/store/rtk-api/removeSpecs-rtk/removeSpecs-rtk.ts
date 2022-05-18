import {baseApi} from "../baseApi";
import { IUpdateSpecs} from "../../../types/types";

const endpoints = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        removeSpecs: builder.mutation<any, IUpdateSpecs>({
            query: (sellingData) => ({
                url: `spec/remove-product`,
                method: 'DELETE',
                body: {...sellingData}
            }),

        })
    })
})

export const {useRemoveSpecsMutation} = endpoints