import {Box, Button, Grid, Typography, useMediaQuery, useTheme} from '@mui/material'
import React, {useState} from 'react'
import {useParams} from "react-router";
import OrderProductCard from "./OrderProductCard";
import {IOneOrder, IOrdersResponse} from "../../types/types";
import OrderConfirmDialogWindow from "./OrderConfirmDialogWindow";
import {useGetBasketUserDataQuery} from "../../store/rtk-api/baseEndpoints";
import CircularProgress from "@mui/material/CircularProgress";
import {useLocation} from "react-router-dom";
import OrderGeneralInfo from "./OrderGeneralInfo";

type PropsType = {
    orders: IOrdersResponse | undefined,
    handleCreate?(): void
    handleCancelOrder?(): void
    oneOrderData: IOneOrder | undefined
    isLoading?: boolean,
    isLoading2?: boolean,
    isError?: any,
    isSuccess?: boolean,
    isError2?: any,
    isSuccess2?: boolean,
}

const OrderProductsBlock: React.FC<PropsType> = React.memo(({
                                                                handleCreate, handleCancelOrder, oneOrderData,
                                                                isError,
                                                                isError2,
                                                                isLoading,
                                                                isLoading2,
                                                                isSuccess,
                                                                isSuccess2
                                                            }) => {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [isCancelClicked, setCancelClick] = useState(false)
    const [isConfirmClicked, setConfirmClick] = useState(false)
    const [isWindowOpen, setWindowOpen] = useState(false)
    let basketDefault = undefined
    if (oneOrderData && oneOrderData.order.basket) {
        basketDefault = oneOrderData.order.basket.id
    }
    const {data: basketUserData, isLoading: isBasketDataLoading} = useGetBasketUserDataQuery(basketDefault)

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

    return (
        <>
            {isBasketDataLoading && <CircularProgress/>}
            {
                oneOrderData && String(oneOrderData.id) === params.orderId &&
                <OrderGeneralInfo oneOrderData={oneOrderData} basketUserData={basketUserData}/>
            }

            <Typography sx={{fontWeight: 'bold', marginTop: '20px'}}>Информация о
                заказе</Typography>
            {oneOrderData && oneOrderData.products.length !== 0 ? oneOrderData?.products.map(products => {
                    if (String(oneOrderData.id) === params.orderId) {
                        return <>
                            <Grid item sm={12} xs={12} md={9} lg={5}>
                                <OrderProductCard key={products.product.id} id={products.product.id}
                                                  productCount={products.product.quantity && products.product.quantity}
                                                  image={products.product.image}
                                                  price={products.product.price}
                                                  name={products.product.title}/>
                            </Grid>
                        </>
                    }
                }
            ) : <>
                <Typography variant={'h6'} sx={{color: 'red'}}>Товара нет внутри заказа!</Typography>
            </>

            }
            {oneOrderData && oneOrderData?.status === "PAYMENT" && !location.state &&
                <Box sx={{display: "flex", alignItems: "center", gap: "10px"}}
                     justifyContent={isMobile ? "center" : "flex-start"}>
                    <Button onClick={showConfirmWindow}
                            variant="contained"
                            color="primary"
                            size={isMobile ? "small" : "large"}
                            sx={{marginTop: '15px'}}
                    >
                        Подтвердить заказ
                    </Button>
                    {isConfirmClicked && <OrderConfirmDialogWindow
                        title='Вы хотите подтвердить заказ?' buttonTypeText='Подтвердить заказ'
                        handleCreate={handleCreate} isWindowOpen={isWindowOpen}
                        handleClickClose={handleClickClose}
                        isLoading={isLoading}
                        isError={isError}
                        isSuccess={isSuccess}

                    />
                    }
                    <Button
                        onClick={showCancelWindow}
                        variant='outlined' color='primary' sx={{marginTop: '15px'}}
                        size={isMobile ? "small" : "large"}
                    >
                        Отклонить заказ
                    </Button>
                    {isCancelClicked && <OrderConfirmDialogWindow
                        title='Вы хотите отклонить заказ?' buttonTypeText='Отклонить заказ'
                        handleCancelOrder={handleCancelOrder} isWindowOpen={isWindowOpen}
                        handleClickClose={handleClickClose}
                        isLoading2={isLoading2}
                        isError2={isError2}
                        isSuccess2={isSuccess2}
                    />
                    }
                </Box>}

            {oneOrderData && oneOrderData?.status === "SUCCESS" &&
                <>
                    <Typography sx={{fontWeight: 'bold', marginTop: '20px', color: "green"}}>Заказ
                        доставлен!</Typography>
                </>}
            {oneOrderData && oneOrderData?.status === "PAYMENT" && location.state &&
                <>
                    <Typography sx={{fontWeight: 'bold', marginTop: '20px'}}>Заказ
                        оплачен!</Typography>
                </>}

            {oneOrderData && oneOrderData?.status === "CANCELED" &&
                <>
                    <Typography sx={{fontWeight: 'bold', marginTop: '20px', color: 'red'}}>Заказ
                        отменен!</Typography>
                </>}
            {oneOrderData && oneOrderData?.status === "CREATED" &&
                <>
                    <Typography sx={{fontWeight: 'bold', marginTop: '20px'}}>Заказ
                        создан!</Typography>
                </>}
            {oneOrderData && oneOrderData?.status === "ERROR" &&
                <>
                    <Typography sx={{fontWeight: 'bold', marginTop: '20px', color: 'red'}}>Неизвестная
                        ошибка заказа!</Typography>
                </>}

        </>
    )
})


export default OrderProductsBlock

