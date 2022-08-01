import React, {useEffect} from 'react';
import {Chip, Table, TableBody, TableHead, TablePagination} from "@mui/material";
import StyledTableRow from "../table/StyledTableRow";
import StyledTableCell from "../table/StyledTableCell";
import TableLoadingMockup from "../table/TableLoadingMockup";
import {useNavigate} from "react-router-dom";
import SelectingButtons from "../common/SelectingButtons";
import {useDeleteServiceMutation, useGetServicesQuery} from "../../store/rtk-api/service-rtk/service_rtk";
import RemoveWindow from "../common/RemoveWindow";
import {clearFilterData, setFilterData} from "../../store/service/service.slice";
import {useDispatch} from "react-redux";
import {useTypedSelector} from "../../store";
import CustomAlert from "../alert/CustomAlert";

const mapping = {
    'id': 'Артикул',
    'image': 'Фото',
    'title': 'Название',
    'price': 'Цена',
    'discount': 'Скидка',
}

const ServiceTable: React.FC = () => {
    const {isClear, ...filterData} = useTypedSelector(state => state.service)
    const shopId = useTypedSelector(state => state.auth.user?.shops[0].id)
    //debugger
    if (shopId) {
        debugger
    }
    const {data, isLoading, isError} = useGetServicesQuery(filterData, {
        skip: filterData.shopId === null
    })
    const [deleteService, {
        isLoading: deleteLoading,
        isError: deleteError,
        isSuccess: deleteSuccess,
        error: deleteErrorMessage
    }] = useDeleteServiceMutation()
    const dispatch = useDispatch()
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [isOpen, setOpen] = React.useState(false);
    const [deletingId, setDeletingId] = React.useState<number | null>(null);
    const navigate = useNavigate()
    const [page, setPage] = React.useState(0);
    const handleWindowOpen = (id: number) => {
        setOpen(true)
        setDeletingId(id)
    }
    const closeWindow = () => {
        setOpen(false)
    }
    // Pagination actions
    const handleChangePage = (event: unknown, newPage: number) => {
        debugger
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        debugger
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    useEffect(() => {
        debugger
        if (shopId) {
            dispatch(setFilterData({page, limit: rowsPerPage, shopId}))
        }

    }, [page, rowsPerPage, shopId])

    useEffect(() => {
        return () => {
            if (!isClear) {
                debugger
                dispatch(clearFilterData())
            }
        }
    }, [isClear])
    console.log(page)

    return (
        <>
            {isError && <CustomAlert title={'Ошибка'} status={"error"} message={'Что то пошло не так'}/>}

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
                        data?.services
                            .map((service, ind) => (
                                <StyledTableRow key={service.id}>
                                    <StyledTableCell>{service.id}</StyledTableCell>
                                    <StyledTableCell><img style={{borderRadius: '5px'}}
                                                          src={service.avatar ? `https://file.adu24.com/${service.avatar}` : ''}
                                                          height="50px"
                                    /></StyledTableCell>
                                    <StyledTableCell>{service.title}</StyledTableCell>
                                    <StyledTableCell><Chip label={`${service.price} KZT`} variant="outlined"
                                                           color="info"/></StyledTableCell>
                                    <StyledTableCell><Chip label={`${service.discount}%`}/></StyledTableCell>
                                    <StyledTableCell>
                                        <SelectingButtons id={service.id} firstBtnName={"Подробнее"}
                                                          secondBtnName={"Удалить"}
                                                          firstAction={() => navigate(`/app/services/one/${service.id}`)}
                                                          secondAction={() => {
                                                              handleWindowOpen(service.id)
                                                          }}/>
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={data?.count || 0}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage="Товаров на одной странице:"
                sx={{marginBottom: "10px"}}
            />
            {isOpen && deletingId && <RemoveWindow
                isWindowOpen={isOpen} closeWindow={closeWindow}
                isLoading={deleteLoading} isError={deleteError} isSuccess={deleteSuccess}
                handleDelete={deleteService}
                id={deletingId}
                titleQuestion={"Вы точно хотите удалить услугу?"}
                errorMessage={deleteErrorMessage}
            />}
        </>
    )

}

export default React.memo(ServiceTable)