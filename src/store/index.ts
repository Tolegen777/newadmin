import {configureStore} from "@reduxjs/toolkit";
import {TypedUseSelectorHook, useSelector} from "react-redux";
import authReducer from './auth/auth.slice'
import productReducer from './product/product.slice';
import {baseApi} from "./rtk-api/baseApi";
import webSocketReducer from "./webSocket/webSocket.slice"

export const store = configureStore({
    reducer: {
        auth: authReducer,
        product: productReducer,
        [baseApi.reducerPath]: baseApi.reducer,
        websocketNotification: webSocketReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(baseApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector

