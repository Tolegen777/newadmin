import React from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import photo from "../../assets/images/user (1).png";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import {IAdminRole} from "../../types/types";

type PropsType = {
    user: IAdminRole,
    roleName:string,
    handleRemoveWindowOpen?():void
}

const EmployeesInfoBlock:React.FC<PropsType> = ({user,roleName,handleRemoveWindowOpen}) => {

    return  <TableRow key={user.id}>
        <TableCell> {user.avatar ? <img
            src={`https://file.adu24.com/${user.avatar}`}
            alt=""
            style={{height: '50px', width: 'auto'}}
        /> : <img
            src={photo}
            alt=""
            style={{height: '50px', width: 'auto'}}
        />}</TableCell>
        <TableCell>{user.firstName}, {user.lastName}</TableCell>
        <TableCell align="right">{roleName}</TableCell>
        <TableCell align="right">{user.email}</TableCell>
        <TableCell align="right">{user.phone}</TableCell>
        {
            roleName==="Администратор"&&<TableCell align="right"><MoreHorizIcon fontSize="large" cursor={"pointer"} onClick={handleRemoveWindowOpen}/></TableCell>
        }


    </TableRow>

}

export default EmployeesInfoBlock