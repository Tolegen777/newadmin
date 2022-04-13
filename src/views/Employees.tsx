import React from 'react';
import {Box, Typography} from "@mui/material";
import {Route, Routes} from "react-router-dom";

import MyEmployee from "../components/employees/MyEmployee";

const Employees = () => {
    return (
        <Box sx={{width: '100%'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px'}}>
                <Typography style={{fontSize: "42px", fontWeight: 500}}>Мои сотрудники</Typography>
            </div>
            <Routes>
                <Route index element={<MyEmployee/>}/>

            </Routes>
        </Box>
    );
};

export default Employees;