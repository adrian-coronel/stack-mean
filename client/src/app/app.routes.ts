import { Routes } from '@angular/router';
import { ClientsListComponent } from './clients-list/clients-list.component';

export const routes: Routes = [
  {
    path: '',
    component: ClientsListComponent, title: 'Clients List'
  }
];
