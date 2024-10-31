import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ITopics } from '../../Models/itopics';
import { MatDialog } from '@angular/material/dialog';
import { TopicsService } from '../../Services/topics.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'app-topics',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    RouterLinkActive,
    NgxPaginationModule,
    SpinnerComponent,
  ],
  templateUrl: './topics.component.html',
  styleUrl: './topics.component.css',
})
export class TopicsComponent {
  isLoading: boolean = true;
  topics: ITopics = { _id: '', name: '', slug: '', subcategoy: '', nameAr: '' };
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
    this.isLoading = true;
    this._topicsService.getAllTopics().subscribe({
      next: (response: any) => {
        this.topics = response.result;
        this.isLoading = false;
      },
      error: (error) => {
        alert('Please try again!');
        this.isLoading = false;
      },
    });
  }

  searchOfTopic() {
    this.isLoading = true;
    this._topicsService.getTopicByName(this.textSearch).subscribe({
      next: (res: any) => {
        this.resultOfSearch = res.result;
        this.isLoading = false;
      },
      error: (error) => {
        alert('Please try again!');
        this.isLoading = false;
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

  onPageChange(pageNumber: number) {
    this.pageNumber = pageNumber;
    this.getAllTopics();
  }
}
