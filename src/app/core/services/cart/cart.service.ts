import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private readonly _HttpClient = inject(HttpClient);

  header: any = {token: localStorage.getItem('userToken')};

  addProductToCart(productId: string): Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/cart`,
      { "productId": productId },
      { headers: this.header }
    )
  }

  getCartItems(): Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/cart`,
      {headers: this.header}
    )
  }

  removeProductFromCart(id: string): Observable<any> {
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/cart/${id}`,
      { headers: this.header }
    )
  }

  updateProductQuantity(id: string, count: number): Observable<any> {
    return this._HttpClient.put(`${environment.baseUrl}/api/v1/cart/${id}`,
      { "count": count },
      { headers: this.header }
    )
  }

  clearCart(): Observable<any> {
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/cart`,
      { headers: this.header }
    )
  }
}