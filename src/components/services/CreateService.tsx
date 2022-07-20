import React, {ChangeEvent, useState} from 'react';
import {Box, Button, Checkbox, FormControlLabel, FormGroup, Grid, Typography} from "@mui/material";
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import CircleSharpIcon from '@mui/icons-material/CircleSharp';
import FileInput from "../image-input/FileInput";
import FileCard from "../image-input/FileCard";
import CustomSelect from "../common/CustomSelect";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CustomTextField from "../common/CustomTextField";
import {useFormik} from "formik";
import {initialValues, validationSchema} from "./helper";
import {GoPrevButton, SaveButton} from "../common/Buttons";
import {StyledHeader, StyledTypography} from "../common/StyledHeaders";

const places = [
    {name: "астана", value: 1},
    {name: "алматы", value: 2}
]
const categories = [
    {name: "каегория 1", value: 1},
    {name: "категория 2", value: 2}
]
const label = {inputProps: {'aria-label': 'Checkbox demo'}};
const discounts = [
    {
        id: 0,
        value: "от 10% и выше"
    },
    {
        id: 1,
        value: "от 30% и выше"
    },
    {
        id: 2,
        value: "Распродажа дня"
    },
    {
        id: 3,
        value: "от 50% и выше"
    },
    {
        id: 4,
        value: "от 70% и выше"
    },
    {
        id: 5,
        value: "почти даром"
    },

]

const CreateService: React.FC = () => {
    const [isSale, setSale] = useState(true)
    const [checkedId,setCheckedId] = useState<number|null>(null)
    const handleSetChecked = (id:number, value:string) => {
        setFieldValue('discount', value)
        setCheckedId(id)
    }
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values) => {
            const formData = new FormData()
            formData.append('photos', values.photos)
            formData.append('title', values.title)
            formData.append('description', values.description)
            formData.append('place', values.place)
            formData.append('contactName', values.contactName)
            formData.append('email', values.email)
            formData.append('phone', values.phone)
            formData.append('category', values.category)
            formData.append('price', values.price)
            formData.append('discount', values.discount)
        }
    })

    const {values, setFieldValue, handleChange} = formik

    const createService = () => {
        formik.handleSubmit()
    }

    const handleAddImage = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target?.files?.length === 0) {
            return
        }
        const file = e.target.files![0]
        let images = [...values.photos]
        images.push(file)
        // setArr([...arr, file]);
        setFieldValue('photos', images);
    }
    return (
        <>
            <GoPrevButton/>
            <StyledTypography>Добавить услугу</StyledTypography>
            <Grid container direction={"row"}>
                <Grid container lg={5.5} xs={12} sm={12} direction={"column"} marginRight={"30px"}>
                    <StyledHeader>
                        Фотография
                    </StyledHeader>
                    <Grid container sx={{gap: "5px", rowGap: "15px"}}>
                        <FileInput handleChange={handleAddImage}/>
                        {values.photos.length > 0 && values.photos.map((image: File, ind: number) => {
                            return <FileCard image={URL.createObjectURL(image)} handleChange={() => {
                            }} handleDelete={() => {
                            }} count={ind + 1}/>
                        })}
                    </Grid>
                    <StyledHeader>
                        Название услуги
                    </StyledHeader>
                    <CustomTextField field={"title"} formik={formik} placeholder={"Назовите товар"} fullWidth/>
                    <StyledHeader>
                        Описание услуги
                    </StyledHeader>
                    <CustomTextField field={"description"} formik={formik} placeholder={"Опишите товар"} rows={4}
                                     fullWidth multiline/>
                    <StyledHeader>Контактные данные</StyledHeader>
                    <StyledHeader>
                        Местоположение
                    </StyledHeader>
                    <Box sx={{marginTop: "10px"}}>
                        <CustomSelect value={values.place} name={"place"} handleChange={handleChange}
                                      icon={ChevronRightIcon}
                                      items={places} width={"250px"} bgc={"#EFF3F9"} bRadius={"5px"}
                        />

                    </Box>
                    <StyledHeader>
                        Контактное лицо
                    </StyledHeader>
                    <CustomTextField field={"contactName"} formik={formik} placeholder={"Напишите ваше имя"}
                                     style={{width: "250px"}}/>

                    <StyledHeader>
                        E-mail адрес
                    </StyledHeader>
                    <CustomTextField field={"email"} formik={formik} placeholder={"example2gmail.com"}
                                     style={{width: "250px"}}/>
                    <StyledHeader>
                        Номер телефона
                    </StyledHeader>
                    <CustomTextField field={"phone"} formik={formik} placeholder={"+7 (777) 777 7777"}
                                     style={{width: "250px"}}/>
                </Grid>
                <Grid container lg={5.5} xs={12} sm={12} direction={"column"}>
                    <Grid item sx={{marginBottom: "80px"}}>
                        <StyledHeader>
                            Категория
                        </StyledHeader>
                        <CustomSelect value={values.category} name={"place"} handleChange={handleChange}
                                      icon={ChevronRightIcon}
                                      items={categories} width={"500px"} bgc={"#EFF3F9"} bRadius={"5px"}/>
                    </Grid>
                    <Grid item>
                        <StyledHeader sx={{marginBottom: "20px"}}>
                            Характеристики услуги
                        </StyledHeader>
                        <StyledHeader>
                            Цена, Т
                        </StyledHeader>
                        <Grid container alignItems={"center"} justifyContent={"space-between"}>
                            <CustomTextField field={"price"} formik={formik} placeholder={"Напишите цену"}
                                             style={{width: "220px", mr: "10px", background: "#ffffff"}}
                            />
                            <Typography sx={{
                                color: "#C3C3C3", fontWeight: 400,
                                fontSize: "14px",
                                lineHeight: "17px"
                            }}>
                                Средняя цена на похожие услуги <span style={{color: "#8A3FFC"}}>12 000 ₸</span>
                            </Typography>
                        </Grid>
                    </Grid>

                    <Grid item>
                        <StyledHeader>
                            Дополнительные услуги
                        </StyledHeader>
                        <Grid container sx={{mb: "10px"}}>
                            <Button variant={isSale ? "contained" : "outlined"}
                                    sx={isSale ? {mr: "10px"} : {
                                        mr: "10px",
                                        color: "#C3C3C3",
                                        border: "1px solid #C3C3C3",
                                        "&:hover": {
                                            color: "#8A3FFC"
                                        }
                                    }}
                                    onClick={() => setSale(true)}>Со скидкой</Button>
                            <Button variant={!isSale ? "contained" : "outlined"}
                                    sx={!isSale ? {} : {
                                        color: "#C3C3C3",
                                        border: "1px solid #C3C3C3",
                                        "&:hover": {
                                            color: "#8A3FFC"
                                        }
                                    }}
                                    onClick={() => setSale(false)}>Без
                                скидки</Button>
                        </Grid>

                        {isSale &&
                            <>
                                <FormGroup>
                                    <Grid container>
                                        {discounts.map((d, ind) => {
                                            return <Grid item lg={6}>
                                                <FormControlLabel key={d.id} sx={{maxHeight: "100px"}}
                                                                  control={<Checkbox
                                                                      {...label}
                                                                      icon={checkedId!==ind?<CircleOutlinedIcon sx={{color:"#8A3FFC"}}/>:<CircleSharpIcon sx={{color:"#8A3FFC"}}/>}
                                                                      checkedIcon={checkedId===ind?<CircleSharpIcon sx={{color:"#8A3FFC"}}/>:<CircleOutlinedIcon sx={{color:"#8A3FFC"}}/>}
                                                                      onClick={()=>handleSetChecked(d.id, d.value)}
                                                                  />} label={d.value}
                                                />
                                            </Grid>
                                        })
                                        }
                                    </Grid>
                                </FormGroup>
                                <CustomTextField field={"discount"} formik={formik}
                                                 placeholder={"Напишите размер скидки"}
                                                 style={{mt: "20px", width: "300px", background: "#FFFFFF"}}/>
                            </>
                        }
                    </Grid>
                </Grid>
            </Grid>
            <Box mt={"30px"}>
                <SaveButton title={"Сохранить"} callback={createService}/>
            </Box>

        </>
    )
}
export default React.memo(CreateService);