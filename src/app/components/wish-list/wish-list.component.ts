import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import { Subscription } from 'rxjs';
import { IWishlist } from '../../core/interfaces/wishlist/iwishlist';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-wish-list',
  standalone: true,
  imports: [],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.scss'
})
export class WishListComponent implements OnInit, OnDestroy {

  private readonly _WishlistService = inject(WishlistService);
  private readonly _CartService = inject(CartService);
  private readonly _ToastrService = inject(ToastrService);

  wishlistSubscription!: Subscription;

  wishlistProducts!: IWishlist[];

  ngOnInit(): void {
    this.wishlistSubscription = this._WishlistService.getWishlist().subscribe({
      next: (res) => {
        this.wishlistProducts = res.data
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  ngOnDestroy(): void {
    this.wishlistSubscription.unsubscribe();
  }

  removeFromWishlist(id: string): void {
    this._WishlistService.removeFromWishlist(id).subscribe({
      next: (res) => {
        console.log(res);
        for (let index = 0; index < this.wishlistProducts.length; index++) {
          if (this.wishlistProducts[index].id === id) {
            this.wishlistProducts.splice(index, index + 1);
          }
        }
      },
      error: (err:HttpErrorResponse) => {
        console.log(err);
      }
    })
  }

  addToCart(id: string): void {
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
}
