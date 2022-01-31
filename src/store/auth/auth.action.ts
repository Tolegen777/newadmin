import { createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { ILogin, ILoginResponse } from "../../types/ILogin";
import { AuthService } from "../../service/auth/auth.service";
import { IProfileUpdate, IUser } from "../../types/IProfile";

export const login = createAsyncThunk<ILoginResponse, ILogin>(
    'auth/login',
    async function (creds, { rejectWithValue }) {
        try {
            const response = await AuthService.login(creds)
            return response.data
        } catch (e) {
            return rejectWithValue(e)
        }
    }
)

export const fetchUser = createAsyncThunk<IUser>(
    'profile/fetch',
    async function (_, { rejectWithValue }) {
        try {
            const response = await AuthService.fetchProfile()
            return response.data
        } catch (e) {
            return rejectWithValue(e)
        }
    }
)

export const updateUserAvatar = createAsyncThunk<IUser, IProfileUpdate>(
    'profile/update',
    async function (profile, { rejectWithValue }) {
        try {
            const response = await AuthService.updateProfileAvatar(profile)
            return response.data
        } catch (e) {
            return rejectWithValue(e)
        }
    }
)

export const logout = createAction('auth/logout')
