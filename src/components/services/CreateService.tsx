import React, {ChangeEvent, useEffect, useState} from 'react';
import {Box, CircularProgress, Grid, Typography} from "@mui/material";
import FileInput from "../image-input/FileInput";
import FileCard from "../image-input/FileCard";
import CustomSelect from "../common/CustomSelect";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CustomTextField from "../common/CustomTextField";
import {useFormik} from "formik";
import {validationSchema} from "./helper";
import {GoPrevButton, SaveButton} from "../common/Buttons";
import {StyledHeader, StyledTypography} from "../common/StyledHeaders";
import {
    useCreateServiceMutation,
    useDeleteServiceImageMutation,
    useGetCitiesQuery,
    useGetOneServiceQuery,
    useUpdateServiceMutation
} from "../../store/rtk-api/service-rtk/service_rtk";
import {IServiceCreate, IServiceUpdate} from "../../types/IService";
import {useNavigate} from "react-router-dom";
import {useParams} from "react-router";
import CustomAlert from "../alert/CustomAlert";
import {Photo} from "../../types/IProduct";
import {$imageApi} from "../../api";
import {useTypedSelector} from "../../store";
import {IItems} from "../../types/types";


const CreateService: React.FC = () => {
    const {serviceId} = useParams();
    const [createService, {
        isLoading: isCreateLoading,
        isError: isCreateError,
        isSuccess: isCreateSuccess
    }] = useCreateServiceMutation()
    const [updateService, {
        isLoading: isUpdateLoading,
        isError: isUpdateError,
        isSuccess: isUpdateSuccess
    }] = useUpdateServiceMutation()
    const [deleteServiceImg, {
        isLoading: isDeleteImgLoading,
        isError: isDeleteImgError,
    }] = useDeleteServiceImageMutation()
    const {data, isLoading, isError} = useGetOneServiceQuery(Number(serviceId), {
        skip: !serviceId,
        //refetchOnFocus: true
    })
    const {data: cities, isError: cityError} = useGetCitiesQuery('')
    const shopId = useTypedSelector(state => state.auth?.shop?.id)
    const initialValues: IServiceUpdate = {
        id: serviceId ? +serviceId : null,
        file: [] as File[],
        categoryId: data?.category.id || -1,
        shopId: shopId ? shopId : null,
        title: data ? data?.title : '',
        description: data ? data?.description : '',
        city: data ? data?.city : cities ? cities[0]._text.replace('город', '') : 'Нур-Султан',
        contactPerson: data ? data?.contactPerson : '',
        email: data ? data?.email : '',
        phone: data ? data?.phone : '',
        price: data ? data?.price : 0,
        discount: data ? data?.discount : 0,
    }
    const navigate = useNavigate()
    const formik = useFormik({
        initialValues,
        validationSchema,
        enableReinitialize: true,
        onSubmit: (values) => {
            const formData = new FormData()
            if (values.id) {
                formData.append('id', String(values.id))
            }
            values.file.forEach(item => formData.append('file', item))
            formData.append('categoryId', String(values.categoryId))
            formData.append('shopId', String(values.shopId))
            formData.append('title', values.title)
            formData.append('description', values.description)
            formData.append('city', values.city)
            formData.append('contactPerson', values.contactPerson)
            formData.append('email', values.email)
            formData.append('phone', values.phone)
            formData.append('price', String(values.price))
            formData.append('discount', String(values.discount))
            if (serviceId) {
                updateService(formData as unknown as IServiceUpdate)
            } else {
                createService(formData as unknown as IServiceCreate)
            }
        }
    })
    const {values, setFieldValue, handleChange} = formik
    const handleCreateService = () => {
        formik.handleSubmit()
    }

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

    useEffect(() => {
        if (isCreateSuccess || isUpdateSuccess) {
            navigate('app/services/list')
        }
    }, [isCreateSuccess, isUpdateSuccess])

    const handleAddImage = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target?.files?.length === 0) {
            return
        }
        const file = e.target.files![0]
        let images = [...values.file]
        images.push(file)
        setFieldValue('file', images);
    }
    let [photos, setPhotos] = useState<Photo[]>([])
    useEffect(() => {
        if (serviceId && data?.photos) {
            setPhotos(data?.photos)
        }
    }, [serviceId, data])

    const handleRemoveProductImage = (fromObject: string, id: number | null, ind: number) => {
        if (fromObject === 'photos') {
            setPhotos(photos.filter(p => p != photos[ind]))
            deleteServiceImg(id)
        } else if (fromObject === 'localFile') {
            setFieldValue('file', values.file.filter(p => p != values.file[ind]))
        }
    }

    return (
        <>
            {isLoading && <CircularProgress/>}
            {isDeleteImgLoading && <CircularProgress/>}
            {(isError) && <CustomAlert title="Ошибка" status="error" message='Произошла ошибка'/>}
            {(isDeleteImgError) &&
                <CustomAlert title="Ошибка" status="error" message='Произошла ошибка при удалении фотографий'/>}
            {(cityError) && <CustomAlert title="Ошибка" status="error" message='Не удалось загрузить города'/>}
            <GoPrevButton/>
            <StyledTypography mt={"10px"}>Добавить услугу</StyledTypography>
            <Grid container direction={"row"}>
                <Grid container lg={5.5} xs={12} sm={12} direction={"column"} marginRight={"30px"}>
                    <StyledHeader>Фотография</StyledHeader>
                    <Grid container sx={{gap: "5px", rowGap: "15px"}}>
                        <FileInput handleChange={handleAddImage}/>
                        {serviceId && photos.length > 0 && photos.map((photo, ind) => (
                            <FileCard image={`${$imageApi}/${photo.image}`}
                                      handleDelete={() => handleRemoveProductImage('photos', photo.id, ind)}
                                      count={ind + 1}/>
                        ))
                        }
                        {values.file.length > 0 && values.file.map((image: File, ind: number) => {
                            return <FileCard image={URL.createObjectURL(image)} handleChange={() => {
                            }} handleDelete={() => handleRemoveProductImage('localFile', null, ind)}
                                             count={photos.length > 0 ? (photos.length + ind + 1) : (ind + 1)}/>
                        })}
                    </Grid>
                    <StyledHeader>Название услуги</StyledHeader>
                    <CustomTextField field={"title"} formik={formik} placeholder={"Назовите товар"} fullWidth/>
                    <StyledHeader>Описание услуги</StyledHeader>
                    <CustomTextField field={"description"} formik={formik} placeholder={"Опишите товар"} rows={4}
                                     fullWidth multiline/>
                    <StyledHeader>Контактные данные</StyledHeader>
                    <StyledHeader>Местоположение</StyledHeader>
                    <Box sx={{marginTop: "10px"}}>
                        <CustomSelect value={values.city} name={"city"} handleChange={handleChange}
                                      icon={ChevronRightIcon}
                                      items={cities && cities.map(city => {
                                          return {
                                              name: city._text.replace('город', ''),
                                              value: city._text.replace('город', '')
                                          }
                                      })} width={"250px"} bgc={"#EFF3F9"} bRadius={"5px"}
                        />
                    </Box>
                    <StyledHeader>Контактное лицо</StyledHeader>
                    <CustomTextField field={"contactPerson"} formik={formik} placeholder={"Напишите ваше имя"}
                                     style={{width: "250px"}}/>
                    <StyledHeader>E-mail адрес</StyledHeader>
                    <CustomTextField field={"email"} formik={formik} placeholder={"example2gmail.com"}
                                     style={{width: "250px"}}/>
                    <StyledHeader>Номер телефона</StyledHeader>
                    <CustomTextField field={"phone"} formik={formik} placeholder={"+7 (777) 777 7777"}
                                     style={{width: "250px"}}/>
                </Grid>
                <Grid container lg={5.5} xs={12} sm={12} direction={"column"}>
                    <Grid item sx={{marginBottom: "80px"}}>
                        <StyledHeader>Категория</StyledHeader>
                        <CustomSelect value={values.categoryId} name={"categoryId"} handleChange={handleChange}
                                      icon={ChevronRightIcon}
                                      items={categories} width={"500px"} bgc={"#EFF3F9"} bRadius={"5px"}
                                      isDisabled={!!serviceId}
                                      helperText={formik.touched.categoryId && formik.errors.categoryId}/>
                    </Grid>
                    <Grid item>
                        <StyledHeader sx={{marginBottom: "20px"}}>Характеристики услуги</StyledHeader>
                        <StyledHeader>Цена, Т</StyledHeader>
                        <Grid container alignItems={"center"} justifyContent={"space-between"}>
                            <CustomTextField field={"price"} formik={formik} placeholder={"Напишите цену"}
                                             style={{width: "220px", mr: "10px", background: "#ffffff"}}
                            />
                            {/*<Typography sx={{*/}
                            {/*    color: "#C3C3C3", fontWeight: 400,*/}
                            {/*    fontSize: "14px",*/}
                            {/*    lineHeight: "17px"*/}
                            {/*}}>*/}
                            {/*    Средняя цена на похожие услуги <span style={{color: "#8A3FFC"}}>12 000 ₸</span>*/}
                            {/*</Typography>*/}
                        </Grid>
                    </Grid>

                    <Grid item>
                        <StyledHeader>Скидка</StyledHeader>
                        <CustomTextField field={"discount"} formik={formik}
                                         placeholder={"Напишите размер скидки"}
                                         style={{width: "300px", background: "#FFFFFF"}}/>
                    </Grid>
                </Grid>
            </Grid>
            <Box mt={"30px"}>
                <SaveButton title={"Сохранить"} callback={handleCreateService}/>
            </Box>
            {isCreateLoading && <CircularProgress/>}
            {isUpdateLoading && <CircularProgress/>}
            {(isCreateError || isUpdateError) && <CustomAlert title="Ошибка" status="error"
                                                              message='Произошла ошибка,перепроверьте заполняемые данные!'/>}
        </>
    )
}
export default React.memo(CreateService);