import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, tap } from 'rxjs';
import { UserData } from '../enum/user-data.enum';
import { User, UserLogin } from '../interfaces/user.interface';
import { LoginService } from '../../domains/login/services/login.service';
import { Router } from '@angular/router';
import { ROUTE_NAMES } from '../constants/routes.coinstants';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly _router = inject(Router)
    private readonly _loginService = inject(LoginService)
    
    // Signal para controlar el estado de error de login
    public isIncorrectUser = signal<boolean>(false);

    public Authentication(data: UserLogin) {
        // Reset error state before attempting login
        this.isIncorrectUser.set(false);

        this._loginService.login(data).pipe(
            tap(data => this.setToken(data.access)),
            tap(data => this.setRefresh(data.refresh)),
            tap(data => this.setUserInfo(data.user)),
            tap(() => this._router.navigate([ROUTE_NAMES.DASHBOARD])),
            catchError(() => {
                this.showLoginError();
                return of(null);
            }),
        ).subscribe();
    }

    private showLoginError() {
        this.isIncorrectUser.set(true);
    }

    public clearLoginError() {
        this.isIncorrectUser.set(false);
    }

    public getToken() {
        return localStorage.getItem(UserData.TOKEN)
    }
    public getRefresh() {
        return localStorage.getItem(UserData.REFRESH)
    }
    public getUserData() {
        return localStorage.getItem(UserData.USER)
    }
    private setToken(token: string) {
        localStorage.setItem(UserData.TOKEN, token)
    }

    private setRefresh(token: string) {
        localStorage.setItem(UserData.REFRESH, token)
    }

    private setUserInfo(data: User) {
        localStorage.setItem(UserData.USER, JSON.stringify(data))
    }


}
