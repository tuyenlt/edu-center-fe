import { useUserContext } from '@/providers/authContext';
import api from '@/services/api';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { Link, useLocation } from 'react-router-dom';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { stringToColorClass } from '@/utils';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export default function ChatPage() {
  const location = useLocation();
  const initialChatId = location.state?.chatId;
  const { token, user } = useUserContext();

  const [socket, setSocket] = useState(null);
  const [chatRooms, setChatRooms] = useState([]);
  const [chatRoomId, setChatRoomId] = useState(initialChatId);
  const [search, setSearch] = useState('');

  // Initialize socket connection
  useEffect(() => {
    if (!token || !chatRoomId) return;

    const newSocket = io(API_URL, {
      auth: { accessToken: token },
    });

    newSocket.on('connect', () => {
      console.log('Connected', newSocket.id);
      newSocket.emit('joinRoom', chatRoomId);
    });

    setSocket(newSocket);
    return () => newSocket.disconnect();
  }, [token, chatRoomId]);

  useEffect(() => {
    if (!user) return;
    const fetchChatRoom = async () => {
      try {
        const response = await api.get('/chat-of-user');
        const chatRooms = response.data.map((room) => {
          if (room.type === 'p2p') {
            room.name = room.members.find(
              (member) => member._id !== user._id
            ).name;
            room.avatar = room.members.find(
              (member) => member._id !== user._id
            ).avatar_url;
            return room;
          }

          if (room.type === 'contact') {
            if (user._id === room.owner._id) {
              room.name = 'English Nest Staff';
              room.avatar = 'images/logo.png';
              return room;
            } else {
              room.name = room.owner.name + ' (student) ';
              room.avatar = room.owner.avatar_url;
            }
          }

          return room;
        });
        chatRooms.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
        setChatRooms(chatRooms);
        if (!chatRoomId && chatRooms.length) {
          setChatRoomId(chatRooms[0]._id);
        }
      } catch (error) {
        console.error('Error fetching chat rooms:', error);
      }
    };
    fetchChatRoom();
  }, [user]);

  if (!chatRooms || chatRooms.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">No chat rooms available</p>
      </div>
    );
  }

  const filteredRooms = chatRooms.filter((room) =>
    room.name.toLowerCase().includes(search.toLowerCase())
  );

  const currentRoom = chatRooms.find((r) => r._id === chatRoomId);
  return (
    <div className="bg-white p-4 rounded-lg shadow-md overflow-scroll h-[396px] ">
      {/* Sidebar */}
      <aside className="w-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex justify-between">
            {' '}
            <h2 className="mb-4 font-semibold text-lg">Chats Room</h2>
            <Link to="/chat" className="text-blue-700 text-sm font-medium">
              See all
            </Link>
          </div>
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mt-2 w-full px-3 py-2 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex-1 overflow-y-auto">
          {filteredRooms.length === 0 ? (
            <div className="p-4 text-gray-500">No chats found</div>
          ) : (
            filteredRooms.map((room) => (
              <div
                key={room._id}
                onClick={() => setChatRoomId(room._id)}
                className={`flex items-center p-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 \
                    ${
                      room._id === chatRoomId
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-600'
                        : 'text-gray-800 dark:text-gray-200'
                    }`}
              >
                <Avatar className="w-12 h-12 mr-3">
                  {room.avatar ? (
                    <AvatarImage src={room.avatar} alt={room.name} />
                  ) : (
                    <AvatarFallback
                      className={`bg-gray-300 dark:bg-gray-700 ${stringToColorClass(
                        room.name
                      )}`}
                    >
                      {room.name.split(' ').at(-1).toUpperCase()}
                    </AvatarFallback>
                  )}
                </Avatar>
                <div className="flex w-full">{room.name}</div>
              </div>
            ))
          )}
        </div>
      </aside>
    </div>
  );
}
