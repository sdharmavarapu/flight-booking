import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilterSidebarComponent } from './filter-sidebar.component';

describe('FilterSidebarComponent', () => {
  let component: FilterSidebarComponent;
  let fixture: ComponentFixture<FilterSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterSidebarComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(FilterSidebarComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('airlines', ['KLM', 'Lufthansa']);
    fixture.componentRef.setInput('timeSlots', [
      { label: 'Morning', value: 'morning' },
      { label: 'Evening', value: 'evening' }
    ]);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle airline selection', () => {
    component.toggleAirline('KLM');

    expect(component.selectedAirlines()).toEqual(['KLM']);

    component.toggleAirline('KLM');

    expect(component.selectedAirlines()).toEqual([]);
  });

  it('should toggle time slot selection', () => {
    component.toggleTime('morning');

    expect(component.selectedTimeSlots()).toEqual(['morning']);

    component.toggleTime('morning');

    expect(component.selectedTimeSlots()).toEqual([]);
  });

  it('should emit combined filters', () => {
    spyOn(component.filtersChanged, 'emit');

    component.toggleAirline('KLM');
    component.toggleTime('morning');

    expect(component.filtersChanged.emit).toHaveBeenCalledWith({
      airlines: ['KLM'],
      timeSlots: ['morning']
    });
  });
});