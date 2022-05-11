import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { getEnvApi } from "../../api";

export const baseQuery = fetchBaseQuery({
    baseUrl: getEnvApi(),
    prepareHeaders: (headers) => {
        const token = localStorage.getItem('access_token');
        if (token) {
            headers.set('Authorization', `Bearer ${token}`)
        } else {
            headers.set('Authorization', 'NO HEADER')
        }
        return headers
    },
});

export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: baseQuery,
    tagTypes: ['categories', 'orders', 'getShop'],
    endpoints: () => ({}),
})

// const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
//   args,
//   api,
//   extraOptions
// ) => {
//   let result = await baseQuery(args, api, extraOptions);

//   if (result.error && result.error.status === 401) {
//     const refreshResult = await baseQuery({ url: 'token/refresh/', method: 'POST' }, api, extraOptions);

//     if (refreshResult.data) {
//       api.dispatch(setTokens({ accessToken: refreshResult.data as string }));

//       // retry the initial query
//       result = await baseQuery(args, api, extraOptions);
//     } else {
//       api.dispatch(logout());
//     }
//   }
//   return result;
// };

// export const baseApi = createApi({
//   reducerPath: 'baseApi',
//   baseQuery: baseQueryWithReauth,
//   endpoints: () => ({}),
// });