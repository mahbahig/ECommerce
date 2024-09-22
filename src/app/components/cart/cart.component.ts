import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart/cart.service';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { SearchPipe } from '../../core/pipes/search/search.pipe';
import { FormsModule } from '@angular/forms';
import { ICart } from '../../core/interfaces/cart/icart';
import { CurrencyPipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { OrdersService } from '../../core/services/orders/orders.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit, OnDestroy {

  private readonly _CartService = inject(CartService);
  private readonly _ToastrService = inject(ToastrService);

  getCartSubscription!: Subscription;

  cartDetails: ICart = {} as ICart;

  isLoading: { [id: string]: boolean } = {};
  isClearLoading: boolean = false;

  ngOnInit(): void {
    this.getCartSubscription = this._CartService.getCartItems().subscribe({
      next: (res) => {
        this.cartDetails = res.data;
      },
      error: (err: HttpErrorResponse) => {
        this._ToastrService.error('An error occured. Please try again!');
      }
    });
  }
  ngOnDestroy(): void {
    this.getCartSubscription.unsubscribe();
  }

  deleteProduct(id: string): void {
    this._CartService.removeProductFromCart(id).subscribe({
      next: (res) => {
        if (res.status == 'success') {
          this._ToastrService.success('Product deleted from your shopping cart!');
          this.cartDetails = res.data;
        }
      },
      error: (err: HttpErrorResponse) => {
        this._ToastrService.error('An error occured. Please try again!');
      }
    });
  }

  updateProductQuantity(id: string, count: number): void {
    this.isLoading[id] = true;
    if (count > 0) {
      this._CartService.updateProductQuantity(id, count).subscribe({
        next: (res) => {
          if (res.status == 'success') {
            this._ToastrService.success('Product quantity updated!');
            this.cartDetails = res.data;
          }
          this.isLoading[id] = false;
        },
        error: (err: HttpErrorResponse) => {
          this.isLoading[id] = false;
          this._ToastrService.error('An error occured. Please try again!');
        }
      })
    }
    else {
      this.deleteProduct(id);
      this.isLoading[id] = false;
    }
  }

  clearCart(): void {
    this.isClearLoading = true;
    this._CartService.clearCart().subscribe({
      next: (res) => {
        this.isClearLoading = false;
        if (res.message = "success") {
          this._ToastrService.success('Shopping cart cleared!');
          this.cartDetails = {} as ICart;
        }
      },
      error: (err: HttpErrorResponse) => {
        this.isClearLoading = false;
        this._ToastrService.error('An error occured. Please try again!');
      }
    });
  }
}