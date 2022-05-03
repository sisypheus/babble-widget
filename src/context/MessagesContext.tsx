import { ComponentChildren, createContext, h } from 'preact';
import { useContext, useEffect, useState } from 'preact/hooks';
import { Message, Messages, MessagesContextType } from '../models';
import { ServiceContext } from './AppContext';
import { useCustomer } from './CustomerContext';

export const MessagesContext = createContext<any>({} as MessagesContextType);

export const useMessages = () => {
  return useContext(MessagesContext);
}

export const MessagesContextProvider = ({ children }: { children: ComponentChildren }) => {
  const [messages, setMessages] = useState([]);
  const apiClient = useContext(ServiceContext)
  const { customer } = useCustomer();
  const [isFetchingNextPage, setIsFetchingNextPage] = useState(false);
  const [cursor, setCursor] = useState(0);
  const [lastPage, setLastPage] = useState(false);

  const fetchNextPage = () => {
    if (!cursor)
      return;
    setIsFetchingNextPage(true);
    apiClient!.getSavedMessages(cursor, customer?.id).then(res => {
      setIsFetchingNextPage(false);
      setCursor(res.cursor);
      if (res.messages?.length > 0)
        setMessages(messages.concat(res.messages));
    });
  }

  useEffect(() => {
    if (!customer?.id)
      return;
    apiClient!.getSavedMessages(cursor, customer?.id).then((response) => {
      setMessages(response.messages);
      setCursor(response.cursor);
    });
  }, [customer]);

  return (
    <MessagesContext.Provider value={{ messages, setMessages, isFetchingNextPage, fetchNextPage }}>
      {children}
    </MessagesContext.Provider>
  );
};