import {Box, Button, Grid, Typography} from '@mui/material'
import React, {useState} from 'react'
import {useParams} from "react-router";
import {useDispatch} from "react-redux";
import OrderProductCard from "./OrderProductCard";
import {IOrderShop, IOrdersResponse} from "../../types/types";
import {useNavigate} from "react-router-dom";
import OrderConfirmDialogWindow from "./OrderConfirmDialogWindow";


type PropsType = {
    orders: IOrdersResponse | undefined,
    status: IOrderShop[] | undefined,
    handleCreate?(): void
    handleCancelOrder?(): void
}

const OrderProductsBlock: React.FC<PropsType> = ({orders, status, handleCreate, handleCancelOrder}) => {

    const navigate = useNavigate();
    let [isCancelClicked, setCancelClick] = useState(false)
    let [isConfirmClicked, setConfirmClick] = useState(false)
    let [isWindowOpen,setWindowOpen] = useState(false)
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

            {orders && status && status.map(order => {
                    if (String(order.id) === params.orderId) {
                        if (order.products.length !== 0) {
                            return <Box>
                                <Typography sx={{fontWeight: 'bold', marginBottom: '10px'}}>Общая информация о
                                    заказе</Typography>
                                <Grid container spacing={5}>
                                    <Grid item sm={3} xs={3} lg={3}>Номер заказа</Grid>
                                    <Grid item sm={3} xs={3} lg={3} sx={style}>#{order.id}</Grid>
                                </Grid>
                                <Grid container spacing={5}>
                                    <Grid item sm={3} xs={3} lg={3}>Заказчик</Grid>
                                    <Grid item sm={3} xs={3} lg={3} sx={style}>Толеген Мукан</Grid>
                                </Grid>
                                <Grid container spacing={5}>
                                    <Grid item sm={3} xs={3} lg={3}>Сумма заказа</Grid>
                                    <Grid item sm={3} xs={3} lg={3} sx={style}>{order.totalPrice} T</Grid>
                                </Grid>
                                <Grid container spacing={5}>
                                    <Grid item sm={3} xs={3} lg={3}>Адрес доставки</Grid>
                                    <Grid item sm={3} xs={3} lg={3} sx={style}>Сейфуллина 12</Grid>
                                </Grid>
                                <Grid container spacing={5}>
                                    <Grid item sm={3} xs={3} lg={3}>Дата заказа</Grid>
                                    <Grid item sm={3} xs={3} lg={3} sx={style}>24 авг 2022</Grid>
                                </Grid>
                            </Box>

                        } else return <>
                            <Typography sx={{fontWeight: 'bold', marginBottom: '10px'}}>Общая информация о
                                заказе</Typography>
                            <div>Товара нет внутри заказа!</div>
                        </>

                    }
                }
            )
            }

            {orders && status && status.map(order => {

                    if (String(order.id) === params.orderId) {
                        if (order.products.length === 0) {
                            return
                        } else return (
                            order.products.map(orderProduct => {
                                    return (
                                        <>
                                            <Typography sx={{fontWeight: 'bold', marginTop: '20px'}}>Информация о
                                                заказе</Typography>
                                            <Grid item sm={5} xs={5} lg={5}>
                                                <OrderProductCard id={orderProduct.product.id}
                                                                  productCount={orderProduct.product.quantity}
                                                                  image={orderProduct.product.image}
                                                                  price={orderProduct.product.price}/>
                                            </Grid>
                                            {orderProduct.status === "PAYMENT" &&
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
                                                        handleClickClose = {handleClickClose}/>}
                                                    <Button
                                                        onClick={showCancelWindow}
                                                        variant='outlined' color='primary' sx={{
                                                        borderWidth: '2px', fontWeight: 600,
                                                        width: '220px', height: '43px', marginLeft: '5px', marginTop: '15px'
                                                    }}>
                                                        Отклонить заказ
                                                    </Button>{isCancelClicked && <OrderConfirmDialogWindow
                                                    title='Отменение заказа' buttonTypeText='Отменить заказ'
                                                    handleCancelOrder={handleCancelOrder } isWindowOpen={isWindowOpen}
                                                handleClickClose = {handleClickClose}/>}
                                                </Box>}

                                            {orderProduct.status === "SUCCESS" &&
                                                <Box>
                                                    <Typography sx={{fontWeight: 'bold', marginTop: '20px'}}>Заказ
                                                        доставлен!</Typography>
                                                </Box>}

                                            {orderProduct.status === "CANCELED" &&
                                                <Box>
                                                    <Typography sx={{fontWeight: 'bold', marginTop: '20px'}}>Заказ
                                                        отменен!</Typography>
                                                </Box>}


                                        </>

                                    )

                                }
                            )
                        )
                    }
                }
            )
            }

        </>
    )
}

export default OrderProductsBlock