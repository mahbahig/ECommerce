import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductsComponent } from './components/products/products.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { BrandsComponent } from './components/brands/brands.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';

export const routes: Routes = [
    {
        path: '', component: AuthLayoutComponent, children: [
            { path: '', redirectTo: 'login', pathMatch: 'full' },
            { path: 'login', component: LoginComponent, title: 'Login' },
            { path: 'register', component: RegisterComponent, title: 'Register' }
        ]
    },

    {
        path: '', component: BlankLayoutComponent, children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent, title: 'Home' },
            { path: 'cart', component: CartComponent, title: 'Cart' },
            { path: 'products', component: ProductsComponent, title: 'Products' },
            { path: 'categories', component: CategoriesComponent, title: 'Categories' },
            { path: 'brands', component: BrandsComponent, title: 'Brands' },
        ]
    },

    { path: '**', component: NotFoundComponent, title: 'Not Found' }
];
