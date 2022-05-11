import {createSlice} from "@reduxjs/toolkit";

interface IInitState {
    data: Array<{
        id: number | null,
        message: string | null,
        read: boolean
    }>,
    isNotification: boolean
}

const initialState: IInitState = {
    data: [],
    isNotification: false

}

const webSocketSlice = createSlice({
    name: 'webSocket/notification',
    initialState,
    reducers: {

        getNotification: (state, {payload}) => {

            // state.data = state.data.concat([payload])
            console.log(state.data)
            console.log("log")
            state.data.push(payload)
            // console.log(state.data)
            // console.log("first")

        },
        setPrevNotifications: (state, {payload}) => {
            //state.data = state.data.concat(payload)
            state.data = payload
            console.log("second")

        },
        readNotification: (state) => {
            state.isNotification = false
        },
        unReadNotification: (state) => {
            state.isNotification = true
        }
    }
})

export const {getNotification, setPrevNotifications, readNotification, unReadNotification} = webSocketSlice.actions

export default webSocketSlice.reducer