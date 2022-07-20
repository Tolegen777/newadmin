import {Box, Button, Paper, Tab, Tabs, Typography, useMediaQuery, useTheme} from '@mui/material';
import React, {Suspense} from 'react';
import {Navigate, Route, Routes} from 'react-router';
import CreateService from "../components/services/CreateService";
import AddIcon from "@mui/icons-material/Add";
import {useLocation, useNavigate} from "react-router-dom";
import {AddButton} from "../components/common/Buttons";

const ServiceTable = React.lazy(() => import('../components/services/ServicePage'));

const ServicesView = () => {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const navigate = useNavigate()
    const location = useLocation()

    return (
        <Box>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: "space-between", marginBottom: '15px'}}>
                <Typography style={{fontWeight: 500}} fontSize={isMobile ? "30px" : "42px"}>Мои услуги</Typography>
                {
                    location.pathname === '/app/services/list' &&
                    <AddButton title={"Добавить услугу"} callback={() => navigate('/app/services/one/new')}/>}
            </div>
            <Box sx={{
                borderBottom: 1,
                borderColor: 'divider',
                borderTopLeftRadius: '15px',
                borderTopRightRadius: '15px',
                background: 'white',
                mb: '16px'
            }}>
                <Tabs value={0}>
                    <Tab label="Услуги" sx={{textTransform: "capitalize", fontSize: "18px"}}/>
                </Tabs>
            </Box>
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
