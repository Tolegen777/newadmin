import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import {
    Box,
    Button,
    CircularProgress,
    Grid,
    ListItem,
    Select,
    TextField,
    textFieldClasses,
    Typography
} from '@mui/material';
import {styled} from '@mui/material/styles';
import {useFormik} from 'formik';
import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate, useParams} from 'react-router';
import {$imageApi} from '../../api';
import {ProductService} from '../../service/product/product.service';
import {useTypedSelector} from '../../store';
import {createProduct, fetchSpecs, updateProduct} from '../../store/product/product.action';
import {IProductNew, IProductOneResponse, Photo} from '../../types/IProduct';
import ImageContainer from '../image-input/ImageContainer';
import ImageInput from '../image-input/ImageInput';
import SelectCategory from '../select-category/SelectCategory';
import SelectSpecs from './SelectSpecs';
import {useGetSpecsQuery} from "../../store/rtk-api/baseEndpoints";
import CustomAlert from "../alert/CustomAlert";
import {clearError, clearPayload} from "../../store/product/product.slice";
import {useUpdateSpecsMutation} from "../../store/rtk-api/updateSpecs-rtk/updateSpecs-rtk";
import {useRemoveProductImageMutation} from "../../store/rtk-api/removeProductImage-rtk/removeProductImage-rtk";
import * as yup from 'yup';

const StyledTextField = styled(TextField)(({theme}) => ({
    [`&.${textFieldClasses.root}`]: {
        color: '#AAAAAA',
        marginTop: '10px',
        backgroundColor: '#EFF3F9'
    }
}));

const StyledSubHeader = styled(Typography)(({theme}) => ({
    fontSize: '15px',
    fontWeight: 700,
    marginTop: '15px'
}))


const CreateProduct: React.FC = () => {
    const {shop} = useTypedSelector(state => state.auth)
    let shopId = 0
    if (shop) {
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

    const [removeProductImage, {}] = useRemoveProductImageMutation()

    let arr: Array<string> = [];
    {
        specs && specs.map(spec => arr.push(String(spec.id)))
    }
    const {payload, payload2, error3, error2, isLoading: isProductAdding} = useTypedSelector(state => state.product)
    const [isAlert, setAlert] = useState(false)
    const [specsArr, setSpecs] = useState<Array<string>>([])

    const handleSetSpecs = (arr: Array<string>) => {
        setSpecs(arr.map(String))
        // console.log(arr.map(String))
    }

    //updateProductSpecs

    const [navigateFlag, setNavigateFlag] = useState(false)
    const [flag, setFlag] = useState(false)

    const [updateProductSpecs, {
        isLoading: updateLoading,
        isError: updateError,
        isSuccess: updateSuccess,
    }] = useUpdateSpecsMutation()


    const handleUpdateProductSpecs = (productId: number, specs: string) => {
        const data = {productId, specs}
        updateProductSpecs(data)
    }


    useEffect(() => {
        if (payload && payload.meta.requestStatus === "fulfilled" && error2 == null) {
            navigate('/app/products/list')
            dispatch(clearPayload())

        } else if (error2 != null) {
            setAlert(true)
        }

    }, [payload, error2])

    useEffect(() => {
        if (payload2 && payload2.meta.requestStatus === "fulfilled" && error3 == null) {
            if (!navigateFlag) {
                navigate('/app/products/list')
                dispatch(clearPayload())
            } else {
                if (updateSuccess) {
                    navigate('/app/products/list')
                    dispatch(clearPayload())
                }
            }
        } else if (error3 != null || updateError) {
            setAlert(true)
        }

    }, [payload2, error3, updateSuccess, updateError])


    const handleSetCategory = (categoryId: number, categoryName: string) => {
        setCategoryId(categoryId)
        setFieldValue('categoryId', categoryId)
        setCategoryName(categoryName)
    }

    const validationSchema = yup.object().shape({
        title: yup
            .string()
            .required('Название продукта обязательное поле'),
        discount: yup
            .number()
            .max(100, "Максимум может быть установлен до 100%")
            .min(0, "Минимум может быть установлен до 0%"),

    });

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: async (values) => {

            if (!productId) {
                dispatch(createProduct(values));

            } else {
                dispatch(updateProduct(values));
                if (specsArr.length > 0) {
                    handleUpdateProductSpecs(Number(productId), specsArr.join(','))
                    setNavigateFlag(true)
                }
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
        //let images = [];
        images.push(file);
        setFieldValue('subs', images);
    }

    const handleAddImage2 = (event: Event) => {
        const input = event.target as HTMLInputElement;
        if (!input.files?.length) {
            return;
        }
        const file = input.files[0];
        // let images = [...values.subs];
        let images = [];
        images.push(file);
        setFieldValue('subs', images);
        setFlag(true)
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
        //setFieldValue('subs', images);
    }

    const handleImageDelete = (id: number) => {
        let images = [...values.subs].filter((img, ind) => ind !== id);
        setFieldValue('subs', images);
        setFlag(false)
    }
    const goToBack = () => {
        navigate('/app/products/list')
        setAlert(false)
        dispatch(clearError())
    }

    //removing product image

    let [photos, setPhotos] = useState<Photo[]>([])

    useEffect(() => {
        if (productId && product?.product.photos) {
            setPhotos(product?.product.photos)
        }
    }, [productId, product])

    const handleRemoveProductImage = (id: number, ind: number) => {

        removeProductImage(id)
        setPhotos(photos.filter(p => p != photos[ind]))
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
            <Typography sx={{fontSize: "20px", marginTop: '20px', marginBottom: '25px'}}>Изменить товар</Typography>
            <form>
                {productId ? <>
                        <StyledSubHeader>Фотография на карточке</StyledSubHeader>
                        <Typography variant="caption" color="gray">Выбранная фотография будет отображаться на карточке
                            товара</Typography>
                        <div style={{display: 'flex'}}>
                            <Grid container spacing={1}>
                                <Grid item xs={2}>
                                    <ImageInput title="Добавить фотографию" handleChange={handleAddImage2} height="100px"
                                                width="100px"/>
                                </Grid>

                                {productId && !flag && <Grid item xs={2}>
                                    <ImageContainer
                                        image={`${$imageApi}/${product?.product.image}`}
                                        handleChange={handleAddImage2}
                                        handleDelete={() => setFlag(true)}
                                    />
                                </Grid>

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
                                <Grid container direction={"column"}>
                                    <Grid><Typography variant="caption" color="gray">Другие фотографий</Typography></Grid>
                                    <Grid container direction={"row"}>
                                        {productId && photos.length > 0 &&
                                            photos.map((photo, ind) => (
                                                <Grid item xs={1} key={ind} sx={{marginRight: "10px", marginTop: "10px"}}>
                                                    <ImageContainer
                                                        image={`${$imageApi}/${photo.image}`}
                                                        handleChange={() => {
                                                        }}
                                                        handleDelete={() => handleRemoveProductImage(photo.id, ind)}
                                                    />
                                                </Grid>
                                            ))
                                        }
                                    </Grid>
                                </Grid>


                            </Grid>


                        </div>


                    </> :
                    <>
                        <StyledSubHeader>Фотография<span style={{color: "red"}}> *</span></StyledSubHeader>

                        <Typography variant="caption" color="gray">Первая фотография будет отображаться на карточке
                            товара</Typography>
                        <div style={{display: 'flex'}}>
                            <Grid container spacing={1}>
                                <Grid item xs={2}>
                                    <ImageInput title="Добавить фотографию" handleChange={handleAddImage} height="100px"
                                                width="100px"/>
                                </Grid>
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
                    </>
                }

                <Grid container spacing={2}>
                    <Grid item sm={6} xs={6} lg={6}>
                        <StyledSubHeader>Название товара<span style={{color: "red"}}> *</span></StyledSubHeader>
                        <StyledTextField
                            label="Название товара"
                            name="title"
                            value={values.title}
                            onChange={handleChange}
                            fullWidth
                            required
                            error={formik.touched.title && Boolean(formik.errors.title)}
                            helperText={formik.touched.title && formik.errors.title}
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
                            required
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
                            required
                        />

                    </Grid>
                    <Grid item sm={6} xs={6} lg={6}>

                        <StyledSubHeader>Категория<span style={{color: "red"}}> *</span></StyledSubHeader>
                        <ListItem sx={{fontWeight: 'bold'}}>Выбранная категория: <Typography
                            sx={{marginLeft: '4px'}}> {categoryName}</Typography></ListItem>
                        <SelectCategory handleSetCategory={handleSetCategory}/>

                        <StyledSubHeader>Цена, ₸</StyledSubHeader>
                        <div style={{borderLeft: '1px solid #8A3FFC', marginTop: '15px', paddingLeft: '10px'}}>
                            <TextField
                                label="Напишите цену"
                                name="price"
                                value={values.price}
                                onChange={handleChange}
                                type="number"
                                required

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
                            {categoryId && <SelectSpecs categoryId={categoryId} setFieldValue={setFieldValue}
                                                        handleSetSpecs={handleSetSpecs}
                            />}
                        </div>
                        <StyledSubHeader>Дополнительная информация</StyledSubHeader>
                        <div style={{width: '100%', borderRadius: '8px'}}>
                            <StyledSubHeader>Укажите размер скидки</StyledSubHeader>
                            <StyledTextField
                                name="discount"
                                value={values.discount}
                                onChange={handleChange}
                                type="number"
                                error={formik.touched.discount && Boolean(formik.errors.discount)}
                                helperText={formik.touched.discount && formik.errors.discount}
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