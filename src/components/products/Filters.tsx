import { Button, InputAdornment, MenuItem, Select, TextField } from '@mui/material'
import React from 'react'
import { useFormik } from 'formik';
import SearchIcon from '@mui/icons-material/Search';

const Filters = () => {
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
    <>
      <TextField
        variant="outlined"
        size="small"
        sx={{ width: '400px', marginRight: '10px' }}
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
      <Select
        labelId="category-label"
        name="category"
        size="small"
        value={values.category}
        onChange={handleChange}
        sx={{ width: '300px', marginRight: '10px' }}
      >
        {['Категория1', 'Категория2', 'Категория3'].map((category) => (
          <MenuItem value={category}>{category}</MenuItem>
        ))}
      </Select>
      Цена:
      <TextField
        variant="outlined"
        size="small"
        sx={{ width: '100px', marginRight: '10px' }}
        placeholder="С"
        name="priceFrom"
        value={values.priceFrom}
        onChange={handleChange}
      />
      <TextField
        variant="outlined"
        size="small"
        sx={{ width: '100px', marginRight: '10px' }}
        placeholder="По"
        name="priceTo"
        value={values.priceTo}
        onChange={handleChange}
      />
      <Button variant="outlined" color="primary">Поиск</Button>
    </>
  )
}

export default Filters
