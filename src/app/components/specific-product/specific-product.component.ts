import { Component, inject, Input } from '@angular/core';
import { IProduct } from '../../core/interfaces/product/iproduct';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';

@Component({
  selector: 'app-specific-product',
  standalone: true,
  imports: [],
  templateUrl: './specific-product.component.html',
  styleUrl: './specific-product.component.scss'
})
export class SpecificProductComponent {

  @Input() product!: IProduct;

  private readonly _CartService = inject(CartService);
  private readonly _ToastrService = inject(ToastrService);
  private readonly _WishlistService = inject(WishlistService);

  inWishList: { [id: string]: boolean } = {};

  addProductToCart(id: string, $event: Event): void {
    $event.stopPropagation();
    this._CartService.addProductToCart(id).subscribe({
      next: (res) => {
        if (res.status == 'success') {
          this._ToastrService.success(res.message);
        }
      },
      error: (err: HttpErrorResponse) => {
        this._ToastrService.error('An error occured. Please try again!');
      }
    });
  }

  toggleProductToWishlist(id: string): void {
    if (this.inWishList[id]) {
      this._WishlistService.removeFromWishlist(id).subscribe({
        next: (res) => {
          console.log(res);
          if (res.status == 'success') {
            this._ToastrService.success(res.message);
            this.inWishList[id] = false;
          }
        },
        error: (err: HttpErrorResponse) => {
          this._ToastrService.error('An error occured. Please try again!');
        }
      })
    }
    else {
      this._WishlistService.addtoWishlist(id).subscribe({
        next: (res) => {
          console.log(res);
          if (res.status == 'success') {
            this._ToastrService.success(res.message);
            this.inWishList[id] = true;
          }
        },
        error: (err: HttpErrorResponse) => {
          this._ToastrService.error('An error occured. Please try again!');
        }
      });
    }
  }
}