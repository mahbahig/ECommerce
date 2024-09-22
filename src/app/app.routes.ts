import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductsComponent } from './components/products/products.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { authGuard } from './core/guards/auth/auth.guard';
import { loggedGuard } from './core/guards/logged/logged.guard';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { OrdersComponent } from './components/orders/orders.component';
import { WishListComponent } from './components/wish-list/wish-list.component';
import { AllOrdersComponent } from './components/all-orders/all-orders.component';

export const routes: Routes = [
    {
        path: '', component: AuthLayoutComponent, canActivate:[loggedGuard],children: [
            { path: '', redirectTo: 'login', pathMatch: 'full' },
            { path: 'login', component: LoginComponent, title: 'Login' },
            { path: 'register', component: RegisterComponent, title: 'Register' },
            { path: 'forgetPassword', component: ForgetPasswordComponent, title: 'Forget Password' },
        ]
    },

    {
        path: '', component: BlankLayoutComponent, canActivate:[authGuard],children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent, title: 'Home' },
            { path: 'products', component: ProductsComponent, title: 'Products' },
            { path: 'cart', component: CartComponent, title: 'Cart' },
            { path: 'wishlist', component: WishListComponent, title: 'Wish List' },
            { path: 'order/:cartId', component: OrdersComponent, title: 'Place Order' },
            { path: 'details/:productId', component: ProductDetailsComponent },
            { path: 'allorders', component: AllOrdersComponent, title: 'All Orders' },
            { path: '**', component: NotFoundComponent, title: 'Not Found' }
        ]
    },

];
