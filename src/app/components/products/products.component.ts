import { Component, inject } from '@angular/core';
import { IProduct } from '../../core/interfaces/product/iproduct';
import { ICategories } from '../../core/interfaces/categories/icategories';
import { Subscription } from 'rxjs';
import { ProductsService } from '../../core/services/products/products.service';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { SearchPipe } from '../../core/pipes/search/search.pipe';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { SpecificProductComponent } from "../specific-product/specific-product.component";
import { ProductModalComponent } from "../product-modal/product-modal.component";

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [SearchPipe, FormsModule, RouterLink, SpecificProductComponent, ProductModalComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  private readonly _ProductsService = inject(ProductsService);
  private readonly _CategoriesService = inject(CategoriesService);
  private readonly _ToastrService = inject(ToastrService);

  productList: IProduct[] = [];
  categoriesList: ICategories[] = [];

  productsSubscription!: Subscription;
  categoriesSubscription!: Subscription;

  selectedProduct!: IProduct | null;

  searchWord: string = '';

  ngOnInit(): void {
    this.productsSubscription = this._ProductsService.getAllProducts().subscribe({
      next: (res) => {
        this.productList = res.data;
      },
      error: (err: HttpErrorResponse) => {
        this._ToastrService.error('An error occured. Please try again!');
      },
    });
    this.categoriesSubscription = this._CategoriesService.getAllCategories().subscribe({
      next: (res) => {
        this.categoriesList = res.data;
        console.log(this.categoriesList);
        
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