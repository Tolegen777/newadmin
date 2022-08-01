import {
    Box,
    Button,
    Chip,
    CircularProgress,
    Grid,
    ListItem,
    TextField,
    Typography,
    useMediaQuery,
    useTheme
} from '@mui/material';
import {useFormik} from 'formik';
import React, {ChangeEvent, useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate, useParams} from 'react-router';
import {$imageApi} from '../../api';
import {ProductService} from '../../service/product/product.service';
import {useTypedSelector} from '../../store';
import {createProduct, fetchSpecs, updateProduct} from '../../store/product/product.action';
import {IProductNew, IProductOneResponse, Photo} from '../../types/IProduct';
import SelectCategory from '../select-category/SelectCategory';
import SelectSpecs from './SelectSpecs';
import {useGetSpecsQuery} from "../../store/rtk-api/baseEndpoints";
import CustomAlert from "../alert/CustomAlert";
import {clearError, clearPayload} from "../../store/product/product.slice";
import {useUpdateSpecsMutation} from "../../store/rtk-api/updateSpecs-rtk/updateSpecs-rtk";
import {useRemoveProductImageMutation} from "../../store/rtk-api/removeProductImage-rtk/removeProductImage-rtk";
import FileInput from "../image-input/FileInput";
import FileCard from "../image-input/FileCard";
import CustomTextField from "../common/CustomTextField";
import {StyledHeader} from "../common/StyledHeaders";
import {desktopListItem, mobileListItem} from "./helper";
import {validationSchema} from "../products/helper";
import {GoPrevButton} from "../common/Buttons";

const CreateProduct: React.FC = () => {
    const {shop} = useTypedSelector(state => state.auth)
    let shopId = 0
    if (shop) {
        shopId = shop.id
    }

    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
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
        shopId: shopId,
        images: []
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

    const handleUpdateSpecs = React.useRef(null)

    const handleSetSpecs = (arr: Array<string>) => {
        setSpecs(arr.map(String))

    }
    //updateProductSpecs
    const [navigateFlag, setNavigateFlag] = useState(false)
    const [flag, setFlag] = useState(false)

    const [updateProductSpecs, {
        isLoading: updateLoading,
        isError: updateError,
        isSuccess: updateSuccess,
    }] = useUpdateSpecsMutation()


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
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            if (!productId) {
                dispatch(createProduct(values));
            } else {
                dispatch(updateProduct(values));
                if (handleUpdateSpecs.current != null) {
                    // @ts-ignore
                    handleUpdateSpecs.current()
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
        images.push(file);
        setFieldValue('subs', images);
    }

    const handleAddImage2 = (event: ChangeEvent<HTMLInputElement>) => {
        const input = event.target;
        if (!input.files?.length) {
            return;
        }
        const file = input.files[0];
        let images = [];
        images.push(file);
        setFieldValue('subs', images);
        setFlag(true)

    }

    const handleAddImage3 = (event: Event) => {

        const input = event.target as HTMLInputElement;
        if (!input.files?.length) {
            return;
        }
        const file = input.files[0];
        let images: File[] = []
        if (values?.images) {
            images = [...values.images];
        }

        images.push(file);
        setFieldValue('images', images);
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
        setFieldValue('subs', images);
        setFlag(false)
    }

    const handleImageDelete2 = (id: number) => {
        let images = values.images?.length ? [...values.images].filter((img, ind) => ind !== id) : '';
        setFieldValue('images', images);
        // setFlag(false)
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
            <GoPrevButton/>
            <form>
                {productId ? <>
                        <Typography sx={{fontSize: "20px", mt: '20px', mb: '25px'}}>Изменить
                            товар</Typography>
                        <StyledHeader>Фотография на карточке</StyledHeader>
                        <Typography variant="caption" color="gray">Выбранная фотография будет отображаться на карточке
                            товара</Typography>
                        <div style={{display: 'flex'}}>
                            <Grid container spacing={1}>
                                <Grid item xs={4} lg={1.3} sx={{mr: "5px"}}>
                                    <FileInput handleChange={handleAddImage2}/>
                                </Grid>
                                {productId && !flag && <Grid item xs={1}>
                                    <FileCard image={`${$imageApi}/${product?.product.image}`}
                                              handleChange={handleAddImage2}/>
                                </Grid>
                                }

                                {values.subs.map((image, ind) => {
                                    return (
                                        <Grid item xs={1} key={ind}>
                                            <FileCard image={URL.createObjectURL(image)} handleChange={handleAddImage2}
                                                      count={ind + 1}/>
                                        </Grid>
                                    )
                                })}
                                <Grid container direction={"column"} sx={{marginLeft: "10px"}}>
                                    <Grid><Typography variant="caption" color="gray">Другие фотографий</Typography></Grid>
                                    <Grid item xs={1.3} lg={1.3}>
                                        <FileInput handleChange={handleAddImage3}/>
                                    </Grid>
                                    <Grid container direction={"row"}>
                                        {productId && photos.length > 0 && photos.map((photo, ind) => (
                                            <Grid item xs={3} lg={1.3} key={ind}
                                                  sx={{marginRight: "10px", marginTop: "10px"}}>
                                                <FileCard image={`${$imageApi}/${photo.image}`}
                                                          handleDelete={() => handleRemoveProductImage(photo.id, ind)}
                                                          count={ind + 1}/>
                                            </Grid>
                                        ))
                                        }
                                        {formik.values.images && formik.values.images?.length > 0 && formik.values.images.map((photo, ind) => (
                                            <Grid item xs={3} lg={1.3} key={ind}
                                                  sx={{marginRight: "10px", marginTop: "10px"}}>
                                                <FileCard image={URL.createObjectURL(photo)}
                                                          handleDelete={() => handleImageDelete2(ind)}
                                                          count={ind + photos.length + 1}/>
                                            </Grid>
                                        ))
                                        }
                                    </Grid>
                                </Grid>
                            </Grid>
                        </div>
                    </> :
                    <>
                        <Typography sx={{fontSize: "20px", marginTop: '20px', marginBottom: '25px'}}>Создать
                            товар</Typography>
                        <StyledHeader>Фотография<span style={{color: "red"}}> *</span></StyledHeader>

                        <Typography variant="caption" color="gray">Первая фотография будет отображаться на карточке
                            товара</Typography>
                        <div style={{display: 'flex'}}>
                            <Grid container spacing={1}>
                                <Grid item xs={4} lg={1.3} sx={{mr: "5px"}}>
                                    <FileInput handleChange={handleAddImage}/>
                                </Grid>
                                {values.subs.map((image, ind) => {
                                    return (
                                        <Grid item xs={4} lg={1.3} key={ind} sx={{mr: "5px"}}>
                                            <FileCard image={URL.createObjectURL(image)}
                                                      handleDelete={() => handleImageDelete(ind)}
                                                      handleChange={(event) => handleImageChange(event, ind)}/>
                                        </Grid>
                                    )
                                })}
                            </Grid>
                        </div>
                    </>
                }

                <Grid container spacing={2}>
                    <Grid item sm={6} xs={6} lg={6}>
                        <StyledHeader>Название товара<span style={{color: "red"}}> *</span></StyledHeader>
                        <CustomTextField field={"title"} formik={formik} placeholder={"Назовите товар"} fullWidth
                                         required multiline rows={2}/>
                        <StyledHeader>Короткое описание товара</StyledHeader>
                        <CustomTextField field={"smallDesc"} formik={formik} placeholder={"Опишите товар"} fullWidth
                                         multiline rows={4}/>
                        <StyledHeader>Полное описание товара</StyledHeader>
                        <CustomTextField field={"fullDesc"} formik={formik} placeholder={"Дайте полное описание товару"}
                                         fullWidth multiline rows={6}/>
                    </Grid>
                    <Grid item sm={6} xs={6} lg={6}>

                        <StyledHeader>Категория<span style={{color: "red"}}> *</span></StyledHeader>
                        <ListItem sx={isMobile ? mobileListItem : desktopListItem}>Выбранная категория:
                            <Chip label={categoryName} variant="filled" sx={{marginLeft: '4px'}}/>
                        </ListItem>
                        {!productId && <SelectCategory handleSetCategory={handleSetCategory}/>}

                        <StyledHeader>Цена, ₸</StyledHeader>
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
                        <StyledHeader>Характеристики товара</StyledHeader>
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
                                                        handleUpdateSpecs={handleUpdateSpecs}
                            />}
                        </div>
                        <StyledHeader>Дополнительная информация</StyledHeader>
                        <div style={{width: '100%', borderRadius: '8px'}}>
                            <StyledHeader>Укажите размер скидки</StyledHeader>
                            <CustomTextField field={"discount"} formik={formik} type={"number"}/>
                        </div>
                    </Grid>
                </Grid>
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={() => handleSubmit()}
                    sx={{mt: '15px', mb: "20px"}}
                    disabled={isProductAdding}
                >
                    Сохранить
                </Button>
                <div style={{height: "15px"}}></div>
            </form>
            {isAlert && <CustomAlert title="Ошибка" status="error"
                                     message='Произошла ошибка,перепроверьте заполняемые данные!'/>}
        </Box>
    )
}

export default CreateProduct