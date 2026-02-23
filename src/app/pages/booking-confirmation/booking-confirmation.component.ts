import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { BookingStore } from '../../shared/booking.store';

@Component({
  selector: 'app-booking-confirmation',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './booking-confirmation.component.html',
  styleUrls: ['./booking-confirmation.component.scss']
})
export class BookingConfirmationComponent {
  private store = inject(BookingStore);
  private router = inject(Router);

  readonly flight = this.store.selectedFlight;
  readonly passenger = this.store.bookingForm;
  readonly reference = this.store.bookingRef;

  readonly hasData = computed(() =>
    !!this.flight() && !!this.passenger() && !!this.reference()
  );

  bookAnother(): void {
    this.store.clear();
    this.router.navigate(['/']);
  }
}