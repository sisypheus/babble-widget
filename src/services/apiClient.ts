import socketIOClient, { Socket } from 'socket.io-client';
import axios, { AxiosResponse, AxiosError, AxiosInstance } from 'axios';
import { Message } from '../models';

interface ApiClientOptions {
  baseUrl: string;
  clientId: string;
  debug?: boolean;
}

export class ApiClient {
  private readonly client: AxiosInstance;

  constructor(options: ApiClientOptions) {
    this.client = axios.create({
      baseURL: options.baseUrl,
    });
  }

  public async getSavedMessages(id: string): Promise<Message[]> {
    const response = await this.client.get(`/chat/conversations/${id}`)
    return response.data.messages;
  }
}