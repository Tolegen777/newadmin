import {Box, CircularProgress, Grid, Paper, Typography} from '@mui/material'
import React from 'react'
import {useNavigate} from 'react-router-dom';
import {
    useCancelOrderMutation,
    useCreateDeliveryMutation,
    useGetOneOrderQuery,
    useGetOrdersQuery
} from "../../store/rtk-api/baseEndpoints";
import OrderProductsBlock from "./OrderProductsBlock";
import {useParams} from "react-router";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {useTypedSelector} from "../../store";

const OneOrderView = () => {
    const {shop} = useTypedSelector(state => state.auth)
    const {data: orders, isLoading, error} = useGetOrdersQuery(shop && shop.id)
    const [createDelivery, {isLoading: isCreating, error: isCreatingError, isSuccess:isCreatingSuccess}] = useCreateDeliveryMutation()
    const [deleteDelivery, {isLoading: isDeleting, error: isDeletingError, isSuccess:isDeletingSuccess}] = useCancelOrderMutation()
    const navigate = useNavigate();
    const params = useParams();
    let paramsId = undefined
    if (params.orderId) {
        paramsId = +params.orderId
    }
    const {data: oneOrderData} = useGetOneOrderQuery(paramsId)

    const handleCreate = () => {
        if (params.orderId) {
            createDelivery(+params.orderId)
        }

    }
    const handleCancelOrder = () => {
        if (params.orderId) {
            deleteDelivery(+params.orderId)
        }
    }
    return (
        <Paper sx={{padding: '10px'}}>
            <Box>
                {isLoading && <Box sx={{textAlign: 'center'}}><CircularProgress/></Box>}
                {isDeleting && <Box sx={{textAlign: 'center'}}><CircularProgress/></Box>}
                {isCreating && <Box sx={{textAlign: 'center'}}><CircularProgress/></Box>}
                {error && <Box sx={{textAlign: 'center'}}>Что то пошло не так!</Box>}
                {isDeletingError && <Box sx={{textAlign: 'center'}}>Что то пошло не так!</Box>}
                {isCreatingError && <Box sx={{textAlign: 'center'}}>Что то пошло не так!</Box>}
                <Grid container spacing={0} onClick={() => navigate(-1)}
                      sx={{cursor: 'pointer', marginBottom: '20px'}}>
                    <Grid><ArrowBackIcon fontSize={"small"} sx={{color: 'disabled', fill: ''}}/></Grid>
                    <Grid sx={{marginLeft: '10px'}}><Typography sx={{fontSize: '14px'}}>Назад</Typography></Grid>
                </Grid>
                <OrderProductsBlock orders={orders}
                                    handleCreate={handleCreate} handleCancelOrder={handleCancelOrder}
                                    oneOrderData={oneOrderData}
                isError={isCreatingError} isLoading={isCreating} isSuccess={isCreatingSuccess}
                isError2={isDeletingError} isLoading2={isDeleting} isSuccess2={isDeletingSuccess}
                />
            </Box>
        </Paper>

    )
}

export default OneOrderView

