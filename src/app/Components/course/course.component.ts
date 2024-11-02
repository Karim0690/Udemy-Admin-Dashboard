import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../Services/course.service';
import { ICourse } from '../../Models/icourse';
import { finalize } from 'rxjs/operators';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../Services/user.service';
import { IUser } from '../../Models/iuser';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-course',
  standalone: true,
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
  imports: [NgxPaginationModule,HttpClientModule, CommonModule, FormsModule],
})
export class CourseComponent implements OnInit {
  courses: ICourse[] = [];
  displayedCourses: ICourse[] = [];
  instructors: { [key: string]: IUser } = {};
  textSearch: string = '';
  loading: boolean = false;
  pageItem: number = 3;  
  pageNumber: number = 1; 
  totalPages: number = 0; 

  constructor(private courseService: CourseService, private userService: UserService) {}

  ngOnInit(): void {
    this.fetchCourses();
  }

  fetchCourses(): void {
    this.loading = true;
    this.courseService.getAllCourses()
      .pipe(finalize(() => this.loading = false))
      .subscribe(
        (courses: ICourse[]) => { // Expecting an array directly
          this.courses = courses; // Assign the array directly
          this.updatePagination();
          this.updateDisplayedCourses();
        },
        (error) => {
          console.error('Error fetching courses:', error);
        }
      );
  }
  
  fetchInstructors(): void {
    const instructorIds = Array.from(new Set(this.courses.map(course => course.instructor)));
    instructorIds.forEach(id => {
      this.userService.getUserById(id).subscribe(
        (instructor) => {
          this.instructors[id] = instructor; 
        },
        (error) => {
          console.error(`Error fetching instructor with ID ${id}:`, error);
        }
      );
    });
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.courses.length / this.pageItem);
    if (this.pageNumber > this.totalPages) {
      this.pageNumber = this.totalPages || 1;
    }
  }

  updateDisplayedCourses(): void {
    const start = (this.pageNumber - 1) * this.pageItem;
    const end = start + this.pageItem;
    this.displayedCourses = this.courses.slice(start, end);
  }

  // course.component.ts
  searchCourses(): void {
    if (!this.textSearch.trim()) {
      return this.fetchCourses(); // Reset to all courses if search is empty
    }
  
    this.loading = true; // Start loading
  
    this.courseService.searchCoursesByName(this.textSearch).subscribe(
      (courses: ICourse[]) => { // Expecting an array directly
        console.log('Courses fetched:', courses); // Check if the courses are received
        this.courses = courses; // Update the full list of courses
        this.displayedCourses = this.courses; // Update displayed courses
        this.pageNumber = 1; // Reset to first page
        this.updatePagination(); // Update pagination based on new results
      },
      (error) => {
        console.error('Error searching courses:', error);
        this.displayedCourses = []; // Optionally clear displayed courses on error
      },
      () => {
        this.loading = false; // Ensure loading is set to false when done
      }
    );
  }
  

  
  

  deleteCourse(id: string): void {
    if (confirm('Are you sure you want to delete this course?')) {
      this.courseService.deleteCourse(id).subscribe(
        () => {
          this.courses = this.courses.filter(course => course._id !== id);
          this.updatePagination();
          this.updateDisplayedCourses(); 
          console.log(`Course with ID ${id} deleted successfully.`);
        },
        (error) => console.error('Error deleting course:', error)
      );
    }
  }

  onPageChange(page: number): void {
    this.pageNumber = page;
    this.updateDisplayedCourses();
  }

  isPreviousDisabled(): boolean {
    return this.pageNumber === 1;
  }

  isNextDisabled(): boolean {
    return this.pageNumber >= this.totalPages;
  }
}
