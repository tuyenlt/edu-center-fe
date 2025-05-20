import { useState, useEffect, useRef } from 'react';
import api from '@/services/api';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { convertUTC } from '@/utils/dateTimeConvert';
import { useUserContext } from '@/providers/authContext';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function ChatRoom({ id, socket }) {
  const [messages, setMessages] = useState([]);
  const [currMessage, setCurrMessage] = useState('');
  const { user } = useUserContext();
  const messagesEndRef = useRef(null);

  // Fetch initial messages when `id` changes
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

  // Listen for incoming socket messages
  useEffect(() => {
    if (!socket) return;
    const handleMessage = ({ author, message, createdAt }) => {
      setMessages((prev) => [...prev, { author, content: message, createdAt }]);
    };
    socket.on('chatMessage', handleMessage);
    return () => {
      socket.off('chatMessage', handleMessage);
    };
  }, [socket]);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length]);

  const sendMessage = () => {
    const text = currMessage.trim();
    if (!text) return;
    socket.emit('chatMessage', { roomId: id, message: text });
    setCurrMessage('');
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {id === '' ?
        <div className="flex items-center justify-center h-full text-gray-500">
          Select a chat room to start chatting
        </div>
        :
        <div className="flex flex-col">

          <ScrollArea className="p-4  space-y-4 flex flex-col h-[calc(100vh-200px)]">
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
                      <img
                        src={msg.author.avatar_url}
                        alt={msg.author.name}
                        className="w-10 h-10 rounded-full mr-2 mt-5"
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

      }

    </div>
  );
}
