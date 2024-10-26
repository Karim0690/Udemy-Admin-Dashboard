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
  styleUrl: './order-items.component.css'
})
export class OrderItemsComponent implements OnInit {
  orderItems: IOrderItems = {
    entities: [{
      id: 0,
      orderId: 0,
      productName: '',
      quantity: 0,
      unitPrice: 0 ,
      totalPrice:0
    }], count: 0
  }
  id: number = 0;
  constructor(private _activateRoute: ActivatedRoute, private _orderService: OrderService) { }
  ngOnInit() {
    this.id = Number(this._activateRoute.snapshot.paramMap.get('id'));
    this._orderService.getOrderItems(this.id).subscribe((response:any)=>{
      this.orderItems=response
    })
  }

}
