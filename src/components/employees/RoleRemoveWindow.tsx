import React from "react";
import {
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    TextField,
    Typography,
    useMediaQuery,
    useTheme
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import CustomAlert from "../alert/CustomAlert";
import CloseIcon from "@mui/icons-material/Close";

type PropsType = {
    isWindowOpen:boolean,
    isLoading:boolean,
    isError:boolean,
    isSuccess:boolean,
    closeWindow():void,
    submitRemovingEmail():void,
    isAlert:boolean



}

const RoleRemoveWindow:React.FC<PropsType> = ({isWindowOpen,isLoading,isError,isSuccess,closeWindow,submitRemovingEmail,isAlert}) => {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    return(
        <Dialog
            open={isWindowOpen}
        >
            {isLoading && <CircularProgress/>}
            {isError && isAlert &&<CustomAlert title="Ошибка" status="error"
                                             message="Возникла неизвестная ошибка перепроверьте email!"/>}{isAlert && isSuccess && <CustomAlert title="Успешно" status="success" message="Операция успешно выполнено"/>}

            <DialogTitle id="alert-dialog-title" sx={{}}>
                <CloseIcon sx={{float: 'right', cursor: 'pointer'}} onClick={closeWindow}/>

            </DialogTitle>

            <DialogContent style={isMobile?{
                width: '300px',
                textAlign: 'center'
            }:{
                width: '500px',
                textAlign: 'center'
            }}>
                <Typography sx={{marginBottom: 3, fontWeight: 'bold'}}>Вы точно хотите удалить сотрудника ?</Typography>
                <form>

                    <Box sx={{textAlign: 'center', marginBottom: '50px'}}>


                        <Button variant="contained"
                                color="primary"
                                size="large"
                                sx={{width: 100, height: 30, marginTop: 1, textTransform:'lowercase'}}
                                onClick={submitRemovingEmail}
                        >
                            Удалить
                        </Button>
                        <Button variant="contained"
                                color="inherit"
                                size="large"
                                sx={{width: 100, height: 30, marginTop: 1, textTransform:'lowercase', marginLeft:"10px"}}
                                onClick={closeWindow}
                        >
                            Отмена
                        </Button>
                    </Box>
                </form>


            </DialogContent>


        </Dialog>
    )
}

export default RoleRemoveWindow