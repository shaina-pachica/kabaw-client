'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send } from 'lucide-react';

export function ChatInput({ isConnected, onSendMessage }) {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <footer className="border-t border-border bg-card/50 backdrop-blur-xl">
      <div className="container mx-auto px-6 py-4">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={
                isConnected
                  ? 'Type your message... (Press Enter to send, Shift+Enter for new line)'
                  : 'Connect to start chatting...'
              }
              disabled={!isConnected}
              className="min-h-15 resize-none bg-secondary/50 pr-4 text-base leading-relaxed placeholder:text-muted-foreground focus-visible:ring-primary"
              rows={1}
            />
          </div>
          <Button
            onClick={handleSend}
            disabled={!isConnected || !message.trim()}
            size="lg"
            className="h-15 bg-primary hover:bg-primary/90"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
        </p>
      </div>
    </footer>
  );
}
