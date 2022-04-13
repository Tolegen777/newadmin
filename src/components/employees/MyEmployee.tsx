import React, {useState} from 'react';
import {
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    Grid,
    InputAdornment,
    Paper,
    TextField,
    Typography
} from "@mui/material";
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
import CloseIcon from "@mui/icons-material/Close";

import {useFormik} from "formik";
import * as yup from "yup"
import {useAddSellerMutation} from "../../store/rtk-api/addSeller-rtk/addSeller_rtk";
import {useTypedSelector} from "../../store";
import CustomAlert from "../alert/CustomAlert";

import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';


const MyEmployee = () => {

    const [value, setValue] = React.useState('all');
    const [role, setRole] = React.useState('all');
    const [open, setOpen] = React.useState(true);
    const [isWindowOpen, setWindowOpen] = React.useState(false)
    const [addSeller, {isLoading, isError: addSellingError, isSuccess}] = useAddSellerMutation()
    const data = useTypedSelector(state => state.auth)
    const [searchedName,setSearchedName] = useState('')


    const handleClick = () => {
        setOpen(!open);
    };


    const showWindow = () => {
        setWindowOpen(true)
    }
    const closeWindow = () => {
        setWindowOpen(false)
    }

    const submitAddingEmail = () => {
        formik.handleSubmit()
    }
    const handlePressEnter = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.code==="Enter"){
            setSearchedName(formik.values.search)
        }

    }



    const handleAddSeller = (email: string, shopId: number, ownerEmail: string) => {

        addSeller({email, shopId, ownerEmail})

    }

    // const changeRadioButtonValue:React.ChangeEventHandler<HTMLInputElement> = (e) => {
    //     console.log(e.target.value)
    // }

    const changeRadioButtonValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue((event.target as HTMLInputElement).value);
        setRole((event.target as HTMLInputElement).value)
        //console.log((event.target as HTMLInputElement).value)
    };


    // React.useEffect(() => {
    //     if(addSellingError) {
    //         alert('Возникла неизвестная ошибка перепрверьте email!')
    //
    //
    //     } else if(isSuccess) {
    //         closeWindow()
    //         alert("Операция успешно выполнено!")
    //
    //     }
    // }, [addSellingError,isSuccess])




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
                handleAddSeller(values.email, data?.shop.id, data?.user.email)
            }
        },
    });

    // useEffect( () => {
    //   setTimeout(() => {
    //         console.log(searchedName)
    //
    //
    //     }, 2000)
    //
    //     //return () => clearTimeout(delayDebounceFn)
    // }, [searchedName])

    // const handleChange = (e:Event) => {
    //     formik.handleChange
    //     if(!e){
    //         return
    //     }
    //     setSearchedName(String(e.target.value as HTMLInputElement))
    //
    // }

    // const handleChange = (event: SelectChangeEvent<typeof searchedName>) => {
    //     formik.handleChange(event.target.value)
    //     setSearchedName(String(event.target.value));
    //
    // };


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
                    // onKeyDown={event => handlePressEnter(event)}

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
            <EmployeesInfoList role={role} searchedName = {searchedName}/>
            {isWindowOpen && <Dialog
                open={isWindowOpen}

            >
                {isLoading && <CircularProgress/>}
                {addSellingError && <CustomAlert title="Ошибка" status="error"
                                                 message="Возникла неизвестная ошибка перепрверьте email!"/>}
                {isSuccess && <CustomAlert title="Успешно" status="success" message="Операция успешно выполнено"/>}

                <DialogTitle id="alert-dialog-title" sx={{}}>
                    <CloseIcon onClick={closeWindow} sx={{float: 'right', cursor: 'pointer'}}></CloseIcon>

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


                            <Button onClick={submitAddingEmail}
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    sx={{width: 80, height: 30, marginTop: 1}}
                            >
                                Send
                            </Button>
                        </Box>
                    </form>


                </DialogContent>


            </Dialog>}
        </Paper>

    );
};

export default MyEmployee;