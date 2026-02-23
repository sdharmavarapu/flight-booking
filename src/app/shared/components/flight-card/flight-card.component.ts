import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Flight } from '../../models/flight.model';

@Component({
  selector: 'app-flight-card',
  standalone: true,
  templateUrl: './flight-card.component.html',
  styleUrls: ['./flight-card.component.scss'],
  imports: [MatCardModule, MatIconModule, MatButtonModule]
})
export class FlightCardComponent {
  flight = input<Flight>();
  book = output<Flight>();

  bookFlight(): void {
    this.book.emit(this.flight() as Flight);
  }
}