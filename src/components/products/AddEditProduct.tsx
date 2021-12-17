import React from 'react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Box, Button, Grid, MenuItem, Select, TextField, textFieldClasses, Divider, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router';
import { ICategory, IProductNew, IProduct } from '../../redux/types/types';
import { postProduct, useCreateProductMutation, useGetProductByIdQuery } from '../../redux/services/product';
import { useFormik } from 'formik';
// import ImageInput from '../admin/ImageInput';
import { styled } from '@mui/material/styles';
import { useGetCategoriesQuery } from '../../redux/services/filters';
import SelectSpecs from './SelectSpecs';
import ImageContainer from '../image-input/ImageContainer';
import ImageInput from '../image-input/ImageInput';

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

const AddEditProduct: React.FC = () => {
  const navigate = useNavigate();
  const { productId } = useParams();

  const { data: product } = useGetProductByIdQuery(Number(productId));
  const { data: categories, isLoading: isCategoryLoading } = useGetCategoriesQuery('categories');
  const [createProduct, { }] = useCreateProductMutation();

  const [images, setImages] = React.useState<any[]>([]);
  const [cover, setCover] = React.useState<any | null>(null);

  const handleAddImage = (event: Event) => {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) {
      return;
    }
    const file = input.files[0];
    setImages((images) => [...images, file]);
  }

  const handleImageChange = (event: Event, id: number) => {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) {
      return;
    }
    const image = input.files[0];
    let current = [...images];
    current[id] = image;
    setImages(current);
  }

  const handleCoverChange = (event: Event) => {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) {
      return;
    }
    const image = input.files[0];
    setCover(image);
  }

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: async (values) => {
      if (!productId) {
        const result = await postProduct(values);
        navigate('/app/products/list');
      }
    }
  })

  const { values, setFieldValue, setValues, handleChange, handleSubmit } = formik;
  const { category } = values;

  React.useEffect(() => {
    if (product) {
      setValues({ ...product, category: product.category.id.toString(), shopId: 1 });
    }
  }, [product])

  return (
    <Box>
      <Button variant="contained" sx={{ backgroundColor: '#EFF3F9', color: 'black' }} startIcon={<ArrowBackIosNewIcon />} onClick={() => navigate('/app/products/list')}>Назад</Button>
      {productId ?
        <Typography variant="caption" style={{ fontSize: "20px", marginBottom: '25px' }}>Редактировать товар</Typography>
        :
        <Typography sx={{ fontSize: "20px", marginTop: '20px', marginBottom: '25px' }}>Добавить товар</Typography>
      }
      <form>
        <StyledSubHeader>Фотография</StyledSubHeader>
        {/* <ImageInput onChange={setFieldValue} image={values.image} /> */}
        {cover ?
          <ImageContainer
            image={URL.createObjectURL(cover)}
            handleChange={handleCoverChange}
            handleDelete={() => setCover(null)}
          />
          :
          <ImageInput title="Добавить заставку" value={cover} handleChange={handleCoverChange} height="100px" width="100px" />
        }
        <ImageInput title="Добавить картинки" value={images} handleChange={handleAddImage} height="100px" width="100px" />
        {images.map((image, ind) => {
          return (
            <ImageContainer
              key={ind}
              image={URL.createObjectURL(image)}
              handleChange={(event) => handleImageChange(event, ind)}
              handleDelete={() => setImages(prev => prev.filter((value) => value !== image))}
            />
          )
        })}
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
              {isCategoryLoading && <div>Загрузка...</div>}
            </StyledSelect>
            <StyledSubHeader>Цена, ₸</StyledSubHeader>
            {category && <div style={{ borderLeft: '1px solid #8A3FFC', marginTop: '15px', paddingLeft: '10px', display: 'flex', alignItems: 'center' }}>
              <TextField
                label="Напишите цену"
                name="price"
                value={values.price}
                onChange={handleChange}
                type="number"
              />
              <Typography variant="caption" sx={{ fontSize: '14px', color: '#C3C3C3', marginLeft: '10px' }}>Средняя цена на похожие товары 12 000 ₸</Typography>
            </div>}
            <StyledSubHeader>Характеристики товара</StyledSubHeader>
            <div style={{ width: '100%', backgroundColor: '#EFF3F9', borderRadius: '8px', paddingLeft: '10px', paddingBottom: '10px' }}>
              {category && <SelectSpecs categoryId={category} />}
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
        >
          Сохранить
        </Button>
      </form>
    </Box>
  )
}

export default AddEditProduct
