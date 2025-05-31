import { useState, useEffect, useRef } from 'react';
import api from '@/services/api';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { convertUTC } from '@/utils/dateTimeConvert';
import { useUserContext } from '@/providers/authContext';
import { ScrollArea } from '@/components/ui/scroll-area';
import AvatarUser from '@/components/shared/AvatarUser';
import { useWebSocket } from '@/providers/WebSocketProvider';
import { useParams } from 'react-router-dom';
export default function ChatRoom() {
	const { roomId: id } = useParams();
	const [messages, setMessages] = useState([]);
	const [currMessage, setCurrMessage] = useState('');
	const { user } = useUserContext();
	const messagesEndRef = useRef(null);
	const { socket, joinChatRoom, onChatMessage } = useWebSocket();

	useEffect(() => {
		let isMounted = true;
		if (!id) return;
		api
			.get(`/chatrooms/${id}`)
			.then((res) => {
				if (isMounted) setMessages(res.data.messages || []);
			})
			.catch((err) => console.error('Error fetching chat messages', err));
		return () => {
			isMounted = false;
		};
	}, [id]);

	useEffect(() => {
		if (!id || !socket) return;
		joinChatRoom(id);
		const handleChatMessage = (data) => {
			const { author, message, createdAt } = data;
			setMessages((prev) => [...prev, { author, content: message, createdAt }]);
		};
		onChatMessage(handleChatMessage);
		return () => {
			socket.off('chatMessage', handleChatMessage);
		};
	}, [id, socket, joinChatRoom, onChatMessage]);

	useEffect(() => {
		messagesEndRef.current?.scrollIntoView();
	}, [messages.length]);

	const sendMessage = () => {
		const text = currMessage.trim();
		if (!text) return;
		socket.emit('chatMessage', { roomId: id, message: text });
		setCurrMessage('');
	};

	return (
		<div className="flex flex-col bg-white">
			{id === '' ? (
				<div className="flex items-center justify-center h-full text-gray-500">
					Select a chat room to start chatting
				</div>
			) : (
				<div className="flex flex-col">
					<ScrollArea className="p-4  space-y-4 flex flex-col h-[calc(100vh-229px)]">
						{messages.map((msg, idx) => {
							const isOwn = msg.author._id === user._id;
							return (
								<div
									key={idx}
									className={`flex items-end ${isOwn ? 'justify-end' : 'justify-start'
										}`}
								>
									<div className="flex">
										{!isOwn && (
											<AvatarUser
												user={msg.author}
												className="w-12 h-12 mr-2 mt-5"
											/>
										)}
										<div className="max-w-xs flex flex-col">
											{!isOwn && (
												<div className="text-xs text-gray-500 mb-1 ml-1">
													{msg.author.name}
												</div>
											)}
											<div
												className={`px-4 py-2 rounded-xl leading-relaxed break-words whitespace-pre-wrap
                                                ${isOwn
														? 'bg-blue-500 text-white'
														: 'bg-gray-200 text-gray-900'
													}`}
											>
												{msg.content}
											</div>
											<div
												className={`text-[10px] mt-1 ml-1 ${isOwn
													? 'text-right text-gray-300'
													: 'text-left text-gray-500'
													}`}
											>
												{convertUTC(msg.createdAt)}
											</div>
										</div>
									</div>
								</div>
							);
						})}
						<div ref={messagesEndRef} />
					</ScrollArea>
					{/* Input area */}
					<div className="flex items-center p-4 border-t bg-gray-50">
						<Input
							type="text"
							placeholder="Type a message..."
							value={currMessage}
							onChange={(e) => setCurrMessage(e.target.value)}
							onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
							className="flex-1 mr-2"
						/>
						<Button onClick={sendMessage}>Send</Button>
					</div>
				</div>
			)}
		</div>
	);
}
