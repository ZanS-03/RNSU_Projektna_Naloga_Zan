import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth-service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  //tukaj naj bi logika za jwt delovala ampak zaradi CORS napake ne dela, zato sem odstranil dodajanje tokena za domeno
  if (req.url.includes('random-word-api.vercel.app')) {
    return next(req);
  }

  if (!token) return next(req);

  return next(req.clone({
    setHeaders: { Authorization: `Bearer ${token}` }
  }));
};

