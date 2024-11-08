// course.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ICourse } from '../Models/icourse';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private baseUrl = 'http://localhost:3001/course';

  constructor(private http: HttpClient) {}

  // Fetch all courses
  getAllCourses(): Observable<ICourse[]> {
    return this.http.get<{ status: string; data: { courses: ICourse[] } }>(this.baseUrl).pipe(
      map(response => response.data.courses),
      catchError(error => {
        console.error('Error fetching courses:', error);
        return of([]); // Return an empty array on error
      })
    );
  }

  // Search for courses by name
  searchCoursesByName(name: string): Observable<ICourse[]> {
    return this.http.get<{ status: string; data: { courses: ICourse[] } }>(`${this.baseUrl}/search?keyword=${name}`).pipe(
      map(response => response.data.courses), // Ensure this matches your API structure
      catchError(error => {
        console.error('Error searching courses:', error);
        return of([]); // Return an empty array on error
      })
    );
  }

  // Delete a course by ID
  deleteCourse(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
