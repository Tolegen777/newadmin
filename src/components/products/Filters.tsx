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
}

const Filters: FC<Props> = ({filters, handleChange, handleSubmit}) => {
    const dispatch = useDispatch();
    const {categories} = useTypedSelector(state => state.product)
    const {search, categoryId, almostFree, bestseller, priceFrom, priceTo, block, confirm} = filters;

    React.useEffect(() => {
        dispatch(fetchCategories());
    }, [])

    return (
        <Grid container spacing={2}>
            <Grid item xs={10}>
                <Grid container spacing={1} alignItems="center">
                    <Grid item>
                        <TextField
                            variant="outlined"
                            size="small"
                            sx={{width: '400px'}}
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
                    {/* <Grid item xs>
            <FormControl fullWidth size='small'>
              <InputLabel id="categoryLabel">Категория</InputLabel>
              <Select
                labelId="categoryLabel"
                id="demo-simple-select"
                value={categoryId}
                label="Категория"
                onChange={handleChange}
              >
                {categories.map((category) => (
                  <MenuItem value={category.id}>{category.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid> */}
                    <Grid item>
                        <Stack direction={'row'} alignItems={'center'} spacing={2}>
                            <Typography>Цена:</Typography>
                            <TextField
                                variant="outlined"
                                size="small"
                                sx={{width: '100px'}}
                                placeholder="С"
                                name="priceFrom"
                                value={priceFrom}
                                onChange={handleChange}
                            />
                            <TextField
                                variant="outlined"
                                size="small"
                                sx={{width: '100px'}}
                                placeholder="По"
                                name="priceTo"
                                value={priceTo}
                                onChange={handleChange}
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs>
                        <Stack direction={'row'} alignItems={'center'} spacing={2}>
                            {/*<FormControlLabel*/}
                            {/*    label="Бестселлеры"*/}
                            {/*    style={{margin: '4px'}}*/}
                            {/*    onChange={handleChange}*/}
                            {/*    control={*/}
                            {/*        <Field type="checkbox" name="bestseller"/>*/}
                            {/*    }*/}
                            {/*/>*/}
                            {/*<FormControlLabel*/}
                            {/*    label="Заблокированные"*/}
                            {/*    style={{margin: '4px'}}*/}
                            {/*    control={*/}
                            {/*        <Field type="checkbox" name="block"/>*/}
                            {/*    }*/}
                            {/*/>*/}

                           {/*Фильтр временно закоменчил*/}
                            {/*<FormControlLabel*/}
                            {/*    style={{margin: '4px'}}*/}
                            {/*    label="Подтвержденные"*/}
                            {/*    control={*/}
                            {/*        <Field type="checkbox" name="confirm"/>*/}
                            {/*    }*/}
                            {/*/>*/}
                        </Stack>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={2}>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleSubmit}
                >
                    Поиск
                </Button>
            </Grid>
        </Grid>
    )
}

export default Filters
