import React from 'react'
import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import ColumnTitle from './ColumnTitle';
import OrderCard from './OrderCard';
import { useGetMyShopQuery } from '../../redux/services/auth';
import { useGetOrdersQuery } from '../../redux/services/order';

const OrderColumnsView: React.FC = () => {
  const { data: shop } = useGetMyShopQuery('shop');
  const { data: orders, isLoading } = useGetOrdersQuery(shop ? shop[0].id : 7)

  React.useEffect(() => {
    console.log(orders);
  }, [orders])

  return (
    <Grid container spacing={5}>
      <Grid item sm={4} xs={4} lg={4}>
        <ColumnTitle title="Новые" amount={3} />
        {orders &&
          orders?.payment.map((order) => {
            return order.products.map((orderProduct) => (
              <OrderCard id={orderProduct.product.id} image={orderProduct.product.image} title={orderProduct.product.title} />
            ))
          })
        }
      </Grid>
      <Grid item sm={4} xs={4} lg={4}>
        <ColumnTitle color="primary" title="Доставлено" amount={5} />
        {orders &&
          orders?.success.map((order) => {
            return order.products.map((orderProduct) => (
              <OrderCard id={orderProduct.product.id} image={orderProduct.product.image} title={orderProduct.product.title} />
            ))
          })
        }
      </Grid>
      <Grid item sm={4} xs={4} lg={4}>
        <ColumnTitle color="error" title="Отказано" amount={1} />
        {orders &&
          orders?.cancelled.map((order) => {
            return order.products.map((orderProduct) => (
              <OrderCard id={orderProduct.product.id} image={orderProduct.product.image} title={orderProduct.product.title} />
            ))
          })
        }
      </Grid>
    </Grid>
  )
}

export default OrderColumnsView

