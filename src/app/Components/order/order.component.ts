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
  imports: [CommonModule, FormsModule, NgxPaginationModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css',
})
export class OrderComponent implements OnInit {
  orders: IOrder[] = [];
  errorMessages: string = '';
  id: string = '';
  resultOfSearch: any | IOrder[];
  pageItem: number = 10;
  pageNumber: number = 1;
  totalCount: number = 0;
  constructor(private orderService: OrderService, private router: Router) {}

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders() {
    this.orderService.getOrders().subscribe({
      next: (response: any) => {
        console.log(response.data);

        this.orders = response.data;
      },
      error: (error) => {
        console.error('Error fetching orders:', error);
        this.errorMessages = `Error fetching orders: ${error}`;
      },
    });
  }

  getOrdersByUserId(userId: number): void {
    this.orderService.getOrdersByUserId(userId).subscribe({
      next: (response) => {},
      error: (error) => {
        console.error('Error fetching orders by user id:', error);
        this.errorMessages = `Error fetching orders by user id: ${error}`;
      },
    });
  }
  orderItems(id: number) {
    this.router.navigateByUrl(`/OrderItems/${id}`);
  }

  onPageChange(pageNumber: number) {
    this.pageNumber = pageNumber;
    this.getOrders();
  }

  updateOrderStatus(id: number) {
    this.router.navigateByUrl(`/UpdateOrderStatus/${id}`);
  }

  deleteOrder(id: string) {
    this.orderService.deleteOrder(id).subscribe({
      next: (response) => {
        this.orders = this.orders.filter((order) => order._id !== id);
        this.ngOnInit();
      },
      error: (error) => {
        console.error('Error deleting order:', error);
        this.errorMessages = `Error deleting order: ${error}`;
      },
    });
  }

  searchofOrder() {
    this.orderService.searchOrder(this.id).subscribe((res: any) => {
      this.resultOfSearch = res.data;
    });
  }
}
