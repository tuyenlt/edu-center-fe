import { useEffect, useState } from "react";
import api from "@/services/api";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import AvatarUser from "@/components/shared/AvatarUser";

export default function StudentContacting() {
    const navigate = useNavigate();
    const [chatRooms, setChatRooms] = useState([]);

    useEffect(() => {
        const fetchChatRoom = async () => {
            try {
                const response = await api.get("/chatrooms-contact");
                console.log(response.data);
                setChatRooms(response.data);
            } catch (error) {
                console.error("Error fetching chat room:", error);
            }
        };
        fetchChatRoom();
    }, []);

    const handleAcceptContact = async (roomId) => {
        try {
            const response = await api.post(`/chatrooms-contact/${roomId}/join`);
            console.log(response.data);
            setChatRooms((prev) => prev.filter((room) => room._id !== roomId));
            navigate("/chat", { state: { chatId: roomId } });
        } catch (error) {
            console.error("Error accepting contact:", error);
        }
    }

    return (
        <div className="flex flex-col gap-4 p-10">
            <h1 className="text-2xl font-bold">Student Contacting</h1>
            <div className="flex flex-col gap-2">
                {chatRooms.map((room) => (
                    <div className="flex justify-between items-center p-4 shadow-sm">
                        <div
                            key={room._id}
                            className="flex gap-2 items-center"
                        >
                            <AvatarUser user={room.owner} className="w-12 h-12" />
                            <h2 className="text-lg font-semibold">{room.owner.name}</h2>
                        </div>
                        <Button onClick={() => handleAcceptContact(room._id)}>Accept Contact</Button>
                    </div>
                ))}
            </div>
        </div>
    );
}