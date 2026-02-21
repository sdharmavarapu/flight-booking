import { Routes } from '@angular/router';
import { BookingConfirmationComponent } from './pages/booking-confirmation/booking-confirmation.component';
import { BookingFormComponent } from './pages/booking-form/booking-form.component';
import { FlightResultsComponent } from './pages/flight-results/flight-results.component';
import { FlightSearchComponent } from './pages/flight-search/flight-search.component';

export const routes: Routes = [
  { path: '', component: FlightSearchComponent },
  { path: 'results', component: FlightResultsComponent },
  { path: 'booking/:id', component: BookingFormComponent },
  { path: 'confirmation', component: BookingConfirmationComponent },
  { path: '**', redirectTo: '' }
];