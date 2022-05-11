import {baseApi} from "../baseApi";
import { IUpdateSpecs} from "../../../types/types";

const endpoints = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        updateSpecs: builder.mutation<any, IUpdateSpecs>({
            query: (sellingData) => ({
                url: `spec/add-product`,
                method: 'POST',
                body: {...sellingData}
            }),

        })
    })
})

export const {useUpdateSpecsMutation} = endpoints