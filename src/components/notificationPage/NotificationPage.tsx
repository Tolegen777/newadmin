import * as React from 'react';
import Paper from "@mui/material/Paper";
import {useTypedSelector} from "../../store";
import { Grid, Typography} from "@mui/material";
import {Box} from "@mui/system";
import photo from "../../assets/images/user (1).png";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {readNotification} from "../../store/webSocket/webSocket.slice";


const NotificationPage = () => {
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(readNotification())
    },[])

    const notificationData = useTypedSelector(state => state.websocketNotification)

    return (
        <Paper sx={{height: '85vh', overflow: 'scroll', scrollBehavior: 'smooth',}}>

            <Box sx={{marginLeft: '10px', marginBottom: '10px'}}>
                {notificationData.data.slice(0).reverse().map((n, idx) => {
                        return (
                            <Grid key={idx} container sx={{marginLeft: '10px', marginTop: '10px'}}>
                                <Grid sx={{marginTop: '15px'}}>
                                    <img
                                        src={photo}
                                        alt=""
                                        style={{height: '30px', width: 'auto'}}
                                    />
                                </Grid>
                                <Grid sx={{marginTop: '15px'}}>
                                    <Paper sx={{
                                        minWidth: '150px',
                                        maxWidth: '350px',
                                        minHeight: '40px',
                                        borderBottomLeftRadius: '15px',
                                        borderBottomRightRadius: '15px',
                                        borderTopRightRadius: '15px',
                                        marginLeft: '10px',
                                        border: '1px solid #e0e0e0'
                                    }}>
                                        <Typography sx={{padding: '5px 8px'}}>{n.message}</Typography>
                                    </Paper>
                                </Grid>
                            </Grid>


                        )
                    }
                )
                }

            </Box>


        </Paper>
    );
};

export default NotificationPage