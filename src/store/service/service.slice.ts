import {createSlice} from "@reduxjs/toolkit";

interface IInitState {
    search: string | undefined
    categoryId: string | undefined
    page: number | undefined
    limit: number | undefined
    isClear?: boolean
    shopId: unknown
}

const initialState: IInitState = {
    search: undefined,
    categoryId: undefined,
    page: undefined,
    limit: undefined,
    isClear: true,
    shopId: null
}

const serviceReducer = createSlice({
    name: 'service',
    reducers: {
        setFilterData: (state, {payload}) => {
            if (payload.search || payload.search === '') {
                state.search = payload.search
            }
            if (payload.categoryId && payload.categoryId !== -1) {
                debugger
                state.categoryId = payload.categoryId
            }
            if (payload.page !== undefined) {
                // debugger
                state.page = payload.page + 1
            }
            if (payload.limit) {
                state.limit = payload.limit
            }
            if (payload.shopId) {
                state.shopId = payload.shopId
            }
            if (payload.categoryId === -1) {
                state.categoryId = undefined
            }
        },
        clearFilterData: (state) => {
            state.search = undefined
            state.categoryId = undefined
            state.page = undefined
            state.limit = undefined
        },
        unsetClear: (state) => {
            state.isClear = false
        },
        clearOnSearching: (state) => {
            state.page = undefined
            state.limit = undefined
        },

    },
    initialState,

})

export const {setFilterData, clearFilterData, unsetClear, clearOnSearching} = serviceReducer.actions
export default serviceReducer.reducer
