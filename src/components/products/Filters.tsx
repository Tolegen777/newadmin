import {
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    Grid,
    InputAdornment,
    InputLabel,
    MenuItem,
    NativeSelect,
    Select,
    Stack,
    TextField,
    Typography
} from '@mui/material'
import React, {FC} from 'react'
import {Field, useFormik} from 'formik';
import SearchIcon from '@mui/icons-material/Search';
import {useDispatch} from 'react-redux';
import {fetchCategories} from '../../store/product/product.action';
import {useTypedSelector} from '../../store';
import {IProductQuery} from '../../types/IProduct';

interface Props {
    filters: IProductQuery
    handleChange: (val: any) => void
    handleSubmit: () => void
    setFieldValue(name: string, bool: boolean): void
}

// const mobileTextField

const Filters: FC<Props> = ({filters, handleChange, handleSubmit, setFieldValue}) => {
    const dispatch = useDispatch();
    const {search,priceFrom, priceTo,orderByDate,orderByPrice} = filters;

    React.useEffect(() => {
        dispatch(fetchCategories());
    }, [])
    const handleFilterSubmit = () => {
        if (orderByDate==="orderByDateDESC"){
            setFieldValue('orderByDateDESC',true)
            setFieldValue("orderByDateASC",false)
        }
        if (orderByDate==="orderByDateASC"){
            setFieldValue('orderByDateDESC',false)
            setFieldValue("orderByDateASC",true)
        }
        if (orderByPrice==="orderByPriceDESC"){
            setFieldValue('orderByPriceDESC',true)
            setFieldValue("orderByPriceASC",false)
        }
        if (orderByPrice==="orderByPriceASC"){
            setFieldValue('orderByPriceDESC',false)
            setFieldValue("orderByPriceASC",true)
        }

        handleSubmit()
    }




    return (
        <Grid container spacing={2}>
            <Grid item xs={12} lg={10}>
                <Grid container spacing={1} alignItems="center">
                    <Grid item alignItems="center" lg={5} xs={12} sm={12} md={12}>
                        <TextField
                            variant="outlined"
                            size="small"
                            fullWidth
                            placeholder="Поиск по Артикул, название товара..."
                            name="search"
                            value={search}
                            onChange={handleChange}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon/>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                    <Grid item xs>
                        <Stack direction={'row'} alignItems={'center'} >
                            <FormControl sx={{margin:"10px"}}>
                                <InputLabel id="demo-simple-select-label">Дата создания</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    value={orderByDate}
                                    label="Дата создания"
                                    onChange={handleChange}
                                    name={"orderByDate"}
                                >
                                    <MenuItem value={"orderByDateASC"}>Сначала новые</MenuItem>
                                    <MenuItem value={"orderByDateDESC"}>Сначала старые</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl sx={{margin:"10px"}}>
                                <InputLabel id="demo-simple-select-label2">Цена</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label2"
                                    value={orderByPrice}
                                    label="Цена"
                                    onChange={handleChange}
                                    name={"orderByPrice"}
                                >
                                    <MenuItem value={"orderByPriceASC"}>Сначала дешевые</MenuItem>
                                    <MenuItem value={"orderByPriceDESC"}>Сначала дорогие</MenuItem>
                                </Select>
                            </FormControl>
                        </Stack>

                    </Grid>

                </Grid>
            </Grid>
            <Stack sx={{justifyContent:"center", margin:"0 auto"}}
            >
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleFilterSubmit}

                >
                    Поиск
                </Button>
            </Stack>
        </Grid>
    )
}

export default Filters
