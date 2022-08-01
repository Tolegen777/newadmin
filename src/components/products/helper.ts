import * as yup from "yup";

export const mobileListItem = {
    display: "block",
    fontWeight: "bold"
}
export const desktopListItem = {
    display: "flex",
    fontWeight: "bold"
}

export const validationSchema = yup.object().shape({
    title: yup
        .string()
        .required('Название продукта обязательное поле'),
    discount: yup
        .number()
        .max(100, "Максимум может быть установлен до 100%")
        .min(0, "Минимум может быть установлен до 0%"),
});