import {TableContainer} from '@mui/material';
import {FormikProvider, useFormik} from 'formik';
import React, {useEffect} from 'react';
import {IServiceQuery} from '../../types/IProduct';
import ServiceTable from "./ServiceTable";
import Filters from "../common/Filters";
import {useTypedSelector} from "../../store";
import {useDispatch} from "react-redux";
import {setFilterData} from "../../store/service/service.slice";
import {useGetCategoriesQuery} from "../../store/rtk-api/baseEndpoints";
import {setCategories} from "../../store/category/category.slice";
import CustomAlert from "../alert/CustomAlert";


const ServicePage: React.FC = () => {
    const {data: categories, isError: categoriesError} = useGetCategoriesQuery('service')
    const dispatch = useDispatch()
    // Filter states
    const {search, categoryId, page, limit} = useTypedSelector(state => state.service)
    const formik = useFormik<IServiceQuery>({
        initialValues: {
            search: search,
            categoryId: categoryId,
            page: page,
            limit: limit,
            orderByPrice: 'orderByPriceASC',
            orderByPriceDESC: false,
            orderByPriceASC: true
        },
        onSubmit: (values) => {
            dispatch(setFilterData(values))
        }
    })
    const {values, handleSubmit, handleChange, setFieldValue} = formik;
    useEffect(() => {
        if (categories) {
            dispatch(setCategories(categories))
        }
    }, [categories])
    return (
        <>
            {categoriesError &&
                <CustomAlert message={'Произошла ошибка при загрузке категорий'} status={'error'} title={'Ошибка'}/>}
            <TableContainer>
                <FormikProvider value={formik}>
                    <Filters
                        component={"services"}
                        filters={values}
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                        setFieldValue={setFieldValue}
                    />
                </FormikProvider>
                <ServiceTable/>
            </TableContainer>

        </>
    )
}

export default React.memo(ServicePage);