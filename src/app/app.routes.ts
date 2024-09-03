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
import { authGuard } from './core/guards/auth/auth.guard';
import { loggedGuard } from './core/guards/logged/logged.guard';
import { ProductDetailsComponent } from './components/product-details/product-details.component';

export const routes: Routes = [
    {
        path: '', component: AuthLayoutComponent, canActivate:[loggedGuard],children: [
            { path: '', redirectTo: 'login', pathMatch: 'full' },
            { path: 'login', component: LoginComponent, title: 'Login' },
            { path: 'register', component: RegisterComponent, title: 'Register' }
        ]
    },

    {
        path: '', component: BlankLayoutComponent, canActivate:[authGuard],children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent, title: 'Home' },
            { path: 'cart', component: CartComponent, title: 'Cart' },
            { path: 'products', component: ProductsComponent, title: 'Products' },
            { path: 'categories', component: CategoriesComponent, title: 'Categories' },
            { path: 'brands', component: BrandsComponent, title: 'Brands' },
            { path: 'details/:productId', component: ProductDetailsComponent },
        ]
    },

    { path: '**', component: NotFoundComponent, title: 'Not Found' }
];
