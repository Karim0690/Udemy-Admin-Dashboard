import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../Services/order.service';
import { IOrderItems } from '../../Models/iorder-items';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-items',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-items.component.html',
  styleUrl: './order-items.component.css',
})
export class OrderItemsComponent implements OnInit {
  orderItems: IOrderItems[] = [];
  id: string = '';
  constructor(
    private _activateRoute: ActivatedRoute,
    private _orderService: OrderService
  ) {}
  ngOnInit() {
    this.id = this._activateRoute.snapshot.paramMap.get('id') ?? '';
    this._orderService.getOrderbyId(this.id).subscribe((response: any) => {
      console.log(response.data);
      this.orderItems = response.data.cartItems;
    });
  }
}
