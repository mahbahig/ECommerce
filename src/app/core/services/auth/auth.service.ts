import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  private readonly _HttpClient = inject(HttpClient);

  setRegisterForm(data: Object):  Observable<any> {
    return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signup', data);
  }
}
