import socketIOClient, { Socket } from 'socket.io-client';
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
  private readonly chatClient: ChatClient;

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

export class ChatClient {
  private socket: Socket;

  constructor(customerId: string, clientId: string) { }

  public initConnection(customerId: string, clientId: string) {
    this.socket = socketIOClient(process.env.SOCKET_URL || 'http://localhost:8080', {
      auth: {
        token: customerId,
        clientId: clientId,
      }
    });
  }

  public sendMessage(message: string, file?: File) {
    this.socket.emit('')

    // TODO handle file upload
  }
}