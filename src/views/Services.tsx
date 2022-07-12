import {Box, Paper, Typography, useMediaQuery, useTheme} from '@mui/material';
import React, {Suspense} from 'react';
import {Navigate, Route, Routes} from 'react-router';
import CreateService from "../components/services/CreateService";

const ServiceTable = React.lazy(() => import('../components/services/ServicePage'));

const ServicesView = () => {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Box>
            <Typography style={{fontWeight: 500}} fontSize={isMobile ? "30px" : "42px"}>Мои услуги</Typography>
            <Suspense fallback={<div>Загрузка...</div>}>
                <Paper sx={{padding: '15px'}}>
                    <Routes>
                        <Route path="list" element={<ServiceTable/>}/>
                        <Route path="one">
                            <Route path="new" element={<CreateService/>}/>
                            {/*<Route path=":serviceId" element={<CreateProduct/>}/>*/}
                        </Route>
                        <Route
                            path="*"
                            element={<Navigate to="list"/>}
                        />
                    </Routes>
                </Paper>
            </Suspense>
        </Box>
    )
}

export default ServicesView
