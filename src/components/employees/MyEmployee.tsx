import React, {useState} from 'react';
import {Button, Grid, InputAdornment, Paper, TextField, Typography} from "@mui/material";
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import SearchIcon from '@mui/icons-material/Search';
import EmployeesInfoList from "./EmployeesInfoList";
import {useFormik} from "formik";
import * as yup from "yup"
import {useAddSellerMutation} from "../../store/rtk-api/addSeller-rtk/addSeller_rtk";
import {useTypedSelector} from "../../store";
import IconButton from '@mui/material/IconButton';
import {useRemoveSellerMutation} from "../../store/rtk-api/removeSeller-rtk/removeSeller_rtk";
import UserRoleWindow from "./UserRoleWindow";


const MyEmployee = () => {

    const [value, setValue] = React.useState('all');
    const [role, setRole] = React.useState('all');
    const [open, setOpen] = React.useState(true);
    const [isWindowOpen, setWindowOpen] = React.useState(false)
    const [addSeller, {isLoading, isError: addSellingError, isSuccess}] = useAddSellerMutation()
    const [removeSeller,{isLoading:isRemoveSellerLoading,isError:isRemoveSellerError,isSuccess:isRemoveSuccess}] = useRemoveSellerMutation()
    const data = useTypedSelector(state => state.auth)
    const [searchedName,setSearchedName] = useState('')
    const [isRemoveWindowOpen, setRemoveWindowOpen] = React.useState(false)


    const handleClick = () => {
        setOpen(!open);
    };


    const showWindow = () => {
        setWindowOpen(true)
    }
    const closeWindow = () => {
        formik.values.email=''
        setWindowOpen(false)
        setRemoveWindowOpen(false)

    }

    const submitAddingEmail = () => {
        formik.handleSubmit()
    }

    const handleAddSeller = (email: string, shopId: number, ownerEmail: string) => {


        addSeller({email, shopId, ownerEmail})

    }

    const handleRemoveSeller = (email: string, shopId: number, ownerEmail: string) => {

        removeSeller({email, shopId, ownerEmail})
    }

    const handleRemoveWindowOpen = () => {
        setRemoveWindowOpen(true)
    }

    const changeRadioButtonValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue((event.target as HTMLInputElement).value);
        setRole((event.target as HTMLInputElement).value)
    };


    const validationSchema = yup.object().shape({
        email: yup
            .string()
            .email('Enter a valid email')
            .required('Email is required')
            .max(40, 'Too long email!')
    });
    const formik = useFormik({
        initialValues: {
            email: '',
            search:''
        },
        validationSchema: validationSchema,
        onSubmit: values => {

            if (data && data.user && data.shop) {
                if (isWindowOpen){
                    handleAddSeller(values.email, data?.shop.id, data?.user.email)

                } else if (isRemoveWindowOpen) {
                    handleRemoveSeller(values.email, data?.shop.id, data?.user.email)

                }

            }
        },
    });



    return (

        <Paper sx={{paddingLeft: 3, paddingTop: 3}}>
            <Typography sx={{marginBottom: 3}}>Список сотрудников</Typography>
            <form>
                <TextField
                    name="search"
                    onChange={formik.handleChange}
                    value={formik.values.search}
                    placeholder="найти"
                    size="medium"
                    sx={{width: '700px', backgroundColor: '#F2F4F5'}}

                    InputProps={{
                        endAdornment: <InputAdornment position="end"><IconButton onClick={()=>{setSearchedName(formik.values.search)}}
                            color="primary" sx={{ p: '10px' }} aria-label="directions">
                            <SearchIcon/>
                        </IconButton></InputAdornment>
                    }}
                />

            </form>

            <Grid container sx={{marginTop: 2}}>
                <Grid>
                    <List
                        sx={{width: '100%', maxWidth: 260, backgroundColor: 'background.paper'}}
                        component="nav"
                        aria-labelledby="mailbox folders"
                    >
                        <ListItemButton onClick={handleClick}
                                        sx={{
                                            border: '1px solid black',
                                            borderRadius: 3,
                                            height: '40px',
                                            width: '250px'
                                        }}>
                            <ListItemText primary="Все статусы" sx={{fontWeight: 'bold'}}/>
                            {open ? <ExpandLess/> : <ExpandMore/>}
                        </ListItemButton>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <ListItemButton sx={{pl: 4}}>
                                    <ListItemIcon>
                                        <FormControl>
                                            <RadioGroup
                                                aria-labelledby="demo-controlled-radio-buttons-group"
                                                name="controlled-radio-buttons-group"
                                                value={value}
                                                onChange={changeRadioButtonValue}

                                            >
                                                <FormControlLabel value="all" control={<Radio/>} label="Все статусы"/>
                                                <FormControlLabel value="seller" control={<Radio/>}
                                                                  label="Управляющий"/>
                                                <FormControlLabel value="admin" control={<Radio/>}
                                                                  label="Администратор"/>
                                            </RadioGroup>
                                        </FormControl>
                                    </ListItemIcon>
                                </ListItemButton>
                            </List>
                        </Collapse>
                    </List>
                </Grid>
                <Grid>
                    <Button variant="contained"
                            color="primary"
                            size="large"
                            onClick={showWindow}
                            sx={{
                                border: '1px solid black',
                                borderRadius: 3,
                                height: '40px',
                                width: '250px',
                                margin: '7px 50px'
                            }}
                    >
                        Добавить
                    </Button>
                </Grid>
            </Grid>
            <EmployeesInfoList role={role} searchedName = {searchedName} handleRemoveWindowOpen={handleRemoveWindowOpen}/>
            {isWindowOpen && <UserRoleWindow closeWindow={closeWindow} isLoading={isLoading} isSuccess={isSuccess} isWindowOpen={isWindowOpen}
                                             addSellingError={addSellingError} formik={formik} submitAddingEmail={submitAddingEmail} buttonText="добавить"/>
            }
            {isRemoveWindowOpen && <UserRoleWindow closeWindow={closeWindow} isLoading={isRemoveSellerLoading} isSuccess={isRemoveSuccess} isWindowOpen={isRemoveWindowOpen}
                                                   addSellingError={isRemoveSellerError} formik={formik} submitAddingEmail={submitAddingEmail} buttonText="удалить"/>
            }

        </Paper>

    );
};





export default MyEmployee;