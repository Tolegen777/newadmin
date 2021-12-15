import { Box, Paper, Typography, Button } from '@mui/material';
import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router';
const ProductsTable = React.lazy(() => import('../components/products/ProductsTable'));
const AddEditProduct = React.lazy(() => import('../components/products/AddEditProduct'));

const ProductsView = () => {

  return (
    <Box>
      <Typography style={{ fontSize: "36px", fontWeight: 700 }}>Мои Товары</Typography>
      <Suspense fallback={<div>Загрузка...</div>}>
        <Paper sx={{ padding: '15px' }}>
          <Routes>
            <Route path="list" element={<ProductsTable />} />
            <Route path="one">
              <Route path="new" element={<AddEditProduct />} />
              <Route path=":productId" element={<AddEditProduct />} />
            </Route>
            <Route
              path="*"
              element={<Navigate to="list" />}
            />
          </Routes>
        </Paper>
      </Suspense>
    </Box>
  )
}

export default ProductsView
