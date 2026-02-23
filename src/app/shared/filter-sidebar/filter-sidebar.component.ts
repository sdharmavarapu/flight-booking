import { Component, input, output, signal } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-filter-sidebar',
  standalone: true,
  templateUrl: './filter-sidebar.component.html',
  styleUrls: ['./filter-sidebar.component.scss'],
  imports: [MatCheckboxModule]
})
export class FilterSidebarComponent {

  // inputs
  airlines = input<string[]>([]);

  // output event
  filtersChanged = output<string[]>();

  // internal state
  selectedAirlines = signal<string[]>([]);

  toggleAirline(airline: string) {
    const current = this.selectedAirlines();

    const updated = current.includes(airline)
      ? current.filter(a => a !== airline)
      : [...current, airline];

    this.selectedAirlines.set(updated);

    // notify parent
    this.filtersChanged.emit(updated);
  }

  isSelected(airline: string) {
    return this.selectedAirlines().includes(airline);
  }
}