import {FormHelperText, MenuItem, Select} from '@mui/material'
import React, {FC} from 'react'


interface Props {
    value: string | number,
    name: string

    handleChange(val: any): void,

    icon?: any,
    items: Array<{
        value: string | number,
        name: string
    }>,
    width?: string,
    height?: string,
    bgc?:string,
    bRadius?:string,
    helperText?:any
}

const CustomSelect: FC<Props> = ({
                                     value,
                                     handleChange,
                                     icon,
                                     items,
                                     name, width,
                                     height = "40px",
                                     bRadius="10px",
    helperText,
    bgc="#FFFFFF"
                                 }) => {
    // debugger
    return <>
        <Select
            value={value}
            onChange={handleChange}
            name={name}
            IconComponent={icon && icon}
            sx={{
                height: height,
                background: bgc,
                borderRadius: bRadius,
                color: "#5e5d5d",
                width: width,
            }}
        >
            {items.map((item) => {
                    return <MenuItem value={item.value}>{item.name}</MenuItem>
                }
            )}
        </Select>
        {/*<FormHelperText sx={{color: "#FC4B4A"}}>*/}
        {/*    {helperText}*/}
        {/*</FormHelperText>*/}
    </>
}

export default CustomSelect