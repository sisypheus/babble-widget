import { h } from 'preact';
import Widget from './components/widget'
import { Configurations } from './models';
import { AppContextProvider } from './context/AppContext';
import { MessagesContextProvider } from './context/MessagesContext';
import { SocketContextProvider } from './context/SocketContext';
import { CustomerContextProvider } from './context/CustomerContext';
import { QueryClientProvider, QueryClient } from 'react-query';

type Props = Configurations;

export const App = ({ element, ...appSettings }: Props) => {
  const queryClient = new QueryClient();
  console.log(appSettings)
  return (
    <QueryClientProvider client={queryClient}>
      <AppContextProvider config={appSettings}>
        <CustomerContextProvider>
          <SocketContextProvider>
            <MessagesContextProvider>
              <Widget />
            </MessagesContextProvider>
          </SocketContextProvider>
        </CustomerContextProvider>
      </AppContextProvider>
    </QueryClientProvider>
  )
}