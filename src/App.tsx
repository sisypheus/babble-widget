import { h } from 'preact';
import Widget from './components/widget'
import { Configurations } from './models';
import { AppContextProvider } from './context/AppContext';

type Props = Configurations;

export const App = ({ element, ...appSettings }: Props) => {
  console.log(appSettings)
  return (
    <AppContextProvider config={appSettings}>
      <Widget />
    </AppContextProvider>
  )
}