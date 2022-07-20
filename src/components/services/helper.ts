import * as yup from "yup";
import {styled} from "@mui/material/styles";
import {Typography} from "@mui/material";

const StyledHeader = styled(Typography)(({theme}) => ({
    fontWeight: "600",
    fontSize: "18px",
    lineHeight: "22px",
    letterSpacing: "-0.333333px",
    margin: "10px 0"
}))

export const validationSchema = yup.object().shape({
    title: yup
        .string()
        .required('Название услуги обязательное поле'),
    phone: yup
        .string()
        .required('Номер телефона обязательное поле'),
    // discount: yup
    //     .number()
    //     .max(100, "Максимум может быть установлен до 100%")
    //     .min(0, "Минимум может быть установлен до 0%"),
    place: yup
        .string()
        .required('Местоположение обязательное поле'),
});

export const initialValues: any = {
    photos: [] as File[],
    title: '',
    description: '',
    place: 1,
    contactName: '',
    email: '',
    phone: '',
    category: 1,
    price: '',
    discount: '',
}