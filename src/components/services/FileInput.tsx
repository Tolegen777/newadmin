import React from 'react';
import {Button} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

const FileInput: React.FC = () => {
    return (
        <>
            <Button
                component="label"
                variant={"outlined"}
                color={"inherit"}


                sx={{
                    height: "120px",
                    width: "120px",
                    marginRight: "10px",
                    background: "#EFF3F9",
                    color: "#999999",
                    borderRadius: "10px",
                    "&:hover": {
                        background: "#817e7e",
                        color: "#ffffff"
                    }
                }}
            >

                <AddIcon
                    sx={{
                        fontSize: "50px"
                    }}
                />
                <input
                    type="file"
                    hidden
                    accept="image/png, image/gif, image/jpeg"
                />
            </Button>
        </>
    )
}
export default FileInput;