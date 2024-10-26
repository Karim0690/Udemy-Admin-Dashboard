import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../Models/iproduct';
import { environment } from '../../environment';
import { IProductDetails } from '../Models/iproduct-details';
import { IProductCreate } from '../Models/iproduct-create';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  apiUrl = environment.apiUrl;

  constructor(private _httpClient:HttpClient) { }

  grtOneProduct(id: number): Observable<IProductDetails> {
    return this._httpClient.get<IProductDetails>(`http://localhost:54162/GetOneById/${id}`);
  }
  grtAllProducts(pageItem:number , pageNumber:number):Observable<IProduct[]>{
   return this._httpClient.get<IProduct[]>(`${this.apiUrl}Product/GetAll?pageItem=${pageItem}&pageNumber=${pageNumber}`) ;
  }

  SearchProductByName(name: string): Observable<IProductDetails> {
    return this._httpClient.get<IProductDetails>(`${this.apiUrl}Product/SearchByName?Name=${name}`);
  }

  addProduct(product:FormData):Observable<IProductCreate>{

    return this._httpClient.post<IProductCreate>(`${this.apiUrl}Product`,product );
  }
  UpdateProduct(product:FormData):Observable<IProductCreate>{

    return this._httpClient.put<IProductCreate>(`${this.apiUrl}Product`,product );
  }

  deleteProduct(id: number): Observable<IProduct> {
    return this._httpClient.delete<IProduct>(`${this.apiUrl}Product?ProductId=${id}`);
  }
  getProductsByCategory(pageItem:number , pageNumber:number , CategoryId:number):Observable<IProduct>{
    return this._httpClient.get<IProduct>(`${this.apiUrl}Product/GetProductsByCategory/${CategoryId}?ItemsPerPage=${pageItem}&PageNumber=${pageNumber}`)
  }
}
