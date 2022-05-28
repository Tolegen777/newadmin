import React, {useEffect} from 'react';
import {Box, Typography} from "@mui/material";
import {Route, Routes} from "react-router-dom";
import NotificationPage from "../components/notificationPage/NotificationPage";

type PropsType = {
    readNotification?(): void,
}

const Notifications: React.FC<PropsType> = ({readNotification}) => {
    return (
        <Box sx={{width: '100%'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px'}}>
                <Typography style={{fontSize: "42px", fontWeight: 500}}>Мои уведомления</Typography>
            </div>
            <Routes>
                <Route index element={<NotificationPage/>}/>

            </Routes>
        </Box>
    );
};

export default Notifications;

