import { CssBaseline, Toolbar } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { Navigate, Route, Routes } from 'react-router';
import Header from '../components/admin/Header';
import Sidebar from '../components/admin/Sidebar';
import CustomersView from '../views/Customers';
import OrdersView from '../views/Orders';
import ProductsView from '../views/Products';
import ProfileView from '../views/Profile';

type Props = {
}

const AdminPage: React.FC<Props> = ({ }) => {

  return (
    <Box sx={{ display: 'flex', backgroundColor: '#F2F4F5' }}>
      <CssBaseline />
      <Sidebar />
      {/* <Header /> */}
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${240}px)` } }}
      >
        {/* <Toolbar /> */}
        <Routes>
          <Route path={"profile"} element={<ProfileView />} />
          <Route path={"customers"} element={<CustomersView />} />
          <Route path={"products/*"} element={<ProductsView />} />
          <Route path={"orders/*"} element={<OrdersView />} />
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
