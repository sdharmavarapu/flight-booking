import { Injectable, signal } from '@angular/core';
import { BookingFormData } from '../models/booking-form.model';
import { Flight } from '../models/flight.model';

@Injectable({ providedIn: 'root' })
export class BookingStore {
  readonly selectedFlight = signal<Flight | null>(null);
  readonly bookingForm = signal<BookingFormData | null>(null);
  readonly bookingRef = signal<string | null>(null);

  setFlight(flight: Flight): void {
    this.selectedFlight.set(flight);
  }

  setPassenger(data: BookingFormData): void {
    this.bookingForm.set(data);
  }

  setReference(ref: string): void {
    this.bookingRef.set(ref);
  }

  clear(): void {
    this.selectedFlight.set(null);
    this.bookingForm.set(null);
    this.bookingRef.set(null);
  }
}