import AddIcon from '@mui/icons-material/Add';
import {Button, TableContainer, Typography} from '@mui/material';
import {FormikProvider, useFormik} from 'formik';
import React from 'react';
import {useNavigate} from 'react-router';
import {IProductQuery} from '../../types/IProduct';
import ServiceTable from "./ServiceTable";
import Filters from "../common/Filters";


const ServicePage: React.FC = () => {
    const navigate = useNavigate();
    // Filter states
    const formik = useFormik<IProductQuery>({
        initialValues: {
            search: '',
            orderByPrice: 'orderByPriceASC',
            orderByPriceDESC: false,
            orderByPriceASC: true


        },
        onSubmit: (values) => {
            alert(JSON.stringify(values))
        }
    })
    const {values, handleSubmit, handleChange, setFieldValue} = formik;
    return (
        <>
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