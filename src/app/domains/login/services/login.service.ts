import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserLogin, UserResponse } from '../../../shared/interfaces/user.interface';
@Injectable({
    providedIn: 'root'
})
export class LoginService {
    private readonly _http = inject(HttpClient)
    private apiUrl = environment.apiUrl;
    public isIncorrectUser = signal<boolean>(false);

    public login(data: UserLogin): Observable<UserResponse> {
        return this._http.post<UserResponse>(`${this.apiUrl}/login/`, data);
    }

    public errorToLoginUser(){
        this.isIncorrectUser.set(true)
    }
}
