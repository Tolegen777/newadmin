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
import CustomAlert from "../alert/CustomAlert";


const OneOrderVew = () => {
    const {shop} = useTypedSelector(state => state.auth)
    let shopId = 0
    if(shop) {
        shopId = shop.id
    }



    const {data: orders, isLoading, error} = useGetOrdersQuery(shopId)

    const [createDelivery, {}] = useCreateDeliveryMutation()
    const [deleteDelivery, {isLoading: isDeleting, error: isDeletingError}] = useCancelOrderMutation()


    const navigate = useNavigate();
    const params = useParams();
    let paramsId = undefined
    if (params.orderId) {
        paramsId = +params.orderId
    }

    const {data: oneOrderData} = useGetOneOrderQuery(paramsId)

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
        <Paper sx={{padding: '10px'}}>
            <Box>
                {isLoading && <Box sx={{textAlign: 'center'}}><CircularProgress/></Box>}
                {isDeleting && <Box sx={{textAlign: 'center'}}><CircularProgress/></Box>}
                {error && <Box sx={{textAlign: 'center'}}>Что то пошло не так!</Box>}
                {isDeletingError && <Box sx={{textAlign: 'center'}}>Что то пошло не так!</Box>}


                <Grid container spacing={0} onClick={() => navigate('/app/orders')}
                      sx={{cursor: 'pointer', marginBottom: '20px'}}>
                    <Grid><ArrowBackIcon fontSize={"small"} sx={{color: 'disabled', fill: ''}}/></Grid>
                    <Grid sx={{marginLeft: '10px'}}><Typography sx={{fontSize: '14px'}}>Назад</Typography></Grid>
                </Grid>

                <OrderProductsBlock orders={orders}
                                    handleCreate={handleCreate} handleCancelOrder={handleCancelOrder}
                                    oneOrderData={oneOrderData}/>




            </Box>
        </Paper>

    )
}

export default OneOrderVew

