import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";
// import categoryReducer from './category/cateory.slice'
import authReducer from './auth/auth.slice'
import productReducer from './product/product.slice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        product: productReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector

