import React from 'react';
import {Button} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

interface Props {
    width?:string,
    height?:string,
    handleChange(value:any):void,
    disabled?:boolean
}

const FileInput: React.FC<Props> = ({width="120px", height="120px", handleChange, disabled}) => {
    return (
        <>
            <Button
                component="label"
                variant={"outlined"}
                color={"inherit"}
                sx={{
                    height: height,
                    width: width,
                    marginRight: "10px",
                    background: "#EFF3F9",
                    color: "#999999",
                    borderRadius: "10px",
                    border:"none",
                    "&:hover": {
                        border:"1px solid #999999"
                    }
                }}
                disabled={disabled}
            >

                <AddIcon
                    sx={{
                        fontSize: "40px"
                    }}
                />
                <input
                    type="file"
                    hidden
                    accept="image/png, image/gif, image/jpeg"
                    onChange={handleChange}
                />
            </Button>
        </>
    )
}
export default FileInput;