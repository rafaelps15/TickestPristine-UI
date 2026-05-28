import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from '../routes/app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { RoleRepository } from '../../domain/interfaces/role.repository';
import { RoleHttpRepository } from '../../infrastructure/repositories/role-http.repository';
import { UserRepository } from '../../domain/interfaces/user.repository';
import { UserHttpRepository } from '../../infrastructure/repositories/user-http.repository';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withFetch()),
    { provide: RoleRepository, useClass: RoleHttpRepository },
    { provide: UserRepository, useClass: UserHttpRepository }
  ]
};