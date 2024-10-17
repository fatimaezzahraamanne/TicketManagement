import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // Import RouterModule

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,  // Marking it as standalone
  imports: [RouterModule] // Add RouterModule to imports

})
export class AppComponent {
  title = 'Ticket Management';
}
