import { Component, OnInit } from '@angular/core';
import { ICategory } from '../../Models/icategory';
import { CatecoriesService } from '../../Services/catecories.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ICategoryCreate } from '../../Models/icategory-create';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxPaginationModule],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css',
})
export class AddCategoryComponent implements OnInit {
  newCategory: ICategoryCreate = { name: '', nameAr: '' };
  pageItem: number = 10;
  pageNumber = 1;
  totalCount: number = 0;

  constructor(
    private _categoriesService: CatecoriesService,
    private router: Router
  ) {}
  ngOnInit() {}
  addNewCategory() {
    this._categoriesService.addCategory(this.newCategory).subscribe({
      next: (res) => {
        this.router.navigateByUrl('/Categories');
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
