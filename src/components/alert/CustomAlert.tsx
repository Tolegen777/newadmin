import * as React from 'react';
import Alert from '@mui/material/Alert';
import {AlertTitle} from "@mui/material";
import {useNavigate} from "react-router-dom";

type PropsType = {
    title: string,
    message: string,
    status: 'success' | 'info' | 'warning' | 'error',
    isLink?:boolean
}

const CustomAlert: React.FC<PropsType> = ({message, status, title,isLink=false}) => {

    const linkStyle = {
        textDecoration:"underline",
        cursor:"pointer"
    }
    const navigate = useNavigate()

    return (
        <Alert severity={status}>
            <AlertTitle>{title}</AlertTitle>
            <div style={isLink?linkStyle:{}} onClick={()=>navigate('notifications')}>
                <strong>{message}</strong>
            </div>

        </Alert>
    );
};

export default CustomAlert;