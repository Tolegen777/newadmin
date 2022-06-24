import * as React from 'react';
import {useEffect} from 'react';
import Paper from "@mui/material/Paper";
import {useTypedSelector} from "../../store";
import {Grid, Typography, useMediaQuery, useTheme} from "@mui/material";
import {Box} from "@mui/system";
import photo from "../../assets/logo.svg";
import {useDispatch} from "react-redux";
import {readNotification} from "../../store/webSocket/webSocket.slice";


const NotificationPage = () => {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const dispatch = useDispatch()
    const bottomRef = React.useRef<HTMLDivElement>(null);
    const notificationData = useTypedSelector(state => state.websocketNotification)
    useEffect(() => {
        dispatch(readNotification())
    }, [])
    const scrollToBottom = () => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    };
    useEffect(() => {
        scrollToBottom()
    }, [notificationData])


    return (
        <Paper sx={{height: '85vh', overflow: 'scroll', scrollBehavior: 'smooth',}}>
            <Box sx={{p: "10px"}}>
                {notificationData.data.slice(0).reverse().map((n, idx) => {
                        return (
                            <Grid key={idx} container sx={{ml: '10px', mt: '20px', p: '5px'}}
                                  direction={isMobile ? "column" : "row"}>
                                <Grid item>
                                    <img
                                        src={photo}
                                        alt=""
                                        style={{height: '50px', width: '50px', borderRadius: "50px", marginRight: "5px"}}
                                    />
                                </Grid>
                                <Grid item>
                                    <Box sx={{
                                        minWidth: '100px',
                                        maxWidth: '400px',
                                        minHeight: '40px',
                                        borderRadius: "0px 20px 20px 20px",
                                        marginLeft: '10px',
                                        border: '1px solid #C3C3C3'
                                    }}>
                                        <Typography sx={{padding: '5px 4px 5px 8px'}}>{n.message}</Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                        )
                    }
                )
                }
                <div ref={bottomRef} className="list-bottom"></div>
            </Box>
        </Paper>
    );
};

export default NotificationPage