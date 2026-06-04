import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { SessionService } from '../services/session.service';

/** Interceptor para injeção automática do token JWT nas requisições HTTP. */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const session = inject(SessionService);
    const token = session.token();

    if (token) {
        req = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    return next(req);
};
