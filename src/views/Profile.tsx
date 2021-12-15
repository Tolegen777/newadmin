import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import React from 'react';
import ShopInfo from '../components/profile/ShopInfo';
import UserInfo from '../components/profile/UserInfo';

const ProfileView = () => {

  return (
    <Box>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
        <Typography style={{ fontSize: "36px", fontWeight: 500 }}>Профиль</Typography>
      </div>
      <Paper sx={{ padding: '15px' }}>
        <Grid container>
          <Grid item sm={6} xs={6} lg={6}>
            <UserInfo />
          </Grid>
          <Grid item sm={6} xs={6} lg={6}>
            <ShopInfo />
          </Grid>
        </Grid>
        <Button variant="contained" size="large" color="primary">Сохранить</Button>
      </Paper>
    </Box >
  )
}

export default ProfileView;
