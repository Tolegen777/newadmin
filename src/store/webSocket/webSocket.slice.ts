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
            state.data.push(payload)

        },
        setPrevNotifications: (state, {payload}) => {
            state.data = payload

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