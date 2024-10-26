import { Component, OnInit } from '@angular/core';
import { ReviewService } from '../../Services/review.service';
import { CommonModule } from '@angular/common';
import { IReviw } from '../../models/ireviw';
import { Router } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [CommonModule , NgxPaginationModule],
  templateUrl: './review.component.html',
  styleUrl: './review.component.css'
})
export class ReviewComponent implements OnInit {
  reviews: IReviw ={entities:[] , Count:0};
  errorMessages: string[] = [];
  pageItem:number=8;
  pageNumber:number=1 ;
  totalCount:number=0;
  constructor(private reviewService: ReviewService ,
     private router:Router , 
     private dialog:MatDialog) { }

  ngOnInit() {
    this.getAllReviews();
  }

  getAllReviews() {
    this.reviewService.getAllReviews(this.pageItem,this.pageNumber).subscribe({
        next: (response:any) => {
            this.reviews = response;
            this.totalCount=response.count
        },
        error: (error) => {
            console.error('Error fetching reviews:', error);
            this.errorMessages.push(`Error fetching reviews: ${error}`);
        },

    });
}



deleteReview(reviewId: number) {
  const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
    width: '250px',
    data: 'Are you sure you want to delete this product?'
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result === true) {
  this.reviewService.deleteReview(reviewId).subscribe({
      next: (respone) => {
         this.router.navigateByUrl('/Reviews') ; 
         this.ngOnInit();

      },
      error: (error) => {
          console.error('Error deleting review:', error);
          this.errorMessages.push(`Error deleting review: ${error}`);
      }
    });
  }
});
}

onPageChange(pageNumber:number) {
  this.pageNumber = pageNumber;    
  this.getAllReviews()
}
}
