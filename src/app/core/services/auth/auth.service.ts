import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  private readonly _HttpClient = inject(HttpClient);
  private readonly _Router = inject(Router);


  userData: any = null;

  setRegisterForm(data: Object):  Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/signup`, data);
  }

  setLoginForm(data: Object): Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/signin`, data);
  }

  saveUserData(): void {
    if (localStorage.getItem('userToken') !== null) {
      this.userData = jwtDecode(localStorage.getItem('userToken')!);
    }
  }

  logOut(): void {
    localStorage.removeItem('userToken');
    this.userData = null
    this._Router.navigate(['/login']);
  }
}
