import { h, createContext, ComponentChildren } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { Message, Messages } from '../models';
import { MessagesService } from '../services/messagesService';

export const MessagesContext = createContext<Messages>({} as Messages);

export const MessagesContextProvider = ({ children }: { children: ComponentChildren }) => {
  const [messages, setMessages] = useState([] as Message[]);

  useEffect(() => {

  }, [])

  return (
    <MessagesContext.Provider value={{ messages, setMessages }}>
      {children}
    </MessagesContext.Provider>
  );
};