import { Component, OnInit } from '@angular/core';
import { CatecoriesService } from '../../Services/catecories.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { ICategory } from '../../Models/icategory';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    RouterLinkActive,
    SpinnerComponent,
  ],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  isLoading: boolean = true;

  categories: ICategory = {
    _id: '',
    name: '',
    slug: '',
    nameAr: '',
  };
  textSearch: string = '';
  resultOfSearch: any | ICategory[];
  constructor(
    private _categoriesService: CatecoriesService,
    private router: Router,
    private dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.getAllCategories();
  }
  getAllCategories() {
    this.isLoading = true;
    this._categoriesService.getAllCategories().subscribe({
      next: (response: any) => {
        this.categories = response.result;
        this.isLoading = false;
      },
      error: (error) => {
        alert('Please try again!');
        this.isLoading = false;
      },
    });
  }

  deleteCategory(id: string) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: 'Are you sure you want to delete this Category?',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this._categoriesService.deleteCategory(id).subscribe({
          next: (respose) => {
            console.log('delete');
            this.router.navigateByUrl('/Categories');
            this.ngOnInit();
          },
          error: (error) => {
            console.log(error);
          },
        });
      }
    });
  }
  updateCatecory(id: string) {
    this.router.navigateByUrl(`/UpdateCategory/${id}`);
  }
  searchOfCategory() {
    this.isLoading = true;
    this._categoriesService.getCategoryByName(this.textSearch).subscribe({
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
  addSpecification(id: number) {
    this.router.navigateByUrl(`/AddSpecificationCategory/${id}`);
  }
  showSpecific(id: number) {
    this.router.navigateByUrl(`/SpecificationCategory/${id}`);
  }
}
