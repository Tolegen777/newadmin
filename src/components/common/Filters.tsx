import {FormControl, Grid, InputAdornment, Stack, TextField, Typography, useMediaQuery, useTheme} from '@mui/material'
import React, {FC} from 'react'
import SearchIcon from '@mui/icons-material/Search';
import {useDispatch} from 'react-redux';
import {fetchCategories} from '../../store/product/product.action';
import {IProductQuery} from '../../types/IProduct';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CustomSelect from "./CustomSelect";
import {StyledSearchBtn} from "./Buttons";
import {clearOnSearching, unsetClear} from "../../store/service/service.slice";
import {useTypedSelector} from "../../store";
import {IItems} from "../../types/types";

interface Component {
    value: "products" | "services"
}

interface Props {
    component: Component["value"]
    filters: IProductQuery | any
    handleChange: (val: any) => void
    handleSubmit: () => void

    setFieldValue(name: string, bool: boolean): void
}

const prices = [
    {
        name: "Сначала дешевые",
        value: "orderByPriceASC"
    },
    {
        name: "Сначала дорогие",
        value: "orderByPriceDESC"
    }
]

const orderDates = [
    {
        name: "Сначала новые",
        value: "orderByDateASC"
    },
    {
        name: "Сначала старые",
        value: "orderByDateDESC"
    }
]
const Filters: FC<Props> = ({component, filters, handleChange, handleSubmit, setFieldValue}) => {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const dispatch = useDispatch();
    const {search, orderByDate, orderByPrice} = filters;
    //--categories for select element
    const {serviceCategories} = useTypedSelector(state => state.category)
    let categories: IItems[] = [{value: -1, name: 'Все категорий'}]
    if (serviceCategories.length > 0) {
        categories = [...categories, ...serviceCategories.map(i => {
                return {
                    value: i.id,
                    name: i.name
                }
            }
        )]
    }
    //--
    React.useEffect(() => {
        if (component === 'products') {
            dispatch(fetchCategories());
        }

    }, [])
    const handleProductFilterSubmit = () => {
        if (orderByDate === "orderByDateDESC") {
            setFieldValue('orderByDateDESC', true)
            setFieldValue("orderByDateASC", false)
        }
        if (orderByDate === "orderByDateASC") {
            setFieldValue('orderByDateDESC', false)
            setFieldValue("orderByDateASC", true)
        }
        if (orderByPrice === "orderByPriceDESC") {
            setFieldValue('orderByPriceDESC', true)
            setFieldValue("orderByPriceASC", false)
        }
        if (orderByPrice === "orderByPriceASC") {
            setFieldValue('orderByPriceDESC', false)
            setFieldValue("orderByPriceASC", true)
        }
        handleSubmit()
    }
    const handleServiceFilterSubmit = () => {
        dispatch(unsetClear())
        if (search !== '') {
            dispatch(clearOnSearching())
        }
        handleSubmit()
    }

    const handleFilterSubmit = () => {
        if (component === 'products') {
            handleProductFilterSubmit()
        }
        if (component === 'services') {
            handleServiceFilterSubmit()
        }
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
                            placeholder={component === "products" ? "Поиск по Артикул, название товара..." : "Название услуги"}
                            name="search"
                            value={search}
                            onChange={handleChange}
                            sx={{
                                input: {
                                    fontWeight: "400",
                                    fontSize: "16px",
                                    lineHeight: "17px",
                                    letterSpacing: "0.02em",
                                    color: "#5e5d5d",
                                }, backgroundColor: "#EFF3F9", borderRadius: "10px"
                            }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon sx={{color: "#8A3FFC"}}/>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                    <Grid item xs>
                        <Stack direction={'row'} alignItems={'center'}>
                            {component === "services" && <FormControl sx={{margin: "10px"}}>
                                <CustomSelect
                                    value={filters.categoryId === undefined ? -1 : filters.categoryId}
                                    name={"categoryId"}
                                    handleChange={handleChange}
                                    items={categories.length > 0 ? categories : undefined} icon={KeyboardArrowDownIcon}
                                    height={isMobile ? "50px" : "40px"}
                                    width={isMobile ? "120px" : "210px"} bRadius={"10px"}/>
                            </FormControl>
                            }
                            {component === "products" && <>
                                <Typography sx={{
                                    fontWeight: "600",
                                    fontSize: "14px",
                                    lineHeight: "17px",
                                    color: "#C3C3C3"
                                }}>Дата: </Typography>
                                <FormControl sx={{margin: "10px"}}>
                                    <CustomSelect value={orderByDate} handleChange={handleChange} items={orderDates}
                                                  icon={KeyboardArrowDownIcon} name={"orderByDate"}/>
                                </FormControl>
                            </>
                            }
                            <Typography sx={{
                                fontWeight: "600",
                                fontSize: "14px",
                                lineHeight: "17px",
                                color: "#C3C3C3"
                            }}>Цена: </Typography>
                            <FormControl sx={{margin: "10px"}}>
                                <CustomSelect value={orderByPrice} handleChange={handleChange} items={prices}
                                              icon={KeyboardArrowDownIcon} name={"orderByPrice"}/>
                            </FormControl>
                        </Stack>
                    </Grid>
                </Grid>
            </Grid>
            <Stack sx={{justifyContent: "center", margin: "0 auto"}}
            >
                <StyledSearchBtn
                    variant="outlined"
                    color="primary"
                    onClick={handleFilterSubmit}
                >
                    Поиск
                </StyledSearchBtn>
            </Stack>
        </Grid>
    )


}

export default React.memo(Filters)
