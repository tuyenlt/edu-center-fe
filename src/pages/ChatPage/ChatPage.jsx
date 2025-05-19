import { useUserContext } from "@/providers/authContext";
import api from "@/services/api";
import { useEffect, useState } from "react"
import { Outlet, useParams } from "react-router-dom";
import { io } from "socket.io-client"
import ChatRoom from "./ChatRoom";


export default function ChatPage() {
    const { token } = useUserContext();
    const [socket, setSocket] = useState();

    useEffect(() => {
        if (!token) {
            return;
        }
        const newSocket = io('http://localhost:3000', {
            auth: {
                accessToken: token
            }
        })

        newSocket.on('connect', () => {
            console.log('Connected ', newSocket.id);

        })

        newSocket.emit('joinRoom', '67da7d24d07a307bfdf2e20c')
        setSocket(newSocket)
    }, [token])


    return (<div>
        <div className="flex">
            <div className="w-1/4">
                Chat room list
            </div>
            <div className="w-3/4">
                <div className="">
                    <ChatRoom id="67da7d24d07a307bfdf2e20c" socket={socket} />
                </div>
            </div>
        </div>
    </div>)
}