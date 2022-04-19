import {baseApi} from "../baseApi";
import {IAddSeller} from "../../../types/types";

const endpoints = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        removeSeller: builder.mutation<any, IAddSeller>({
            query: (sellingData) => ({
                url: `shop/remove-seller`,
                method: 'POST',
                body: {...sellingData}
            })
        })
    })
})

export const {useRemoveSellerMutation} = endpoints