import { h } from 'preact';
import Widget from './components/Widget'
import { Configurations } from './models';
import { AppContextProvider } from './context/AppContext';
import { MessagesContextProvider } from './context/MessagesContext';
import { SocketContextProvider } from './context/SocketContext';
import { CustomerContextProvider } from './context/CustomerContext';

type Props = Configurations;

export const App = ({ element, ...appSettings }: Props) => {
  return (
    <AppContextProvider config={appSettings}>
      <CustomerContextProvider>
        <SocketContextProvider>
          <MessagesContextProvider>
            <Widget />
          </MessagesContextProvider>
        </SocketContextProvider>
      </CustomerContextProvider>
    </AppContextProvider>
  )
}
