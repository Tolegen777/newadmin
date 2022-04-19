import React from "react";
import {Box, Button, Dialog, DialogContent, DialogTitle, TextField, Typography} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import CustomAlert from "../alert/CustomAlert";
import CloseIcon from "@mui/icons-material/Close";

type PropsType = {
    isWindowOpen:boolean,
    isLoading:boolean,
    addSellingError:boolean,
    isSuccess:boolean,
    closeWindow():void,
    formik:any,
    submitAddingEmail():void,
    buttonText:string,



}

const UserRoleWindow:React.FC<PropsType> = ({isWindowOpen,isLoading,addSellingError,isSuccess,closeWindow,formik,submitAddingEmail,buttonText}) => {

    return(
        <Dialog
            open={isWindowOpen}

        >
            {isLoading && <CircularProgress/>}
            {addSellingError && <CustomAlert title="Ошибка" status="error"
                                             message="Возникла неизвестная ошибка перепрверьте email!"/>}{isSuccess && <CustomAlert title="Успешно" status="success" message="Операция успешно выполнено"/>}

            <DialogTitle id="alert-dialog-title" sx={{}}>
                <CloseIcon sx={{float: 'right', cursor: 'pointer'}} onClick={closeWindow}/>

            </DialogTitle>

            <DialogContent sx={{width: '500px', textAlign: 'center'}}>
                <Typography sx={{marginBottom: 3, fontWeight: 'bold'}}>Напишите электронную почту</Typography>
                <form>

                    <TextField

                        name="email"
                        type="email"
                        label="email"
                        rows={1}
                        variant="outlined"
                        size="small"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        sx={{width: 300, height: 70}}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}

                    />


                    <Box sx={{textAlign: 'center', marginBottom: '50px'}}>


                        <Button variant="contained"
                                color="primary"
                                size="large"
                                sx={{width: 100, height: 30, marginTop: 1, textTransform:'lowercase'}}
                                onClick={submitAddingEmail}
                        >
                            {buttonText}
                        </Button>
                    </Box>
                </form>


            </DialogContent>


        </Dialog>
    )
}

export default UserRoleWindow