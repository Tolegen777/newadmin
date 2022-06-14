import {Box, Button, Grid, Typography} from '@mui/material'
import React, {useState} from 'react'
import {useParams} from "react-router";
import OrderProductCard from "./OrderProductCard";
import {IBasketUser, IOneOrder, IOrdersResponse} from "../../types/types";
import OrderConfirmDialogWindow from "./OrderConfirmDialogWindow";
import {useGetBasketUserDataQuery} from "../../store/rtk-api/baseEndpoints";
import CircularProgress from "@mui/material/CircularProgress";
import {useLocation} from "react-router-dom";




type PropsType = {
    orders: IOrdersResponse | undefined,
    handleCreate?(): void
    handleCancelOrder?(): void
    oneOrderData: IOneOrder | undefined
}


const OrderProductsBlock: React.FC<PropsType> = React.memo(({handleCreate, handleCancelOrder, oneOrderData}) => {
    let [isCancelClicked, setCancelClick] = useState(false)
    let [isConfirmClicked, setConfirmClick] = useState(false)
    let [isWindowOpen, setWindowOpen] = useState(false)
    let basketDefault = undefined
    if (oneOrderData && oneOrderData.order.basket) {
        basketDefault = oneOrderData.order.basket.id
    }

    const {data: basketUserData, isLoading} = useGetBasketUserDataQuery(basketDefault)

    const handleClickClose = () => {
        setWindowOpen(false)
    };

    let showCancelWindow = () => {
        setCancelClick(true)
        setWindowOpen(true);
        setConfirmClick(false)
    }
    let showConfirmWindow = () => {
        setConfirmClick(true)
        setWindowOpen(true);
        setCancelClick(false)
    }

    const params = useParams();
    const location = useLocation()
    console.log(location)
    // console.log(!state)
    console.log(!location.state)

    const style = {
        fontWeight: 'bold',
    };

    console.log(oneOrderData)
    console.log(basketUserData)
    console.log("oneOrderData")


    return (
        <>
            {isLoading && <CircularProgress/>}
            {
                oneOrderData && String(oneOrderData.id) === params.orderId &&
                <GetOrderInfo oneOrderData={oneOrderData} basketUserData={basketUserData} style={style}/>
            }

            <Typography sx={{fontWeight: 'bold', marginTop: '20px'}}>Информация о
                заказе</Typography>
            {oneOrderData && oneOrderData.products.length !== 0 ? oneOrderData?.products.map(products => {
                    if (String(oneOrderData.id) === params.orderId) {
                        return <>
                            <Grid item sm={5} xs={5} lg={5}>
                                <OrderProductCard key={products.product.id} id={products.product.id}
                                                  productCount={products.product.quantity && products.product.quantity}
                                                  image={products.product.image}
                                                  price={products.product.price}
                                                  name={products.product.title}
                                />

                            </Grid>
                            {oneOrderData.status === "PAYMENT" && !location.state &&
                                <Box>
                                    <Button onClick={showConfirmWindow}
                                            variant="contained"
                                            color="primary"
                                            size="large"
                                            sx={{marginTop: '15px'}}
                                        // disabled={isLoading}
                                    >
                                        Подтвердить заказ
                                    </Button>
                                    {isConfirmClicked && <OrderConfirmDialogWindow
                                        title='Подтверждение заказа' buttonTypeText='Подтвердить заказ'
                                        handleCreate={handleCreate} isWindowOpen={isWindowOpen}
                                        handleClickClose={handleClickClose}/>}
                                    <Button
                                        onClick={showCancelWindow}
                                        variant='outlined' color='primary' sx={{
                                        borderWidth: '2px', fontWeight: 600,
                                        width: '220px', height: '43px', marginLeft: '5px', marginTop: '15px'
                                    }}>
                                        Отклонить заказ
                                    </Button>
                                    {isCancelClicked && <OrderConfirmDialogWindow
                                        title='Отклонение заказа' buttonTypeText='Отклонить заказ'
                                        handleCancelOrder={handleCancelOrder} isWindowOpen={isWindowOpen}
                                        handleClickClose={handleClickClose}/>}
                                </Box>}

                            {oneOrderData.status === "SUCCESS" &&
                                <Box>
                                    <Typography sx={{fontWeight: 'bold', marginTop: '20px'}}>Заказ
                                        доставлен!</Typography>
                                </Box>}
                            {oneOrderData.status === "PAYMENT" && location.state &&
                                <Box>
                                    <Typography sx={{fontWeight: 'bold', marginTop: '20px'}}>Заказ
                                        оплачен!</Typography>
                                </Box>}

                            {oneOrderData.status === "CANCELED" &&
                                <Box>
                                    <Typography sx={{fontWeight: 'bold', marginTop: '20px', color: 'red'}}>Заказ
                                        отменен!</Typography>
                                </Box>}
                            {oneOrderData.status === "CREATED" &&
                                <Box>
                                    <Typography sx={{fontWeight: 'bold', marginTop: '20px'}}>Заказ
                                        создан!</Typography>
                                </Box>}
                            {oneOrderData.status === "ERROR" &&
                                <Box>
                                    <Typography sx={{fontWeight: 'bold', marginTop: '20px', color: 'red'}}>Неизвестная ошибка заказа!</Typography>
                                </Box>}
                        </>
                    }
                }
            ) : <>
                <Typography variant={'h6'} sx={{color: 'red'}}>Товара нет внутри заказа!</Typography>
            </>

            }

        </>
    )
})


export default OrderProductsBlock

type PropsType2 = {

    oneOrderData: IOneOrder
    basketUserData: IBasketUser | undefined,
    style: { fontWeight: string }
}

const GetOrderInfo: React.FC<PropsType2> = ({oneOrderData, basketUserData, style}) => {
    return (
        <Box>
            <Typography sx={{fontWeight: 'bold', marginBottom: '10px'}}>Общая информация о
                заказе</Typography>
            <Grid container spacing={5}>
                <Grid item sm={3} xs={3} lg={3}>Номер заказа</Grid>
                <Grid item sm={3} xs={3} lg={3} sx={style}>#{oneOrderData.id}</Grid>
            </Grid>
            <Grid container spacing={5}>
                <Grid item sm={3} xs={3} lg={3}>Заказчик</Grid>
                <Grid item sm={3} xs={3} lg={3} sx={style}>
                    {basketUserData && basketUserData.firstName} {basketUserData && basketUserData.lastName}</Grid>
            </Grid>
            <Grid container spacing={5}>
                <Grid item sm={3} xs={3} lg={3}>Сумма заказа</Grid>
                <Grid item sm={3} xs={3} lg={3} sx={style}>{oneOrderData.totalPrice} Tг</Grid>
            </Grid>
            <Grid container spacing={5}>
                <Grid item sm={3} xs={3} lg={3}>Адрес доставки</Grid>
                <Grid item sm={3} xs={3} lg={3} sx={style}>{oneOrderData && oneOrderData.order.city},
                    {oneOrderData && oneOrderData.order.street}</Grid>
            </Grid>
            <Grid container spacing={5}>
                <Grid item sm={3} xs={3} lg={3}>Дата заказа</Grid>
                <Grid item sm={3} xs={3} lg={3} sx={style}>{oneOrderData && oneOrderData.createdAt.slice(0,10)}</Grid>

            </Grid>
        </Box>
    )
}