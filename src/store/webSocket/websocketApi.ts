import {io} from "socket.io-client";
import {getEnvApi} from "../../api";


export const connectSocket = () => {

    const socket = io(`${getEnvApi()}shop`, {
        transports: ["websocket"],
        // path:"/",
        query: {
            token: `${localStorage.getItem('access_token')}`,
        },
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
    return socket;
}