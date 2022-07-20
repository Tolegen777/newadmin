import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {Button, Typography} from "@mui/material";
import React from "react";
import {useNavigate} from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";

export const GoPrevButton:React.FC = () => {
    const navigate = useNavigate()
    return <Button color={"inherit"} sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}
    onClick={() => navigate(-1)}
>
    <ArrowBackIcon sx={{
        background: "#EFF3F9",
            borderRadius: "10px", p: "5px"
    }}/>
    <Typography sx={{ml: "5px", textTransform: "capitalize"}}>Назад</Typography>
    </Button>
}

interface SaveProps {
    title:string
    callback():void
}

export const SaveButton:React.FC<SaveProps> = ({callback, title}) => {
    return <Button variant="contained"
                   sx={{borderRadius: "10px", width: "250px",
                       height: "40px"}}
                   onClick={callback}>{title}</Button>
}

interface AddProps {
    title:string
    callback():void
}
export const AddButton:React.FC<AddProps> = ({callback, title}) => {
    return <Button variant="contained" startIcon={<AddIcon/>}
                   sx={{borderRadius: "10px"}}
                   onClick={callback}>{title}</Button>
}

