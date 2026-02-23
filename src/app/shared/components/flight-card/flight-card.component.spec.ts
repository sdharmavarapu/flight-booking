import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Flight } from '../../models/flight.model';
import { BookingStore } from '../../services/booking.store';
import { FlightCardComponent } from './flight-card.component';

describe('FlightCardComponent', () => {
  let component: FlightCardComponent;
  let fixture: ComponentFixture<FlightCardComponent>;

  const routerMock = {
    navigate: jasmine.createSpy('navigate')
  };

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
    fixture.componentRef.setInput('flight', mockFlight);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit book event when Book button is clicked', () => {
    spyOn(component.book, 'emit');

    const button = fixture.debugElement.query(By.css('button'));
    button.triggerEventHandler('click', null);

    expect(component.book.emit).toHaveBeenCalledOnceWith(mockFlight);
  });
});