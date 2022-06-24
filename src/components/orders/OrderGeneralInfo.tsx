import {Box, Grid, Typography} from '@mui/material'
import React from 'react'
import {IBasketUser, IOneOrder} from "../../types/types";

const style = {
    fontWeight: "bold"
}
type PropsType = {
    oneOrderData: IOneOrder
    basketUserData: IBasketUser | undefined,
}

const OrderGeneralInfo: React.FC<PropsType> = ({oneOrderData, basketUserData}) => {
    return (
        <Box>
            <Typography sx={{fontWeight: 'bold', marginBottom: '10px'}}>Общая информация о
                заказе</Typography>
            <Grid container spacing={5}>
                <Grid item sm={3} xs={4} lg={2}>Номер заказа:</Grid>
                <Grid item sx={style}>#{oneOrderData.id}</Grid>
            </Grid>
            <Grid container spacing={5}>
                <Grid item sm={3} xs={4} lg={2}>Заказчик:</Grid>
                <Grid item sx={style}>
                    {basketUserData && basketUserData.firstName} {basketUserData && basketUserData.lastName}</Grid>
            </Grid>
            <Grid container spacing={5}>
                <Grid item sm={3} xs={4} lg={2}>Сумма заказа:</Grid>
                <Grid item sx={style}>{oneOrderData.totalPrice} Tг</Grid>
            </Grid>
            <Grid container spacing={5}>
                <Grid item sm={3} xs={4} lg={2}>Адрес доставки:</Grid>
                <Grid item sx={style}>{oneOrderData && oneOrderData.order.city},
                    {oneOrderData && oneOrderData.order.street}</Grid>
            </Grid>
            <Grid container spacing={5}>
                <Grid item sm={3} xs={4} lg={2}>Дата заказа:</Grid>
                <Grid item
                      sx={style}>{oneOrderData && oneOrderData.createdAt.slice(0, 10).split('-').reverse().join('-')}</Grid>

            </Grid>
        </Box>
    )
}

export default OrderGeneralInfo