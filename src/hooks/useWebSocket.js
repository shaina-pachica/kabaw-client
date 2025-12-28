import { useEffect, useRef, useState } from 'react';
// {for handling side effects, for keeping a persistent reference, for managing state which stores the WS connection status and messages}

// hook to manage WebSocket connection
export function useWebSocket(url) {
  const socketRef = useRef(null); // hold WebSocket instance
  const connectedRef = useRef(false); // track if already connected

  const [status, setStatus] = useState('disconnected'); // connection status
  const [messages, setMessages] = useState([]); // received messages
  const [userID, setUserID] = useState(null); // user identifier


  // function to establish WebSocket connection
  const connect = () => {
    if (connectedRef.current) return; // prevent double connection

    connectedRef.current = true;
    const ws = new WebSocket(url);
    socketRef.current = ws;

    // connection opened
    ws.onopen = () => {
      console.log('[FRONTEND-CONNECT] Connected');
      setStatus('connected');
    };

    // handles incoming messages
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      switch (data.type) {
        case 'message':
          setMessages((prev) => [
            ...prev,
            {
              id: crypto.randomUUID(),
              type: data.user_id === userID ? 'user' : 'ai',
              username: data.username,
              timestamp: new Date(data.timestamp),
              content: data.content,
            },
          ]);
          break;
        case 'system':
          setMessages((prev) => [
            ...prev,
            {
              id: crypto.randomUUID(),
              type: 'system',
              timestamp: new Date(),
              content: data.content,
            },
          ]);
          break;

        case 'user_connected':
          setUserID(data.user_id);
          setMessages((prev) => [
            ...prev,
            {
              id: crypto.randomUUID(),
              type: 'system',
              timestamp: new Date(),
              content: `${data.username} joined the chat`,
            },
          ]);
          break;
        default:
          console.warn('[FRONTEND-MESSAGE] Unknown type:', data.type);
      }
    };

    // logs errors
    ws.onerror = (error) => {
      console.error('[FRONTEND-ERROR]', error);
      setStatus('error');
    };

    // handles connection closure
    ws.onclose = () => {
      console.log('[FRONTEND-DISCONNECT] Connection closed');
      setStatus('disconnected');
      connectedRef.current = false; // allow reconnect
      setUserID(null);
    };
  };

  // function to manually disconnect
  const disconnect = () => {
    if (socketRef.current) {
      socketRef.current.close();
      socketRef.current = null;
      connectedRef.current = false;
      setStatus('disconnected');
      setUserID(null);
      console.log('[FRONTEND-DISCONNECT] Manual disconnect');
    }
  };

  // automatically connect on mount
  useEffect(() => {
    connect();
    return () => disconnect();
  }, [url]);

  // function to send messages through WebSocket
  const sendMessage = (msg) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(msg));
    } else {
      console.warn('[FRONTEND-SEND] WebSocket not connected yet');
    }
  };

  // return state and functions for external use
  return { status, messages, sendMessage, userID, connect, disconnect };
}
