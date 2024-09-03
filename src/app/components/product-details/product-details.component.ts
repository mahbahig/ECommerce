import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products/products.service';
import { HttpErrorResponse } from '@angular/common/http';
import { IProduct } from '../../core/interfaces/product/iproduct';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CarouselModule],
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

  ActivatedRouteSubscription!: Subscription;
  ProductsServiceSubscription!: Subscription;

  product: IProduct | null= null;

  ngOnInit(): void {
    this.ActivatedRouteSubscription = this._ActivatedRoute.paramMap.subscribe({
      next: (params) => { 
        this.ProductsServiceSubscription = this._ProductsService.getSpecificProduct(params.get('productId')).subscribe({
          next: (res) => {
            this.product = res.data;
            console.log(this.product);
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
}
