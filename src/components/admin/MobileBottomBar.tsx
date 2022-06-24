import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import {Paper} from "@mui/material";
import {NavLink, useLocation} from "react-router-dom";
import {menuRoutes} from "../../route";

export default function MobileBottomBar() {
    let mySet = new Set();
    const location = useLocation();

    return (
        <Paper
            sx={{
                position: "fixed",
                bottom: 0,
                left: 0,
                right: 0,
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
            </BottomNavigation>
        </Paper>

    );
}
