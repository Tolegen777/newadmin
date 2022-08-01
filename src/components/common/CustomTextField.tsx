import {TextField} from '@mui/material'
import React, {FC} from 'react'
import {makeStyles} from "@mui/styles";


interface Props {
    formik: any,
    field: string,
    placeholder?: string,
    fullWidth?: boolean,
    rows?: number,
    multiline?: boolean,
    style?: any,
    required?: boolean,
    type?: string

}

const CustomTextField: FC<Props> = ({
                                        formik,
                                        field,
                                        placeholder,
                                        fullWidth,
                                        rows,
                                        multiline,
                                        style, required, type = 'text'
                                    }) => {

    const useStyles = makeStyles(() => ({
        textField: {
            background: "#EFF3F9",
            borderRadius: "5px",
            color: "#5e5d5d",
            input: {
                "&::placeholder": {
                    color: "#5e5d5d"
                },
            },
        },

    }));
    const classes = useStyles();

    return <>
        <TextField
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
            InputProps={{
                className: classes.textField
            }}
            required={required}
            type={type}

        >
        </TextField>
    </>

}

export default CustomTextField