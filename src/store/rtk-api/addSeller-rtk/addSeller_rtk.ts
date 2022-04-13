import {baseApi} from "../baseApi";
import {IAddSeller} from "../../../types/types";

const endpoints = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        addSeller: builder.mutation<any, IAddSeller>({
            query: (sellingData) => ({
                url: `shop/add-seller`,
                method: 'POST',
                body: {...sellingData}
            })
        })
    })
})

export const {useAddSellerMutation} = endpoints