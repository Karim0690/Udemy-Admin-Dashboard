import { Component, OnInit } from '@angular/core';
import { ReviewService } from '../../Services/review.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { IReview } from '../../Models/ireview';
// import { IReview } from '../../Models/ireviw';

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule],
  templateUrl: './review.component.html',
  styleUrl: './review.component.css',
})
export class ReviewComponent implements OnInit {
  reviews: IReview[] = [];
  errorMessages: string[] = [];
  pageItem: number = 8;
  pageNumber: number = 1;
  totalCount: number = 0;
  constructor(
    private reviewService: ReviewService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getAllReviews();
  }

  getAllReviews() {
    this.reviewService.getAllReviews().subscribe({
      next: (response: any) => {
        this.reviews = response.data;
        console.log('Reviews :', response);
        // this.totalCount = response.count;
      },
      error: (error) => {
        console.error('Error fetching reviews:', error);
        this.errorMessages.push(`Error fetching reviews: ${error}`);
      },
    });
  }

  deleteReview(reviewId: string) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: 'Are you sure you want to delete this product?',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.reviewService.deleteReview(reviewId).subscribe({
          next: (respone) => {
            console.log('Review deleted successfully:', respone);
            this.getAllReviews();
            // this.router.navigateByUrl('/Reviews');
            this.ngOnInit();
          },
          error: (error) => {
            console.error('Error deleting review:', error);
            this.errorMessages.push(`Error deleting review: ${error}`);
          },
        });
      }
    });
  }

  onPageChange(pageNumber: number) {
    this.pageNumber = pageNumber;
    this.getAllReviews();
  }
}
