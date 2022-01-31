import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Box, Button, Grid, MenuItem, Select, TextField, textFieldClasses, Typography } from '@mui/material';
// import ImageInput from '../admin/ImageInput';
import { styled } from '@mui/material/styles';
import { useFormik } from 'formik';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { ProductService } from '../../service/product/product.service';
import { useTypedSelector } from '../../store';
import { ActionsEnum } from '../../store/enum';
import { createProduct, fetchCategories, fetchSpecs, updateProduct } from '../../store/product/product.action';
import { IProductNew } from '../../types/IProduct';
import ImageContainer from '../image-input/ImageContainer';
import ImageInput from '../image-input/ImageInput';
import SelectSpecs from './SelectSpecs';

const StyledTextField = styled(TextField)(({ theme }) => ({
  [`&.${textFieldClasses.root}`]: {
    color: '#AAAAAA',
    marginTop: '10px',
    backgroundColor: '#EFF3F9'
  }
}));

const StyledSelect = styled(Select)(({ theme }) => ({
  backgroundColor: '#EFF3F9',
  marginTop: '10px'
}))

const StyledSubHeader = styled(Typography)(({ theme }) => ({
  fontSize: '15px',
  fontWeight: 700,
  marginTop: '15px'
}))

const initialValues: IProductNew = {
  title: '',
  smallDesc: '',
  fullDesc: '',
  discount: 0,
  price: 0,
  category: '',
  specs: [],
  image: null,
  photos: [],
  shopId: 7
}

const CreateProduct: React.FC = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { categories, status } = useTypedSelector(state => state.product);

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: async (values) => {
      if(!productId) {
        dispatch(createProduct(values));
      } else {
        dispatch(updateProduct(values));
      }
    }
  })
  const { values, setFieldValue, setValues, handleChange, handleSubmit } = formik;

  const handleAddImage = (event: Event) => {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) {
      return;
    }
    const file = input.files[0];
    let images = [...values.photos];
    images.push(file);
    setFieldValue('photos', images);
  }

  const handleImageChange = (event: Event, id: number) => {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) {
      return;
    }
    const file = input.files[0];
    let images = [...values.photos];
    images[id] = file;
    setFieldValue('photos', images);
  }

  const handleImageDelete = (id: number) => {
    let images = [...values.photos].filter((img, ind) => ind !== id);
    setFieldValue('photos', images);
  }

  React.useEffect(() => {
    if (!categories.length) {
      dispatch(fetchCategories());
    }
    async function fetch() {
      if (productId) {
        const result = await ProductService.fetchOneProduct(productId);
        const {title, smallDesc, fullDesc, category, discount, id, image, photos, price, specs} = result.data.product;
        const productData: IProductNew = {
          id,
          title,
          smallDesc,
          fullDesc, 
          category: String(category.id),
          discount,
          image: null,
          photos: [],
          price,
          specs: [],
          shopId: 7
        }
        setValues(productData);
      }
    }
    fetch()
  }, [])


  React.useEffect(() => {
    if (values.category.length) {
      dispatch(fetchSpecs(values.category))
    }
  }, [values.category])

  return (
    <Box>
      <Button variant="contained" sx={{ backgroundColor: '#EFF3F9', color: 'black' }} startIcon={<ArrowBackIosNewIcon />} onClick={() => navigate('/app/products/list')}>Назад</Button>
      <Typography sx={{ fontSize: "20px", marginTop: '20px', marginBottom: '25px' }}>Добавить товар</Typography>
      <form>
        <StyledSubHeader>Фотография</StyledSubHeader>
        <Typography variant="caption" color="gray">Первая фотография будет отображаться на карточке товара</Typography>
        <div style={{ display: 'flex' }}>
          <Grid container spacing={1}>
            <Grid item xs={2}>
              <ImageInput title="Добавить фотографию" handleChange={handleAddImage} height="100px" width="100px" />
            </Grid>
            {values.photos.map((image, ind) => {
              return (
                <Grid item xs={2} key={ind}>
                  <ImageContainer
                    image={URL.createObjectURL(image)}
                    handleChange={(event) => handleImageChange(event, ind)}
                    handleDelete={() => handleImageDelete(ind)}
                  />
                </Grid>
              )
            })}
          </Grid>
        </div>
        <Grid container spacing={2}>
          <Grid item sm={6} xs={6} lg={6}>
            <StyledSubHeader>Название товара</StyledSubHeader>
            <StyledTextField
              label="Название товара"
              name="title"
              value={values.title}
              onChange={handleChange}
              fullWidth
            />
            <StyledSubHeader>Короткое описание товара</StyledSubHeader>
            <StyledTextField
              label="Короткое описание"
              name="smallDesc"
              value={values.smallDesc}
              onChange={handleChange}
              multiline
              rows={3}
              fullWidth
            />
            <StyledSubHeader>Полное описание товара</StyledSubHeader>
            <StyledTextField
              label="Полное описание"
              name="fullDesc"
              value={values.fullDesc}
              onChange={handleChange}
              multiline
              rows={5}
              maxRows={8}
              fullWidth
            />
            <StyledSubHeader>Артикул товара</StyledSubHeader>
            <StyledTextField
              label="Артикул"
              name="article"
            />
          </Grid>
          <Grid item sm={6} xs={6} lg={6}>
            <StyledSubHeader>Категория</StyledSubHeader>
            <StyledSelect
              value={values.category}
              name="category"
              onChange={handleChange}
              displayEmpty
              fullWidth
            >
              <MenuItem value="">
                <em>Категория не выбрана</em>
              </MenuItem>
              {categories?.map((category) => (
                <MenuItem value={category.id}>{category.name}</MenuItem>
              ))}
            </StyledSelect>
            <StyledSubHeader>Цена, ₸</StyledSubHeader>
            <div style={{ borderLeft: '1px solid #8A3FFC', marginTop: '15px', paddingLeft: '10px' }}>
              <TextField
                label="Напишите цену"
                name="price"
                value={values.price}
                onChange={handleChange}
                type="number"
              />
            </div>
            <StyledSubHeader>Характеристики товара</StyledSubHeader>
            <div style={{ width: '100%', backgroundColor: '#EFF3F9', borderRadius: '8px', paddingLeft: '10px', paddingBottom: '10px' }}>
              {values.category && <SelectSpecs categoryId={values.category} />}
            </div>
            <StyledSubHeader>Дополнительная информация</StyledSubHeader>
            <div style={{ width: '100%', borderRadius: '8px' }}>
              <StyledSubHeader>Укажите размер скидки</StyledSubHeader>
              <StyledTextField
                name="discount"
                value={values.discount}
                onChange={handleChange}
                type="number"
              />
            </div>
          </Grid>
        </Grid>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => handleSubmit()}
          sx={{ marginTop: '15px' }}
          disabled={status === ActionsEnum.LOADING}
        >
          Сохранить
        </Button>
      </form>
    </Box>
  )
}

export default CreateProduct
