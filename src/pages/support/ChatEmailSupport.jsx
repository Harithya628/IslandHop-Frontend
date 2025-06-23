import React, { useState } from 'react';
import './ChatEmailSupport.css';

const mockThreads = [
  {
    id: 'TH-001',
    type: 'Chat',
    user: {
      name: 'Ayesha Fernando',
      avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
      email: 'ayesha.fernando@email.com',
    },
    subject: 'Booking confirmation not received',
    resolved: false,
    messages: [
      {
        from: 'user',
        text: 'Hi, I booked a ride but did not get a confirmation email.',
        time: '09:12',
      },
      {
        from: 'agent',
        text: 'Hello Ayesha, let me check your booking status.',
        time: '09:13',
      },
    ],
  },
  {
    id: 'TH-002',
    type: 'Email',
    user: {
      name: 'Ruwan Silva',
      avatar: 'https://randomuser.me/api/portraits/men/23.jpg',
      email: 'ruwan.silva@email.com',
    },
    subject: 'Refund request for cancelled trip',
    resolved: false,
    messages: [
      {
        from: 'user',
        text: 'My trip was cancelled by the driver. How do I get a refund?',
        time: '08:45',
      },
      {
        from: 'agent',
        text: 'Hi Ruwan, I will assist you with the refund process.',
        time: '08:46',
      },
    ],
  },
  {
    id: 'TH-003',
    type: 'Chat',
    user: {
      name: 'Ishara Perera',
      avatar: 'https://randomuser.me/api/portraits/women/12.jpg',
      email: 'ishara.p@email.com',
    },
    subject: 'Lost item in vehicle',
    resolved: true,
    messages: [
      {
        from: 'user',
        text: 'I left my suitcase in the car after my trip.',
        time: '07:30',
      },
      {
        from: 'agent',
        text: 'We have contacted the driver and will update you soon.',
        time: '07:32',
      },
      {
        from: 'agent',
        text: 'Your suitcase has been found and will be delivered today.',
        time: '08:10',
      },
      {
        from: 'user',
        text: 'Thank you so much!',
        time: '08:12',
      },
    ],
  },
];

const ChatEmailSupport = () => {
  const [threads, setThreads] = useState(mockThreads);
  const [selectedId, setSelectedId] = useState(threads[0].id);
  const [input, setInput] = useState('');

  const selectedThread = threads.find((t) => t.id === selectedId);

  const handleSend = () => {
    if (!input.trim()) return;
    setThreads((prev) =>
      prev.map((t) =>
        t.id === selectedId
          ? {
              ...t,
              messages: [
                ...t.messages,
                {
                  from: 'agent',
                  text: input,
                  time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                },
              ],
            }
          : t
      )
    );
    setInput('');
  };

  const handleMarkResolved = () => {
    setThreads((prev) =>
      prev.map((t) =>
        t.id === selectedId ? { ...t, resolved: true } : t
      )
    );
  };

  return (
    <div className="page">
      <div className="support-chat-container">
        <div className="support-thread-list">
          <div className="thread-list-title">Support Threads</div>
          {threads.map((thread) => (
            <div
              key={thread.id}
              className={`thread-list-item${thread.id === selectedId ? ' active' : ''}${thread.resolved ? ' resolved' : ''}`}
              onClick={() => setSelectedId(thread.id)}
            >
              <img src={thread.user.avatar} alt={thread.user.name} className="thread-avatar" />
              <div className="thread-info">
                <div className="thread-user">{thread.user.name}</div>
                <div className="thread-subject">{thread.subject}</div>
                <div className="thread-type">{thread.type}</div>
              </div>
              {thread.resolved && (
                <span className="thread-resolved-badge">Resolved</span>
              )}
            </div>
          ))}
        </div>

        <div className="support-chat-main">
          {selectedThread && (
            <>
              <div className="chat-header">
                <img src={selectedThread.user.avatar} alt={selectedThread.user.name} className="chat-avatar" />
                <div>
                  <div className="chat-user">{selectedThread.user.name}</div>
                  <div className="chat-email">{selectedThread.user.email}</div>
                  <div className="chat-subject">{selectedThread.subject}</div>
                </div>
                <div className="chat-type">{selectedThread.type}</div>
                {selectedThread.resolved && (
                  <span className="chat-resolved-badge">
                    <svg width="16" height="16" fill="none" stroke="#10b981" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M9 12l2 2 4-4"/>
                      <circle cx="12" cy="12" r="10"/>
                    </svg>
                    Resolved
                  </span>
                )}
              </div>
              <div className="chat-history">
                {selectedThread.messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`chat-message ${msg.from === 'agent' ? 'agent' : 'user'}`}
                  >
                    <div className="chat-message-text">{msg.text}</div>
                    <div className="chat-message-meta">{msg.time}</div>
                  </div>
                ))}
              </div>
              {!selectedThread.resolved && (
                <div className="chat-input-section">
                  <input
                    type="text"
                    className="chat-input"
                    placeholder={`Type your ${selectedThread.type === 'Email' ? 'email' : 'message'}...`}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSend()}
                  />
                  <button className="btn-send" onClick={handleSend} disabled={!input.trim()}>
                    Send
                  </button>
                  <button className="btn-resolve" onClick={handleMarkResolved}>
                    Mark as Resolved
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatEmailSupport;