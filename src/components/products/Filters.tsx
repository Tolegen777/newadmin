import { Button, Grid, InputAdornment, MenuItem, Select, TextField, Typography } from '@mui/material'
import React from 'react'
import { useFormik } from 'formik';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch } from 'react-redux';
import { fetchCategories } from '../../store/product/product.action';
import { useTypedSelector } from '../../store';

const Filters = () => {
  const dispatch = useDispatch();
  const { categories } = useTypedSelector(state => state.product)

  React.useEffect(() => {
    dispatch(fetchCategories());
  }, [])

  const formik = useFormik({
    initialValues: {
      search: '',
      priceFrom: 0,
      priceTo: 0,
      category: ''
    },
    onSubmit: (values) => {
      console.log(values);
    }
  })
  const { values, handleChange } = formik;

  return (
    <Grid container spacing={1} alignItems="center">
      <Grid item xs>
        <TextField
          variant="outlined"
          size="small"
          sx={{ width: '400px' }}
          placeholder="Поиск по Артикул, название товара..."
          name="search"
          value={values.search}
          onChange={handleChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item xs>
        <Select
          labelId="category-label"
          name="category"
          size="small"
          value={values.category}
          onChange={handleChange}
          sx={{ width: '300px' }}
        >
          {categories.map((category) => (
            <MenuItem value={category.id}>{category.name}</MenuItem>
          ))}
        </Select>
      </Grid>
      <Grid item>
        <Typography>Цена:</Typography>
      </Grid>
      <Grid item xs>
        <TextField
          variant="outlined"
          size="small"
          sx={{ width: '100px' }}
          placeholder="С"
          name="priceFrom"
          value={values.priceFrom}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs>
        <TextField
          variant="outlined"
          size="small"
          sx={{ width: '100px' }}
          placeholder="По"
          name="priceTo"
          value={values.priceTo}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs>
        <Button variant="outlined" color="primary">Поиск</Button>
      </Grid>
    </Grid>
  )
}

export default Filters
