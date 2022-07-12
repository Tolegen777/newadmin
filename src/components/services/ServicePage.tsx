import AddIcon from '@mui/icons-material/Add';
import {Button, TableContainer, Typography} from '@mui/material';
import {FormikProvider, useFormik} from 'formik';
import React from 'react';
import {useNavigate} from 'react-router';
import {IProductQuery} from '../../types/IProduct';
import Filters from "../products/Filters";
import ServiceTable from "./ServiceTable";


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
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
                    <Typography style={{fontSize: "20px", marginBottom: '25px'}}>Услуги</Typography>

                    <Button variant="contained" startIcon={<AddIcon/>}
                            onClick={() => navigate('/app/services/one/new')}>Добавить услугу</Button>
                </div>
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

export default ServicePage;