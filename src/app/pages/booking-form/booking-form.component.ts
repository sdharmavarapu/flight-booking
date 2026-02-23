import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { Flight } from '../../shared/models/flight.model';
import { BookingStore } from '../../shared/services/booking.store';

@Component({
  selector: 'app-booking-form',
  standalone: true,
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.scss'],
  imports: [ReactiveFormsModule, MatCard, MatInputModule, MatButtonModule]
})
export class BookingFormComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private store = inject(BookingStore);
  
  bookingForm = this.fb.nonNullable.group({
    fullName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: [''],
    passengers: [1, [Validators.required, Validators.min(1)]]
  });

  readonly selectedFlight = this.store.selectedFlight;


  onSubmit(): void {
    if (this.bookingForm.valid) {
      const flight: Flight | null = this.selectedFlight();

      if (!flight) {
        console.warn('No flight selected');
        return;
      }

      const passengerData = this.bookingForm.getRawValue();

      // save to signal store - booking store
      this.store.setPassenger(passengerData);
      this.store.setReference(this.generateReference());

      this.router.navigate(['/confirmation']);
    }
  }

  private generateReference(): string {
    return 'REF-' + Math.random().toString(36).substring(2, 9).toUpperCase();
  }
}