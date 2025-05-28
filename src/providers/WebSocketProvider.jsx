import { createContext, useContext, useEffect, useState } from "react";
import { useUserContext } from "./authContext";
import { io } from "socket.io-client";


const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const WebSocketContext = createContext();

export const useWebSocket = () => useContext(WebSocketContext);

export function WebSocketProvider({ children }) {
    const [socket, setSocket] = useState(null);
    const { token } = useUserContext();


    useEffect(() => {
        if (!token) return;

        const newSocket = io(API_URL, {
            auth: { accessToken: token },
        });

        newSocket.on('connect', () => {
            console.log('Connected', newSocket.id);
        });

        setSocket(newSocket);
        return () => newSocket.disconnect();
    }, [token]);

    const onChatMessage = (callback) => {
        if (!socket) return;
        socket.on('chatMessage', callback);
    }

    const onClassPostCreate = (callback) => {
        if (!socket) return;
        socket.on('classPostCreate', callback);
    }

    const onClassPostComment = (callback) => {
        if (!socket) return;
        socket.on('classPostComment', callback);
    }

    const onNotification = (callback) => {
        if (!socket) return;
        socket.on('notification', callback);
    }

    const joinChatRoom = (roomId) => {
        if (!socket) return;
        socket.emit('joinRoom', roomId);
    }

    const joinClassUpdate = (classId) => {
        if (!socket) return;
        socket.emit('initClassUpdate', classId);
    }


    return (
        <WebSocketContext.Provider
            value={{
                socket,
                onChatMessage,
                onClassPostCreate,
                onClassPostComment,
                onNotification,
                joinChatRoom,
                joinClassUpdate,
            }}
        >
            {children}
        </WebSocketContext.Provider>
    );
}



