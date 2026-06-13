import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SessionService } from '../services/session.service';

/** Guard para rotas autenticadas. */
export const authGuard: CanActivateFn = () => {
  const session = inject(SessionService);
  const router = inject(Router);

  console.log('Verificando authGuard. Autenticado?', session.isAuthenticated());
  if (session.isAuthenticated()) {
    return true;
  }

  console.warn('Acesso negado no authGuard. Redirecionando para login.');
  return router.createUrlTree(['/login']);
};
