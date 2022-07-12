import React from 'react';
import {Button, Chip, Table, TableBody, TableHead} from "@mui/material";
import StyledTableRow from "../table/StyledTableRow";
import StyledTableCell from "../table/StyledTableCell";
import TableLoadingMockup from "../table/TableLoadingMockup";
import {useNavigate} from "react-router-dom";

const mapping = {
    'id': 'Артикул',
    'image': 'Фото',
    'title': 'Название',
    // 'smallDesc': 'Описание',
    'price': 'Цена',
    'discount': 'Скидка',
}
const items = [
    {
        id:1,
        image:'as',
        title:'service',
        price:10000,
        discount:10,
    },
    {
        id:2,
        image:'as',
        title:'service',
        price:10000,
        discount:10,
    },
    {
        id:3,
        image:'as',
        title:'service',
        price:10000,
        discount:10,
    }
]

const ServiceTable = () => {
    const isLoading = false
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const navigate = useNavigate()
    return (
        <>
            <Table>
                <TableHead>
                    <StyledTableRow>
                        {Object.values(mapping).map((title, idx) => {
                            return (
                                <StyledTableCell key={idx} align={"left"}>{title}</StyledTableCell>
                            )
                        })}
                        <StyledTableCell align={"left"}>Действие</StyledTableCell>
                    </StyledTableRow>
                </TableHead>
                <TableBody>
                    {isLoading ?
                        <TableLoadingMockup cellCount={6} rowCount={rowsPerPage}/>
                        :
                        items
                            .map((row) => (
                                <StyledTableRow key={row.id}>
                                    <StyledTableCell>{row.id}</StyledTableCell>
                                    <StyledTableCell><img style={{borderRadius: '5px'}}
                                                          src={`https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.euractiv.com%2Fwp-content%2Fuploads%2Fsites%2F2%2F2022%2F03%2Fright-to-repair.jpg&imgrefurl=https%3A%2F%2Fwww.euractiv.com%2Fsection%2Fdigital%2Fnews%2Fmeps-try-to-gain-first-mover-advantage-on-right-to-repair%2F&tbnid=G9X8dAlkrQRCwM&vet=12ahUKEwi7kIjrwfP4AhXYEXcKHasICcwQMygCegUIARC7AQ..i&docid=rmCR2jUruc2yXM&w=2508&h=1672&q=repair&ved=2ahUKEwi7kIjrwfP4AhXYEXcKHasICcwQMygCegUIARC7AQ`} height="50px"
                                                          alt="product-image"/></StyledTableCell>
                                    <StyledTableCell>{row.title}</StyledTableCell>
                                    <StyledTableCell><Chip label={`${row.price} KZT`} variant="outlined"
                                                           color="info"/></StyledTableCell>
                                    <StyledTableCell><Chip label={`${row.discount}%`}/></StyledTableCell>
                                    <StyledTableCell>
                                        <Button variant='outlined' color='primary'
                                                sx={{
                                                    borderWidth: '2px',
                                                    fontWeight: 600,
                                                    width: "120px",
                                                    marginRight: "5px"
                                                }}
                                                onClick={() => navigate('/app/services/one/new')}>
                                            Подробнее
                                        </Button>

                                        <Button variant='contained' color='error'
                                                sx={{borderWidth: '2px', fontWeight: 600, width: "120px"}}
                                                onClick={() => {}}>
                                            Удалить
                                        </Button>
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                </TableBody>
            </Table>
        </>
    )

}

export default ServiceTable