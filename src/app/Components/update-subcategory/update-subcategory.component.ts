import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ISubcategoryUpdate } from '../../Models/isubcategory-update';
import { ISubcategoryResult } from '../../Models/isubcategory-result';
import { ActivatedRoute, Router } from '@angular/router';
import { SubcategoiesService } from '../../Services/subcategories.service';
import { CatecoriesService } from '../../Services/catecories.service';
import { ICategory } from '../../Models/icategory';

@Component({
  selector: 'app-update-subcategory',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxPaginationModule],
  templateUrl: './update-subcategory.component.html',
  styleUrls: ['./update-subcategory.component.css'], // Fixed the plural issue here
})
export class UpdateSubcategoryComponent implements OnInit {
  newSubcategory: ISubcategoryUpdate = {
    _id: '',
    name: '',
    category: '',
    nameAr: '',
  };
  pageItem: number = 24;
  pageNumber = 1;
  totalCount: number = 0;
  SubcategoryId: string = '';
  subcategory: ISubcategoryResult = {
    message: '',
    result: { _id: '', name: '', category: '', nameAr: '' },
  };
  categories: ICategory[] = []; // Ensure this is an array

  constructor(
    private _activeRouter: ActivatedRoute,
    private _router: Router,
    private _subcategoriesService: SubcategoiesService,
    private _categoriesService: CatecoriesService
  ) {}

  ngOnInit() {
    this.SubcategoryId = this._activeRouter.snapshot.paramMap.get('id') ?? '';
    if (this.SubcategoryId) {
      this.getSubcategory();
      this.newSubcategory._id = this.SubcategoryId;
    }
    this.getAllCategories();
  }

  getSubcategory() {
    this._subcategoriesService
      .getSubcategoryById(this.SubcategoryId)
      .subscribe((response: any) => {
        // console.log(response.result);
        this.newSubcategory = response.result;
        this.newSubcategory.name = response.result.name;
        this.newSubcategory.nameAr = response.result.nameAr;
      });
  }

  getAllCategories() {
    this._categoriesService.getAllCategories().subscribe({
      next: (response: any) => {
        console.log(response.result);

        this.categories = response.result; // Assuming response.result is an array
      },
      error: (error) => {
        alert('Please try again!');
      },
    });
  }
  UpdateCategory() {
    const updatedSubcategory = {
      name: this.newSubcategory.name,
      nameAr: this.newSubcategory.nameAr,
      category: this.newSubcategory.category,
    };
    this._subcategoriesService
      .updateSubcategory(this.SubcategoryId, updatedSubcategory)
      .subscribe({
        next: (res) => {
          console.log(res);

          this._router.navigateByUrl('/Subcategories');
        },
        error: (err) => {
          console.log(err);

          alert('Opps ! there is an error ,Please Try again');
        },
      });
  }

  onPageChange(pageNumber: number) {
    this.pageNumber = pageNumber;
  }
}
