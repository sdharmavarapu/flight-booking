import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { BookingStore } from '../booking.store';
import { Flight } from '../models/flight.model';
import { FlightCardComponent } from './flight-card.component';

describe('FlightCardComponent', () => {
  let component: FlightCardComponent;
  let fixture: ComponentFixture<FlightCardComponent>;

  // Mock Router
  const routerMock = {
    navigate: jasmine.createSpy('navigate')
  };

  // Mock BookingStore
  const storeMock = {
    setFlight: jasmine.createSpy('setFlight')
  };

  const mockFlight: Flight = {
    id: 1,
    airline: 'KLM',
    number: 'KL123',
    price: 200,
    duration: 90,
    departure: 'AMS → LHR'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlightCardComponent, MatCardModule, MatButtonModule, MatIconModule],
      providers: [
        { provide: Router, useValue: routerMock },
        { provide: BookingStore, useValue: storeMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FlightCardComponent);
    component = fixture.componentInstance;
    component.flight = mockFlight;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set flight in store and navigate on bookFlight()', () => {
    component.bookFlight();

    expect(storeMock.setFlight).toHaveBeenCalledWith(mockFlight);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/booking', mockFlight.id]);
  });
});