import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { SessionService } from '../services/session.service';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

/** Interceptor para injeção do token JWT e tratamento de erros de autorização. */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const session = inject(SessionService);
    const router = inject(Router);
    const token = session.token();

    if (token && typeof token === 'string') {
        req = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {
            if (error.status === 401 || error.status === 403) {
                // Se o token for inválido ou não tiver permissão, limpa e desloga.
                session.clearSession();
                router.navigate(['/login']);
            }
            return throwError(() => error);
        })
    );
};
