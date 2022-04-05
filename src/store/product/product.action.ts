import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "..";
import { ProductService } from "../../service/product/product.service";
import { ICategory } from "../../types/ICategory";
import { IProductNew, IProductOneResponse, IProductQuery, IProductResponse, ISpec } from "../../types/IProduct";

export const fetchProducts = createAsyncThunk<IProductResponse, IProductQuery>(
    'product/fetch',
    async function (query, { getState, rejectWithValue }) {
        try {
            const { auth } = getState() as RootState;
            if (auth.user?.shops) {
                const response = await ProductService.fetchProducts({ ...query, shopId: auth.user?.shops[0].id })
                return response.data
            }
            throw Error('Нет магазина')
        } catch (e) {
            return rejectWithValue(e)
        }
    }
)
export const fetchOneProduct = createAsyncThunk<IProductOneResponse, string>(
    'product/fetch',
    async function (id, { rejectWithValue }) {
        try {
            const response = await ProductService.fetchOneProduct(id)
            return response.data
        } catch (e) {
            return rejectWithValue(e)
        }
    }
)
export const createProduct = createAsyncThunk<IProductOneResponse, IProductNew>(
    'product/create',
    async function (product, { rejectWithValue }) {
        try {

            const response = await ProductService.createProduct(product)

            //console.log(response)

            return response.data


        } catch (e) {
            return rejectWithValue(e)
        }
    }
)
export const updateProduct = createAsyncThunk<IProductOneResponse, IProductNew>(
    'product/update',
    async function (product, { rejectWithValue }) {
        try {
            const response = await ProductService.updateProduct(product)
            return response.data
        } catch (e) {
            return rejectWithValue(e)
        }
    }
)
export const fetchCategories = createAsyncThunk<ICategory[]>(
    'product/category/fetch',
    async function (_, { rejectWithValue }) {
        try {
            const response = await ProductService.fetchCategories()
            return response.data
        } catch (e) {
            return rejectWithValue(e)
        }
    }
)
export const fetchSpecs = createAsyncThunk<ISpec[], string>(
    'product/specs/fetch',
    async function (categoryId, { rejectWithValue }) {
        try {
            const response = await ProductService.fetchSpecs(categoryId)
            return response.data
        } catch (e) {
            return rejectWithValue(e)
        }
    }
)


