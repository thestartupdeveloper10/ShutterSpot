import React, { useState } from 'react';
// ...existing imports...
import { ArrowLeft } from 'lucide-react';

const Chat = () => {
  // ...existing state...
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);

  const handleChatSelect = (chat) => {
    setActiveChat(chat);
  };

  const handleBack = () => {
    setActiveChat(null);
  };

  return (
    <div className="flex h-full bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Chat List Sidebar */}
      <div className={cn(
        "w-full md:w-80 border-r border-gray-200 flex flex-col",
        activeChat && isMobileView ? 'hidden md:flex' : 'flex'
      )}>
        <div className="p-3 md:p-4 border-b">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
            <Input
              placeholder="Search conversations..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <ScrollArea className="flex-1">
          {chats.map(chat => (
            <div
              key={chat.id}
              onClick={() => handleChatSelect(chat)}
              className={`p-3 md:p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                activeChat?.id === chat.id ? 'bg-purple-50' : ''
              }`}
            >
              <div className="flex items-center space-x-3 md:space-x-4">
                <div className="relative">
                  <Avatar className="w-10 h-10 md:w-12 md:h-12">
                    <AvatarImage src={chat.avatar} />
                    <AvatarFallback>{chat.name[0]}</AvatarFallback>
                  </Avatar>
                  {chat.online && (
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 md:w-3 md:h-3 bg-green-500 rounded-full border-2 border-white" />
                  )}
                </div>
                {/* ...existing chat list item content... */}
              </div>
            </div>
          ))}
        </ScrollArea>
      </div>

      {/* Chat Interface */}
      <div className={cn(
        "flex-1 flex flex-col",
        !activeChat && isMobileView ? 'hidden md:flex' : 'flex'
      )}>
        {activeChat ? (
          <>
            {/* Chat Header */}
            <div className="p-3 md:p-4 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center space-x-3 md:space-x-4">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="md:hidden"
                  onClick={handleBack}
                >
                  <ArrowLeft className="w-5 h-5" />
                </Button>
                <Avatar className="w-8 h-8 md:w-10 md:h-10">
                  <AvatarImage src={activeChat.avatar} />
                  <AvatarFallback>{activeChat.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-sm md:text-base">{activeChat.name}</h3>
                  <span className="text-xs md:text-sm text-gray-500">
                    {activeChat.online ? 'Online' : 'Offline'}
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-2 md:space-x-4">
                <Button variant="ghost" size="icon" className="hidden sm:inline-flex">
                  <Phone className="w-4 h-4 md:w-5 md:h-5" />
                </Button>
                <Button variant="ghost" size="icon" className="hidden sm:inline-flex">
                  <Video className="w-4 h-4 md:w-5 md:h-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="w-4 h-4 md:w-5 md:h-5" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-3 md:p-4">
              <div className="space-y-3 md:space-y-4">
                {activeChat.messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.sender === 'photographer' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className="flex flex-col max-w-[85%] md:max-w-[70%] space-y-1">
                      <div
                        className={`p-2.5 md:p-3 rounded-lg text-sm md:text-base ${
                          message.sender === 'photographer' 
                            ? 'bg-purple-600 text-white rounded-br-none' 
                            : 'bg-gray-100 text-gray-800 rounded-bl-none'
                        }`}
                      >
                        {message.text}
                      </div>
                      {/* ...existing message footer... */}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Message Input */}
            <div className="p-3 md:p-4 border-t border-gray-200">
              <div className="flex items-center space-x-2 md:space-x-4">
                <Button variant="ghost" size="icon" className="hidden sm:inline-flex">
                  <ImageIcon className="w-4 h-4 md:w-5 md:h-5" />
                </Button>
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 text-sm md:text-base"
                />
                <Button onClick={handleSendMessage} className="rounded-full">
                  <Send className="w-4 h-4 md:w-5 md:h-5" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center flex-col space-y-4 text-gray-500 p-4">
            <Circle className="w-12 h-12 md:w-16 md:h-16 stroke-1" />
            <p className="text-base md:text-lg text-center">Select a chat to start messaging</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
