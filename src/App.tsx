import { h } from 'preact';
import Widget from './components/widget'
import {Configurations} from './models';
import { AppContextProvider } from './AppContext';

type Props = Configurations;

export const App = ({element, ...appSettings}: Props) => {
  console.log(appSettings)
  return (
    <AppContextProvider element={element!} config={appSettings}>
      <Widget />
    </AppContextProvider>
  )
}