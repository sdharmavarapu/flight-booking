import { Component, input, output, signal } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TimeSlot } from '../../models/flight.model';

@Component({
  selector: 'app-filter-sidebar',
  standalone: true,
  templateUrl: './filter-sidebar.component.html',
  styleUrls: ['./filter-sidebar.component.scss'],
  imports: [MatCheckboxModule]
})
export class FilterSidebarComponent {
  airlines = input<string[]>([]);
  timeSlots = input<{ label: string; value: TimeSlot }[]>([]);
  
  filtersChanged = output<{
    airlines: string[];
    timeSlots: TimeSlot[];
  }>();

  selectedAirlines = signal<string[]>([]);
  selectedTimeSlots = signal<TimeSlot[]>([]);

  private emitFilters(): void {
    this.filtersChanged.emit({
      airlines: this.selectedAirlines(),
      timeSlots: this.selectedTimeSlots()
    });
  }

  toggleAirline(airline: string): void {
    const current = this.selectedAirlines();

    const updated = current.includes(airline)
      ? current.filter(a => a !== airline)
      : [...current, airline];

    this.selectedAirlines.set(updated);

    this.emitFilters();
  }

  isAirlineSelected(airline: string): boolean {
    return this.selectedAirlines().includes(airline);
  }


  toggleTime(slot: TimeSlot): void {
    const current = this.selectedTimeSlots();

    const updated = current.includes(slot)
      ? current.filter(t => t !== slot)
      : [...current, slot];

    this.selectedTimeSlots.set(updated);

    this.emitFilters();
  }

  isTimeSelected(slot: TimeSlot): boolean {
    return this.selectedTimeSlots().includes(slot);
  }
}