interface InfraConfigurations {
  element?: HTMLElement;
}

export interface AppConfigurations {
  debug: boolean;
  apiBaseUrl: string;
  socketBaseUrl: string;
  clientId: string;
  
  widget: {
    initialMessage: string;
    minimized: boolean;
    title: string;
    subtitle: string;
    requireEmail: boolean;
    mainColor: string;
    // green dot to let user know if someone is
    // connected to the other end of the chat
    activityIndicator: boolean;
  }
}

export type Configurations = InfraConfigurations & AppConfigurations;

export interface WidgetApi {
  sendMessage: (message: string, file?: File) => Promise<void>;
  customerExists: (customerId: string) => Promise<boolean>;
  getMessages: (handler: Function) => Promise<Message[]>;
}

export interface Globals {
  widgetOpen: boolean;
  toggleWidget: (open: boolean) => void;
}

export interface Messages {
  messages: Message[];
  setMessages: (messages: Message[]) => void;
}

export interface Message {
  sender: string;
  message: string;
  date: Date;
}

export interface Customer {
  pricingPlan: number;
}