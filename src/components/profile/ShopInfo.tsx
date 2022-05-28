import {
    Box,
    Grid,
    InputAdornment,
    Skeleton,
    Table,
    TableBody,
    TableCell,
    TableRow,
    TextField,
    Typography
} from '@mui/material';
import React, {useEffect} from 'react';
import {useTypedSelector} from '../../store';
import ImageInput from "../image-input/ImageInput";
import * as yup from "yup";
import {useFormik} from "formik";
import ImageContainer from "../image-input/ImageContainer";
import EditIcon from '@mui/icons-material/Edit';
import {updateShopAvatar} from "../../store/auth/auth.action";
import {useDispatch} from "react-redux";
import {$imageApi} from "../../api";

type Props = {
    handleUpdateProfile: any
    isLoading: boolean

}

interface IShopProfile {
    id: number | null
    name: string
    logo: string | null
    legalAddress: string
    bin_iin: string
    instagram: string | null
    phone: string
    shop_type: string
    createdLogo: File[]
}


const ShopInfo: React.FC<Props> = ({handleUpdateProfile, isLoading}) => {

    const {user} = useTypedSelector(state => state.auth)
    const dispatch = useDispatch()

    const initialValues: IShopProfile = {
        id: user ? user?.shops[0].id : null,
        logo: user ? user?.shops[0].logo : '',
        name: user ? user?.shops[0].name : '',
        bin_iin: user ? user?.shops[0].bin_iin : '',
        legalAddress: user ? user?.shops[0].legalAddress : '',
        phone: user ? user?.shops[0].phone : '',
        instagram: user ? user?.shops[0].instagram : '',
        shop_type: user ? user?.shops[0].shop_type : '',
        createdLogo: []
    }

    const validationSchema = yup.object().shape({
        name: yup
            .string(),
        phone: yup
            .number(),
        instagram: yup
            .string(),

    });

    const handleUpdateProfileOnClick = () => {

        //Здесь он диспатчит полученные данные для обновления
        let obj = {
            id: formik.values.id,
            image: formik.values.createdLogo.length > 0 ? values.createdLogo[0] : null,
            phone: formik.values.phone,
            instagram: formik.values.instagram

        }
        dispatch(updateShopAvatar(obj))

    }

    const formik = useFormik({
            initialValues: initialValues,
            validationSchema: validationSchema,
            onSubmit: async (values) => {
            }
        }
    )
    const {values, setFieldValue, setValues, handleChange, handleSubmit} = formik;

    const handleAddImage2 = (event: Event) => {
        const input = event.target as HTMLInputElement;
        if (!input.files?.length) {
            return;
        }
        const file = input.files[0];
        let images = [];
        images.push(file);
        setFieldValue('createdLogo', images);
    }

    const handleImageChange = (event: Event) => {
        formik.values.logo = ''
        const input = event.target as HTMLInputElement;
        if (!input.files?.length) {
            return;
        }
        const file = input.files[0];
        let images = [...values.createdLogo];
        images[0] = file;
        setFieldValue('createdLogo', images);

    }


    useEffect(() => {
        // @ts-ignore
        handleUpdateProfile.current = handleUpdateProfileOnClick
    })


    return (
        <Box sx={{marginBottom: "30px"}}>
            <Typography sx={{fontSize: '20px', fontWeight: 700, marginBottom: '15px'}}>Бизнес</Typography>
            {isLoading ?
                <Skeleton variant="rectangular" animation="wave" width={300} height={400}/> :
                <form>
                    <Table>
                        {formik.values.logo && formik.values.logo !== '' ?
                            <Box sx={{marginTop: "32px"}}>
                                <ImageContainer
                                    image={`${$imageApi}/${formik.values.logo}`}
                                    handleChange={(e) => {
                                        handleImageChange(e)
                                    }}
                                />
                            </Box>

                            :
                            // <Paper elevation={0} sx={{ height: "100px", width: "100px", border: '1px dashed #999999', display: 'flex', alignItems: 'center', textAlign: 'center', color: '#999999' }}>
                            //   Нет лого магазина
                            // </Paper>
                            <Box>
                                {values.createdLogo.length === 0 ?
                                    <ImageInput title="Добавить логотип" handleChange={handleAddImage2} height="100px"
                                                width="100px"/> :
                                    values.createdLogo.map((image, ind) =>
                                        <Grid item xs={1.1} key={ind}>
                                            <ImageContainer
                                                image={URL.createObjectURL(image)}
                                                handleChange={(e) => {
                                                    handleImageChange(e)
                                                }}
                                            />
                                        </Grid>)}

                            </Box>
                        }
                        <TableBody>
                            <TableRow>
                                <TableCell>Название</TableCell>
                                <TableCell>{formik.values.name}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>БИН/ИИН</TableCell>
                                <TableCell>{formik.values.bin_iin}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Адрес</TableCell>
                                <TableCell>{formik.values.legalAddress}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Номер телефона</TableCell>
                                <TableCell>
                                    <TextField value={values.phone} onChange={handleChange} variant={"standard"}
                                               InputProps={{
                                                   disableUnderline: true,
                                                   endAdornment: <InputAdornment position={"end"}>
                                                       <EditIcon/>
                                                   </InputAdornment>
                                               }}
                                               name="phone"
                                               fullWidth

                                    />
                                </TableCell>

                            </TableRow>
                            <TableRow>
                                <TableCell>instagram</TableCell>
                                <TableCell>
                                    <TextField value={values.instagram} onChange={handleChange} variant={"standard"}
                                               InputProps={{
                                                   disableUnderline: true,
                                                   endAdornment: <InputAdornment position={"end"}>
                                                       <EditIcon/>
                                                   </InputAdornment>

                                               }}
                                               name="instagram"
                                               multiline
                                               fullWidth
                                    />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Статус</TableCell>
                                <TableCell>
                                    {user?.shops[0].shop_type}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>

                </form>
            }
        </Box>
    )
}

export default ShopInfo
