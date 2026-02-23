import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const differentCitiesValidator: ValidatorFn = (
  group: AbstractControl
): ValidationErrors | null => {
  const source = group.get('source')?.value;
  const destination = group.get('destination')?.value;

  if (!source || !destination) return null;

  return source === destination
    ? { sameCity: true }
    : null;
};