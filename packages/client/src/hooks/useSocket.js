
import { useEffect } from 'react';
import io from 'socket.io-client';

const SOCKET_URL = process.env.REACT_APP_API_URL; 

export const useSocket = () => {
    
    const socket = io(SOCKET_URL, { autoConnect: false });
    
    useEffect(() => {
        socket.connect();

        return () => {
          //  socket.disconnect();
        };
    }, [socket]);

    return socket;
};
