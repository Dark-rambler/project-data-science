import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    standalone: true,
    imports: [RouterLink]
})
export class HeaderComponent {
    private readonly _router = inject(Router);
    private readonly _authService = inject(AuthService);

    logout() {
        // Limpiar localStorage y redirigir a login
        localStorage.clear();
        this._authService.clearLoginError();
        this._router.navigate(['/login']);
    }
}
