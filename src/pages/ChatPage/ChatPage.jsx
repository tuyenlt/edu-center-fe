import { useUserContext } from '@/providers/authContext';
import api from '@/services/api';
import { useEffect, useState } from 'react';
import ChatRoom from './ChatRoom';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { stringToColorClass } from '@/utils';
import MagicInput from '@/components/shared/MagicInput';
import { toast } from 'sonner';

export default function ChatPage() {
	const navigate = useNavigate();
	const { user } = useUserContext();
	const { roomId } = useParams();
	const [chatRooms, setChatRooms] = useState([]);
	const [chatRoomId, setChatRoomId] = useState(roomId);
	const [search, setSearch] = useState('');

	useEffect(() => {
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
							room.avatar = 'https://api.englishnest.click/uploads/images/logo.png';
							toast(`This is a contact room with English Nest Staff ${room.avatar}`)
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
					navigate(`/chat/${chatRooms[0]._id}`);
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

	const handleChangeRoom = (roomId) => {
		setChatRoomId(roomId);
		navigate(`/chat/${roomId}`);
	};

	const filteredRooms = chatRooms.filter((room) =>
		room.name.toLowerCase().includes(search.toLowerCase())
	);

	const currentRoom = chatRooms.find((r) => r._id === chatRoomId);

	return (
		<div className="flex bg-gray-50 dark:bg-gray-900">
			{/* Sidebar */}
			<aside className="w-1/4 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
				<div className="p-4 border-b border-gray-200 dark:border-gray-700">
					<h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">
						Chats
					</h2>

					<MagicInput
						placeholder="Search..."
						value={search}
						onChange={(e) => setSearch(e.target.value)}
					/>
				</div>
				<div className="flex-1 overflow-y-auto">
					{filteredRooms.length === 0 ? (
						<div className="p-4 text-gray-500">No chats found</div>
					) : (
						filteredRooms.map((room) => (
							<div
								key={room._id}
								onClick={() => handleChangeRoom(room._id)}
								className={`rounded-2xl flex items-center p-4 cursor-pointer  dark:hover:bg-gray-700 \
                     ${room._id === roomId
										? 'bg-blue-100 dark:bg-blue-900 text-blue-600 '
										: 'text-gray-800 dark:text-gray-200 hover:bg-gray-100'
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
											{room.name.split(' ').at(-1).charAt(0).toUpperCase()}
										</AvatarFallback>
									)}
								</Avatar>
								<div className="flex w-full">{room.name}</div>
							</div>
						))
					)}
				</div>
			</aside>

			{/* Chat area */}
			<main className="flex-1 flex flex-col">
				<header className="p-4 border-b border-gray-200 dark:border-gray-700">
					<h2 className="text-lg font-medium text-gray-800 dark:text-gray-100">
						{currentRoom ? currentRoom.name : 'Select a Chat'}
					</h2>
				</header>
				<div className="flex-1 overflow-hidden ">
					<Outlet />
				</div>
			</main>
		</div>
	);
}
