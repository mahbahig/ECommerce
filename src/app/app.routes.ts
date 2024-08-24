import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductsComponent } from './components/products/products.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { BrandsComponent } from './components/brands/brands.component';

export const routes: Routes = [
    { path: '', redirectTo: 'register', pathMatch: 'full' },

    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },


    { path: 'home', component: HomeComponent },
    { path: 'cart', component: CartComponent },
    { path: 'products', component: ProductsComponent },
    { path: 'categories', component: CategoriesComponent },
    { path: 'brands', component: BrandsComponent },


    { path: '**', component: NotFoundComponent }
];
