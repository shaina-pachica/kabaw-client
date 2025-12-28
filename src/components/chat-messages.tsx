import { MessageBubble } from '@/components/message-bubble';
import { SystemNotification } from '@/components/system-notification';

export type MessageType = 'user' | 'ai' | 'system';

export interface Message {
  id: string;
  type: MessageType;
  content: string;
}

interface ChatMessagesProps {
  messages: Message[];
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

export function ChatMessages({ messages, messagesEndRef }: ChatMessagesProps) {
  return (
    <main className="flex-1 overflow-y-auto">
      <div className="container mx-auto px-6 py-8">
        {messages.length === 0 ? (
          <div className="flex h-full items-center justify-center">
            <div className="text-center">
              {/* Empty state UI */}
              <h3 className="mb-2 text-lg font-medium text-foreground">
                Start a conversation
              </h3>
              <p className="text-sm text-muted-foreground">
                Send a message to begin chatting with Kabaw AI
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message: Message) =>
              message.type === 'system' ? (
                <SystemNotification
                  key={message.id}
                  content={message.content}
                />
              ) : (
                <MessageBubble key={message.id} message={message} />
              )
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>
    </main>
  );
}
