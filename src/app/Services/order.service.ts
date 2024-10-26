
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment';
import { IOrderItems } from '../Models/iorder-items';
import { IOrderResult } from '../Models/iorder-result';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }


  getOrders(pageItem: number, pageNumber: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}Order?pageItem=${pageItem}&pageNumber=${pageNumber}`);

  }

  updateOrderStatus(orderId: number, newOrderStatus: number): Observable<any> {
    const url = `${this.apiUrl}Order/updateStatus?OrderId=${orderId}&NewOrderStatus=${newOrderStatus}`;

    return this.http.put<any>(url, null);
  }

  getOrdersByUserId(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}Order/GetorderByUserId/${userId}`);
  }

  searchOrder(searchTerm: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}Order/searchOrder?term=${searchTerm}`);
  }
  getOrderItems(id: number): Observable<IOrderItems> {
    return this.http.get<IOrderItems>(`${this.apiUrl}Order/GetOrderItems?orderId=${id}`)
  }
getOneOrder(id:number):Observable<IOrderResult>{
  return this.http.get<IOrderResult>(`${this.apiUrl}Order/${id}`)

}

}
