import { Bot, User } from 'lucide-react';

export function MessageBubble({ message }) {
  const isAI = message.type === 'ai';
  const timestamp = new Date(message.timestamp).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className={`flex gap-3 ${isAI ? '' : 'flex-row-reverse'}`}>
      {/* Avatar */}
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ring-1 ${
          isAI ? 'bg-primary/10 ring-primary/20' : 'bg-primary ring-primary'
        }`}
      >
        {isAI ? (
          <Bot className="h-5 w-5 text-primary" />
        ) : (
          <User className="h-5 w-5 text-primary-foreground" />
        )}
      </div>

      {/* Message Content */}
      <div
        className={`flex max-w-[70%] flex-col gap-1 ${
          isAI ? '' : 'items-end text-right'
        }`}
      >
        {/* Username + Time */}
        <div className="flex items-baseline gap-2">
          <span
            className={`text-sm font-medium ${
              isAI ? 'text-primary' : 'text-primary'
            }`}
          >
            {message.username}
          </span>
          <span className="text-xs text-muted-foreground">{timestamp}</span>
        </div>

        {/* Bubble */}
        <div
          className={`rounded-2xl px-4 py-3 leading-relaxed ${
            isAI
              ? 'bg-card text-card-foreground ring-1 ring-border'
              : 'bg-primary text-primary-foreground'
          }`}
        >
          {message.content}
        </div>
      </div>
    </div>
  );
}
