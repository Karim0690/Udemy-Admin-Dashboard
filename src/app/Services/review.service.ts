import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment';
import { IReview } from '../Models/ireview';
// import { IReview } from '../Models/ireviw'

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAllReviews(): Observable<IReview[]> {
    return this.http.get<IReview[]>(`${this.apiUrl}reviews`);
  }

  deleteReview(reviewId: string): Observable<any> {
    return this.http.delete<IReview[]>(`${this.apiUrl}reviews/${reviewId}`);
  }
}
