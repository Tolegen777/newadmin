import {Box, Button, Grid, Paper, Typography} from '@mui/material';
import React from 'react';
import {useDispatch} from 'react-redux';
import ShopInfo from '../components/profile/ShopInfo';
import UserInfo from '../components/profile/UserInfo';
import {useTypedSelector} from '../store';

const ProfileView = () => {
    const {user: profile, error, isLoading} = useTypedSelector(state => state.auth);
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

    const handleUpdateProfile = React.useRef(null)



    return (
        <Box>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px'}}>
                <Typography style={{fontSize: "42px", fontWeight: 500}}>Профиль</Typography>
            </div>
            <Paper sx={{padding: '15px'}}>
                <Grid container>
                    <Grid item sm={6} xs={6} lg={6}>
                        <ShopInfo handleUpdateProfile={handleUpdateProfile} isLoading={isLoading}/>
                    </Grid>
                    <Grid item sm={6} xs={6} lg={6}>

                        {profile &&
                            <UserInfo profile={profile} avatar={avatar} isLoading={isLoading}
                                      onChange={handleAvatarChange} onDelete={handleDelete}/>
                        }
                    </Grid>
                </Grid>
                {error && <Typography color="error">Ошибка! Попробуйте позже.</Typography>}
                <Box sx={{display: "flex", justifyContent: "flex-end"}}>
                    <Button
                        variant="contained"
                        size="large"
                        // @ts-ignore
                        onClick={() => handleUpdateProfile.current()}
                        disabled={isLoading}
                    >
                        Сохранить
                    </Button>
                </Box>
            </Paper>
        </Box>
    )
}

export default ProfileView;
