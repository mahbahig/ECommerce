// New


import { ICategories } from './../../core/interfaces/categories/icategories';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { IProduct } from '../../core/interfaces/product/iproduct';
import { Subscription } from 'rxjs';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { SpecificProductComponent } from "../specific-product/specific-product.component";
import { ProductModalComponent } from "../product-modal/product-modal.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule, SpecificProductComponent, ProductModalComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, OnDestroy {

  mainCarousel: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    autoplay: true,
    items: 1,
    nav: false,
    autoHeight: false
  }

  categoriesCarousel: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    autoplay: true,
    responsive: { 0: { items: 1 }, 400: { items: 1 }, 740: { items: 2 }, 940: { items: 4 }, 1024: { items: 5 } },
    nav: true,
    autoHeight: false
  }

  private readonly _ProductsService = inject(ProductsService);
  private readonly _CategoriesService = inject(CategoriesService);
  private readonly _ToastrService = inject(ToastrService);

  productList: IProduct[] = [];
  categoriesList: ICategories[] = [];

  productsSubscription!: Subscription;
  categoriesSubscription!: Subscription;

  selectedProduct!: IProduct | null;

  ngOnInit(): void {
    this.productsSubscription = this._ProductsService.getAllProducts().subscribe({
      next: (res) => {
        let products: any[] = res.data;
        if (products.length > 0) {
          this.productList = products.slice(0, 10);
        }
      },
      error: (err: HttpErrorResponse) => {
        this._ToastrService.error('An error occured. Please try again!');
      },
    });
    this.categoriesSubscription = this._CategoriesService.getAllCategories().subscribe({
      next: (res) => {
        this.categoriesList = res.data;
      },
      error: (err: HttpErrorResponse) => {
        this._ToastrService.error('An error occured. Please try again!');
      }
    });
  }
  ngOnDestroy(): void {
    this.productsSubscription?.unsubscribe();
    this.categoriesSubscription?.unsubscribe();
  }

  openModal(product: IProduct): void {
    this.selectedProduct = product;
  }
  closeModal($event: boolean): void {
    if (!$event) {
      this.selectedProduct = null;
    }
  }
}