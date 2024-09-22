import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private readonly _HttpClient = inject(HttpClient)

  header: any = { token: localStorage.getItem('userToken') };

  checkoutSession(id: string | null, shippingDetails: Object): Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/orders/checkout-session/${id}?url=${environment.serverUrl}`,
      { "shippingAddress": shippingDetails },
      { headers: this.header }
    );
  }

  cashOrder(id: string | null, shippingDetails: Object): Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/orders/${id}`,
      { "shippingAddress": shippingDetails },
      { headers: this.header }
    );
  }

  getUserOrders(id: string): Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/orders/user/${id}`)
  }

}
