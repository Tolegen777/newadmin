import * as yup from "yup";

export const validationSchema = yup.object().shape({
    title: yup
        .string()
        .required('Это обязательное поле'),
    discount: yup
        .number()
        .typeError('Это поле должно быть числом')
        .positive('Напишите положительные числа')
        .max(100, "Максимум может быть установлен до 100%")
        .min(0, "Минимум может быть установлен до 0%"),
    city: yup
        .string()
        .required('Это обязательное поле'),
    email: yup
        .string()
        .email("Напишите правильный адрес электронной почты")
        .required('Это обязательное поле'),
    phone: yup
        .number()
        .required('Это обязательное поле')
        .typeError('Это поле должно быть числом')
        .positive('Напишите положительные числа'),
    contactPerson: yup
        .string()
        .required('Это обязательное поле'),
    price: yup
        .number()
        .typeError('Это поле должно быть числом')
        .positive('Напишите положительные числа'),
    categoryId: yup
        .number()
        .required('Выберите категорию для услуги')
        .typeError('Выберите категорию для услуги')
        .positive('Выберите категорию для услуги'),
})