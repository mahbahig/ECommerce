import { Component, inject, OnInit } from '@angular/core';
import { OrdersService } from '../../core/services/orders/orders.service';
import { jwtDecode } from 'jwt-decode';
import { UserData } from '../../core/interfaces/userData/user-data';
import { AllOrders } from '../../core/interfaces/allOrders/all-orders';
import { CurrencyPipe, DatePipe, NgClass, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-all-orders',
  standalone: true,
  imports: [NgClass, CurrencyPipe, TitleCasePipe, DatePipe],
  templateUrl: './all-orders.component.html',
  styleUrl: './all-orders.component.scss'
})
export class AllOrdersComponent implements OnInit {
  private readonly _OrdersService = inject(OrdersService);

  userOrders!: AllOrders[];

  userData!: UserData;
  ngOnInit(): void {
    this.userData = jwtDecode(localStorage.getItem('userToken')!);
    this._OrdersService.getUserOrders(this.userData.id).subscribe({
      next: (res) => {
        this.userOrders = res;
        console.log(this.userOrders);
      },
      error: (err) => {
        console.log(err);
      },
    })
  }
}
