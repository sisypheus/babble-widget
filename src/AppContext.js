import { h, createContext } from 'preact';
import { useEffect, useState } from 'preact/hooks';

export const GlobalContext = createContext();

export const AppContextProvider = ({ children, element }) => {
  const [widgetOpen, setWidgetOpen] = useState(false);

  return (
    <GlobalContext.Provider value={{ widgetOpen, setWidgetOpen }}>
      {children}
    </GlobalContext.Provider>
  )
}