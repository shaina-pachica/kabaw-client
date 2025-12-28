'use client';

import { useRef } from 'react';
import { useWebSocket } from '@/hooks/useWebSocket';
import { ChatHeader } from '@/components/chat-header';
import { ChatMessages } from '@/components/chat-messages';
import { ChatInput } from '@/components/chat-input';
import { Sidebar } from '@/components/sidebar';

export default function ChatPage() {
  const wsUrl = 'ws://127.0.0.1:8080/ws?username=ShainaPachica&channel=general';
  const { status, messages, sendMessage, userID, connect, disconnect } =
    useWebSocket(wsUrl);

  const isConnected = status === 'connected';
  const messagesEndRef = useRef(null);

  const handleSend = (text) => {
    sendMessage({
      type: 'message',
      userId: userID,
      content: text,
    });
  };

  const handleToggleConnection = () => {
    isConnected ? disconnect() : connect();
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        {/* Animated background bubbles */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-[10%] top-[20%] h-96 w-96 animate-float rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute right-[15%] top-[60%] h-80 w-80 animate-float-delayed rounded-full bg-chart-2/20 blur-3xl" />
          <div className="absolute bottom-[10%] left-[40%] h-72 w-72 animate-float rounded-full bg-chart-4/15 blur-3xl" />
        </div>
        <ChatHeader
          isConnected={isConnected}
          userId={userID}
          onToggleConnection={handleToggleConnection}
        />

        <ChatMessages messages={messages} messagesEndRef={messagesEndRef} />

        <ChatInput isConnected={isConnected} onSendMessage={handleSend} />
      </div>
    </div>
  );
}
