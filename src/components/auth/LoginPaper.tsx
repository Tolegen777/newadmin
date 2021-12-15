import React from 'react';
import { Paper, Grid, Typography } from '@mui/material';
import styles from '../../assets/styles/auth.module.css';
import logo2 from "../../assets/logo2.svg";
import LoginForm from './LoginForm';

const LoginPaper = () => {

  return (
    <Paper className={styles.paper} elevation={6}>
      <Grid container className={styles.gridContainer}>
        <Grid item sm={6} xs={6} lg={6} sx={{
          height: '90vh', background: 'linear-gradient(320.48deg, #8A3FFC 25.64%, #FFFFFF 173.64%)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'
        }}>
          <img
            className={styles.image}
            alt="<logo>"
            src={logo2}
          />
          <Typography variant="caption" color="White" sx={{marginTop: '15px'}}>ИНТЕРНЕТ ГИПЕРМАРКЕТ</Typography>
        </Grid>
        <Grid item sm={6} xs={6} lg={6}>
          <LoginForm />
        </Grid>
      </Grid>
    </Paper>
  )
}

export default LoginPaper
