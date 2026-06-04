import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideClientHydration } from '@angular/platform-browser';

import { routes } from '../routes/app.routes';
import { RoleRepository } from '../../domain/interfaces/role.repository';
import { RoleHttpRepository } from '../../infrastructure/repositories/role-http.repository';
import { UserRepository } from '../../domain/interfaces/user.repository';
import { UserHttpRepository } from '../../infrastructure/repositories/user-http.repository';
import { AuthRepository } from '../../domain/interfaces/auth.repository';
import { AuthHttpRepository } from '../../infrastructure/repositories/auth-http.repository';
import { authInterceptor } from '../interceptors/auth.interceptor';

/** Configuração global da aplicação. */
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(
      withFetch(),
      withInterceptors([authInterceptor])
    ),
    { provide: RoleRepository, useClass: RoleHttpRepository },
    { provide: UserRepository, useClass: UserHttpRepository },
    { provide: AuthRepository, useClass: AuthHttpRepository }
  ]
};
