import {
    Box,
    Button, Checkbox,
    FormControl,
    Grid,
    InputAdornment,
    InputLabel, ListItemText,
    MenuItem, OutlinedInput,
    Select,
    Stack,
    TextField, Typography, useMediaQuery, useTheme
} from '@mui/material'
import React, {FC, useRef} from 'react'
import SearchIcon from '@mui/icons-material/Search';
import {useDispatch} from 'react-redux';
import {fetchCategories} from '../../store/product/product.action';
import {IProductQuery} from '../../types/IProduct';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {SelectChangeEvent} from "@mui/material/Select";
import CustomSelect from "./CustomSelect";

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

// const mobileCategory = {
//     width: "210px",
//     height: "40px",
// }

// const mobileTextField

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

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
    const {search, priceFrom, priceTo, orderByDate, orderByPrice} = filters;
    React.useEffect(() => {
        dispatch(fetchCategories());
    }, [])
    const handleFilterSubmit = () => {
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
                                    fontWeight: "300",
                                    fontSize: "14px",
                                    lineHeight: "17px",
                                    letterSpacing: "0.02em",
                                    color: "#AAAAAA"
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
                                <Box sx={{
                                    display: "flex", justifyContent: "space-between", alignItems: "center",
                                    padding: "5px",
                                    border: "1px solid #C3C3C3",
                                    borderRadius: "10px",
                                    color: "#C3C3C3",
                                    fontWeight: 400,
                                    fontSize: "16px",
                                    lineHeight: "19px",
                                    width: isMobile ? "120px" : "210px",
                                    height: isMobile ? "50px" : "40px",
                                    cursor: "pointer",
                                    marginRight: "20px"
                                }}>
                                    <Typography ml={"10px"}>Все категорий</Typography>
                                    <ChevronRightIcon/>
                                </Box>
                            </FormControl>
                            }
                            {component === "products" && <FormControl sx={{margin: "10px"}}>
                                {/*<InputLabel id="demo-simple-select-label">Дата создания</InputLabel>*/}
                                {/*<Select*/}
                                {/*    labelId="demo-simple-select-label"*/}
                                {/*    value={orderByDate}*/}
                                {/*    label="Дата создания"*/}
                                {/*    onChange={handleChange}*/}
                                {/*    name={"orderByDate"}*/}
                                {/*>*/}
                                {/*    {orderDates.map((item) => {*/}
                                {/*            return <MenuItem value={item.value}>{item.name}</MenuItem>*/}
                                {/*        }*/}
                                {/*    )}*/}
                                {/*    /!*<MenuItem value={"orderByDateASC"}>*!/*/}
                                {/*    /!*    /!*<Checkbox checked={orderByPrice==="orderByPriceASC"}/>*!/*!/*/}
                                {/*    /!*    <ListItemText primary={"Сначала новые"} />*!/*/}
                                {/*    /!*</MenuItem>*!/*/}
                                {/*    /!*<MenuItem value={"orderByPriceDESC"}>*!/*/}
                                {/*    /!*    <ListItemText primary={"Сначала новые"} />*!/*/}
                                {/*    /!*</MenuItem>*!/*/}
                                {/*</Select>*/}
                                <CustomSelect value={orderByDate} handleChange={handleChange} items={orderDates}
                                              icon={KeyboardArrowDownIcon} name={"orderByDate"}/>
                            </FormControl>}
                            <Typography sx={{
                                fontWeight: "600",
                                fontSize: "14px",
                                lineHeight: "17px",
                                color: "#C3C3C3"
                            }}>Цена: </Typography>
                            <FormControl sx={{margin: "10px"}}>
                                {/*<InputLabel id="demo-simple-select-label2">Цена</InputLabel>*/}
                                {/*<Select*/}
                                {/*    // labelId="demo-simple-select-label2"*/}
                                {/*    value={orderByPrice}*/}
                                {/*    // label="Цена"*/}
                                {/*    onChange={handleChange}*/}
                                {/*    name={"orderByPrice"}*/}
                                {/*    IconComponent={KeyboardArrowDownIcon}*/}
                                {/*    // renderValue={(selected) => selected}*/}
                                {/*    sx={{*/}
                                {/*        height: "40px",*/}
                                {/*        background: "#FFFFFF",*/}
                                {/*        // border: "1px solid #C3C3C3",*/}
                                {/*        borderRadius: "10px",*/}
                                {/*        color: "#C3C3C3",*/}
                                {/*        // input: {*/}
                                {/*        //     fontWeight: "600",*/}
                                {/*        //     fontSize: "14px",*/}
                                {/*        //     lineHeight: "17px",*/}
                                {/*        //     color: "#C3C3C3"*/}
                                {/*        // }*/}
                                {/*    }}*/}
                                {/*>*/}

                                {/*    <MenuItem value={"orderByPriceASC"}>*/}
                                {/*        /!*<Checkbox checked={orderByPrice==="orderByPriceASC"}/>*!/*/}
                                {/*        <ListItemText primary={"Сначала дешевые"}/>*/}
                                {/*    </MenuItem>*/}
                                {/*    <MenuItem value={"orderByPriceDESC"}>*/}
                                {/*        <ListItemText primary={"Сначала дорогие"}/>*/}
                                {/*    </MenuItem>*/}
                                {/*</Select>*/}
                                <CustomSelect value={orderByPrice} handleChange={handleChange} items={prices}
                                              icon={KeyboardArrowDownIcon} name={"orderByPrice"}/>
                            </FormControl>
                        </Stack>
                    </Grid>
                </Grid>
            </Grid>
            <Stack sx={{justifyContent: "center", margin: "0 auto"}}
            >
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleFilterSubmit}
                    sx={{
                        border: "1px solid #C3C3C3",
                        borderRadius: "10px",
                        fontWeight: "400",
                        fontSize: "18px",
                        lineHeight: "22px",
                        letterSpacing: "-0.333333px",
                        textTransform: "uppercase",
                        color: "#C3C3C3",
                        width: "120px",
                        height: "40px",
                        cursor: "pointer",
                        "&:hover":{
                            color: "#8A3FFC",
                        }
                    }}
                >
                    Поиск
                </Button>
            </Stack>
        </Grid>
    )


}

export default React.memo(Filters)
