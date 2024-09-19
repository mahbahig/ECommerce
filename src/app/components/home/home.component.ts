import { ICategories } from './../../core/interfaces/categories/icategories';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { IProduct } from '../../core/interfaces/product/iproduct';
import { Subscription } from 'rxjs';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { SearchPipe } from '../../core/pipes/search/search.pipe';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/services/cart/cart.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule, RouterLink, SearchPipe, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, OnDestroy{

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
  private readonly _CartService = inject(CartService);
  private readonly _ToastrService = inject(ToastrService)

  productList: IProduct[] = [];
  categoriesList: ICategories[] = [];

  productsSubscription!: Subscription;
  categoriesSubscription!: Subscription;

  selectedProduct!: IProduct | null;

  searchWord: string = '';

  ngOnInit(): void {
    this.productsSubscription = this._ProductsService.getAllProducts().subscribe({
      next: (res) => {
        this.productList = res.data
      },
      error: (err: HttpErrorResponse) => {
        this._ToastrService.success('An error occured. Please try again!');
      },
    });
    this.categoriesSubscription = this._CategoriesService.getAllCategories().subscribe({
      next: (res) => {
        this.categoriesList = res.data;
      },
      error: (err: HttpErrorResponse) => {
        this._ToastrService.success('An error occured. Please try again!');
      }
    })
  }
  ngOnDestroy(): void {
    this.productsSubscription?.unsubscribe();
    this.categoriesSubscription?.unsubscribe();
  }

  openModal(product: IProduct): void {
    this.selectedProduct = product;
  }
  closeModal(): void {
    this.selectedProduct = null;
  }

  addProductToCart(id: string): void {
    this._CartService.addProductToCart(id).subscribe({
      next: (res) => {
        console.log(res);
        if (res.status == 'success') {
          this._ToastrService.success(res.message);
        }
      },
      error: (err: HttpErrorResponse) => {
        this._ToastrService.success('An error occured. Please try again!');
      }
    })
  }
}