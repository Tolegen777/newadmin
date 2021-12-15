import { Typography, Drawer, Box, List, ListItem, ListItemText, Toolbar, SvgIcon, ListItemButton, ListItemIcon, Divider } from '@mui/material';
import * as React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { menuRoutes } from '../../route';
import styles from '../../assets/styles/sidebar.module.css';
import LogoutIcon from '@mui/icons-material/Logout';
import logo from '../../assets/logo.svg';
import { loggedOut } from '../../redux/slices/authSlice';
import { useDispatch } from 'react-redux';

const drawerWidth = 240;

export default function ResponsiveDrawer() {
  const location = useLocation();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(loggedOut());
  }

  const drawer = (
    <div style={{ padding: '15px' }}>
      <Typography textAlign="center" sx={{ padding: '10%' }}>
        <img src={logo} width={140} height="auto" />
      </Typography>
      <Divider />
      <List style={{ textAlign: 'center' }}>
        {menuRoutes.map((route, index) => (
          <NavLink
            to={route.path}
            key={index}
            style={{
              textDecoration: 'none',
              color: 'black'
            }}
          >
            <ListItemButton style={
              location.pathname === route.path ?
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
                  {React.createElement(route.icon, { color: location.pathname === route.path ? "primary" : undefined })}
                </ListItemIcon>
              }
              <ListItemText primary={route.name} />
            </ListItemButton>
          </NavLink>
        ))}
      </List>
      <NavLink to="/" style={{ textDecoration: 'none', color: 'black' }}>
        <ListItemButton onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Log Out" />
        </ListItemButton>
      </NavLink>
    </div>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
        open
        elevation={16}
      >
        {drawer}
      </Drawer>
    </Box>
  );
}