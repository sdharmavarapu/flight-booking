import { Routes } from '@angular/router';
import { BookingConfirmationComponent } from './pages/booking-confirmation/booking-confirmation.component';
import { bookingConfirmationGuard } from './pages/booking-confirmation/booking-confirmation.guard';
import { BookingFormComponent } from './pages/booking-form/booking-form.component';
import { bookingGuard } from './pages/booking-form/booking.guard';
import { FlightResultsComponent } from './pages/flight-results/flight-results.component';
import { FlightSearchComponent } from './pages/flight-search/flight-search.component';

export const routes: Routes = [
  { path: '', component: FlightSearchComponent },
  { path: 'results', component: FlightResultsComponent },
  { path: 'booking/:id', component: BookingFormComponent, canActivate: [bookingGuard] },
  { path: 'confirmation', component: BookingConfirmationComponent, canActivate: [bookingConfirmationGuard] },
  { path: '**', redirectTo: '' }
];