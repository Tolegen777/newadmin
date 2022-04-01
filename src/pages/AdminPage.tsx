import { CssBaseline } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { Navigate, Route, Routes } from 'react-router';
import Sidebar from '../components/admin/Sidebar';
import CustomersView from '../views/Customers';
import OrdersView from '../views/Orders';
import ProductsView from '../views/Products';
import ProfileView from '../views/Profile';
import Employees from "../views/Employees";



const AdminPage: React.FC = () => {

  return (
    <Box sx={{ display: 'flex', backgroundColor: '#F2F4F5', minHeight: '100vh' }}>
      <CssBaseline />
      <Sidebar />
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${240}px)` } }}
      >
        <Routes>
          <Route path={"profile"} element={<ProfileView />} />
          <Route path={"customers"} element={<CustomersView />} />
          <Route path={"products/*"} element={<ProductsView />} />
          <Route path={"orders/*"} element={<OrdersView />} />
          <Route path={"employees/*"} element={<Employees />} />
          <Route
            path="//*"
            element={<Navigate to="/app/profile" />}
          />
        </Routes>
      </Box>
    </Box>
  )
}

export default AdminPage
