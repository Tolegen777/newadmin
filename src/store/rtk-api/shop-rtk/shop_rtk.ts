import {baseApi} from "../baseApi";
import {IShopData} from "../../../types/IShopData";

const endpoints = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getShop: builder.query<IShopData, number | undefined>({
            query: (shopId) => ({
                url: `shop/${shopId}`,
                method: 'GET',

            }),
             providesTags:['getShop']
        })
    })
})

export const {useGetShopQuery} = endpoints