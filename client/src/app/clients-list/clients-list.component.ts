import { Component, OnInit, WritableSignal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Client } from '../models/client';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-clients-list',
  standalone: true,
  imports: [RouterModule, MatTableModule, MatButtonModule, MatCardModule],

  // template: `
  //   <p>
  //     clients-list works!
  //   </p>
  // `,
  templateUrl: './clients-list.component.html',
  styles: [
    `
     table {
        width: 100%;

        button:first-of-type {
          margin-right: 1rem;
        }
      }
    `
  ]
})
export class ClientsListComponent implements OnInit{

  public clients: Client[] = [];
  public clientModal: object = {
    name: "",
    lastname: "",
    dni: "",
    phone: ""
  }
  public name: string = '';
  public lastname: string = '';
  public dni: string = '';
  public phone: string = '';

  constructor(private clientsService: ClientService) {}

  ngOnInit(){
    this.fetchClients();
  }

  // LOADS
  deleteClient(id: string): void {
    this.clientsService.deleteClient(id).subscribe({
      next: () => this.fetchClients(),
    });
  }

  private fetchClients(){    
    this.clientsService.getClients().subscribe(clients => {
      if (clients) this.clients = clients;
    });
  }


}
