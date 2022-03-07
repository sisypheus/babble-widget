import { h, createContext, ComponentChildren } from 'preact';
import { useRef, useState } from 'preact/hooks';
import { Configurations, Globals, WidgetApi } from './models';
import { ApiClient } from './services/apiClient';

interface Props {
  element: HTMLElement;
  children: ComponentChildren;
  config: Configurations;
}

export const GlobalContext = createContext<Globals>({ widgetOpen: false, toggleWidget: (o) => undefined });
export const ServiceContext = createContext<WidgetApi | undefined>(undefined);
export const ConfigContext = createContext<Configurations>({} as Configurations);

export const AppContextProvider = ({ children, element, config }: Props) => {
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
          {children}
        </GlobalContext.Provider>
      </ServiceContext.Provider>
    </ConfigContext.Provider>
  )
}