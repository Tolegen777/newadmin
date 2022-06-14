import AddIcon from '@mui/icons-material/Add';
import {Button, Chip, Table, TableBody, TableContainer, TableHead, TablePagination, Typography} from '@mui/material';
import {FormikProvider, useFormik} from 'formik';
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router';
import {useTypedSelector} from '../../store';
import {fetchProducts} from '../../store/product/product.action';
import {IProductQuery} from '../../types/IProduct';
import StyledTableCell from '../table/StyledTableCell';
import StyledTableRow from '../table/StyledTableRow';
import TableLoadingMockup from '../table/TableLoadingMockup';
import Filters from './Filters';
import CustomAlert from "../alert/CustomAlert";
import {useRemoveProductMutation} from "../../store/rtk-api/removeProduct-rtk/removeProduct-rtk";
import RemoveProductWindow from "./RemoveProductWindow";


const mapping = {
    'id': 'Артикул',
    'image': 'Фото',
    'title': 'Название',
    // 'smallDesc': 'Описание',
    'price': 'Цена',
    'discount': 'Скидка',
}

const ProductsTable: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {products, isLoading} = useTypedSelector(state => state.product);

    // React.useEffect(() => {
    //     console.log(products)
    // }, [products])

    const [removeProduct, {
        isLoading: deleteLoading,
        isError: deletingProductError,
        isSuccess
    }] = useRemoveProductMutation()

    // Filter states
    const formik = useFormik<IProductQuery>({
        initialValues: {
            categoryId: '',
            brandId: '',
            bestseller: false,
            almostFree: false,
            search: '',
            tagId: '',
            priceFrom: '',
            priceTo: '',
            block: false,
            confirm: true
        },
        onSubmit: (values) => {
            const query = {} as IProductQuery;
            dispatch(fetchProducts({...values, limit: rowsPerPage, page: page + 1}));
        }
    })
    const {values, handleSubmit, handleChange} = formik;

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    //deleting
    const [isOpen, setOpen] = useState(false)
    const [deletingId, setDeletingId] = useState<number>()

    const handleWindowOpen = (id:number) => {
        setOpen(true)
        setDeletingId(id)
    }

    const closeWindow = () => {
        setOpen(false)
    }

    const [isSuccessfulDeleting, setSuccessfullDeleting] = useState(false)
    const handleDeleteProduct = (id: number) => {
        removeProduct(id).then(() => {
            dispatch(fetchProducts({...values, limit: rowsPerPage, page: page + 1}));
        })
    }

    // Pagination actions
    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    React.useEffect(() => {
        if (deletingProductError) {
            setSuccessfullDeleting(true)
        }
    }, [deletingProductError])

    React.useEffect(() => {
        dispatch(fetchProducts({...values, limit: rowsPerPage, page: page + 1}));
    }, [page, rowsPerPage])

    return (
        <>
            <TableContainer>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
                    <Typography style={{fontSize: "20px", marginBottom: '25px'}}>Инвентарь товаров</Typography>
                    {isSuccessfulDeleting &&
                        <CustomAlert title={""} status="error" message="Произошла ошибка при удалений товара"/>}

                    <Button variant="contained" startIcon={<AddIcon/>}
                            onClick={() => navigate('/app/products/one/new')}>Создать товар</Button>
                </div>
                <FormikProvider value={formik}>
                    <Filters
                        filters={values}
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                    />
                </FormikProvider>
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
                            products?.products
                                .map((row) => (
                                    <StyledTableRow key={row.id}>
                                        <StyledTableCell>{row.id}</StyledTableCell>
                                        <StyledTableCell><img style={{borderRadius: '5px'}}
                                                              src={`https://file.adu24.com/${row.image}`} height="50px"
                                                              alt="product-image"/></StyledTableCell>
                                        <StyledTableCell>{row.title}</StyledTableCell>
                                        <StyledTableCell><Chip label={`${row.price} KZT`} variant="outlined"
                                                               color="info"/></StyledTableCell>
                                        <StyledTableCell><Chip label={`${row.discount}%`}/></StyledTableCell>
                                        <StyledTableCell>
                                            <Button variant='outlined' color='primary'
                                                    sx={{borderWidth: '2px', fontWeight: 600, width:"120px", marginRight:"5px"}}
                                                    onClick={() => navigate(`/app/products/one/${row.id}`)}>
                                                Подробнее
                                            </Button>

                                            <Button variant='contained' color='error'
                                                    sx={{borderWidth: '2px', fontWeight: 600, width:"120px"}}
                                                    onClick={() => handleWindowOpen(row.id)}>
                                                Удалить
                                            </Button>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={products?.count || 0}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage="Товаров на одной странице:"
            />
            {isOpen&&deletingId&&<RemoveProductWindow
                isWindowOpen={isOpen} closeWindow={closeWindow}
                isLoading={deleteLoading} isError={deletingProductError} isSuccess={isSuccess} handleDeleteProduct={handleDeleteProduct}
            id={deletingId}/>}
        </>
    )
}

export default ProductsTable;