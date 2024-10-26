import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment';
import { IReviw } from '../models/ireviw';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }


  getAllReviews(pageItem:number , pageNumber:number): Observable<IReviw[]> {
    return this.http.get<IReviw[]>(`${this.apiUrl}Review?pageItem=${pageItem}&pageNumber=${pageNumber}`);
  }


deleteReview(reviewId: number): Observable<any> {
  return this.http.delete(`${this.apiUrl}Review?reviewId=${reviewId}`);
}

}
