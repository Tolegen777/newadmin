import { Box, Tab, Tabs, Typography } from '@mui/material';
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import OneOrderVew from '../components/orders/OneOrderVew';
import OrderColumnsView from '../components/orders/OrderColumnsView';

const OrdersView: React.FC = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
        <Typography style={{ fontSize: "42px", fontWeight: 500 }}>Заказы</Typography>
      </div>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', borderTopLeftRadius: '15px', borderTopRightRadius: '15px', background: 'white', mb: '16px' }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Управление" />
          {/* <Tab label="Item Two" />
          <Tab label="Item Three" /> */}
        </Tabs>
      </Box>

      <Routes>
        <Route index element={<OrderColumnsView />} />
        <Route path="one/:orderId" element={<OneOrderVew />} />
        <Route path="*" element={<Navigate to="" />} />
      </Routes>
    </Box >
  )
}

export default OrdersView
