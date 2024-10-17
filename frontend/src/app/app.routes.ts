import { Routes } from '@angular/router';
import { TicketListComponent } from './ticket-list/ticket-list.component';

export const routes: Routes = [
  { path: '', redirectTo: '/tickets', pathMatch: 'full' },
  { path: 'tickets', component: TicketListComponent },
];
