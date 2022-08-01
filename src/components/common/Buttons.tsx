import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {Button, Typography} from "@mui/material";
import React from "react";
import {useNavigate} from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import {styled} from "@mui/material/styles";

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

export const StyledActiveBtn = styled(Button)(({theme}) => ({
    cursor:"pointer",
    width: "160px",
    height: "40px",
    border: "2px solid #8A3FFC",
    borderRadius: "10px",
    fontWeight: "600",
    fontSize: "14px",
    lineHeight: "17px",
    textTransform: "capitalize",
    transitionDelay: "0.2s",
    "&:hover":{
        cursor:"pointer",
        border: "2px solid #8A3FFC",
    }
}))

export const StyledInActiveBtn = styled(Button)(({theme}) => ({
    width: "160px",
    height: "40px",
    border: "2px solid #C3C3C3",
    borderRadius: "10px",
    fontWeight: "400",
    fontSize: "14px",
    lineHeight: "17px",
    letterSpacing: "-0.333333px",
    color: "#C3C3C3",
    textTransform: "capitalize",
    transitionDelay: "0.2s",
    marginRight: "5px",
}))

export const StyledSearchBtn = styled(Button)(({theme}) => ({
    border: "1px solid #C3C3C3",
    borderRadius: "10px",
    fontWeight: "400",
    fontSize: "18px",
    lineHeight: "22px",
    letterSpacing: "-0.333333px",
    textTransform: "uppercase",
    color: "#C3C3C3",
    width: "120px",
    height: "40px",
    cursor: "pointer",
    "&:hover": {
        color: "#8A3FFC",
    }
}))

