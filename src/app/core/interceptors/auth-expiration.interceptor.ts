import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, tap, throwError } from 'rxjs';

function isTokenExpired(token: string): boolean {
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const now = Math.floor(Date.now() / 1000);
        return payload.exp && payload.exp < now;
    } catch {
        return true; // Si el token está mal formado, lo consideramos expirado
    }
}

export const AuthExpirationInterceptor: HttpInterceptorFn = (req, next) => {
    const router = inject(Router);
    const token = localStorage.getItem('token');

    // 🔹 Si el token existe pero está expirado
    if (token && isTokenExpired(token)) {
        console.warn('🔒 Token expirado. Cerrando sesión...');
        localStorage.removeItem('token');
        router.navigate(['/login']);
    }

    // 🔹 Dejar pasar la request, pero capturar errores
    return next(req).pipe(
        tap(() => {
            // Se podría usar para logging si quieres
        }),
        catchError((err) => {
            if (err.status === 401) {
                console.warn('⚠️ No autorizado. Cerrando sesión...');
                localStorage.removeItem('token');
                router.navigate(['/login']);
            }
            return throwError(() => err);
        })
    );
};
