import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
  const router = inject(Router);

  let clonedRequest = req;
  if (token) {
    clonedRequest = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
  }

  return next(clonedRequest).pipe(
    catchError((error: HttpErrorResponse) => {
      // Si el servidor responde 401 (Unauthorized), el token expiró o es inválido
      if (error.status === 401) {
        localStorage.removeItem('token'); // Limpiamos el token
        router.navigate(['/login']);    // Redirigimos al Login
      }
      return throwError(() => error);
    })
  );
};