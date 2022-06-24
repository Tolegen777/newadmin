import {Box, Paper, Typography, useMediaQuery, useTheme} from '@mui/material';
import React, {Suspense} from 'react';
import {Navigate, Route, Routes} from 'react-router';
import CreateProduct from '../components/products/CreateProduct';

const ProductsTable = React.lazy(() => import('../components/products/ProductsTable'));
const AddEditProduct = React.lazy(() => import('../components/products/CreateProduct'));

const ProductsView = () => {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Box>
            <Typography style={{fontWeight: 500}} fontSize={isMobile?"30px":"42px"}>Мои товары</Typography>
            <Suspense fallback={<div>Загрузка...</div>}>
                <Paper sx={{padding: '15px'}}>
                    <Routes>
                        <Route path="list" element={<ProductsTable/>}/>
                        <Route path="one">
                            <Route path="new" element={<CreateProduct/>}/>
                            <Route path=":productId" element={<CreateProduct/>}/>
                        </Route>
                        <Route
                            path="*"
                            element={<Navigate to="list"/>}
                        />
                    </Routes>
                </Paper>
            </Suspense>
        </Box>
    )
}

export default ProductsView
