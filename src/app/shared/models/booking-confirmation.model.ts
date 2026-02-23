import { BookingFormData } from './booking-form.model';
import { Flight } from './flight.model';

export interface BookingConfirmation {
  referenceId: string;
  flight: Flight;
  passenger: BookingFormData;
}   