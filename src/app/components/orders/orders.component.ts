import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OrdersService } from '../../core/services/orders/orders.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit {

  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _Router = inject(Router);
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _ToastrService = inject(ToastrService);
  private readonly _OrdersService = inject(OrdersService);

  visaOrderLoading: boolean = false;
  cashOrderLoading: boolean = false;

  cartId: string | null = '';

  orderStat: string = '';

  shippingForm: FormGroup = this._FormBuilder.group({
    details: [null, [Validators.required, Validators.minLength(3)]],
    phone: [null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
    city: [null, [Validators.required, Validators.minLength(3)]]
  });

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.cartId = params.get('cartId');
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  orderFormSubmit(): void {
    if (this.shippingForm.valid) {
      if (this.orderStat == 'visa') {
        this.visaOrderLoading = true;
        this._OrdersService.checkoutSession(this.cartId, this.shippingForm.value).subscribe({
          next: (res) => {
            console.log(res);
            this.visaOrderLoading = false;
            if (res.status == 'success') {
              this._ToastrService.success('Order placed successfully');
              window.open(res.session.url, '_self')
            }
            else {
              this._ToastrService.error('Order was not placed. Please try again later.');
            }
          },
          error: (err) => {
            this.visaOrderLoading = false;
            this._ToastrService.error('Error occurred. Please try again later.');
          }
        })
      }
      else if (this.orderStat == 'cash') {
        this.cashOrderLoading = true;
        this._OrdersService.cashOrder(this.cartId, this.shippingForm.value).subscribe({
          next: (res) => {
            console.log(res);
            if (res.status = 'success') {
              this._ToastrService.success('Order placed successfully');
              this._Router.navigate(['allorders'])
            }
            else {
              this._ToastrService.error('Order was not placed. Please try again later.');
            }
            this.cashOrderLoading = false;
          },
          error: (err) => {
            console.error(err);
            this.cashOrderLoading = false;
          }
        })
      }
    }
  }
}