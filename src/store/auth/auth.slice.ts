import {createSlice} from "@reduxjs/toolkit";
import {IUser} from "../../types/IProfile";
import {IShop} from "../../types/IShop";
import {login, logout, updateShopAvatar} from "./auth.action";

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
    isAuth: true
}

const authReducer = createSlice({
    name: 'auth',
    reducers: {},
    initialState,
    extraReducers: builder => {
        builder
            .addCase(login.pending, ((state) => {
                state.isLoading = true
            }))
            .addCase(login.fulfilled, ((state, {payload}) => {
                state.isLoading = false
                state.isAuth = true
                state.user = payload.user
                state.shop = payload.shop
            }))
            .addCase(login.rejected, ((state, {error}) => {
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
            .addCase(updateShopAvatar.pending, ((state) => {
                state.isLoading = true
                state.error = ''
            }))
            .addCase(updateShopAvatar.fulfilled, ((state, {payload}) => {
                state.isLoading = false
                // if (state?.shop?.logo&&payload.logo){
                //      state.shop.logo = payload.logo
                // } else if (state?.shop?.phone&&payload.phone){
                //     state.shop.phone = payload.phone
                // } else if (state?.shop?.instagram&&payload.instagram){
                //     state.shop.instagram = payload.instagram
                // }
                if (state?.user?.shops[0].logo && payload.logo) {
                    state.user.shops[0].logo = payload.logo
                }
                if (state?.user?.shops[0].phone && payload.phone) {
                    state.user.shops[0].phone = payload.phone
                }
                if (state?.user?.shops[0].logo && payload.instagram) {
                    state.user.shops[0].instagram = payload.instagram
                }

                state.error = ''

            }))
            .addCase(updateShopAvatar.rejected, ((state, {error}) => {
                state.isLoading = false
                state.error = error
            }))
    }
})
export default authReducer.reducer
