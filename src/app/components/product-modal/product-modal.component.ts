import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { IProduct } from '../../core/interfaces/product/iproduct';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';

@Component({
  selector: 'app-product-modal',
  standalone: true,
  imports: [RouterLink, NgClass],
  templateUrl: './product-modal.component.html',
  styleUrl: './product-modal.component.scss'
})
export class ProductModalComponent {

  @Input() product!: IProduct | null;
  @Output() dataEmitter: EventEmitter<boolean> = new EventEmitter();

  inWishList: { [id: string]: boolean } = {};

  status: boolean = true;
  sendData() {
    this.dataEmitter.emit(this.status);
  }

  private readonly _CartService = inject(CartService);
  private readonly _WishlistService = inject(WishlistService);
  private readonly _ToastrService = inject(ToastrService);

  closeModal(): void {
    this.product = null;
    this.status = false;
    this.sendData();
  }

  addProductToCart(id: string): void {
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