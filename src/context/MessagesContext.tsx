import { ComponentChildren, createContext, h } from 'preact';
import { useContext, useEffect, useState } from 'preact/hooks';
import { Message, Messages, MessagesContextType } from '../models';
import { ServiceContext } from './AppContext';
import { useCustomer } from './CustomerContext';
import { useInfiniteQuery, useQueryClient } from 'react-query';

export const MessagesContext = createContext<any>({} as MessagesContextType);

export const useMessages = () => {
  return useContext(MessagesContext);
}

export const MessagesContextProvider = ({ children }: { children: ComponentChildren }) => {
  const [messages, setMessages] = useState([] as Message[]);
  const apiClient = useContext(ServiceContext)
  const { customer, setCustomer } = useCustomer();
  const queryClient = useQueryClient();

  const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage, refetch } =
    useInfiniteQuery<Messages, any>('messages', ({ pageParam = 0 }) => apiClient!.getSavedMessages(pageParam, customer?.id), {
      getNextPageParam: (lastPage: any, _) => lastPage.cursor
    });

  useEffect(() => {
    if (customer?.id)
      refetch();
  }, [customer]);

  return (
    <MessagesContext.Provider value={{ data, setMessages }}>
      {children}
    </MessagesContext.Provider>
  );
};