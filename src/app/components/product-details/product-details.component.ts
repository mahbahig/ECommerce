import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products/products.service';
import { HttpErrorResponse } from '@angular/common/http';
import { IProduct } from '../../core/interfaces/product/iproduct';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Subscription } from 'rxjs';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CarouselModule, NgClass],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit, OnDestroy {

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    autoplay: true,
    autoplayTimeout: 3000,
    navText: ['', ''],
    items: 1,
    nav: false
  }

  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _ProductsService = inject(ProductsService);
  private readonly _CartService = inject(CartService);
  private readonly _ToastrService = inject(ToastrService);
  private readonly _WishlistService = inject(WishlistService);

  inWishList: { [id: string]: boolean } = {};

  ActivatedRouteSubscription!: Subscription;
  ProductsServiceSubscription!: Subscription;

  product: IProduct | null= null;

  ngOnInit(): void {
    this.ActivatedRouteSubscription = this._ActivatedRoute.paramMap.subscribe({
      next: (params) => { 
        this.ProductsServiceSubscription = this._ProductsService.getSpecificProduct(params.get('productId')).subscribe({
          next: (res) => {
            this.product = res.data;
          },
          error: (err: HttpErrorResponse) => {
          }
        })
      }
    })
  }
  ngOnDestroy(): void {
    this.ActivatedRouteSubscription.unsubscribe()
    this.ProductsServiceSubscription.unsubscribe()
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
