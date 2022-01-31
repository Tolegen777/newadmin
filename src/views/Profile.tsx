import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import ShopInfo from '../components/profile/ShopInfo';
import UserInfo from '../components/profile/UserInfo';
import { useTypedSelector } from '../store';
import { updateUserAvatar } from '../store/auth/auth.action';
import { ActionsEnum } from '../store/enum';

const ProfileView = () => {
  const { user: profile, error, status } = useTypedSelector(state => state.auth);
  const [avatar, setAvatar] = React.useState<File | null>(null);
  const dispatch = useDispatch();

  const handleAvatarChange = (event: Event) => {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) {
      return;
    }
    const image = input.files[0];
    setAvatar(image);
  }

  const handleDelete = () => {
    setAvatar(null);
  }

  const handleSubmit = () => {
    dispatch(updateUserAvatar({id: profile?.id, avatar: avatar}))
  }

  return (
    <Box>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
        <Typography style={{ fontSize: "36px", fontWeight: 500 }}>Профиль</Typography>
      </div>
      <Paper sx={{ padding: '15px' }}>
        <Grid container>
          <Grid item sm={6} xs={6} lg={6}>
            {profile &&
              <UserInfo profile={profile} avatar={avatar} isLoading={status === ActionsEnum.LOADING} onChange={handleAvatarChange} onDelete={handleDelete} />
            }
          </Grid>
          <Grid item sm={6} xs={6} lg={6}>
            <ShopInfo />
          </Grid>
        </Grid>
        <Button variant="contained" size="large" color="primary" onClick={handleSubmit}>Сохранить</Button>
        {error && <Typography color="error">Ошибка! Попробуйте позже.</Typography>}
      </Paper>
    </Box >
  )
}

export default ProfileView;
