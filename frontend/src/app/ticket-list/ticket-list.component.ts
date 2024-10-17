import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { TicketService } from '../services/ticket.service';
import { Ticket } from '../models/ticket.model';
import { HttpErrorResponse } from '@angular/common/http';
import { TicketFormComponent } from '../ticket-form/ticket-form.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatSelectModule,
  ],
})
export class TicketListComponent implements OnInit {
  tickets = new MatTableDataSource<Ticket>();
  displayedColumns: string[] = ['id', 'description', 'status', 'date', 'actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private ticketService: TicketService, private dialog: MatDialog, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.loadTickets();
  }

  loadTickets(): void {
    this.ticketService.getTickets().subscribe(
      (tickets: Ticket[]) => {
        this.tickets.data = tickets;
        this.tickets.paginator = this.paginator;
      },
      (error: HttpErrorResponse) => {
        console.error('Error loading tickets', error);
      }
    );
  }
  applyFilter(status: string): void {
    this.tickets.filter = status.trim().toLowerCase();
  }
  deleteTicket(ticketId: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.ticketService.deleteTicket(ticketId).subscribe(
          () => {
            this.tickets.data = this.tickets.data.filter(ticket => ticket.ticketID !== ticketId);
            this.snackBar.open('Ticket deleted successfully!', 'Close', {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'center',            });
          },
          (error: HttpErrorResponse) => {
            console.error('Error deleting ticket', error);
          }
        );
      }
    });
  }
  updateTicket(ticketId: number) {
    this.ticketService.getTicketById(ticketId).subscribe(
      (ticket: Ticket) => {
        const dialogRef = this.dialog.open(TicketFormComponent, {
          data: { ticket }
        });

        dialogRef.afterClosed().subscribe((result: Ticket) => {
          if (result) {

            const index = this.tickets.data.findIndex(t => t.ticketID === ticketId);
            if (index !== -1) {
              this.tickets.data[index] = result;
              this.tickets.data = [...this.tickets.data];
              this.tickets.paginator?.firstPage();
            }
          }
        });
      },
      (error: HttpErrorResponse) => {
        console.error('Error retrieving ticket', error);
      }
    );
  }


  addTicket(): void {
    const dialogRef = this.dialog.open(TicketFormComponent);

    dialogRef.afterClosed().subscribe((result: Ticket) => {
      if (result) {
        this.tickets.data = [...this.tickets.data, result];
        this.tickets.paginator?.firstPage();
      }
    });
  }

}
