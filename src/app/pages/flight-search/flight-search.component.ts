import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { differentCitiesValidator } from './flight-search.validators';

@Component({
  selector: 'app-flight-search',
  standalone: true,
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.scss'],
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCard,
    MatCheckboxModule
  ]
})
export class FlightSearchComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);

  searchForm = this.fb.nonNullable.group({
    source: ['', Validators.required],
    destination: ['', Validators.required],
    departureDate: ['', Validators.required],
    returnDate: this.fb.control<string | null>(null)
  },
  {
    validators: [differentCitiesValidator]
  }
);

  onSearch() {
    if (this.searchForm.invalid) return;

    this.router.navigate(['/results'], {
      queryParams: this.searchForm.value
    });
  }
}