import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';

import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useGetAllShopOrderQuery} from "../../store/rtk-api/shop-all-orders/shop-all-orders";
import {useTypedSelector} from "../../store";
import StyledTableCell from "../table/StyledTableCell";
import {Chip, CircularProgress, TableHead, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";


const AllOrderTypes = () => {
    const {shop} = useTypedSelector(state => state.auth)
    let shopId = 0
    if (shop) {
        shopId = shop.id
    }

    const {data: allOrders, isLoading, error} = useGetAllShopOrderQuery(shopId)
    const navigate = useNavigate()
    return (
        <>
            <TableContainer component={Paper} sx={{mb: "40px"}}>
                {error && <div>Произошла ошибка!</div>}
                <Table sx={{minWidth: 650,}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">Номер заказа</StyledTableCell>
                            <StyledTableCell align="center">Цена</StyledTableCell>
                            <StyledTableCell align="center">Дата создания</StyledTableCell>
                            <StyledTableCell align="center">Дата обновления</StyledTableCell>
                            {/*<StyledTableCell align="center">Номер заказа</StyledTableCell>*/}
                            <StyledTableCell align="center">Статус</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    {isLoading && <CircularProgress/>}
                    <TableBody>
                        {allOrders && allOrders.map(order => {
                            return <TableRow key={order.id} onClick={() => {
                                navigate(`one/${order.id}`, {state: true})
                            }}
                                             sx={{
                                                 cursor: "pointer",
                                                 border: "2px solid #EBEBEB",
                                                 borderRadius: "50px",
                                                 marginBottom: "50px",
                                                 '&:hover': {
                                                     backgroundColor: "#EBEBEB",
                                                 },
                                             }}
                            >
                                <TableCell align="center"><Typography
                                    sx={{fontWeight: 600}}>#{order.id}</Typography></TableCell>
                                <TableCell align="center"><Chip label={`${order.totalPrice} KZT`} variant="outlined"
                                                                color="info"/></TableCell>
                                <TableCell align="center">{order.createdAt.slice(0, 10)}</TableCell>
                                <TableCell align="center">{order.updatedAt.slice(0, 10)}</TableCell>
                                {/*<TableCell align="center">{order.orderNo}</TableCell>*/}
                                {order.status === "PAYMENT" &&
                                    <TableCell align="center"
                                               sx={{color: "#2196f3", fontWeight: "400px"}}>ОПЛАЧЕН</TableCell>}
                                {order.status === "CREATED" &&
                                    <TableCell align="center"
                                               sx={{color: "#80a4be", fontWeight: "400px"}}>СОЗДАН</TableCell>}
                                {order.status === "SUCCESS" &&
                                    <TableCell align="center"
                                               sx={{color: "#4caf50", fontWeight: "400px"}}>УСПЕШНО
                                        ВЫПОЛНЕН</TableCell>}
                                {order.status === "CANCELED" &&
                                    <TableCell align="center"
                                               sx={{color: "#F08080", fontWeight: "400px"}}>ОТМЕНЕН</TableCell>}
                                {order.status === "ERROR" &&
                                    <TableCell align="center"
                                               sx={{color: "#B22222", fontWeight: "400px"}}>ОШИБКА</TableCell>}
                                {order.status === "DELIVERY" &&
                                    <TableCell align="center"
                                               sx={{color: "#468234", fontWeight: "400px"}}>НА ДОСТАВКЕ</TableCell>}


                            </TableRow>
                        })}

                    </TableBody>

                </Table>
            </TableContainer>
        </>
    );
};

export default AllOrderTypes;