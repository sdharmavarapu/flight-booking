import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideAnimations(),BrowserAnimationsModule, provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes)]
};
