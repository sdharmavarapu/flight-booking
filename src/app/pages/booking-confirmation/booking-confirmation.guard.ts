import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { BookingStore } from '../../shared/services/booking.store';

export const bookingConfirmationGuard: CanActivateFn = () => {
  const store = inject(BookingStore);
  const router = inject(Router);

  if (!store.selectedFlight() || !store.bookingForm() || !store.bookingRef()) {
    router.navigate(['/']);
    return false;
  }

  return true;
};