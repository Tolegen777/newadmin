import React from 'react';
import {
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    Paper,
    Typography,
    useMediaQuery,
    useTheme
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import {useNavigate} from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import CustomAlert from "../alert/CustomAlert";

type PropsType = {
    buttonTypeText: string,
    title: string,
    handleCreate?(): void
    handleCancelOrder?(): void,
    handleClickClose?(): void,
    isWindowOpen: boolean
    isLoading?: boolean,
    isLoading2?: boolean,
    isError?: any,
    isSuccess?: boolean,
    isError2?: any,
    isSuccess2?: boolean,
}

const OrderConfirmDialogWindow: React.FC<PropsType> = ({
                                                           buttonTypeText,
                                                           title,
                                                           handleCreate,
                                                           handleCancelOrder,
                                                           handleClickClose,
                                                           isWindowOpen,
                                                           isError,
                                                           isError2,
                                                           isLoading,
                                                           isLoading2,
                                                           isSuccess,
                                                           isSuccess2
                                                       }) => {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const navigate = useNavigate()
    const handleAfterOperationClose = () => {
        if (handleCreate) {
            handleCreate()
        } else if (handleCancelOrder) {
            handleCancelOrder()
        }

        setTimeout(()=>{
            navigate('/app/orders')
        },2000)
    }


    return (
        <Dialog
            open={isWindowOpen}

        >
            {(isLoading||isLoading2) && <CircularProgress/>}
            {(isError || isError2) && <CustomAlert title="Ошибка" status="error"
                                                   message="Возникла неизвестная ошибка!"/>}
            {isSuccess && <CustomAlert title="Успешно" status="success" message="Заказ отправлен на доставку!"/>}
            {isSuccess2 && <CustomAlert title="Успешно" status="success" message="Заказ отклонен!"/>}
            <Paper sx={{borderRadius: 1}}>
                <DialogTitle id="alert-dialog-title">
                    <CloseIcon onClick={handleClickClose} sx={{float: 'right', cursor: 'pointer'}}/>
                </DialogTitle>

                <DialogContent style={isMobile?{
                    width: '300px',
                    textAlign: 'center'
                }:{
                    width: '500px',
                    textAlign: 'center'
                }}>
                    <Typography sx={{fontWeight: 600, fontSize: '20px'}}>{title}</Typography>

                </DialogContent>
                <Box sx={{textAlign: 'center', marginBottom: '50px'}}>


                    <Button onClick={handleAfterOperationClose}
                            variant="contained"
                            color="primary"
                            size="large"
                    >
                        {buttonTypeText}
                    </Button>
                </Box>
            </Paper>

        </Dialog>

    );
};

export default OrderConfirmDialogWindow;