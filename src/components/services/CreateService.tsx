import React from 'react';
import {useNavigate} from 'react-router';
import {
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    FormGroup,
    FormHelperText,
    Grid,
    MenuItem,
    Select,
    TextField,
    Typography
} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FileInput from "./FileInput";
import {styled} from "@mui/material/styles";
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import CircleSharpIcon from '@mui/icons-material/CircleSharp';

const StyledHeader = styled(Typography)(({theme}) => ({
    fontWeight: "600",
    fontSize: "18px",
    lineHeight: "22px",
    letterSpacing: "-0.333333px",
    margin: "10px 0"
}))
const StyledTextField = styled(TextField,)(({theme}) => ({
    background: "#EFF3F9",
    borderRadius: "5px",
    input: {color: "#C3C3C3"},
}))

const objects = ["алматы", "астана", "шымкент"]
const label = {inputProps: {'aria-label': 'Checkbox demo'}};
const discounts = ["от 10% и выше", "от 30% и выше", "Распродажа дня", "от 50% и выше", "от 70% и выше", "почти даром",]


const CreateService: React.FC = () => {
    const navigate = useNavigate();

    return (
        <>
            <Button color={"inherit"} sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}
                    onClick={() => navigate(-1)}
            >
                <ArrowBackIcon sx={{
                    background: "#EFF3F9",
                    borderRadius: "10px", p: "5px"
                }}/>
                <Typography sx={{ml: "5px", textTransform: "capitalize"}}>Назад</Typography>
            </Button>
            <Typography sx={{
                fontWeight: "400",
                fontSize: "20px",
                lineHeight: "24px",
                letterSpacing: "-0.333333px",
                m: "10px 0"
            }}>Добавить услугу</Typography>
            <Grid container direction={"row"}>
                <Grid container lg={5.5} xs={12} sm={12} direction={"column"} marginRight={"30px"}>

                    <Grid item>
                        <StyledHeader>
                            Фотография
                        </StyledHeader>
                        <FileInput/>
                    </Grid>
                    <Grid item>
                        <StyledHeader>
                            Название услуги
                        </StyledHeader>
                        <StyledTextField
                            fullWidth
                            size={"small"}
                            placeholder={"Назовите товар"}
                        >

                        </StyledTextField>
                    </Grid>
                    <Grid item>
                        <StyledHeader>
                            Описание услуги
                        </StyledHeader>
                        <StyledTextField
                            fullWidth
                            size={"small"}
                            placeholder={"Опишите товар"}
                            rows={4}
                            multiline
                        >

                        </StyledTextField>
                    </Grid>
                    <StyledHeader>Контактные данные</StyledHeader>
                    <Grid item>
                        <StyledHeader>
                            Местоположение
                        </StyledHeader>
                        <Box sx={{marginTop: "10px"}}>
                            {/*<FormControl sx={{ m: 1, width: 300 }}>*/}
                            {/*<InputLabel id="demo-multiple-name-label" sx={{*/}
                            {/*    color: "primary.main",*/}
                            {/*    input: {color: "primary.main", fontWeight: "600"},*/}
                            {/*    width: "250px"*/}
                            {/*}}*/}

                            {/*>*/}
                            {/*    /!*{label}*!/3434*/}
                            {/*</InputLabel>*/}
                            <Select
                                // id={id}
                                // name={name}
                                // values={value}
                                size={"small"}
                                // onChange=onChange{handleChange}
                                sx={{
                                    background: "#EFF3F9",
                                    borderRadius: "5px",
                                    input: {color: "#C3C3C3"},
                                    width: "250px",
                                }}
                                // error={error}

                                // multiple
                                // MenuProps={MenuProps}
                            >

                                {objects && objects.map((object: any) => (
                                    <MenuItem
                                        key={object.id}
                                        value={object.id}
                                    >
                                        {object.value}
                                    </MenuItem>
                                ))}
                            </Select>
                            <FormHelperText sx={{color: "#FC4B4A"}}>
                                {/*{helperText}*/}
                            </FormHelperText>
                            {/*</FormControl>*/}
                        </Box>
                    </Grid>
                    <Grid item>
                        <StyledHeader>
                            Контактное лицо
                        </StyledHeader>
                        <StyledTextField
                            size={"small"}
                            placeholder={"Напишите ваше имя"}
                        >

                        </StyledTextField>
                    </Grid>
                    <Grid item>
                        <StyledHeader>
                            E-mail адрес
                        </StyledHeader>
                        <StyledTextField
                            size={"small"}
                            placeholder={"example2gmail.com"}

                        >
                        </StyledTextField>
                    </Grid>
                    <Grid item>
                        <StyledHeader>
                            Номер телефона
                        </StyledHeader>
                        <StyledTextField
                            size={"small"}
                            placeholder={"+7 (777) 777 7777"}

                        >
                        </StyledTextField>
                    </Grid>
                </Grid>
                <Grid container lg={5.5} xs={12} sm={12} direction={"column"}>
                    <Grid item>
                        <StyledHeader>
                            Категория
                        </StyledHeader>
                        <StyledTextField
                            fullWidth
                            size={"small"}
                            placeholder={"Выбрать категорию"}
                        >
                        </StyledTextField>
                    </Grid>
                    <Grid item>
                        <Typography sx={{
                            fontWeight: "400",
                            fontSize: "20px",
                            lineHeight: "24px",
                            letterSpacing: "-0.333333px",
                            m: "10px 0"
                        }}>
                            Характеристики услуги
                        </Typography>
                        <StyledHeader>
                            Цена, Т
                        </StyledHeader>
                        <Grid container alignItems={"center"} justifyContent={"space-between"}>
                            <StyledTextField
                                size={"small"}
                                placeholder={"Напишите цену"}
                                sx={{width: "250px"}}
                            >
                            </StyledTextField>
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
                            <Button variant={"contained"}>Со скидкой</Button>
                            <Button variant={"outlined"}
                                    sx={{marginLeft: "10px", color: "#C3C3C3", border: "1px solid #C3C3C3"}}>Без
                                скидки</Button>
                        </Grid>

                        <FormGroup>
                            <Grid container>
                                {
                                    discounts.map((d, ind) => {
                                        return <Grid item lg={6}>
                                            <FormControlLabel key={ind} sx={{maxHeight: "100px"}} control={<Checkbox
                                                {...label}
                                                icon={<CircleOutlinedIcon sx={{color: "#8A3FFC"}}/>}
                                                checkedIcon={<CircleSharpIcon/>}
                                            />} label={d}/>
                                        </Grid>

                                    })
                                }
                            </Grid>
                        </FormGroup>

                        <StyledTextField
                            size={"small"}
                            placeholder={"Напишите размер скидки"}
                            sx={{mt: "20px", width: "300px"}}
                        >
                        </StyledTextField>

                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}
export default CreateService;