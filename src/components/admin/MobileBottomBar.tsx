import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import {Paper} from "@mui/material";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {menuRoutes} from "../../route";
import {logout} from "../../store/auth/auth.action";
import {useDispatch} from "react-redux";

const routes = [
    '/',
    '/basket',
    '/profile/favorite',
    '/profile'
]

export default function MobileBottomBar() {
    const navigate = useNavigate()
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        navigate(routes[newValue]);
    };

    let mySet = new Set();
    const dispatch = useDispatch();
    const location = useLocation();
    const handleLogout = () => {
        dispatch(logout());
    }

    return (
        <Paper
            sx={{
                position: "fixed",
                bottom: 0,
                left: 0,
                right: 0,
                // width: "100%",
                borderTopLeftRadius: "10px",
                borderTopRightRadius: "10px",
                filter: 'drop-shadow(0px 4px 30px rgba(0, 0, 0, 0.1))',
                zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
        >
            <BottomNavigation
            >
                {menuRoutes.map((route, index) => {
                    if (route.name === "Сотрудники" && !mySet.has("ADMIN")) return false
                    else {
                        return <NavLink
                            to={route.path}
                            key={index}
                            style={{
                                textDecoration: 'none',
                            }}
                        >
                            <BottomNavigationAction
                                label={route.name}
                                showLabel
                                icon={
                                    // @ts-ignore
                                    React.createElement(route.icon, {color: location.pathname.includes(route.path) ? "primary" : undefined})}

                                style={
                                    location.pathname.includes(route.path) ?
                                        {
                                            textDecoration: 'none',
                                            color: '#8A3FFC',
                                            background: 'rgba(0, 118, 189, 0.1)',
                                        } :
                                        {
                                            textDecoration: 'none',

                                        }}
                            >
                            </BottomNavigationAction>
                        </NavLink>
                    }
                })}
                {/*<NavLink*/}
                {/*    to={'/'}*/}
                {/*    style={{*/}
                {/*        textDecoration: 'none',*/}
                {/*    }}*/}

                {/*>*/}
                {/*    <BottomNavigationAction*/}
                {/*        onClick={handleLogout}*/}
                {/*        label={'выйти'}*/}
                {/*        showLabel*/}
                {/*        icon={*/}
                {/*            // @ts-ignore*/}
                {/*            React.createElement(LogoutIcon, { color: location.pathname==='/' ? "primary" : undefined })}*/}

                {/*        style={*/}
                {/*            location.pathname==='/'?*/}
                {/*                {*/}
                {/*                    textDecoration: 'none',*/}
                {/*                    color: '#8A3FFC',*/}
                {/*                    background: 'rgba(0, 118, 189, 0.1)',*/}
                {/*                } :*/}
                {/*                {*/}
                {/*                    textDecoration: 'none',*/}

                {/*                }}*/}
                {/*    >*/}
                {/*    </BottomNavigationAction>*/}
                {/*</NavLink>*/}
            </BottomNavigation>

            {/*<BottomNavigation*/}
            {/*  showLabels*/}
            {/*  // value={value}*/}
            {/*  onChange={handleChange}*/}
            {/*>*/}
            {/*  <BottomNavigationAction*/}

            {/*    label="Профиль"*/}
            {/*    // value="/"*/}
            {/*    icon={<HomeOutlinedIcon />}*/}
            {/*  />*/}
            {/*  <BottomNavigationAction*/}
            {/*    label="Мои заказы"*/}
            {/*    // value="/basket"*/}
            {/*    icon={<ShoppingCartOutlinedIcon />}*/}
            {/*  />*/}
            {/*    <BottomNavigationAction*/}
            {/*        label="Уведомления"*/}
            {/*        // value="/profile/favorite"*/}
            {/*        icon={<FavoriteBorderOutlinedIcon />}*/}
            {/*    />*/}
            {/*    <BottomNavigationAction*/}
            {/*    label="Уведомления"*/}
            {/*    // value="/profile/favorite"*/}
            {/*    icon={<FavoriteBorderOutlinedIcon />}*/}
            {/*  />*/}
            {/*  <BottomNavigationAction*/}
            {/*    label="Сотрудники"*/}
            {/*    // value="/profile/edit"*/}
            {/*    icon={<PermIdentityOutlinedIcon />}*/}
            {/*  />*/}
            {/*</BottomNavigation>*/}
        </Paper>

    );
}
