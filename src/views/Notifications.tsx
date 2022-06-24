import React from 'react';
import {Box, Typography, useMediaQuery, useTheme} from "@mui/material";
import {Route, Routes} from "react-router-dom";
import NotificationPage from "../components/notificationPage/NotificationPage";

type PropsType = {
    readNotification?(): void,
}
const desktopTypography = {
    fontSize: "42px", fontWeight: 500
}
const mobileTypography = {
    fontSize: "30px", fontWeight: 500,
}

const Notifications: React.FC<PropsType> = ({readNotification}) => {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Box sx={{width: '100%'}}>
            <div style={{display: 'flex', alignItems: 'center', marginBottom: '15px'}}>
                <Typography style={isMobile ? mobileTypography : desktopTypography}>Мои уведомления</Typography>
            </div>
            <Routes>
                <Route index element={<NotificationPage/>}/>
            </Routes>
        </Box>
    );
};

export default Notifications;

