import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../Services/order.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { Router } from '@angular/router';
import { IOrder } from '../../Models/iorder';
import { OrderStatus } from '../../Models/order-status';


@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule,FormsModule , NgxPaginationModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})

export class OrderComponent implements OnInit {
  orders: IOrder = { entities: [], count: 0 };
  errorMessages: string = '';
  SearchTerm: any = {Pending:0, Shipped:1, Delivered:2}

  serchText:string=''
  resultOfSearch: any | IOrder[];
  pageItem:number=8 ;
  pageNumber:number=1 ;
  totalCount:number=0;
  constructor(private orderService: OrderService  , private router:Router) {
   }



  ngOnInit(): void {
    this.getOrders();
  }

  getOrders() {
    this.orderService.getOrders(this.pageItem , this.pageNumber).subscribe({
      next: (response: any) => {
        this.orders = response;
      },
      error: (error) => {
        console.error('Error fetching orders:', error);
        this.errorMessages = `Error fetching orders: ${error}`;
      }
    });
  }
  getIndexFromStatus(status: string): number | null {
    status=this.serchText;
    const normalizedStatus = status.toLowerCase().trim(); // Normalize the input
    switch (normalizedStatus) {
      case 'pending':
        return OrderStatus.Pending;
      case 'shipped':
        return OrderStatus.Shipped;
      case 'delivered':
        return OrderStatus.Delivered;
      default:
        return null; // Return null for invalid input
    }
  }
  searchOrder(): void {
    const searchTermIndex = this.getIndexFromStatus(this.serchText);
    if (searchTermIndex !== null) {
      this.orderService.searchOrder(searchTermIndex).subscribe({
        next: (response: any) => {
          this.resultOfSearch = response.entities;
        },
        error: (error) => {
          console.error('Error searching orders:', error);
          this.errorMessages = `Error searching orders: ${error}`;
        }
      });
    }
  }

  getOrdersByUserId(userId: number): void {
    this.orderService.getOrdersByUserId(userId).subscribe({
      next: (response) => {
      },
      error: (error) => {
        console.error('Error fetching orders by user id:', error);
        this.errorMessages = `Error fetching orders by user id: ${error}`;
      }
    });
  }
  orderItems(id:number)
  {
    this.router.navigateByUrl(`/OrderItems/${id}`)
  }
 
  onPageChange(pageNumber:number) {
    this.pageNumber = pageNumber;    
    this.getOrders()
  }

  updateOrderStatus(id:number){
   this.router.navigateByUrl(`/UpdateOrderStatus/${id}`)
  }

}
