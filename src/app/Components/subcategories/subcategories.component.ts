import { Component, OnInit } from '@angular/core';
import { SubcategoiesService } from '../../Services/subcategories.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ISubcategories } from '../../Models/isubcategories';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'app-subcategories',
  standalone: true,
  imports: [FormsModule, CommonModule, NgxPaginationModule, SpinnerComponent],
  templateUrl: './subcategories.component.html',
  styleUrl: './subcategories.component.css',
})
export class SubcategoriesComponent {
  isLoading: boolean = true;
  subcategories: ISubcategories = {
    _id: '',
    name: '',
    nameAr: '',
    slug: '',
    category: {
      _id: '',
      name: '',
      slug: '',
    },
    topics: [''],
  };
  textSearch: string = '';
  resultOfSearch: any | ISubcategories[];
  pageItem: number = 10;
  pageNumber: number = 1;
  totalCount: number = 0;
  constructor(
    private _subcategoriesService: SubcategoiesService,
    private router: Router,
    private dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.getAllSubcategories();
  }
  getAllSubcategories() {
    this.isLoading = true;
    this._subcategoriesService.getAllSubcategories().subscribe({
      next: (response: any) => {
        console.log(response.result);
        this.subcategories = response.result;
        this.totalCount = response.count;
        this.isLoading = false;
      },
      error: (error) => {
        alert('Please try again!');
        this.isLoading = false;
      },
    });
  }
  deleteSpecific(id: string) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: 'Are you sure you want to delete this Category?',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this._subcategoriesService.deleteSubcategory(id).subscribe({
          next: (respose) => {
            this.router.navigateByUrl('/Subcategories');
            this.ngOnInit();
          },
          error: (error) => {
            console.log(error);
          },
        });
      }
    });
  }
  updateSubcategory(id: string) {
    console.log(id);

    this.router.navigateByUrl(`/UpdateSubcategory/${id}`);
  }
  searchOfSubcategory() {
    this.isLoading = true;
    this._subcategoriesService
      .getSubcategoryByName(this.textSearch)
      .subscribe((res: any) => {
        this.resultOfSearch = res.result;
        this.isLoading = false;
      });
  }
  onPageChange(pageNumber: number) {
    this.pageNumber = pageNumber;
    this.getAllSubcategories();
  }
}
