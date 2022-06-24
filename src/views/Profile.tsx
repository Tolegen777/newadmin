import {Box, Button, Grid, Paper, Typography, useMediaQuery, useTheme} from '@mui/material';
import React from 'react';
import ShopInfo from '../components/profile/ShopInfo';
import UserInfo from '../components/profile/UserInfo';
import {useTypedSelector} from '../store';

const ProfileView = () => {
    const {user: profile, error, isLoading} = useTypedSelector(state => state.auth);
    const [avatar, setAvatar] = React.useState<File | null>(null);

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
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    return (
        <Box>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px'}}>
                <Typography style={{fontWeight: 500}} fontSize={isMobile ? "30px" : "42px"}>Профиль</Typography>
            </div>
            <Paper sx={{padding: '15px'}}>
                <Grid container>
                    <Grid item sm={12} xs={12} lg={6}>
                        <ShopInfo handleUpdateProfile={handleUpdateProfile} isLoading={isLoading}/>
                    </Grid>
                    <Grid item sm={12} xs={12} lg={6}>
                        {profile &&
                            <UserInfo profile={profile} avatar={avatar} isLoading={isLoading}
                                      onChange={handleAvatarChange} onDelete={handleDelete}/>
                        }
                    </Grid>
                </Grid>
                {error && <Typography color="error">Ошибка! Попробуйте позже.</Typography>}
                <Box sx={{display: "flex", justifyContent: "flex-end",}}>
                    <Button
                        variant="contained"
                        size="large"
                        // @ts-ignore
                        onClick={() => handleUpdateProfile.current()}
                        disabled={isLoading}
                        sx={{mt: "10px", mb: "30px"}}
                    >
                        Сохранить
                    </Button>
                    <div></div>
                </Box>
            </Paper>
        </Box>
    )
}

export default ProfileView;
