import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../types/IProfile";
import { IShop } from "../../types/IShop";
import { ActionsEnum } from "../enum";
import { fetchUser, login, logout } from "./auth.action";

interface IInitState {
    isAuth: boolean;
    user: IUser | null;
    shop: IShop | null;
    error: unknown;
    isLoading: boolean
}

const initialState: IInitState = {
    isLoading: false,
    error: null,
    user: null,
    shop: null,
    isAuth: false
}

const authReducer = createSlice({
    name: 'auth',
    reducers: {

    },
    initialState,
    extraReducers: builder => {
        builder
            .addCase(login.pending, ((state) => {
                state.isLoading = true
            }))
            .addCase(login.fulfilled, ((state, { payload }) => {
                state.isLoading = false
                state.isAuth = true
                state.user = payload.user
                state.shop = payload.shop
            }))
            .addCase(login.rejected, ((state, { error }) => {
                state.isLoading = false
                state.error = error
            }))
            // .addCase(fetchUser.fulfilled, ((state, { payload }) => {
            //     state.isLoading = false
            //     state.isAuth = true
            //     state.user = payload
            //     state.shop = payload.shops[0]
            // }))
            .addCase(logout, () => {
                return initialState
            })
    }
})
export default authReducer.reducer
