import {createAsyncThunk, createAction} from "@reduxjs/toolkit";
import {ILogin, ILoginResponse} from "../../types/ILogin";
import {AuthService} from "../../service/auth/auth.service";
import {IProfileUpdate, IProfileUpdateData, IShopProfile, IUser} from "../../types/IProfile";
import {IShop} from "../../types/IShop";

export const login = createAsyncThunk<{ user: IUser, shop: IShop }, ILogin>(
    'auth/login',
    async function (creds, {rejectWithValue}) {
        try {
            const response = await AuthService.login(creds)
            const {user} = response.data;
            //token
            localStorage.setItem('access_token', response.data.access_token)
            const shop = user.shops[0] as IShop;
            return {user, shop}
        } catch (e) {
            return rejectWithValue(e)
        }
    }
)

export const refresh = createAsyncThunk<ILoginResponse>(
    'auth/refresh',
    async function (_, {rejectWithValue}) {
        try {
            const response = await AuthService.refresh();
            localStorage.setItem('access_token', response.data.access_token);
            return response.data;
        } catch (e) {
            return rejectWithValue(e);
        }
    }
)


export const fetchUser = createAsyncThunk<IUser>(
    'profile/fetch',
    async function (_, {rejectWithValue}) {
        try {
            const response = await AuthService.fetchProfile()
            return response.data
        } catch (e) {
            return rejectWithValue(e)
        }
    }
)

export const updateShopAvatar = createAsyncThunk<IProfileUpdateData, IProfileUpdateData>(
    'profile/update',
    async function (profileData, {rejectWithValue}) {
        try {

            const response = await AuthService.updateProfileAvatar(profileData)
            // console.log(response)
            //
            // console.log("response")
            return response.data
        } catch (e) {

            return rejectWithValue(e)
        }
    }
)

export const logout = createAction('auth/logout')
