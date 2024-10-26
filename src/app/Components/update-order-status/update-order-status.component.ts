import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../Services/order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderStatus } from '../../Models/order-status';
import { IOrderResult } from '../../Models/iorder-result';

@Component({
  selector: 'app-update-order-status',
  standalone: true,
  imports: [CommonModule , FormsModule],
  templateUrl: './update-order-status.component.html',
  styleUrl: './update-order-status.component.css'
})
export class UpdateOrderStatusComponent implements OnInit{
  orderId:number=0 ; 
  orderStatusOptions:  string[] =[];
  selectedOrderStatus: OrderStatus | null = null;
  errorMessages: string = '';
  constructor(private _activateRoute:ActivatedRoute ,  private _orderService:OrderService , private router: Router){
    this.orderStatusOptions = Object.values(OrderStatus).filter(value => typeof value === 'string') as string[];

  }
  
 
  ngOnInit() {
    this.orderId=Number(this._activateRoute.snapshot.paramMap.get('id')) ; 
    this._orderService.getOneOrder(this.orderId ).subscribe((response:any)=>{
       this.selectedOrderStatus = response.entity.order.orderStatus;
              
    });

  }
  updateOrderStatus(): void {
    if (this.selectedOrderStatus !== null) {
      this._orderService.updateOrderStatus(this.orderId, this.selectedOrderStatus).subscribe({
        next: (response) => {
          this.router.navigateByUrl('/Orders')
               
        },
        error: (error) => {
          this.errorMessages = `Error updating order status: ${error}`;
        }
      });
    } else {
      this.errorMessages = 'No order status selected.';
    }
  }

}
