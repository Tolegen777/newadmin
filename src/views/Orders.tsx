import {Box, Tab, Tabs, Typography, useMediaQuery, useTheme} from '@mui/material';
import React from 'react';
import {Navigate, Route, Routes, useNavigate} from 'react-router-dom';
import OneOrderView from '../components/orders/OneOrderView';
import AllOrderTypes from "../components/orders/AllOrderTypes";
import OrderColumnsView from "../components/orders/OrderColumnsView";

const desktopTypography = {
    fontSize: "42px", fontWeight: 500
}
const mobileTypography = {
    fontSize: "30px", fontWeight: 500,
}

const OrdersView: React.FC = () => {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [value, setValue] = React.useState(0);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    const navigate = useNavigate()

    return (
        <Box sx={{width: '100%'}}>
            <div style={{display: 'flex', alignItems: 'center', marginBottom: '15px'}}>
                <Typography style={isMobile ? mobileTypography : desktopTypography}>Заказы</Typography>
            </div>
            <Box sx={{
                borderBottom: 1,
                borderColor: 'divider',
                borderTopLeftRadius: '15px',
                borderTopRightRadius: '15px',
                background: 'white',
                mb: '16px'
            }}>
                <Tabs value={value} onChange={handleChange}>
                    <Tab label="Управление" onClick={() => navigate('')}/>
                    <Tab label="Все заказы" onClick={() => navigate('all')}/>
                </Tabs>
            </Box>
            <Routes>
                <Route index element={<OrderColumnsView/>}/>
                <Route path="all/one/:orderId" element={<OneOrderView/>}/>
                <Route path="one/:orderId" element={<OneOrderView/>}/>
                <Route path="all" element={<AllOrderTypes/>}/>
                <Route path="*" element={<Navigate to=""/>}/>
            </Routes>
        </Box>
    )
}

export default OrdersView
