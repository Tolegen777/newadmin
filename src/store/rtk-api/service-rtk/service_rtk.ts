import {baseApi} from "../baseApi";
import {
    IGetServicesFilter,
    IOneServiceResponse,
    IServiceCreate,
    IServiceResponse,
    IServiceUpdate
} from "../../../types/IService";
import {IGetCities, Name} from "../../../types/types";


const endpoints = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getServices: builder.query<IServiceResponse, IGetServicesFilter>({
            query: (params) => ({
                url: `service`,
                method: 'GET',
                params: {...params}
            }),
            providesTags: ['service']

        }),
        getOneService: builder.query<IOneServiceResponse, number>({
            query: (id) => ({
                url: `service/${id}`,
                method: 'GET',
            }),
            providesTags: ['service']
        }),
        createService: builder.mutation<any, IServiceCreate>({
            query: (data) => ({
                url: `service`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['service']
        }),
        updateService: builder.mutation<any, IServiceUpdate>({
            query: (data) => ({
                // @ts-ignore
                url: `service/${data.get('id')}`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['service']

        }),
        deleteService: builder.mutation<any, number>({
            query: (id) => ({
                url: `service/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['service']
        }),
        deleteServiceImage: builder.mutation<any, number | null>({
            query: (id) => ({
                url: `service/photo/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['service']
        }),
        getCities: builder.query<Name[], string>({
            query: () => ({
                url: `order/get-city`,
                method: 'GET',
            }),
            transformResponse: (response: any) => response.map((item: IGetCities) => item.name)
        }),
    })
})

export const {
    useCreateServiceMutation,
    useGetServicesQuery,
    useDeleteServiceMutation,
    useGetOneServiceQuery,
    useGetCitiesQuery,
    useUpdateServiceMutation,
    useDeleteServiceImageMutation
} = endpoints