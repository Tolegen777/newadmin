import {Box, Button, Grid, Typography} from '@mui/material'
import React, {useState} from 'react'
import {useParams} from "react-router";
import OrderProductCard from "./OrderProductCard";
import {IBasketUser, IOneOrder, IOrdersResponse} from "../../types/types";
import OrderConfirmDialogWindow from "./OrderConfirmDialogWindow";
import {useGetBasketUserDataQuery} from "../../store/rtk-api/baseEndpoints";
import CircularProgress from "@mui/material/CircularProgress";


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

    const {data: basketUserData,isLoading} = useGetBasketUserDataQuery(basketDefault)


    const handleClickClose = () => {
        setWindowOpen(false)
    };

    let showCancelWindow = () => {
        setCancelClick(true)
        setWindowOpen(true);

    }
    let showConfirmWindow = () => {

        setConfirmClick(true)
        setWindowOpen(true);

    }

    const params = useParams();


    const style = {
        fontWeight: 'bold',
    };


    return (
        <>
            {isLoading&& <CircularProgress />}
            {
                oneOrderData && String(oneOrderData.id) === params.orderId &&
                <GetOrderInfo oneOrderData={oneOrderData} basketUserData={basketUserData} style={style}/>
            }


            {oneOrderData && oneOrderData.products.length !== 0 ? oneOrderData?.products.map(products => {
                    if (String(oneOrderData.id) === params.orderId) {
                        return <>
                            <Typography sx={{fontWeight: 'bold', marginTop: '20px'}}>Информация о
                                заказе</Typography>
                            <Grid item sm={5} xs={5} lg={5}>
                                <OrderProductCard key = {products.product.id} id={products.product.id}
                                                  productCount={products.product.quantity && products.product.quantity}
                                                  image={products.product.image}
                                                  price={products.product.price}
                                                  name={products.product.title}/>

                            </Grid>
                            {oneOrderData.status === "PAYMENT" &&
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
                                    </Button>{isCancelClicked && <OrderConfirmDialogWindow
                                    title='Отменение заказа' buttonTypeText='Отменить заказ'
                                    handleCancelOrder={handleCancelOrder} isWindowOpen={isWindowOpen}
                                    handleClickClose={handleClickClose}/>}
                                </Box>}

                            {oneOrderData.status === "SUCCESS" &&
                                <Box>
                                    <Typography sx={{fontWeight: 'bold', marginTop: '20px'}}>Заказ
                                        доставлен!</Typography>
                                </Box>}

                            {oneOrderData.status === "CANCELED" &&
                                <Box>
                                    <Typography sx={{fontWeight: 'bold', marginTop: '20px', color:'red'}}>Заказ
                                        отменен!</Typography>
                                </Box>}


                        </>
                    }
                }
            ) : <>
                <Typography sx={{fontWeight: 'bold', marginBottom: '10px'}}>Информация о
                    заказе</Typography>
                <Typography variant={'h6'} sx = {{color:'red'}}>Товара нет внутри заказа!</Typography>
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
                <Grid item sm={3} xs={3} lg={3} sx={style}>{oneOrderData && oneOrderData.createdAt}</Grid>

            </Grid>
        </Box>
    )
}