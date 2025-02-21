import React, { useState } from 'react';
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
  Phone,
  Video,
  MoreVertical,
  Send,
  Image as ImageIcon,
  ArrowLeft
} from 'lucide-react';
import { cn } from '@/lib/utils';

const Chat = () => {
  const [chats, setChats] = useState([
    { 
      id: 1, 
      name: 'Sarah Johnson',
      avatar: '/avatars/sarah.jpg',
      online: true,
      unread: 2,
      lastMessage: "When can we ...",
      lastMessageTime: new Date(2024, 0, 15, 14, 30),
      messages: [
        { 
          text: 'Hello, Im interested in booking a photo session', 
          sender: 'client',
          timestamp: new Date(2024, 0, 15, 14, 25),
          read: true
        },
        { 
          text: 'When can we schedule the shoot?', 
          sender: 'client',
          timestamp: new Date(2024, 0, 15, 14, 30),
          read: false
        }
      ]
    },
    // ...more chats
  ]);
  const [activeChat, setActiveChat] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileView, setIsMobileView] = useState(false);

  const handleSendMessage = () => {
    if (newMessage.trim() && activeChat) {
      const updatedChats = chats.map(chat => {
        if (chat.id === activeChat.id) {
          return {
            ...chat,
            messages: [...chat.messages, { 
              text: newMessage, 
              sender: 'photographer',
              timestamp: new Date(),
              read: false
            }],
            lastMessage: newMessage,
            lastMessageTime: new Date()
          };
        }
        return chat;
      });
      setChats(updatedChats);
      setNewMessage('');
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
              onClick={() => {
                setActiveChat(chat);
                setIsMobileView(window.innerWidth < 640);
              }}
              className={`p-3 sm:p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                activeChat?.id === chat.id ? 'bg-purple-50' : ''
              }`}
            >
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="relative">
                  <Avatar className="w-10 h-10 sm:w-12 sm:h-12">
                    <AvatarImage src={chat.avatar} />
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
                  <AvatarImage src={activeChat.avatar} />
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
                <Button variant="ghost" size="icon" className="hidden sm:inline-flex">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
                <Button variant="ghost" size="icon" className="hidden sm:inline-flex">
                  <Video className="w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-3 sm:p-4">
              <div className="space-y-3 sm:space-y-4">
                {activeChat.messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.sender === 'photographer' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className="flex flex-col max-w-[85%] sm:max-w-[75%] md:max-w-[70%] space-y-1">
                      <div
                        className={`p-3 rounded-lg ${
                          message.sender === 'photographer' 
                            ? 'bg-purple-600 text-white rounded-br-none' 
                            : 'bg-gray-100 text-gray-800 rounded-bl-none'
                        }`}
                      >
                        {message.text}
                      </div>
                      <div className={`flex items-center space-x-2 text-xs ${
                        message.sender === 'photographer' ? 'justify-end' : 'justify-start'
                      }`}>
                        <span className="text-gray-500">
                          {format(message.timestamp, 'HH:mm')}
                        </span>
                        {message.sender === 'photographer' && (
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

export default Chat;
