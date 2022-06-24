import {CssBaseline, Hidden} from '@mui/material';
import {Box} from '@mui/system';
import React, {useEffect} from 'react';
import {Navigate, Route, Routes} from 'react-router';
import Sidebar from '../components/admin/Sidebar';
import OrdersView from '../views/Orders';
import ProductsView from '../views/Products';
import ProfileView from '../views/Profile';
import Employees from "../views/Employees";
import Notifications from "../views/Notifications";
import {connectSocket} from "../store/webSocket/websocketApi";
import {
    getNotification,
    setPrevNotifications,
    unReadNotification
} from "../store/webSocket/webSocket.slice";
import {useDispatch} from "react-redux";
import {useGetNotificationsQuery} from "../store/rtk-api/sendNotification-rtk/sendnotification-rtk";
import MobileBottomBar from "../components/admin/MobileBottomBar";


const AdminPage: React.FC = () => {
    const {data, error, isLoading} = useGetNotificationsQuery(15)
    const dispatch = useDispatch();

    useEffect(() => {
        if (data && data.data && data.data.notifications) {
            dispatch(setPrevNotifications(data.data.notifications))
        }
    }, [data])


    useEffect(() => {
        let socket = connectSocket()

        socket.onAny((eventName, ...args) => {
            dispatch(getNotification(args[0]))
            if (window.location.pathname !== "/app/notifications") {
                dispatch(unReadNotification())
            }
        });
        return () => {
            socket.disconnect()
        }
    }, [])

    return (
        <Box sx={{
            display: 'flex', backgroundColor: '#F2F4F5',
            // minHeight: '100vh'
        }}>
            <CssBaseline/>
            <Sidebar/>
            <Box
                component="main"
                sx={{flexGrow: 1, p: 3, width: {sm: `calc(100% - ${240}px)`}, overflow: "hidden",}}
            >
                <Routes>
                    <Route path={"profile"} element={<ProfileView/>}/>
                    <Route path={"products/*"} element={<ProductsView/>}/>
                    <Route path={"orders/*"} element={<OrdersView/>}/>
                    <Route path={"employees"} element={<Employees/>}/>
                    <Route path={"/notifications"} element={<Notifications/>}/>
                    <Route
                        path="//*"
                        element={<Navigate to="/app/profile"/>}
                    />
                </Routes>
            </Box>
            <Hidden mdUp>
                <MobileBottomBar/>
            </Hidden>


        </Box>
    )
}

export default AdminPage
