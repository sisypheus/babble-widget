import axios, { AxiosResponse, AxiosError, AxiosInstance } from 'axios';
import { WidgetApi, Message } from '../models';

interface ApiClientOptions {
  baseUrl: string;
  clientId: string;
  clientUrl: string;
  debug?: boolean;
}

export class ApiClient implements WidgetApi {
  private readonly client: AxiosInstance;

  constructor(options: ApiClientOptions) {

  }

  public getMessages(handler: Function): Promise<Message[]> {
    return new Promise((resolve, reject) => {
      resolve([{
        sender: '',
        message: '',
        date: new Date()
      }]);
    }
    );
  }

  public sendMessage(message: string, file?: File): Promise<void> {
    return new Promise((resolve, reject) => {
      resolve();
    }
    );
  }

  public customerExists(customerId: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      resolve(true);
    }
    );
  }
}