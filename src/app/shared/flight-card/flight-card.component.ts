import { Component, inject, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { BookingStore } from '../booking.store';
import { Flight } from '../models/flight.model';

@Component({
  selector: 'app-flight-card',
  standalone: true,
  templateUrl: './flight-card.component.html',
  styleUrls: ['./flight-card.component.scss'],
  imports: [MatCardModule, MatIconModule, MatButtonModule]
})
export class FlightCardComponent {
  @Input() flight!: Flight;
  private router = inject(Router);
  private store = inject(BookingStore);

  bookFlight(): void {
    this.store.setFlight(this.flight);

    this.router.navigate(['/booking', this.flight.id]);
  }
}