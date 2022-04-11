import React from 'react';
import {Box, Button, CircularProgress, Stack} from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useTypedSelector} from "../../store";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {useGetShopQuery} from "../../store/rtk-api/shop-rtk/shop_rtk";
import photo from "../../assets/images/user (1).png"

type PropsType = {
    role:string
}

const EmployeesInfoList:React.FC<PropsType> = ({role}) => {
    const {shop} = useTypedSelector(state => state.auth)
    let shopId = 0
    if(shop) {
        shopId = shop.id
    }
    const {data: shopData, isLoading, error} = useGetShopQuery(shopId)




    return (
        <>
            {isLoading&&<CircularProgress/>}
            {error&&<div>Error...</div>}
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableBody>
                    {(role==="admin"||role==="all")&&shopData&&shopData.shop&&shopData.shop.admin_users&&shopData.shop.admin_users.map(user=>{
                        return <TableRow key={user.id}>
                            <TableCell> {user.avatar?<img
                                src={`https://file.adu24.com/${user.avatar}`}
                                alt=""
                                style={{height: '50px', width: 'auto'}}
                            />:<img
                                src={photo}
                                alt=""
                                style={{height: '50px', width: 'auto'}}
                            /> }</TableCell>
                            <TableCell>{user.firstName}, {user.lastName}</TableCell>
                            <TableCell align="right">{"Администратор"}</TableCell>
                            <TableCell align="right">{user.email}</TableCell>
                            <TableCell align="right">{user.phone}</TableCell>
                            <TableCell align="right"><Button variant="contained"
                                                             color="primary"
                                                             size="large"
                                                             sx = {{border:'1px solid black', borderRadius:3, height:'30px',width:'100px',textTransform:'lowercase' }}
                            >
                                Открыть
                            </Button>
                            </TableCell>
                            <TableCell align="right"><MoreHorizIcon fontSize="large"/></TableCell>
                        </TableRow>
                    })}{role==="seller"&&shopData&&shopData.shop&&shopData.shop.owner&& <TableRow key={shopData.shop.owner.id}>
                            <TableCell> {shopData.shop.owner.avatar?<img
                                src={`https://file.adu24.com/${shopData.shop.owner.avatar}`}
                                alt=""
                                style={{height: '50px', width: 'auto'}}
                            />:<img
                                src={photo}
                                alt=""
                                style={{height: '50px', width: 'auto'}}
                            /> }</TableCell>
                            <TableCell>{shopData.shop.owner.firstName}, {shopData.shop.owner.lastName}</TableCell>
                            <TableCell align="right">{"Управляющий"}</TableCell>
                            <TableCell align="right">{shopData.shop.owner.email}</TableCell>
                            <TableCell align="right">{shopData.shop.owner.phone}</TableCell>
                            <TableCell align="right"><Button variant="contained"
                                                             color="primary"
                                                             size="large"
                                                             sx = {{border:'1px solid black', borderRadius:3, height:'30px',width:'100px',textTransform:'lowercase' }}>
                                Открыть
                            </Button>
                            </TableCell>
                            <TableCell align="right"><MoreHorizIcon fontSize="large"/></TableCell>
                        </TableRow>}

                </TableBody>

            </Table>
        </TableContainer>


 </>


    );
};

export default EmployeesInfoList;