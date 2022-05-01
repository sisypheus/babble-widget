import { Socket } from "socket.io-client";

interface InfraConfigurations {
  element?: HTMLElement;
}

export interface AppConfigurations {
  debug: boolean;
  apiBaseUrl: string;
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

export interface CustomerProviderType {
  customer: Customer | undefined;
  setCustomer (customer: Customer): void;
}

export interface MessagesContextType {
  messages: Message[];
  isFetchingNextPage: boolean;
}

export interface Customer {
  id: string;
  email?: string;
  name?: string;
}

export interface SocketContextType {
  socket: Socket | undefined;
}

export type Configurations = InfraConfigurations & AppConfigurations;

export interface WidgetApi {
  getSavedMessages(cursor: number, id?: string): Promise<any>;
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
  content: string;
  sender: 'CUSTOMER' | 'COMPANY';
  createdAt: string;
  updatedAt: string;
  admin_id?: string;
}