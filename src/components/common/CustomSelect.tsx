import {FormHelperText, MenuItem, Select} from '@mui/material'
import React, {FC} from 'react'


interface Props {
    value: any,
    name: string

    handleChange(val: any): void,

    icon?: any,
    items: Array<{
        value: string | number | undefined,
        name: string
    }> | undefined,
    width?: string,
    height?: string,
    bgc?: string,
    bRadius?: string,
    helperText?: any,
    isDisabled?: boolean
}

const CustomSelect: FC<Props> = ({
                                     value,
                                     handleChange,
                                     icon,
                                     items,
                                     name, width,
                                     height = "40px",
                                     bRadius = "10px",
                                     isDisabled,
                                     helperText,
                                     bgc = "#FFFFFF"
                                 }) => {
    // debugger
    return <>
        <Select
            value={value}
            onChange={handleChange}
            name={name}
            IconComponent={icon && icon}
            disabled={isDisabled}
            sx={{
                height: height,
                background: bgc,
                borderRadius: bRadius,
                color: "#5e5d5d",
                width: width,
                fontSize: "16px"
            }}
        >
            {items && items.map((item) => {
                    return <MenuItem value={item.value}>{item.name}</MenuItem>
                }
            )}
        </Select>
        <FormHelperText sx={{color: "#FC4B4A"}}>
            {helperText}
        </FormHelperText>
    </>
}

export default CustomSelect