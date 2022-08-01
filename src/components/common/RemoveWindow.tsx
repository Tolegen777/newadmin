import React, {useState} from "react";
import {Box, Button, Dialog, DialogContent, DialogTitle, Typography, useMediaQuery, useTheme} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import CustomAlert from "../alert/CustomAlert";
import CloseIcon from "@mui/icons-material/Close";

type PropsType = {
    titleQuestion: string,
    isWindowOpen: boolean,
    isLoading: boolean,
    isError: boolean,
    isSuccess: boolean,
    closeWindow(): void,
    handleDelete(id: number): void,
    id: number | null,
    errorMessage: any
}


const RemoveWindow: React.FC<PropsType> = ({
                                               titleQuestion,
                                               isWindowOpen,
                                               isLoading,
                                               isError,
                                               isSuccess,
                                               closeWindow,
                                               handleDelete,
                                               id,
                                               errorMessage
                                           }) => {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [itemId, setItemId] = useState<number | null>(null)
    const handleClose = () => {
        setItemId(null)
        closeWindow()
    }
    const handleDeleteFunction = () => {
        if (id) {
            handleDelete(id)
        }
        setItemId(id)
    }
    return (
        <Dialog
            open={isWindowOpen}
            sx={{overflow: "hidden"}}
        >
            {isLoading && <CircularProgress/>}
            {isError && itemId && <CustomAlert title="Ошибка" status="error" message={"Что то пошло не так"}/>}
            {isSuccess && itemId && <CustomAlert title="Успех" status="success" message="Операция успешно выполнено"/>}
            <DialogTitle id="alert-dialog-title">
                <CloseIcon sx={{float: 'right', cursor: 'pointer'}} onClick={handleClose}/>
            </DialogTitle>
            <DialogContent style={isMobile ? {
                width: '300px',
                textAlign: 'center'
            } : {
                width: '500px',
                textAlign: 'center'
            }}>
                <Typography sx={{marginBottom: 3, fontWeight: 'bold'}}>{titleQuestion}</Typography>
                <form>
                    <Box sx={{textAlign: 'center', marginBottom: '50px'}}>
                        <Button variant="contained"
                                color="primary"
                                size="large"
                                sx={{width: 100, height: 30, marginTop: 1, textTransform: 'lowercase'}}
                                onClick={handleDeleteFunction}
                        >
                            Удалить
                        </Button>
                        <Button variant="contained"
                                color="inherit"
                                size="large"
                                sx={{
                                    width: 100,
                                    height: 30,
                                    marginTop: 1,
                                    textTransform: 'lowercase',
                                    marginLeft: "10px"
                                }}
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

export default RemoveWindow