import { ComponentChildren, createContext, h } from 'preact';
import { useContext, useEffect, useState } from 'preact/hooks';
import { Message, Messages } from '../models';
import { ServiceContext } from './AppContext';
import { useCustomer } from './CustomerContext';

export const MessagesContext = createContext<Messages>({} as Messages);

export const MessagesContextProvider = ({ children }: { children: ComponentChildren }) => {
  const [messages, setMessages] = useState([] as Message[]);
  const apiClient = useContext(ServiceContext)
  const { customer, setCustomer } = useCustomer();

  useEffect(() => {
    console.log(customer);
    if (!customer)
      return;
    getSavedMessages();
  }, [customer])

  const getSavedMessages = async () => {
    const messages = await apiClient!.getSavedMessages(customer!.id);
    setMessages(messages);
  }

  return (
    <MessagesContext.Provider value={{ messages, setMessages }}>
      {children}
    </MessagesContext.Provider>
  );
};