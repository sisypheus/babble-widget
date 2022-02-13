import { h } from 'preact';
import Widget from './components/widget'
import { AppContextProvider } from './AppContext';

export const App = ({element, ...appSettings}) => {
  return (
    <AppContextProvider element={element}>
      <Widget />
    </AppContextProvider>
  )
}