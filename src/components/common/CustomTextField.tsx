import {TextField, Typography} from '@mui/material'
import React, {FC} from 'react'
import {styled} from "@mui/material/styles";


interface Props {
    formik: any,
    field: string,
    placeholder?:string,
    fullWidth?:boolean,
    rows?:number,
    multiline?:boolean,
    style?:any

}

const StyledTextField = styled(TextField,)(({theme}) => ({
    background: "#EFF3F9",
    borderRadius: "5px",
    input: {
        color: "#5e5d5d",
        "&::placeholder": {
            color: "#C3C3C3"
        },
    },
}))

const CustomTextField: FC<Props> = ({
                                        formik,
                                        field,
                                        placeholder,
    fullWidth,
    rows,
                                        multiline,
    style
                                    }) => {
    return <>
        <StyledTextField
            id={field}
            name={field}
            //label={field}
            value={formik.values[`${field}`]}
            onChange={formik.handleChange}
            error={formik.touched[`${field}`] && Boolean(formik.errors[`${field}`])}
            helperText={formik.touched[`${field}`] && formik.errors[`${field}`]}
            sx={style}
            fullWidth={fullWidth}
            size={"small"}
            placeholder={placeholder}
            rows={rows}
            multiline={multiline}
        >
        </StyledTextField>
    </>

}

export default CustomTextField