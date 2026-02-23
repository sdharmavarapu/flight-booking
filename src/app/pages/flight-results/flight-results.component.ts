import { Component, computed, inject, signal } from '@angular/core';
import { MatOption } from "@angular/material/core";
import { MatFormField, MatLabel } from "@angular/material/input";
import { MatSelect } from '@angular/material/select';
import { Router } from '@angular/router';
import flightsData from '../../../assets/mock-flights.json';
import { FilterSidebarComponent } from '../../shared/components/filter-sidebar/filter-sidebar.component';
import { FlightCardComponent } from '../../shared/components/flight-card/flight-card.component';
import { Flight, TimeSlot } from '../../shared/models/flight.model';
import { BookingStore } from '../../shared/services/booking.store';

type SortOption = 'price' | 'duration' | '';

@Component({
  selector: 'app-flight-results',
  standalone: true,
  templateUrl: './flight-results.component.html',
  styleUrl: './flight-results.component.scss',
  imports: [FlightCardComponent, FilterSidebarComponent, MatFormField, MatLabel, MatSelect,MatOption]
})
export class FlightResultsComponent {
  flights = signal<Flight[]>(flightsData);

  // sidebar selection
  selectedAirlines = signal<string[]>([]);
  selectedTimeSlots = signal<TimeSlot[]>([]);

  sortOption = signal<SortOption>('');

  airlines = [...new Set(flightsData.map(f => f.airline))];

  timeSlots: { label: string; value: TimeSlot }[] = [
    { label: 'Morning (05-12)', value: 'morning' },
    { label: 'Afternoon (12-17)', value: 'afternoon' },
    { label: 'Evening (17-21)', value: 'evening' },
    { label: 'Night (21-05)', value: 'night' }
  ];

  filteredFlights = computed(() => {
    let results = this.flights();

    // Filter by airlines
    const airlinesSelected = this.selectedAirlines();
    if (airlinesSelected.length) {
      results = results.filter(f => airlinesSelected.includes(f.airline));
    }

    // Filter by departure time slots
    const timesSelected = this.selectedTimeSlots();
    if (timesSelected.length) {
      results = results.filter(f => timesSelected.includes(this.getTimeSlot(f.departure)));
    }

    // Apply Sorting if option selected
    const sort = this.sortOption();
    if (sort === 'price') {
      results = [...results].sort((a, b) => a.price - b.price);
    } else if (sort === 'duration') {
      results = [...results].sort((a, b) => a.duration - b.duration);
    }

    return results;
  });


  private router = inject(Router);
  private store = inject(BookingStore);

  onFiltersChanged(filters: {
    airlines: string[];
    timeSlots: TimeSlot[];
  }): void {
    this.selectedAirlines.set(filters.airlines);
    this.selectedTimeSlots.set(filters.timeSlots);
  }

  onSortChange(option: SortOption) {
    this.sortOption.set(option);
  }

  bookFlight(flight: Flight): void {
    this.store.setFlight(flight);
    this.router.navigate(['/booking', flight.id]);
  }

  getTimeSlot(time: string): TimeSlot {
    const hour = Number(time.split(':')[0]);

    if (hour >= 5 && hour < 12) return 'morning';
    if (hour >= 12 && hour < 17) return 'afternoon';
    if (hour >= 17 && hour < 21) return 'evening';
    return 'night';
  }
}