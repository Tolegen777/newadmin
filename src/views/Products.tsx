import { Box, Paper, Typography } from '@mui/material';
import React, { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router';
import CreateProduct from '../components/products/CreateProduct';
const ProductsTable = React.lazy(() => import('../components/products/ProductsTable'));
const AddEditProduct = React.lazy(() => import('../components/products/CreateProduct'));

const ProductsView = () => {

  return (
    <Box>
      <Typography style={{ fontSize: "36px", fontWeight: 700 }}>Мои Товары</Typography>
      <Suspense fallback={<div>Загрузка...</div>}>
        <Paper sx={{ padding: '15px' }}>
          <Routes>
            <Route path="list" element={<ProductsTable />} />
            <Route path="one">
              <Route path="new" element={<CreateProduct />} />
              <Route path=":productId" element={<CreateProduct />} />
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
