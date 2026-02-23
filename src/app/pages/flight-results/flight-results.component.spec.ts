import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Flight } from '../../shared/models/flight.model';
import { FlightResultsComponent } from './flight-results.component';

const mockFlights: Flight[] = [
  { id: 1, airline: 'KLM', number: 'KL100', price: 120, duration: 90, departure: '06:00' },
  { id: 2, airline: 'KLM', number: 'KL101', price: 135, duration: 100, departure: '13:00' },
  { id: 3, airline: 'Lufthansa', number: 'LH200', price: 150, duration: 110, departure: '18:00' },
  { id: 4, airline: 'Lufthansa', number: 'LH201', price: 140, duration: 105, departure: '09:30' },
  { id: 5, airline: 'Air France', number: 'AF300', price: 160, duration: 95, departure: '07:45' },
  { id: 6, airline: 'Air France', number: 'AF301', price: 155, duration: 120, departure: '20:15' }
];

describe('FlightResultsComponent', () => {
  let component: FlightResultsComponent;
  let fixture: ComponentFixture<FlightResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlightResultsComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(FlightResultsComponent);
    component = fixture.componentInstance;

    component.flights.set(mockFlights);
    component.airlines = [...new Set(mockFlights.map(f => f.airline))];

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return all flights when no filters or sort selected', () => {
    component.selectedAirlines.set([]);
    component.selectedTimeSlots.set([]);
    component.sortOption.set('');

    const results = component.filteredFlights();
    expect(results.length).toBe(mockFlights.length);
  });

  it('should filter by airline', () => {
    component.selectedAirlines.set(['KLM']);
    component.selectedTimeSlots.set([]);

    const results = component.filteredFlights();
    expect(results.length).toBe(2);
    expect(results.every(f => f.airline === 'KLM')).toBeTrue();
  });

  it('should filter by time slot', () => {
    component.selectedAirlines.set([]);
    component.selectedTimeSlots.set(['morning']);

    const results = component.filteredFlights();
    expect(results.length).toBe(
      mockFlights.filter(f => component.getTimeSlot(f.departure) === 'morning').length
    );
    expect(results.every(f => component.getTimeSlot(f.departure) === 'morning')).toBeTrue();
  });

  it('should filter by airline and time slot together', () => {
    component.selectedAirlines.set(['Lufthansa']);
    component.selectedTimeSlots.set(['morning']);

    const results = component.filteredFlights();
    expect(results.length).toBe(
      mockFlights.filter(f => f.airline === 'Lufthansa' && component.getTimeSlot(f.departure) === 'morning').length
    );
    expect(results.every(f => f.airline === 'Lufthansa')).toBeTrue();
    expect(results.every(f => component.getTimeSlot(f.departure) === 'morning')).toBeTrue();
  });

  it('should sort by price ascending', () => {
    component.sortOption.set('price');

    const results = component.filteredFlights();
    for (let i = 0; i < results.length - 1; i++) {
      expect(results[i].price).toBeLessThanOrEqual(results[i + 1].price);
    }
  });

  it('should sort by duration ascending', () => {
    component.sortOption.set('duration');

    const results = component.filteredFlights();
    for (let i = 0; i < results.length - 1; i++) {
      expect(results[i].duration).toBeLessThanOrEqual(results[i + 1].duration);
    }
  });

  it('should return empty array when filters do not match', () => {
    component.selectedAirlines.set(['KLM']);
    component.selectedTimeSlots.set(['evening']);

    const results = component.filteredFlights();
    expect(results).toEqual([]);
  });
});