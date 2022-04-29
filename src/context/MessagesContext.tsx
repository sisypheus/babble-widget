import { ComponentChildren, createContext, h } from 'preact';
import { useContext, useEffect, useState } from 'preact/hooks';
import { Message, Messages } from '../models';
import { ServiceContext } from './AppContext';
import { useCustomer } from './CustomerContext';
import { useInfiniteQuery, useQueryClient } from 'react-query';

export const MessagesContext = createContext<any>({} as any);

export const MessagesContextProvider = ({ children }: { children: ComponentChildren }) => {
  const [messages, setMessages] = useState([] as Message[]);
  const apiClient = useContext(ServiceContext)
  const { customer, setCustomer } = useCustomer();
  // const queryClient = useQueryClient();

  // const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } =
  //   useInfiniteQuery<Messages, any>('messages', ({pageParam = 0}) => apiClient!.getSavedMessages(pageParam, customer?.id), {
  //     getNextPageParam: (lastPage: any, _) => lastPage.cursor
  //   }
  //   );

  // useEffect(() => {
  //   console.log(customer);
  //   if (!customer)
  //     return;
  //   getSavedMessages();
  // }, [customer])

  // const getSavedMessages = async () => {
  //   const messages = await apiClient!.getSavedMessages(customer!.id);
  //   setMessages(messages);
  // }

  return (
    <MessagesContext.Provider value={{ messages, setMessages }}>
      {children}
    </MessagesContext.Provider>
  );
};