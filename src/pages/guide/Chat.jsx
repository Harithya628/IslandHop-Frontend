import React, { useState } from "react";
import "../Page.css";
import "./GuideDashboard.css";

// Mock data for chat messages
const mockChats = [
  {
    id: "CHAT-001",
    tourist: "Sarah Johnson",
    lastMessage: "What time should we meet tomorrow?",
    lastMessageTime: "10:30 AM",
    unread: 2,
    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
    tour: "Sigiriya Rock Fortress Tour",
    messages: [
      {
        id: 1,
        sender: "tourist",
        message: "Hi! I'm excited about tomorrow's tour.",
        timestamp: "10:15 AM",
      },
      {
        id: 2,
        sender: "guide",
        message: "Hello Sarah! I'm excited too. Please bring comfortable walking shoes and a hat.",
        timestamp: "10:20 AM",
      },
      {
        id: 3,
        sender: "tourist",
        message: "What time should we meet tomorrow?",
        timestamp: "10:30 AM",
      },
    ],
  },
  {
    id: "CHAT-002",
    tourist: "Mike Chen",
    lastMessage: "Thank you for the amazing tour!",
    lastMessageTime: "Yesterday",
    unread: 0,
    avatar: "https://randomuser.me/api/portraits/men/4.jpg",
    tour: "Kandy Temple Tour",
    messages: [
      {
        id: 1,
        sender: "tourist",
        message: "The tour was absolutely amazing!",
        timestamp: "2:30 PM",
      },
      {
        id: 2,
        sender: "tourist",
        message: "Thank you for the amazing tour!",
        timestamp: "2:35 PM",
      },
      {
        id: 3,
        sender: "guide",
        message: "I'm so glad you enjoyed it! Please don't forget to leave a review.",
        timestamp: "3:00 PM",
      },
    ],
  },
  {
    id: "CHAT-003",
    tourist: "Emma Wilson",
    lastMessage: "Can we start earlier?",
    lastMessageTime: "2 hours ago",
    unread: 1,
    avatar: "https://randomuser.me/api/portraits/women/5.jpg",
    tour: "Photography Tour",
    messages: [
      {
        id: 1,
        sender: "tourist",
        message: "Hi, I was wondering if we could start the photography tour a bit earlier to catch the golden hour?",
        timestamp: "8:00 AM",
      },
      {
        id: 2,
        sender: "tourist",
        message: "Can we start earlier?",
        timestamp: "8:15 AM",
      },
    ],
  },
];

const Chat = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Filter chats based on search term
  const getFilteredChats = () => {
    if (!searchTerm) return mockChats;
    
    return mockChats.filter(chat =>
      chat.tourist.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chat.tour.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const filteredChats = getFilteredChats();

  const handleChatSelect = (chat) => {
    setSelectedChat(chat);
    // Mark as read (in a real app, you'd update the backend)
    if (chat.unread > 0) {
      chat.unread = 0;
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedChat) {
      // In a real app, you'd send this to the backend
      const message = {
        id: selectedChat.messages.length + 1,
        sender: "guide",
        message: newMessage,
        timestamp: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit'
        }),
      };
      
      selectedChat.messages.push(message);
      selectedChat.lastMessage = newMessage;
      selectedChat.lastMessageTime = "Now";
      
      setNewMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getTotalUnread = () => {
    return mockChats.reduce((total, chat) => total + chat.unread, 0);
  };

  return (
    <div className="page">
      <div className="page-content-card">
        <div className="page-header">
          <div className="header-content">
            <div>
              <h1>Messages</h1>
              <p>Communicate with your tour participants</p>
            </div>
            <div className="chat-stats">
              <span className="unread-count">
                {getTotalUnread()} unread messages
              </span>
            </div>
          </div>
        </div>

        <div className="chat-container">
          {/* Chat List Sidebar */}
          <div className="chat-sidebar">
            <div className="chat-search">
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>

            <div className="chat-list">
              {filteredChats.length > 0 ? (
                filteredChats.map((chat) => (
                  <div
                    key={chat.id}
                    className={`chat-item ${selectedChat?.id === chat.id ? "active" : ""}`}
                    onClick={() => handleChatSelect(chat)}
                  >
                    <div className="chat-avatar">
                      <img src={chat.avatar} alt={chat.tourist} />
                      {chat.unread > 0 && (
                        <span className="unread-badge">{chat.unread}</span>
                      )}
                    </div>
                    <div className="chat-info">
                      <div className="chat-header">
                        <h4>{chat.tourist}</h4>
                        <span className="chat-time">{chat.lastMessageTime}</span>
                      </div>
                      <p className="chat-tour">{chat.tour}</p>
                      <p className={`chat-preview ${chat.unread > 0 ? "unread" : ""}`}>
                        {chat.lastMessage}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-chats">
                  <p>No conversations found.</p>
                </div>
              )}
            </div>
          </div>

          {/* Chat Content */}
          <div className="chat-content">
            {selectedChat ? (
              <>
                {/* Chat Header */}
                <div className="chat-header">
                  <div className="chat-participant">
                    <img src={selectedChat.avatar} alt={selectedChat.tourist} />
                    <div>
                      <h3>{selectedChat.tourist}</h3>
                      <p>{selectedChat.tour}</p>
                    </div>
                  </div>
                  <div className="chat-actions">
                    <button className="action-btn secondary">
                      📞 Call
                    </button>
                    <button className="action-btn secondary">
                      📧 Email
                    </button>
                  </div>
                </div>

                {/* Messages */}
                <div className="messages-container">
                  {selectedChat.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`message ${message.sender === "guide" ? "sent" : "received"}`}
                    >
                      <div className="message-content">
                        <p>{message.message}</p>
                        <span className="message-time">{message.timestamp}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="message-input-container">
                  <div className="message-input">
                    <textarea
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type your message..."
                      rows="2"
                    />
                    <button
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim()}
                      className="send-btn"
                    >
                      Send
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="no-chat-selected">
                <div className="no-chat-content">
                  <h3>💬</h3>
                  <h3>Select a conversation</h3>
                  <p>Choose a conversation from the list to start messaging with your tour participants.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
