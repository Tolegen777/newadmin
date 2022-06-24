import LogoutIcon from '@mui/icons-material/Logout';
import {Box, Divider, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Typography} from '@mui/material';
import * as React from 'react';
import {useDispatch} from 'react-redux';
import {NavLink, useLocation} from 'react-router-dom';
import logo from '../../assets/logo.svg';
import {menuRoutes} from '../../route';
import {logout} from '../../store/auth/auth.action';
import CustomAlert from "../alert/CustomAlert";
import {useTypedSelector} from "../../store";

const drawerWidth = 240;

export default function ResponsiveDrawer() {

    const {user} = useTypedSelector(state => state.auth)
    let mySet = new Set();
    const isNotification = useTypedSelector(state => state.websocketNotification.isNotification)

    const location = useLocation();
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(logout());
    }
    if (user) {
        user.roles.map(r => mySet.add(r.value))
    }

    const drawer = (
        <div style={{padding: '15px'}}>
            <Typography textAlign="center" sx={{padding: '10%'}}>
                <img src={logo} width={140} height="auto" alt={"логотип"}/>
            </Typography>
            <Divider/>
            <List style={{textAlign: 'center'}}>
                {menuRoutes.map((route, index) => {
                    if (route.name === "Сотрудники" && !mySet.has("ADMIN")) return false
                    else return <NavLink
                        to={route.path}
                        key={index}
                        style={{
                            textDecoration: 'none',
                            color: 'black'
                        }}
                    >
                        <ListItemButton style={
                            location.pathname.includes(route.path) ?
                                {
                                    textDecoration: 'none',
                                    color: '#8A3FFC',
                                    background: 'rgba(0, 118, 189, 0.1)',
                                    borderRadius: '10px'
                                } :
                                {
                                    textDecoration: 'none',
                                    color: 'black',
                                }}
                        >
                            {route.icon &&
                                <ListItemIcon>
                                    {React.createElement(route.icon, {color: location.pathname === route.path ? "primary" : undefined})}
                                </ListItemIcon>
                            }
                            <ListItemText primary={route.name}/>
                        </ListItemButton>
                    </NavLink>
                })}
            </List>
            <NavLink to="/" style={{textDecoration: 'none', color: 'black'}}>
                <ListItemButton onClick={handleLogout}>
                    <ListItemIcon>
                        <LogoutIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Выйти"/>
                </ListItemButton>
            </NavLink>
            <Box sx={{marginTop: '60%'}}>
                {isNotification &&
                    <CustomAlert title="Новое уведомление!" status="info" message="Нажмите сюда чтобы увидеть"
                                 isLink={true}/>}
            </Box>
        </div>
    );

    return (
        <Box
            component="nav"
            sx={{width: {sm: drawerWidth}, flexShrink: {sm: 0}}}
        >
            <Drawer
                variant="permanent"
                sx={{
                    display: {xs: 'none', sm: 'none', lg: 'block'},
                    '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth},
                }}
                open
                elevation={16}
            >
                {drawer}
            </Drawer>
        </Box>
    );
}