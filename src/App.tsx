import { h } from 'preact';
import Widget from './components/widget'
import {Configurations} from './models';
import { AppContextProvider } from './AppContext';

type Props = Configurations;

export const App = ({element, ...appSettings}: Props) => {
  return (
    <AppContextProvider element={element}>
      <Widget />
    </AppContextProvider>
  )
}