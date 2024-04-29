import { Injectable, signal } from '@angular/core';
import { Client } from '../models/client';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private url = 'http://localhost:5200';

  constructor(private httpClient: HttpClient) { }

  private refreshClients() {
    return this.httpClient.get<Client[]>(`${this.url}/clients`);
  }

  getClients() {
    return this.refreshClients();
  }

  getClient(id: string) {
    return this.httpClient.get<Client>(`${this.url}/clients/${id}`);
  }

  createClient(client: Client) {
    return this.httpClient.post(`${this.url}/clients`, client, { responseType: 'text' });
  }

  updateClient(id: string, client: Client) {
    return this.httpClient.put(`${this.url}/clients/${id}`, client, { responseType: 'text' });
  }

  deleteClient(id: string) {
    return this.httpClient.delete(`${this.url}/clients/${id}`, { responseType: 'text' });
  }
}
