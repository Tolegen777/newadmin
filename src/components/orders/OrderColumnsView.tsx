import React from 'react'
import {Grid, useMediaQuery, useTheme} from '@mui/material';
import ColumnTitle from './ColumnTitle';
import OrderCard from './OrderCard';
import {useGetOrdersQuery} from '../../store/rtk-api/baseEndpoints';
import CircularProgress from "@mui/material/CircularProgress";
import {useTypedSelector} from "../../store";

const OrderColumnsView: React.FC = () => {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const {shop} = useTypedSelector(state => state.auth)
    const {data: orders, isLoading, error, refetch} = useGetOrdersQuery(shop && shop.id)
    React.useEffect(() => {
        refetch();
    }, [])

    return (
        <Grid container spacing={isMobile ? 2 : 5}>
            {error && <div>Что то пошло не так!</div>}
            <Grid item sm={4} xs={4} lg={4}>
                {isLoading && <CircularProgress/>}
                {orders && <ColumnTitle title="Новые" amount={orders.payment.length}/>}
                {orders &&
                    orders?.payment.map((order) =>
                        <OrderCard key={order.id} id={order.id} totalPrice={order.totalPrice}
                                   createdAt={order.createdAt}/>
                    )
                }
            </Grid>
            <Grid item sm={4} xs={4} lg={4}>
                {orders && <ColumnTitle color="primary" title="Доставлено" amount={orders.success.length}/>}
                {orders &&
                    orders?.success.map((order) =>
                        <OrderCard key={order.id} id={order.id} totalPrice={order.totalPrice}
                                   createdAt={order.createdAt}/>
                    )
                }
            </Grid>
            <Grid item sm={4} xs={4} lg={4}>
                {orders && <ColumnTitle color="error" title="Отказано" amount={orders.cancelled.length}/>}

                {orders &&
                    orders?.cancelled.map((order) =>
                        <OrderCard key={order.id} id={order.id} totalPrice={order.totalPrice}
                                   createdAt={order.createdAt}/>
                    )
                }
            </Grid>
        </Grid>
    )
}

export default OrderColumnsView