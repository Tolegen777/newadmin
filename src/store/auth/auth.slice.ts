import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../types/IProfile";
import { ActionsEnum } from "../enum";
import { login, logout } from "./auth.action";

interface IInitState {
    isAuth: boolean;
    user: IUser | null;
    error: unknown;
    status: ActionsEnum
}

const initialState: IInitState = {
    status: ActionsEnum.IDLE,
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
                state.status = ActionsEnum.LOADING
            }))
            .addCase(login.fulfilled, ((state, {payload}) => {
                state.status = ActionsEnum.SUCCESS
                state.isAuth = true
                state.user = payload.user
            }))
            .addCase(login.rejected, ((state, {error}) => {
                state.status = ActionsEnum.ERROR
                state.error = error
            }))
            .addCase(logout, () => {
                return initialState
              })
    }
})
export default authReducer.reducer
