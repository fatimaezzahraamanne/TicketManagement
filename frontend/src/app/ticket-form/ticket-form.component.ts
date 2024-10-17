import { Component, Inject } from '@angular/core';
import { MatDialogRef, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TicketService } from '../services/ticket.service';
import { Ticket } from '../models/ticket.model';
import { HttpErrorResponse } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-ticket-form',
  templateUrl: './ticket-form.component.html',
  styleUrls: ['./ticket-form.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogModule,
  ],
})
export class TicketFormComponent {
  description: string = '';
  status: string = 'Open';
  showError: boolean = false;

  constructor(
    private ticketService: TicketService,
    public dialogRef: MatDialogRef<TicketFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar
  ) {
    if (data?.ticket) {
      this.description = data.ticket.description;
      this.status = data.ticket.status;
    }
  }

  onSubmit(form: NgForm): void {
    this.showError = false;

    if (!this.description.trim()) {
      this.showError = true;
      return;
    }

    const ticketData: Ticket = {
      ticketID: this.data?.ticket ? this.data.ticket.ticketID : 0,
      description: this.description,
      status: this.status,
      date: this.data?.ticket ? this.data.ticket.date : new Date(),
    };

    if (this.data?.ticket) {
      this.ticketService.updateTicket(ticketData.ticketID, ticketData).subscribe(
        (response: Ticket) => {
          console.log('Ticket updated successfully!', response);
          this.dialogRef.close(response);

          this.snackBar.open('Ticket updated successfully!', 'Fermer', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
          });
        },
        (error: HttpErrorResponse) => {
          console.error('Error updating ticket:', error);
        }
      );
    } else {
      this.ticketService.createTicket(ticketData).subscribe(
        (response: Ticket) => {
          console.log('Ticket created successfully!', response);
          this.dialogRef.close(response);

          this.snackBar.open('Ticket created successfully!', 'Fermer', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
          });
        },
        (error: HttpErrorResponse) => {
          console.error('Error creating ticket:', error);
        }
      );
    }
  }
}
