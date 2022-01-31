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
    status: ActionsEnum
}

const initialState: IInitState = {
    status: ActionsEnum.IDLE,
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
                state.status = ActionsEnum.LOADING
            }))
            .addCase(fetchProducts.fulfilled, ((state, {payload}) => {
                state.status = ActionsEnum.SUCCESS
                state.products = payload
            }))
            .addCase(fetchProducts.rejected, ((state, {error}) => {
                state.status = ActionsEnum.ERROR
                state.error = error
            }))
            .addCase(createProduct.pending, ((state) => {
                state.status = ActionsEnum.LOADING
            }))
            // .addCase(createProduct.fulfilled, ((state) => {
            //     state.status = ActionsEnum.SUCCESS
            // }))
            .addCase(createProduct.rejected, ((state, {error}) => {
                state.status = ActionsEnum.ERROR
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
