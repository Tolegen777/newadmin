import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../types/IProfile";
import { ActionsEnum } from "../enum";
import { login, logout } from "./auth.action";

interface IInitState {
    isAuth: boolean;
    user: IUser | null;
    error: unknown;
    isLoading: boolean
}

const initialState: IInitState = {
    isLoading: false,
    error: null,
    user: null,
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
            }))
            .addCase(login.rejected, ((state, { error }) => {
                state.isLoading = false
                state.error = error
            }))
            .addCase(logout, () => {
                return initialState
            })
    }
})
export default authReducer.reducer
