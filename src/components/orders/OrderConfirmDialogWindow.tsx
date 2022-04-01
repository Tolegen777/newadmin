import React from 'react';
import {Box, Button, Dialog, DialogContent, DialogTitle, Paper, Typography} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import {useNavigate} from "react-router-dom";

type PropsType = {
    buttonTypeText:string,
    title:string,
    handleCreate?(): void
    handleCancelOrder?(): void,
    handleClickClose?():void,
    isWindowOpen:boolean
}

const OrderConfirmDialogWindow:React.FC<PropsType> = ({buttonTypeText,title,handleCreate,handleCancelOrder,handleClickClose,isWindowOpen}) => {
    const navigate = useNavigate()
    const handleAfterOperationClose = () => {
        if (handleCreate){
            handleCreate()
        } else if (handleCancelOrder){
            handleCancelOrder()
        }

        navigate('/app/orders')
    }


    return (
        <Dialog
            open={isWindowOpen}

        >
            <Paper sx = {{borderRadius:1}}>
                <DialogTitle id="alert-dialog-title" sx={{}}>
                    <CloseIcon onClick={handleClickClose} sx={{float:'right',cursor:'pointer'}}></CloseIcon>
                </DialogTitle>

                <DialogContent sx = {{width:'500px',textAlign:'center'}}>
                    <Typography sx={{ fontWeight: 600, fontSize:'20px' }}>{title}</Typography>

                </DialogContent>
                <Box sx={{textAlign:'center',marginBottom:'50px'}}>


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