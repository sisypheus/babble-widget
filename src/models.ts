interface InfraConfigurations {
  element?: HTMLElement;
}

/**
 * A model representing all possible configurations
 * that can be done from embedded script. Those settings
 * are passed around in application via Context.
 */
export interface AppConfigurations {
  debug: boolean;
  serviceBaseUrl: string;
  clientId: string;
  clientUrl: string;
  initialMessage: string;

  widget: {
    initialMessage: string;
    minimized: boolean;
    title: string;
    subtitle: string;
    requireEmail: boolean;
    // green dot to let user know if someone is connected
    // to the other end of the chat
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

export interface Message {
  sender: string;
  message: string;
  date: Date;
}

export interface Customer {
  pricingPlan: number;
}