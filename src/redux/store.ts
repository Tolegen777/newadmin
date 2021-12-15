import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { baseApi } from './services/baseApi';
// Or from '@reduxjs/toolkit/query/react'
// import { setupListeners } from '@reduxjs/toolkit/query'
import { profileApi } from './services/profile';
import auth from './slices/authSlice';

const rootReducer = combineReducers({
  auth,
  [baseApi.reducerPath]: baseApi.reducer,
  [profileApi.reducerPath]: profileApi.reducer,
})

export const store = configureStore({
  reducer: rootReducer,
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware, profileApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector