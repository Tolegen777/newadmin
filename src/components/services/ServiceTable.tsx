import React, {useState} from 'react';
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
        id: 1,
        image: 'as',
        title: 'service',
        price: 10000,
        discount: 10,
    },
    {
        id: 2,
        image: 'as',
        title: 'service',
        price: 10000,
        discount: 10,
    },
    {
        id: 3,
        image: 'as',
        title: 'service',
        price: 10000,
        discount: 10,
    }
]

const activeBtn = {
    width: "160px",
    height: "40px",
    border: "2px solid #8A3FFC",
    borderRadius: "10px",
    fontWeight: "600",
    fontSize: "14px",
    lineHeight: "17px",
    textTransform: "capitalize",
    marginRight: "5px"
}
const inactiveBtn = {
    width: "112px",
    height: "40px",
    border: "1px solid #C3C3C3",
    borderRadius: "10px",
    fontWeight: "400",
    fontSize: "18px",
    lineHeight: "22px",
    letterSpacing: "-0.333333px",
    color: "#C3C3C3",
    textTransform: "capitalize"
}

const ServiceTable:React.FC = () =>{
    const isLoading = false
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const navigate = useNavigate()
    const [itemQueue, setItemQueue] = useState<number|null>(null)


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
                            .map((row,ind) => (
                                <StyledTableRow key={row.id}>
                                    <StyledTableCell>{row.id}</StyledTableCell>
                                    <StyledTableCell><img style={{borderRadius: '5px'}}
                                                          src={`https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.euractiv.com%2Fwp-content%2Fuploads%2Fsites%2F2%2F2022%2F03%2Fright-to-repair.jpg&imgrefurl=https%3A%2F%2Fwww.euractiv.com%2Fsection%2Fdigital%2Fnews%2Fmeps-try-to-gain-first-mover-advantage-on-right-to-repair%2F&tbnid=G9X8dAlkrQRCwM&vet=12ahUKEwi7kIjrwfP4AhXYEXcKHasICcwQMygCegUIARC7AQ..i&docid=rmCR2jUruc2yXM&w=2508&h=1672&q=repair&ved=2ahUKEwi7kIjrwfP4AhXYEXcKHasICcwQMygCegUIARC7AQ`}
                                                          height="50px"
                                                          alt="product-image"/></StyledTableCell>
                                    <StyledTableCell>{row.title}</StyledTableCell>
                                    <StyledTableCell><Chip label={`${row.price} KZT`} variant="outlined"
                                                           color="info"/></StyledTableCell>
                                    <StyledTableCell><Chip label={`${row.discount}%`}/></StyledTableCell>
                                    <StyledTableCell>
                                        <Button variant='outlined' color='primary'
                                                // value={ind}
                                                sx={itemQueue !== row.id? {
                                                    cursor:"pointer",
                                                    width: "160px",
                                                    height: "40px",
                                                    border: "2px solid #8A3FFC",
                                                    borderRadius: "10px",
                                                    fontWeight: "600",
                                                    fontSize: "14px",
                                                    lineHeight: "17px",
                                                    textTransform: "capitalize",
                                                    marginRight: "5px",
                                                    transitionDelay: "0.2s",
                                                    "&:hover":{
                                                        cursor:"pointer",
                                                        border: "2px solid #8A3FFC",
                                                    }
                                                } : {
                                                    width: "112px",
                                                    height: "40px",
                                                    border: "2px solid #C3C3C3",
                                                    borderRadius: "10px",
                                                    fontWeight: "400",
                                                    fontSize: "14px",
                                                    lineHeight: "17px",
                                                    letterSpacing: "-0.333333px",
                                                    color: "#C3C3C3",
                                                    textTransform: "capitalize",
                                                    transitionDelay: "0.2s",
                                                    marginRight: "5px",
                                                }}
                                                onMouseEnter={() => {
                                                    setItemQueue(null)
                                                }}
                                                onMouseOut={() => {
                                                    setItemQueue(null)
                                                }}
                                                onClick={() => navigate('/app/services/one/new')}>
                                            Подробнее
                                        </Button>

                                        <Button variant='outlined'
                                                sx={itemQueue===row.id ? {
                                                    width: "160px",
                                                    height: "40px",
                                                    border: "2px solid #8A3FFC",
                                                    borderRadius: "10px",
                                                    fontWeight: "600",
                                                    fontSize: "14px",
                                                    lineHeight: "17px",
                                                    textTransform: "capitalize",
                                                    // marginRight: "5px",
                                                    transitionDelay: "0.2s",
                                                    "&:hover":{
                                                        border: "2px solid #8A3FFC",
                                                    }
                                                } : {
                                                    width: "112px",
                                                    height: "40px",
                                                    border: "2px solid #C3C3C3",
                                                    borderRadius: "10px",
                                                    fontWeight: "400",
                                                    fontSize: "14px",
                                                    lineHeight: "17px",
                                                    letterSpacing: "-0.333333px",
                                                    color: "#C3C3C3",
                                                    textTransform: "capitalize",
                                                    transitionDelay: "0.2s"
                                                }}
                                                onMouseEnter={() => {
                                                    setItemQueue(row.id)
                                                }}
                                                onMouseOut={() => {
                                                    setItemQueue(null)
                                                }}
                                                onClick={() => {
                                                }}>
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

export default React.memo(ServiceTable)