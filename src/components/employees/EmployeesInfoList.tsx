import React from 'react';
import {CircularProgress} from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import {useTypedSelector} from "../../store";
import {useGetShopQuery} from "../../store/rtk-api/shop-rtk/shop_rtk";
import EmployeesInfoBlock from "./EmployeesInfoBlock";

type PropsType = {
    role: string,
    searchedName: string,
    handleRemoveWindowOpen(email: string): void
}

const EmployeesInfoList: React.FC<PropsType> = ({role, searchedName, handleRemoveWindowOpen}) => {
    const {shop} = useTypedSelector(state => state.auth)
    let shopId = 0
    if (shop) {
        shopId = shop.id
    }
    const {data: shopData, isLoading, error} = useGetShopQuery(shopId)

    return (
        <>
            {isLoading && <CircularProgress/>}
            {error && <div>Error...</div>}

            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableBody>
                        {role === "seller" && shopData && shopData.shop && shopData.shop.owner &&
                            (searchedName && shopData.shop.owner.firstName.toLowerCase().includes(searchedName.toLowerCase()) || shopData.shop.owner.lastName.toLowerCase().includes(searchedName.toLowerCase())) &&
                            <EmployeesInfoBlock user={shopData.shop.owner} roleName={"Управляющий"}
                                                handleRemoveWindowOpen={handleRemoveWindowOpen}/>
                        }

                        {(role === "admin" || role === "all") && shopData && shopData.shop && shopData.shop.admin_users && shopData.shop.admin_users.map(user => {
                            if (user.email === "shop@email.com") {
                                return
                            }
                            if (searchedName && user.firstName.toLowerCase().includes(searchedName.toLowerCase())
                                || user.lastName.toLowerCase().includes(searchedName.toLowerCase())) {
                                return <EmployeesInfoBlock user={user} roleName={"Администратор"}
                                                           handleRemoveWindowOpen={handleRemoveWindowOpen}/>
                            } else if (!searchedName) {
                                return <EmployeesInfoBlock user={user} roleName={"Администратор"}
                                                           handleRemoveWindowOpen={handleRemoveWindowOpen}/>
                            } else return


                        })}{role === "seller" || role === "all" && shopData && shopData.shop && shopData.shop.owner &&
                        (searchedName && shopData.shop.owner.firstName.toLowerCase().includes(searchedName.toLowerCase()) || shopData.shop.owner.lastName.toLowerCase().includes(searchedName.toLowerCase())) &&
                        <EmployeesInfoBlock user={shopData.shop.owner} roleName={"Управляющий"}
                                            handleRemoveWindowOpen={handleRemoveWindowOpen}/>
                    }


                    </TableBody>

                </Table>
            </TableContainer>


        </>


    );
};


export default EmployeesInfoList;