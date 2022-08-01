import {createSlice} from "@reduxjs/toolkit";
import {ICategory} from "../../types/ICategory";

interface InitState {
    serviceCategories: ICategory[] | []
}

const initialState: InitState = {
    serviceCategories: []

}
const categorySlice = createSlice({
    name: 'category',
    reducers: {
        setCategories: (state, {payload}) => {
            state.serviceCategories = payload
        },
    },
    initialState,
})

export const {setCategories} = categorySlice.actions
export default categorySlice.reducer
