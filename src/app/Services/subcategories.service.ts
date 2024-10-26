import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment';
import { ISubcategories } from '../Models/isubcategories';
import { ISubcategoryCreate } from '../Models/isubcategory-create';
import { ISubcategoryUpdate } from '../Models/isubcategory-update';

@Injectable({
  providedIn: 'root',
})
export class SubcategoiesService {
  apiUrl = environment.apiUrl;

  constructor(private _httpClient: HttpClient) {}

  addSubcategory(
    newSubcategory: ISubcategoryCreate
  ): Observable<ISubcategoryCreate> {
    return this._httpClient.post<ISubcategoryCreate>(
      `${this.apiUrl}subcategory`,
      newSubcategory
    );
  }

  getSubcategoryById(id: string | null): Observable<ISubcategories> {
    return this._httpClient.get<ISubcategories>(
      `${this.apiUrl}subcategory/${id}`
    );
  }
  getAllSubcategories(): Observable<ISubcategories> {
    return this._httpClient.get<ISubcategories>(`${this.apiUrl}subcategory`);
  }
  deleteSubcategory(id: string): Observable<ISubcategories> {
    return this._httpClient.delete<ISubcategories>(
      `${this.apiUrl}subcategory?id=${id}`
    );
  }

  getSubcategoryByName(name: string): Observable<ISubcategories> {
    return this._httpClient.get<ISubcategories>(
      `${this.apiUrl}subcategory?keyword=${name}`
    );
  }
  updateSubcategory(
    id: string,
    updatedSubcategory: { name: string; category: string }
  ): Observable<ISubcategoryUpdate> {
    console.log(updatedSubcategory);
    return this._httpClient.patch<ISubcategoryUpdate>(
      `${this.apiUrl}subcategory/${id}`,
      updatedSubcategory
    );
  }
}
