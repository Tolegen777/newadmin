import React, {useState, KeyboardEvent} from 'react';
import {Button, Grid, InputAdornment, Paper, TextField, Typography, useMediaQuery, useTheme} from "@mui/material";
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
import RoleRemoveWindow from "./RoleRemoveWindow";


const MyEmployee = () => {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [role, setRole] = useState('all');
    const [open, setOpen] = useState(true);
    const [isWindowOpen, setWindowOpen] = useState(false)
    const [addSeller, {isLoading, isError: addSellingError, isSuccess}] = useAddSellerMutation()
    const [removeSeller, {
        isLoading: isRemoveSellerLoading,
        isError: isRemoveSellerError,
        isSuccess: isRemoveSuccess
    }] = useRemoveSellerMutation()
    const data = useTypedSelector(state => state.auth)
    const [searchedName, setSearchedName] = useState('')
    const [isRemoveWindowOpen, setRemoveWindowOpen] = useState(false)
    const [isAlert, setAlert] = useState(false)
    const [removeSellerEmail, setRemoveSellerEmail] = useState('')


    const handleClick = () => {
        setOpen(!open);
    };
    const showWindow = () => {
        setWindowOpen(true)
    }
    const closeWindow = () => {
        formik.values.email = ''
        setWindowOpen(false)
        setRemoveWindowOpen(false)
        setAlert(false)
    }
    const submitAddingEmail = () => {
        formik.handleSubmit()
    }
    const submitRemovingEmail = () => {
        if (data && data.user && data.shop && removeSellerEmail) {
            handleRemoveSeller(removeSellerEmail, data?.shop.id, data?.user.email)
        }
    }

    const handleAddSeller = (email: string, shopId: number, ownerEmail: string) => {
        addSeller({email, shopId, ownerEmail})
        setAlert(true)
    }

    const handleRemoveSeller = (email: string, shopId: number, ownerEmail: string) => {
        removeSeller({email, shopId, ownerEmail})
        setAlert(true)
    }

    const handleRemoveWindowOpen = (email: string) => {
        setRemoveWindowOpen(true)
        setRemoveSellerEmail(email)
    }

    const changeRadioButtonValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRole((event.target as HTMLInputElement).value)
    };


    const handleSearch = (e: KeyboardEvent<HTMLImageElement>) => {
        if (e.key === "Enter") {
            setSearchedName(formik.values.search)
        }
    };


    const validationSchema = yup.object().shape({
        email: yup
            .string()
            .email('?????????????? ???????????????????????????? ?????????? ?????????????????????? ??????????')
            .required('?????????????????? ?????????????????????? ??????????')
            .max(40, '?????????????? ?????????????? ?????????????????????? ????????????!')
    });
    const formik = useFormik({
        initialValues: {
            email: '',
            search: ''
        },
        validationSchema: validationSchema,
        onSubmit: values => {
            if (data && data.user && data.shop) {
                if (isWindowOpen) {
                    handleAddSeller(values.email, data?.shop.id, data?.user.email)
                }
            }
        },
    });
    return (
        <Paper sx={{paddingLeft: 3, paddingTop: 3}}>
            <Typography sx={{marginBottom: 3}}>???????????? ??????????????????????</Typography>
            <form onSubmit={e => e.preventDefault()}>
                <TextField
                    name="search"
                    onChange={formik.handleChange}
                    value={formik.values.search}
                    placeholder="??????????"
                    size="medium"
                    sx={{width: isMobile ? '90%' : '700px', backgroundColor: '#F2F4F5'}}
                    onKeyDown={handleSearch}
                    InputProps={{
                        endAdornment: <InputAdornment position="end"><IconButton onClick={() => {
                            setSearchedName(formik.values.search)
                        }}
                                                                                 color="primary" sx={{p: '10px'}}
                                                                                 aria-label="directions">
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
                            <ListItemText primary="?????? ??????????????" sx={{fontWeight: 'bold'}}/>
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
                                                value={role}
                                                onChange={changeRadioButtonValue}

                                            >
                                                <FormControlLabel value="all" control={<Radio/>} label="?????? ??????????????"/>
                                                <FormControlLabel value="seller" control={<Radio/>}
                                                                  label="??????????????????????"/>
                                                <FormControlLabel value="admin" control={<Radio/>}
                                                                  label="??????????????????????????"/>
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
                        ????????????????
                    </Button>
                </Grid>
            </Grid>
            <EmployeesInfoList role={role} searchedName={searchedName} handleRemoveWindowOpen={handleRemoveWindowOpen}/>
            {isWindowOpen && <UserRoleWindow closeWindow={closeWindow} isLoading={isLoading} isSuccess={isSuccess}
                                             isWindowOpen={isWindowOpen}
                                             isError={addSellingError} formik={formik}
                                             submitAddingEmail={submitAddingEmail} buttonText="????????????????"
                                             isAlert={isAlert}/>
            }
            {isRemoveWindowOpen && <RoleRemoveWindow closeWindow={closeWindow} isLoading={isRemoveSellerLoading}
                                                     isSuccess={isRemoveSuccess} isWindowOpen={isRemoveWindowOpen}
                                                     isError={isRemoveSellerError}
                                                     submitRemovingEmail={submitRemovingEmail} isAlert={isAlert}/>
            }

        </Paper>

    );
};


export default MyEmployee;