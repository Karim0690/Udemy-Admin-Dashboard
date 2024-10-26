import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ITopics } from '../../Models/itopics';
import { MatDialog } from '@angular/material/dialog';
import { TopicsService } from '../../Services/topics.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-topics',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    RouterLinkActive,
    NgxPaginationModule,
  ],
  templateUrl: './topics.component.html',
  styleUrl: './topics.component.css',
})
export class TopicsComponent {
  topics: ITopics = { _id: '', name: '', slug: '',subcategoy:'' };
  textSearch: string = '';
  resultOfSearch: any | ITopics[];
  pageItem: number = 10;
  pageNumber: number = 1;
  totalCount: number = 0;

  constructor(
    private _topicsService: TopicsService,
    private router: Router,
    private dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.getAllTopics();
  }
  getAllTopics() {
    this._topicsService.getAllTopics().subscribe({
      next: (response: any) => {
        this.topics = response.result;
      },
      error: (error) => {
        alert('Please try again!');
      },
    });
  }

  updateTopic(id: string) {
    this.router.navigateByUrl(`/UpdateTopic/${id}`);
  }

  deleteTopic(id: string) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: 'Are you sure you want to delete this Topic?',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._topicsService.deleteTopic(id).subscribe({
          next: (response: any) => {
            this.getAllTopics();
          },
          error: (error) => {
            console.log(error);
          },
        });
      }
    });
  }

  searchOfTopic() {
    this._topicsService
      .getTopicByName(this.textSearch)
      .subscribe((res: any) => {
        this.resultOfSearch = res.result;
      });
  }

  onPageChange(pageNumber: number) {
    this.pageNumber = pageNumber;
    this.getAllTopics();
  }
}
