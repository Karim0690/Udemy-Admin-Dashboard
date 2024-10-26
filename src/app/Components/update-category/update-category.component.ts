import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CatecoriesService } from '../../Services/catecories.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ICategoryResult } from '../../Models/icategory-result';
import { ICategoryUpdate } from '../../Models/icategory-update';

@Component({
  selector: 'app-update-category',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxPaginationModule],
  templateUrl: './update-category.component.html',
  styleUrl: './update-category.component.css',
})
export class UpdateCategoryComponent implements OnInit {
  newCategory: ICategoryUpdate = {
    _id: '',
    name: '',
  };
  pageItem: number = 24;
  pageNumber = 1;
  totalCount: number = 0;
  CategoryId: string | null = '';
  category: ICategoryResult = {
    message: '',
    result: { _id: '', name: '' },
  };
  constructor(
    private _activeRoter: ActivatedRoute,
    private _router: Router,
    private _categoryService: CatecoriesService,
  ) {}
  ngOnInit() {
    this.CategoryId = this._activeRoter.snapshot.paramMap.get('id');
    if (this.CategoryId) {
      this.getcategory();
      this.newCategory._id = this.CategoryId;
    }
  }
  getcategory() {
    this._categoryService
      .getCategoryById(this.CategoryId)
      .subscribe((response) => {
        console.log(response.result.name);

        this.category = response;
        this.newCategory.name = response.result.name;
      });
  }

  UpdateCategory() {
    this._categoryService.updateCategory(this.newCategory).subscribe({
      next: (res) => {
        this._router.navigateByUrl('/Categories');
      },
      error: (err) => {
        alert('Opps ! there is an error ,Please Try again');
      },
    });
  }

  onPageChange(pageNumber: number) {
    this.pageNumber = pageNumber;
  }
}
