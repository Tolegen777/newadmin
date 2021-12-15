import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "../services/auth";

interface initialStateType {
  isAuth: boolean
  access_token: string | null
}
const initialState: initialStateType = {
  isAuth: false,
  access_token: null
}

const authSlice = createSlice({
  initialState,
  name: 'auth',
  reducers: {
    loggedOut: (state) => {
      state.isAuth = false
      state.access_token = null
    }
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        console.log(payload);
        state.access_token = payload.access_token
        state.isAuth = true
      }
    )
  },
})

export const { loggedOut } = authSlice.actions;
export default authSlice.reducer