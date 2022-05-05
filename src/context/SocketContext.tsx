import { ComponentChildren, createContext, h } from 'preact';
import { useContext, useEffect, useState } from 'preact/hooks';
import { io, Socket } from 'socket.io-client';
import { SocketContextType } from '../models';
import { ConfigContext, ServiceContext } from './AppContext';
import { useCustomer } from './CustomerContext';

export const SocketContext = createContext<SocketContextType>({} as SocketContextType);

export const useSocket = () => {
  return useContext(SocketContext);
}

export const SocketContextProvider = ({ children }: { children: ComponentChildren }) => {
  const { customer, setCustomer } = useCustomer();
  const [socket, setSocket] = useState<Socket | undefined>(undefined);
  const config = useContext(ConfigContext);

  useEffect(() => {
    if (!customer)
      return;
    const socket = io(process.env.SOCKET_URL || 'http://localhost:8001', {
      auth: {
        token: customer!.id,
        company_id:  config.clientId,
      }
    });
    setSocket(socket);
  }, [customer])

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};