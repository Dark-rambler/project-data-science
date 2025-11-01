import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ROUTE_NAMES } from '../../constants/routes.coinstants';
import { ButtonComponentComponent } from "../../button-component/button-component.component";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    standalone: true,
    imports: [RouterLink, ButtonComponentComponent]
})
export class HeaderComponent {
    private readonly _router = inject(Router);
    private readonly _authService = inject(AuthService);
    protected ROUTE_NAMES = ROUTE_NAMES

    logout() {
        this._authService.clearLocalStrage();
        this._authService.clearLoginError();
        this._router.navigate([ROUTE_NAMES.LOGIN]);
    }
    public menuOpen = signal(false);

    toggleMenu() {
        this.menuOpen.update(open => !open);
    }

    closeMenu() {
        this.menuOpen.set(false);
    }

    isMobile(): boolean {
        return window.innerWidth < 768;
    }
}
