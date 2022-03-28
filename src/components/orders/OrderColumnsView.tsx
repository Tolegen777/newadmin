import React from 'react'
import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import ColumnTitle from './ColumnTitle';
import OrderCard from './OrderCard';
import { useTypedSelector } from '../../store';
import { useGetOrdersQuery } from '../../store/rtk-api/baseEndpoints';
import {useDispatch} from "react-redux";
import {changeOrderStatusThunk} from "../../store/order/order.action";





const OrderColumnsView: React.FC = () => {
    let dispatch = useDispatch()

    // test
    const { data: orders, isLoading, error } = useGetOrdersQuery(7)

    React.useEffect(() => {
        console.log(orders);
   //  dispatch(changeOrderStatusThunk(66))
     //dispatch(changeOrderStatusThunk(64))
    // dispatch(changeOrderStatusThunk(28))

    }, [orders])

    return (

        <Grid container spacing={5}>

            {error&&<div>то то пошло не так!</div>}
            <Grid item sm={4} xs={4} lg={4}>
                {isLoading&&<Box sx={{textAlign:'center'}}>Загрузка...</Box>}
                <ColumnTitle title="Новые" amount={3} />
                {orders &&
                    orders?.payment.map((order) =>
                        <OrderCard id={order.id} totalPrice={order.totalPrice} />
                    )
                }
            </Grid>
            <Grid item sm={4} xs={4} lg={4}>
                <ColumnTitle color="primary" title="Доставлено" amount={5} />
                {orders &&
                    orders?.success.map((order) =>
                        <OrderCard id={order.id} totalPrice={order.totalPrice} />
                    )
                }
            </Grid>
            <Grid item sm={4} xs={4} lg={4}>
                <ColumnTitle color="error" title="Отказано" amount={1} />
                {orders &&
                    orders?.cancelled.map((order) =>
                        <OrderCard id={order.id} totalPrice={order.totalPrice} />
                    )
                }


            </Grid>


        </Grid>
    )
}

export default OrderColumnsView