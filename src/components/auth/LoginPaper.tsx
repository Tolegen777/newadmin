import React from 'react';
import {Paper, Grid, Typography, useTheme, useMediaQuery} from '@mui/material';
import styles from '../../assets/styles/auth.module.css';
import logo2 from "../../assets/logo2.svg";
import LoginForm from './LoginForm';

const LoginPaper = () => {

    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
    return (
        <Paper elevation={6} sx={isMobile ? {width: "98%"} : {width: "80%"}}>
            <Grid container className={styles.gridContainer}>
                <Grid item sm={12} xs={12} lg={6} md={6} sx={{
                    background: 'linear-gradient(320.48deg, #8A3FFC 25.64%, #FFFFFF 173.64%)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                }} height={isMobile ? '30vh' : '90vh'} borderRadius={isMobile ? "0px 0px 50px 50px" : ''}
                      mb={isMobile ? '40px' : ''}>
                    <img
                        className={styles.image}
                        alt="<logo>"
                        src={logo2}
                    />
                    <Typography variant="caption" color="White" sx={{marginTop: '15px'}}>ИНТЕРНЕТ
                        ГИПЕРМАРКЕТ</Typography>
                </Grid>
                <Grid item sm={12} xs={12} lg={6} md={6} height={isMobile ? '60vh' : ''}>
                    <LoginForm/>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default LoginPaper
