import { BookingFormData } from '../models/booking-form.model';
import { Flight } from '../models/flight.model';
import { BookingStore } from './booking.store';

describe('BookingStore', () => {
  let store: BookingStore;

  const mockFlight: Flight = {
    id: 1,
    airline: 'KLM',
    number: 'KL123',
    price: 150,
    duration: 90,
    departure: 'AMS → LHR'
  };

  const mockPassenger: BookingFormData = {
    fullName: 'John Doe',
    email: 'john@test.com',
    phone: '999999999',
    passengers: 2
  };

  beforeEach(() => {
    store = new BookingStore();
  });

  it('should create store', () => {
    expect(store).toBeTruthy();
  });

  it('should have null initial state', () => {
    expect(store.selectedFlight()).toBeNull();
    expect(store.bookingForm()).toBeNull();
    expect(store.bookingRef()).toBeNull();
  });

  it('should set selected flight', () => {
    store.setFlight(mockFlight);

    expect(store.selectedFlight()).toEqual(mockFlight);
  });

  it('should set booking form data', () => {
    store.setPassenger(mockPassenger);

    expect(store.bookingForm()).toEqual(mockPassenger);
  });

  it('should set booking reference', () => {
    store.setReference('REF-123');

    expect(store.bookingRef()).toBe('REF-123');
  });

  it('should clear all state', () => {
    store.setFlight(mockFlight);
    store.setPassenger(mockPassenger);
    store.setReference('REF-123');

    store.clear();

    expect(store.selectedFlight()).toBeNull();
    expect(store.bookingForm()).toBeNull();
    expect(store.bookingRef()).toBeNull();
  });
});