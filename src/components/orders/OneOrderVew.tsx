import {Box, Button, Grid, Paper, Table, TableBody, TableCell, TableRow, Typography} from '@mui/material'
import React from 'react'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import {useNavigate} from 'react-router-dom';
import {useCancelOrderMutation, useCreateDeliveryMutation, useGetOrdersQuery} from "../../store/rtk-api/baseEndpoints";
import OrderProductsBlock from "./OrderProductsBlock";
import {useParams} from "react-router";
import OrderConfirmDialogWindow from "./OrderConfirmDialogWindow";




const OneOrderVew = () => {
    const { data: orders, isLoading, error } = useGetOrdersQuery(7)
    const [createDelivery, {}] = useCreateDeliveryMutation()
    const [deleteDelivery, {isLoading:isDeleting,error:isDeletingError}] = useCancelOrderMutation()
    console.log(orders+" orders!")
    const navigate = useNavigate();
    const params = useParams();

    const handleCreate = async () => {
        if (params.orderId) {
            await createDelivery(+params.orderId)
        }

    }
    const handleCancelOrder = async () => {
        if (params.orderId) {
            await deleteDelivery(+params.orderId)
        }
    }
    return (
        <Box>
            {isLoading&&<Box sx = {{textAlign:'center'}}>Загрузка...</Box>}
            {isDeleting&&<Box sx = {{textAlign:'center'}}>Загрузка...</Box>}
            {error&&<Box sx = {{textAlign:'center'}}>Что то пошло не так!</Box>}
            {isDeletingError&&<Box sx = {{textAlign:'center'}}>Что то пошло не так!</Box>}

            <Button
                variant="contained"
                sx={{ backgroundColor: '#EFF3F9', color: 'black' }}
                startIcon={<ArrowBackIosNewIcon />}
                onClick={() => navigate('/app/orders')}
            >
                Назад</Button>
            <OrderProductsBlock orders={orders} status={orders?.payment}
                                handleCreate = {handleCreate} handleCancelOrder = {handleCancelOrder}/>

            <OrderProductsBlock orders={orders} status={orders?.success}
                                />

            <OrderProductsBlock orders={orders} status={orders?.cancelled}
                                />



        </Box>
    )
}

export default OneOrderVew


// <Typography>{orders&&orders?.payment.map(order=>order.map(order=>{if(String(order.id)===params.orderId)
//         return order.products.map(product=>product.id)
//     }
// )}</Typography>