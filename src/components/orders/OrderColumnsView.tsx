import React from 'react'
import {Grid} from '@mui/material';
import ColumnTitle from './ColumnTitle';
import OrderCard from './OrderCard';
import {useGetOrdersQuery} from '../../store/rtk-api/baseEndpoints';
import {useDispatch} from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import {useTypedSelector} from "../../store";


const OrderColumnsView: React.FC = () => {
    let dispatch = useDispatch()
    const {shop} = useTypedSelector(state => state.auth)
    let shopId = 0
    if(shop) {
        shopId = shop.id
    }


    // test

    const {data: orders, isLoading, error} = useGetOrdersQuery(shopId)

    // React.useEffect(() => {
    //     console.log(orders + 'orders');
    //     dispatch(changeOrderStatusThunk(66))
    //     dispatch(changeOrderStatusThunk(64))
    //            dispatch(changeOrderStatusThunk(28))
    //
    // }, [orders])

    return (

        <Grid container spacing={5}>

            {error && <div>то то пошло не так!</div>}
            <Grid item sm={4} xs={4} lg={4}>
                {isLoading&& <CircularProgress />}
                {orders&&<ColumnTitle title="Новые" amount={orders.payment.length}/>}
                {orders &&
                    orders?.payment.map((order) =>
                        <OrderCard key={order.id} id={order.id} totalPrice={order.totalPrice}/>
                    )
                }
            </Grid>
            <Grid item sm={4} xs={4} lg={4}>
                {orders&&<ColumnTitle color="primary" title="Доставлено" amount={orders.success.length}/>}
                {orders &&
                    orders?.success.map((order) =>
                        <OrderCard key={order.id} id={order.id} totalPrice={order.totalPrice}/>
                    )
                }
            </Grid>
            <Grid item sm={4} xs={4} lg={4}>
                {orders&&<ColumnTitle color="error" title="Отказано" amount={orders.cancelled.length}/>}

                {orders &&
                    orders?.cancelled.map((order) =>
                        <OrderCard key={order.id} id={order.id} totalPrice={order.totalPrice}/>
                    )
                }


            </Grid>


        </Grid>
    )
}

export default OrderColumnsView