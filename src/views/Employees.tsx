import React from 'react';
import {Box, Tab, Tabs, Typography} from "@mui/material";
import {Navigate, Route, Routes} from "react-router-dom";
import OrderColumnsView from "../components/orders/OrderColumnsView";
import OneOrderVew from "../components/orders/OneOrderVew";
import MyEmployee from "../components/employees/MyEmployee";

const Employees = () => {
    return (
        <Box sx={{ width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                <Typography style={{ fontSize: "35px", fontWeight: 'bold' }}>Мои сотрудники</Typography>
            </div>


            <Routes>
                <Route index element={<MyEmployee/>} />
                {/*<Route path="one/:orderId" element={<OneOrderVew />} />*/}
                {/*<Route path="*" element={<Navigate to="" />} />*/}
            </Routes>
        </Box >
    );
};

export default Employees;