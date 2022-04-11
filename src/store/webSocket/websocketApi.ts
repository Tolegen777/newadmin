import {io} from "socket.io-client";
import {getEnvApi} from "../../api";
import {useDispatch} from "react-redux";
import {getNotification} from "./webSocket.slice";


export const connectSocket = () => {

    const socket = io(`${getEnvApi()}shop`,{
        transports:["websocket"],
        // path:"/",
        query:{
            token:`${localStorage.getItem('access_token')}`,
        },// auth:{token:`Bearer ${localStorage.getItem('access_token')}`},
        // withCredentials:true,
        transportOptions: {
            polling: {
                extraHeaders: {
                    token: `Bearer ${localStorage.getItem('access_token')}`,
                },
            },
        },
    })

    socket.on('connect', () => {
        console.log('connected!!');

    });
    // socket.on("notification",(data)=>{
    //     console.log(data)
    // })

    // socket.on('data', function(data) {
    //     console.log(data);
    //     socket.emit('data', data);
    // });

    //socket.onAny((type,message)=>console.log("data"))
    // socket.on('connect', function(client) {
    //     console.log('Client connected...');
    //
    //     socket.on('join', function(data) {
    //         console.log(data);
    //         socket.emit('join', data);  //this code sending data from server to client
    //     });
    // });





    return socket;
}