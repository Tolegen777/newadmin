import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import {
    Box,
    Button,
    CircularProgress,
    Grid,
    ListItem,
    MenuItem,
    Select,
    TextField,
    textFieldClasses,
    Typography
} from '@mui/material';
// import ImageInput from '../admin/ImageInput';
import {styled} from '@mui/material/styles';
import {useFormik} from 'formik';
import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate, useParams} from 'react-router';
import {$imageApi} from '../../api';
import {ProductService} from '../../service/product/product.service';
import {useTypedSelector} from '../../store';
import {createProduct, fetchCategories, fetchSpecs, updateProduct} from '../../store/product/product.action';
import {IProductNew, IProductOneResponse} from '../../types/IProduct';
import ImageContainer from '../image-input/ImageContainer';
import ImageInput from '../image-input/ImageInput';
import SelectCategory from '../select-category/SelectCategory';
import SelectSpecs from './SelectSpecs';
import {useGetSpecsQuery} from "../../store/rtk-api/baseEndpoints";
import CustomAlert from "../alert/CustomAlert";
import {clearPayload} from "../../store/product/product.slice";

const StyledTextField = styled(TextField)(({theme}) => ({
    [`&.${textFieldClasses.root}`]: {
        color: '#AAAAAA',
        marginTop: '10px',
        backgroundColor: '#EFF3F9'
    }
}));

const StyledSelect = styled(Select)(({theme}) => ({
    backgroundColor: '#EFF3F9',
    marginTop: '10px'
}))

const StyledSubHeader = styled(Typography)(({theme}) => ({
    fontSize: '15px',
    fontWeight: 700,
    marginTop: '15px'
}))




const CreateProduct: React.FC = () => {
    const {shop} = useTypedSelector(state => state.auth)
    let shopId = 0
    if(shop) {
        shopId = shop.id

    }

    const initialValues: IProductNew = {
        title: '',
        smallDesc: '',
        fullDesc: '',
        discount: 0,
        price: 0,
        categoryId: '',
        specs: [],
        avatar: null,
        subs: [],
        shopId: shopId
    }


    const {productId} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [product, setProduct] = useState<IProductOneResponse | null>(null);
    const {user} = useTypedSelector(state => state.auth);
    const [categoryId, setCategoryId] = useState<number | null>(null)
    const [categoryName, setCategoryName] = useState<string>('')
    const {data: specs, isLoading} = useGetSpecsQuery(String(categoryId))
    let arr: Array<string> = [];
    {
        specs && specs.map(spec => arr.push(String(spec.id)))
    }
    const {payload, error2, isLoading: isProductAdding} = useTypedSelector(state => state.product)
    const [isAlert, setAlert] = useState(false)

    useEffect(() => {
        if (payload && payload.meta.requestStatus === "fulfilled" && error2 == null) {

            navigate('/app/products/list')

            dispatch(clearPayload())

        } else if (error2 != null) {
            setAlert(true)
        }

    }, [payload, error2])

    const handleSetCategory = (categoryId: number, categoryName: string) => {
        setCategoryId(categoryId)
        setFieldValue('categoryId', categoryId)
        setCategoryName(categoryName)
    }

    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: async (values) => {

            if (!productId) {
                dispatch(createProduct(values));

            } else {
                dispatch(updateProduct(values));
            }
        }
    })
    const {values, setFieldValue, setValues, handleChange, handleSubmit} = formik;


    const handleAddImage = (event: Event) => {
        const input = event.target as HTMLInputElement;
        if (!input.files?.length) {
            return;
        }
        const file = input.files[0];
        let images = [...values.subs];
        images.push(file);
        setFieldValue('subs', images);
    }

    const handleImageChange = (event: Event, id: number) => {
        const input = event.target as HTMLInputElement;
        if (!input.files?.length) {
            return;
        }
        const file = input.files[0];
        let images = [...values.subs];
        images[id] = file;
        setFieldValue('photos', images);
    }

    const handleImageDelete = (id: number) => {
        let images = [...values.subs].filter((img, ind) => ind !== id);
        setFieldValue('photos', images);
    }
    const goToBack = () => {
        navigate('/app/products/list')
        setAlert(false)
    }

    React.useEffect(() => {
        async function fetch() {
            if (productId) {
                const result = await ProductService.fetchOneProduct(productId);
                setProduct(result.data);
                const {
                    title,
                    smallDesc,
                    fullDesc,
                    category,
                    discount,
                    id,
                    image,
                    photos,
                    price,
                    specs
                } = result.data.product;
                const productData: IProductNew = {
                    id,
                    title,
                    smallDesc,
                    fullDesc,
                    categoryId: String(category.id),
                    discount,
                    avatar: null,
                    subs: [],
                    price,
                    specs: arr,
                    shopId: user?.shops[0].id as number
                }
                handleSetCategory(category.id, category.name);
                setValues(productData);
            }
        }

        fetch()
    }, [])

    React.useEffect(() => {
        if (values.categoryId.length) {
            dispatch(fetchSpecs(values.categoryId))

        }
    }, [values.categoryId])

    return (
        <Box>
            <Button variant="contained" sx={{backgroundColor: '#EFF3F9', color: 'black'}}
                    startIcon={<ArrowBackIosNewIcon/>} onClick={goToBack}>Назад</Button>
            <Typography sx={{fontSize: "20px", marginTop: '20px', marginBottom: '25px'}}>Добавить товар</Typography>
            <form>
                <StyledSubHeader>Фотография</StyledSubHeader>
                <Typography variant="caption" color="gray">Первая фотография будет отображаться на карточке
                    товара</Typography>
                <div style={{display: 'flex'}}>
                    <Grid container spacing={1}>
                        <Grid item xs={2}>
                            <ImageInput title="Добавить фотографию" handleChange={handleAddImage} height="100px"
                                        width="100px"/>
                        </Grid>
                        {productId &&
                            product?.product.photos.map((photo, ind) => (
                                <Grid item xs={2} key={ind}>
                                    <ImageContainer
                                        image={`${$imageApi}/${photo.image}`}
                                        handleChange={(event) => handleImageChange(event, ind)}
                                        handleDelete={() => handleImageDelete(ind)}
                                    />
                                </Grid>
                                // <img src={`${$imageApi}/${photo.image}`} />
                            ))
                        }
                        {values.subs.map((image, ind) => {
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
                        {/*<StyledSubHeader>Артикул товара</StyledSubHeader>*/}
                        {/*<StyledTextField*/}
                        {/*  label="Артикул"*/}
                        {/*  name="article"*/}
                        {/*/>*/}
                    </Grid>
                    <Grid item sm={6} xs={6} lg={6}>

                        <StyledSubHeader>Категория</StyledSubHeader>
                        <ListItem sx={{fontWeight: 'bold'}}>Выбранная категория: <Typography
                            sx={{marginLeft: '4px'}}> {categoryName}</Typography></ListItem>
                        <SelectCategory handleSetCategory={handleSetCategory}/>
                        {/* <StyledSelect
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
            </StyledSelect> */}
                        <StyledSubHeader>Цена, ₸</StyledSubHeader>
                        <div style={{borderLeft: '1px solid #8A3FFC', marginTop: '15px', paddingLeft: '10px'}}>
                            <TextField
                                label="Напишите цену"
                                name="price"
                                value={values.price}
                                onChange={handleChange}
                                type="number"
                            />
                        </div>
                        <StyledSubHeader>Характеристики товара</StyledSubHeader>
                        {isLoading && <CircularProgress/>}
                        <div style={{
                            width: '100%',
                            backgroundColor: '#EFF3F9',
                            borderRadius: '8px',
                            paddingLeft: '10px',
                            paddingBottom: '10px'
                        }}>
                            {categoryId && <SelectSpecs categoryId={categoryId} setFieldValue={setFieldValue}/>}
                        </div>
                        <StyledSubHeader>Дополнительная информация</StyledSubHeader>
                        <div style={{width: '100%', borderRadius: '8px'}}>
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
                    sx={{marginTop: '15px'}}
                    disabled={isProductAdding}
                >
                    Сохранить
                </Button>
            </form>
            {isAlert && <CustomAlert title="Ошибка" status="error"
                                     message='Произошла ошибка,перепроверьте заполняемые данные!'/>}
        </Box>
    )
}

export default CreateProduct
