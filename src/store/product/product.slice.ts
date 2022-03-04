import {ActionsEnum} from "../enum";
import {IProductResponse, ISpec} from "../../types/IProduct";
import {createSlice} from "@reduxjs/toolkit";
import {createProduct, fetchCategories, fetchProducts, fetchSpecs} from "./product.action";
import { ICategory } from "../../types/ICategory";

interface IInitState {
    products: IProductResponse
    categories: ICategory[]
    specs: ISpec[]
    error: unknown
    isLoading: boolean
}

const initialState: IInitState = {
    isLoading: false,
    error: null,
    products: {count: 0, products: []},
    categories: [],
    specs: []
}
const productSlice = createSlice({
    name: 'product',
    reducers: {},
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
                state.error = error
            }))
            .addCase(fetchCategories.fulfilled, ((state, {payload}) => {
                state.categories = payload
            }))
            .addCase(fetchSpecs.fulfilled, ((state, {payload}) => {
                state.specs = payload
            }))
    }
})
export default productSlice.reducer
