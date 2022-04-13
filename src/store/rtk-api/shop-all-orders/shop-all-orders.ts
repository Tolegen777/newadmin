import {baseApi} from "../baseApi";
import {IAllOrderShop} from "../../../types/IAllOrderShop";

const endpoints = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllShopOrder: builder.query<IAllOrderShop[], number>({
            query: (shopId) => ({
                url: `order/all-shop-order/${shopId}`,
                method: 'GET',
            })
        })
    })
})

export const {useGetAllShopOrderQuery} = endpoints