import React from 'react';
import {Box, Button, Stack} from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useTypedSelector} from "../../store";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CustomAlert from "../alert/CustomAlert";


const EmployeesInfoList = () => {
    //const data = useTypedSelector(state => state.auth)


    return (
        <>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableBody>
                    <TableRow>
                        <TableCell>Яна Быкова</TableCell>
                        <TableCell align="right">Управляющий</TableCell>
                        <TableCell align="right">nvjdfnv@gmail.com</TableCell>
                        <TableCell align="right">87075458485</TableCell>
                        <TableCell align="right"><Button variant="contained"
                                                         color="primary"
                                                         size="large"
                                                         sx = {{border:'1px solid black', borderRadius:3, height:'30px',width:'100px' }}
                        >
                            Открыть
                        </Button>
                        </TableCell>
                        <TableCell align="right"><MoreHorizIcon fontSize="large"/></TableCell>
                    </TableRow>
                </TableBody>

            </Table>
        </TableContainer>
        {/*<Box>*/}
        {/*    {data&&data.user&&data.user.roles.map(users=>*/}
        {/*        <div key = {users.id}>*/}
        {/*            <div >{users.id}</div>*/}
        {/*            <div>{users.value}</div>*/}
        {/*            <div>{users.description}</div>*/}
        {/*        </div>*/}

        {/*    )}*/}
        {/*</Box>*/}

 </>


    );
};

export default EmployeesInfoList;