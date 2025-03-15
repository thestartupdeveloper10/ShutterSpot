import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { format } from 'date-fns';
import { 
  CheckCheck, 
  Check, 
  Circle, 
  Search,
  MoreVertical,
  Send,
  Image as ImageIcon,
  ArrowLeft
} from 'lucide-react';
import { cn } from '@/lib/utils';
import io from 'socket.io-client';
import { useSelector } from 'react-redux';
import { selectUserId } from '@/redux/features/user/userSlice';

const Messages = () => {
  const socketRef = useRef();
  const userId = useSelector(selectUserId);
  
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    // Connect to socket server with credentials
    socketRef.current = io(import.meta.env.VITE_BACKEND_URL, {
      withCredentials: true,
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000
    });

    const connectSocket = () => {
      console.log('Attempting to connect socket with ID:', userId);
      
      socketRef.current.on('connect', () => {
        console.log('Client socket connected');
        // Join with user ID after successful connection
        socketRef.current.emit('join', userId);
      });

      socketRef.current.on('connect_error', (error) => {
        console.error('Client socket connection error:', error);
      });

      socketRef.current.on('disconnect', () => {
        console.log('Socket disconnected, attempting to reconnect...');
      });
    };

    if (userId) {
      connectSocket();
    }

    // Load chat history
    const loadChatHistory = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/chat/${userId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const chatData = await response.json();
        setChats(chatData);
      } catch (error) {
        console.error('Error loading chat history:', error);
      }
    };

    if (userId) {
      loadChatHistory();
    }

    // Listen for private messages
    socketRef.current.on('private_message', (message) => {
      console.log('Received message:', message);
      setChats(prevChats => {
        const updatedChats = prevChats.map(chat => {
          if (chat.id === message.from) {
            return {
              ...chat,
              messages: [...chat.messages, {
                text: message.content,
                sender: 'photographer',
                timestamp: new Date(message.createdAt),
                read: false
              }],
              lastMessage: message.content,
              lastMessageTime: new Date(message.createdAt)
            };
          }
          return chat;
        });
        return updatedChats;
      });
    });

    // Listen for user status changes
    socketRef.current.on('userStatus', ({ userId: statusUserId, status }) => {
      setChats(prevChats => {
        return prevChats.map(chat => {
          if (chat.id === statusUserId) {
            return { ...chat, online: status === 'online' };
          }
          return chat;
        });
      });
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [userId]);

  useEffect(() => {
    const messageContainer = document.querySelector('.messages-container');
    if (messageContainer && activeChat?.messages?.length > 0) {
      messageContainer.scrollTop = messageContainer.scrollHeight;
    }
  }, [activeChat?.messages]);

  // Add function to mark messages as read
  const markMessagesAsRead = async (senderId) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/chat/${senderId}/read`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ receiverId: userId })
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error marking messages as read:', error);
    }
  };

  // Update the chat click handler
  const handleChatClick = (chat) => {
    setActiveChat(chat);
    setIsMobileView(window.innerWidth < 640);
    
    if (chat.unread > 0) {
      // Update UI immediately
      setChats(prevChats => {
        return prevChats.map(c => {
          if (c.id === chat.id) {
            return {
              ...c,
              unread: 0
            };
          }
          return c;
        });
      });
      
      // Update backend
      markMessagesAsRead(chat.id);
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim() && activeChat) {
      // Store message text before clearing input
      const messageText = newMessage;
      const timestamp = new Date();

      // Create message object
      const messageObj = {
        text: messageText,
        sender: 'client',
        timestamp: timestamp,
        read: false
      };

      // Update local state immediately
      setChats(prevChats => {
        const updatedChats = prevChats.map(chat => {
          if (chat.id === activeChat.id) {
            return {
              ...chat,
              messages: [...chat.messages, messageObj],
              lastMessage: messageText,
              lastMessageTime: timestamp
            };
          }
          return chat;
        });
        return updatedChats;
      });

      // Also update activeChat immediately
      setActiveChat(prev => ({
        ...prev,
        messages: [...prev.messages, messageObj],
        lastMessage: messageText,
        lastMessageTime: timestamp
      }));

      // Send message through socket
      socketRef.current.emit('private_message', {
        content: messageText,
        to: activeChat.id
      });

      // Clear input after sending
      setNewMessage('');

      // Auto-scroll to bottom
      const messageContainer = document.querySelector('.messages-container');
      if (messageContainer) {
        setTimeout(() => {
          messageContainer.scrollTop = messageContainer.scrollHeight;
        }, 100);
      }
    }
  };

  return (
    <div className="flex h-[calc(100vh-theme(spacing.16))] sm:h-[calc(100vh-theme(spacing.20))] lg:h-[calc(100vh-theme(spacing.24))] bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Chat List Sidebar */}
      <div className={cn(
        "w-full sm:w-72 lg:w-80 border-r border-gray-200 flex flex-col",
        activeChat && isMobileView ? 'hidden sm:flex' : 'flex'
      )}>
        <div className="p-3 sm:p-4 border-b">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
            <Input
              placeholder="Search conversations..."
              className="pl-9 text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <ScrollArea className="flex-1">
          {chats.map(chat => (
            <div
              key={chat.id}
              onClick={() => handleChatClick(chat)}
              className={`p-3 sm:p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                activeChat?.id === chat.id ? 'bg-purple-50' : ''
              }`}
            >
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="relative">
                  <Avatar className="w-10 h-10 sm:w-12 sm:h-12">
                    <AvatarImage className='object-cover' src={chat.avatar} />
                    <AvatarFallback>{chat.name[0]}</AvatarFallback>
                  </Avatar>
                  {chat.online && (
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-500 rounded-full border-2 border-white" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <h4 className="font-semibold truncate">{chat.name}</h4>
                    <span className="text-xs text-gray-500">
                      {format(chat.lastMessageTime, 'HH:mm')}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-500 truncate">{chat.lastMessage}</p>
                    {chat.unread > 0 && (
                      <Badge variant="secondary" className="bg-purple-600 text-white">
                        {chat.unread}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </ScrollArea>
      </div>

      {/* Chat Interface */}
      <div className={cn(
        "flex-1 flex flex-col",
        !activeChat && isMobileView ? 'hidden sm:flex' : 'flex'
      )}>
        {activeChat ? (
          <>
            {/* Chat Header */}
            <div className="p-3 sm:p-4 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center space-x-2 sm:space-x-4">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="sm:hidden"
                  onClick={() => setActiveChat(null)}
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <Avatar className="w-10 h-10">
                  <AvatarImage className='object-cover' src={activeChat.avatar} />
                  <AvatarFallback>{activeChat.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{activeChat.name}</h3>
                  <span className="text-sm text-gray-500">
                    {activeChat.online ? 'Online' : 'Offline'}
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-4">
                <Button variant="ghost" size="icon">
                  <MoreVertical className="w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-3 sm:p-4 messages-container">
              <div className="space-y-3 sm:space-y-4">
                {activeChat.messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.sender === 'client' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className="flex flex-col max-w-[85%] sm:max-w-[75%] md:max-w-[70%] space-y-1">
                      <div
                        className={`p-3 rounded-lg ${
                          message.sender === 'client' 
                            ? 'bg-purple-600 text-white rounded-br-none' 
                            : 'bg-gray-100 text-gray-800 rounded-bl-none'
                        }`}
                      >
                        {message.text}
                      </div>
                      <div className={`flex items-center space-x-2 text-xs ${
                        message.sender === 'client' ? 'justify-end' : 'justify-start'
                      }`}>
                        <span className="text-gray-500">
                          {format(message.timestamp, 'HH:mm')}
                        </span>
                        {message.sender === 'client' && (
                          <span className="text-gray-500">
                            {message.read ? <CheckCheck className="w-4 h-4" /> : <Check className="w-4 h-4" />}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Message Input */}
            <div className="p-3 sm:p-4 border-t border-gray-200">
              <div className="flex items-center space-x-2 sm:space-x-4">
                <Button variant="ghost" size="icon" className="hidden sm:inline-flex">
                  <ImageIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 text-sm sm:text-base"
                />
                <Button onClick={handleSendMessage} className="rounded-full">
                  <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center flex-col space-y-4 text-gray-500 p-4">
            <Circle className="w-12 h-12 sm:w-16 sm:h-16 stroke-1" />
            <p className="text-base sm:text-lg text-center">Select a chat to start messaging</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;
