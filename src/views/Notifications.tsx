import React, {useEffect} from 'react';

import {io} from "socket.io-client"

import {getEnvApi} from "../api";
import {Box, Typography} from "@mui/material";
import {Route, Routes} from "react-router-dom";
import MyEmployee from "../components/employees/MyEmployee";
import NotificationPage from "../components/notificationPage/NotificationPage";

type PropsType = {
    readNotification?(): void,
}

const Notifications:React.FC<PropsType> = ({readNotification}) => {
 useEffect(()=>{
     if (readNotification){
         readNotification()
     }

 })
    return (
        <Box sx={{ width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                <Typography style={{ fontSize: "35px", fontWeight: 'bold' }}>Мои уведомления</Typography>
            </div>
            <Routes>
                <Route index element={<NotificationPage/>} />

            </Routes>
        </Box >
    );
};

export default Notifications;

//notification post message:, userId:20