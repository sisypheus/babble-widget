import { h, createContext, ComponentChildren } from 'preact';
import { useRef, useState } from 'preact/hooks';
import { AppConfigurations, Globals, WidgetApi } from '../models';
import { ApiClient } from '../services/apiClient';
import { MessagesContextProvider } from './MessagesContext';

interface Props {
  element?: HTMLElement;
  children: ComponentChildren;
  config: AppConfigurations;
}

export const GlobalContext = createContext<Globals>({ widgetOpen: false, toggleWidget: (o) => undefined });
export const ServiceContext = createContext<WidgetApi | undefined>(undefined);
export const ConfigContext = createContext<AppConfigurations>({} as AppConfigurations);
export const MessagesContext = createContext<any[]>([]);

export const AppContextProvider = ({ children, config }: Props) => {
  const [widgetOpen, toggleWidget] = useState(false);

  const services = useRef(new ApiClient({
    baseUrl: config.apiBaseUrl,
    debug: config.debug,
    clientId: config.clientId,
  }))

  console.log(config);

  return (
    <ConfigContext.Provider value={config}>
      <ServiceContext.Provider value={services.current}>
        <GlobalContext.Provider value={{ widgetOpen, toggleWidget }}>
          <MessagesContextProvider>
            {children}
          </MessagesContextProvider>
        </GlobalContext.Provider>
      </ServiceContext.Provider>
    </ConfigContext.Provider>
  )
}