'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Power, PowerOff } from 'lucide-react';

export function ChatHeader({ isConnected, userId, onToggleConnection }) {
  return (
    <header className="border-b border-border bg-card/30 backdrop-blur-xl">
      <div className="flex items-center justify-between px-6 py-4">
        <div>
          <h2 className="text-lg font-semibold text-foreground">General Chat</h2>
          <p className="text-xs text-muted-foreground">Connected as {userId}</p>
        </div>

        <div className="flex items-center gap-3">
          <Badge
            variant={isConnected ? 'default' : 'secondary'}
            className={
              isConnected
                ? 'bg-green-700/10 text-green-600'
                : 'bg-muted text-muted-foreground'
            }
          >
            {isConnected ? 'Connected' : 'Disconnected'}
          </Badge>
          <Button
            onClick={onToggleConnection}
            size="icon"
            variant={isConnected ? 'ghost' : 'default'}
            className={
              isConnected
                ? 'hover:bg-destructive/10 hover:text-destructive'
                : 'bg-success text-white hover:bg-success/90'
            }
          >
            {isConnected ? (
              <PowerOff className="h-4 w-4" />
            ) : (
              <Power className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}
