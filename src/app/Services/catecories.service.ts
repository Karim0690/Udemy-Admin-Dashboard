import { Injectable } from '@angular/core';
import { ICategory } from '../Models/icategory';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ICategoryCreate } from '../Models/icategory-create';
import { environment } from '../../environment';
import { ICategoryResult } from '../Models/icategory-result';
import { ICategoryUpdate } from '../Models/icategory-update';

@Injectable({
  providedIn: 'root',
})
export class CatecoriesService {
  apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}
  getAllCategories(): Observable<ICategory[]> {
    return this.httpClient.get<ICategory[]>(`${this.apiUrl}category`);
  }

  getCategoryById(id: string | null): Observable<ICategoryResult> {
    return this.httpClient.get<ICategoryResult>(`${this.apiUrl}category/${id}`);
  }

  getCategoryByName(name: string): Observable<ICategory> {
    return this.httpClient.get<ICategory>(
      `${this.apiUrl}category?keyword=${name}`
    );
  }

  addCategory(newCategory: ICategoryCreate): Observable<ICategoryCreate> {
    return this.httpClient.post<ICategoryCreate>(
      `${this.apiUrl}category`,
      newCategory
    );
  }

  // getCategorySpecific(id:number):Observable<ISpecificCategory[]>{
  //  return this.httpClient.get<ISpecificCategory[]>(`${this.apiUrl}category/GetSpecficationsByCategoryId?CategoryId=${id}`)
  // }

  updateCategory(newCategory: ICategoryUpdate): Observable<ICategory> {
    // const httpOptions={
    //   Headers:new HttpHeaders({
    //     'Content-Type': 'application/json'
    //   })
    // }
    return this.httpClient.patch<ICategory>(
      `${this.apiUrl}category/${newCategory._id}`,
      {
        name: newCategory.name,
        nameAr: newCategory.nameAr,
      }
    );
  }

  deleteCategory(categoryId: string): Observable<ICategory> {
    return this.httpClient.delete<ICategory>(
      `${this.apiUrl}category/${categoryId}`
    );
  }
  // deleteSpecification(catId:number , specificId:number):Observable<ISpecificCategory>
  // {
  //  return this.httpClient.delete<ISpecificCategory>(`${this.apiUrl}category/DeleteSpec?CategoryId=${catId}&SpecID=${specificId}`)
  // }
  // addSpecificationToCategory(id:number ,newSpecfication:ISpecificCreateCategory):Observable<IReturnedData[]>{
  //   return this.httpClient.post<IReturnedData[]>(`${this.apiUrl}category/CreateSpec?CategoryId=${id}`, newSpecfication);
  // }
}
