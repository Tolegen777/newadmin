import {ActionsEnum} from "../enum";
import {IProductResponse, ISpec} from "../../types/IProduct";
import {createSlice} from "@reduxjs/toolkit";
import {
    createProduct,
    fetchCategories,
    fetchOneProduct,
    fetchProducts,
    fetchSpecs,
    updateProduct
} from "./product.action";
import {ICategory} from "../../types/ICategory";

interface InitState {
    products: IProductResponse
    categories: ICategory[]
    specs: ISpec[]
    error: unknown
    error2?: unknown
    error3?:unknown
    isLoading: boolean
    payload?: any
    payload2?:any
}

const initialState: InitState = {
    isLoading: false,
    error: null,
    error2: null,
    error3:null,
    products: {count: 0, products: []},
    categories: [],
    specs: [],
    payload: null,
    payload2:null

}
const productSlice = createSlice({
    name: 'product',
    reducers: {
        clearPayload: (state) => {
            state.payload = null
            state.payload2 = null
        },
        clearError: (state) => {

            state.error2=null
            state.error3=null
        },
    },
    initialState,
    extraReducers: builder => {
        builder
            .addCase(fetchProducts.pending, ((state) => {
                state.isLoading = true
            }))
            .addCase(fetchProducts.fulfilled, ((state, {payload}) => {
                state.isLoading = false
                state.products = payload
            }))
            .addCase(fetchProducts.rejected, ((state, {error}) => {
                state.isLoading = false
                state.error = error
            }))
            .addCase(createProduct.pending, ((state) => {
                state.isLoading = true
            }))

            .addCase(createProduct.rejected, ((state, {error}) => {
                state.isLoading = false
                state.error2 = error
            }))
            .addCase(createProduct.fulfilled, ((state, response) => {
                state.isLoading = false
                state.payload = response
                state.error2 = null
            }))
            .addCase(fetchCategories.fulfilled, ((state, {payload}) => {
                state.categories = payload
            }))
            .addCase(fetchSpecs.fulfilled, ((state, {payload}) => {
                state.specs = payload
            }))

            .addCase(updateProduct.pending, ((state) => {
                state.isLoading = true
            }))

            .addCase(updateProduct.rejected, ((state, {error}) => {
                state.isLoading = false
                state.error3 = error
            }))
            .addCase(updateProduct.fulfilled, ((state, response) => {
                state.isLoading = false
                state.payload2 = response
                state.error3 = null
            }))

    }
})

export const {clearPayload, clearError} = productSlice.actions
export default productSlice.reducer
