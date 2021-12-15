import { Box, Typography } from '@mui/material';
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import OneOrderVew from '../components/orders/OneOrderVew';
import OrderColumnsView from '../components/orders/OrderColumnsView';

const OrdersView: React.FC = () => {

  return (
    <Box>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
        <Typography style={{ fontSize: "42px", fontWeight: 500 }}>Заказы</Typography>
      </div>
      <Routes>
        <Route index element={<OrderColumnsView />} />
        <Route path="one/:orderId" element={<OneOrderVew />} />
        <Route path="*" element={<Navigate to="" />} />
      </Routes>
    </Box>
  )
}

export default OrdersView
