import React from 'react';
import {Box, Typography, useMediaQuery, useTheme} from "@mui/material";
import {Route, Routes} from "react-router-dom";

import MyEmployee from "../components/employees/MyEmployee";

const Employees = () => {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    return (
        <Box sx={{width: '100%'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px'}}>
                <Typography fontWeight={500} fontSize={isMobile?'30px':'42px'}>Мои сотрудники</Typography>
            </div>
            <Routes>
                <Route index element={<MyEmployee/>}/>

            </Routes>
        </Box>
    );
};

export default Employees;