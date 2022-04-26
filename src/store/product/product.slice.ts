import {ActionsEnum} from "../enum";
import {IProductResponse, ISpec} from "../../types/IProduct";
import {createSlice} from "@reduxjs/toolkit";
import {createProduct, fetchCategories, fetchOneProduct, fetchProducts, fetchSpecs} from "./product.action";
import {ICategory} from "../../types/ICategory";

interface IInitState {
    products: IProductResponse
    categories: ICategory[]
    specs: ISpec[]
    error: unknown
    error2?: unknown
    isLoading: boolean
    payload?: any
}

const initialState: IInitState = {
    isLoading: false,
    error: null,
    error2: null,
    products: {count: 0, products: []},
    categories: [],
    specs: [],
    payload: null,

}
const productSlice = createSlice({
    name: 'product',
    reducers: {
        clearPayload: (state) => {
            state.payload = null
        },
        clearError: (state) => {

            state.error2=null
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
            // .addCase(createProduct.fulfilled, ((state) => {
            //     state.status = ActionsEnum.SUCCESS
            // }))
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
        // .addCase(fetchOneProduct.fulfilled,((state,{payload})=>{
        // state.specs = payload}))
    }
})

export const {clearPayload, clearError} = productSlice.actions
export default productSlice.reducer
