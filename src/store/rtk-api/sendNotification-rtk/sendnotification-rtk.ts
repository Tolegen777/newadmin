import {baseApi} from "../baseApi";
import {IGetNotification} from "../../../types/types";

const endpoints = baseApi.injectEndpoints({
    endpoints:(builder) => ({
        // sendMessage:builder.mutation<any,ISendNotification>({
        //     query: (sendingData) => ({
        //         url: `notification`,
        //         method: 'POST',
        //         body: {...sendingData}
        //     })
        // }),
        getNotifications:builder.query<IGetNotification,number>({
            query: (limit: number = 5) => ({
                url: `notification`,
                method: 'GET',
                params: {
                    limit: limit,
                    page:1
                }

            })
        })
    })
})

export const {useGetNotificationsQuery} = endpoints