import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ISubcategoryCreate } from '../../Models/isubcategory-create';
import { SubcategoiesService } from '../../Services/subcategories.service';
import { CatecoriesService } from '../../Services/catecories.service';
import { ICategory } from '../../Models/icategory';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-subcategory',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './add-subcategory.component.html',
  styleUrls: ['./add-subcategory.component.css'],
})
export class AddSubcategoryComponent implements OnInit {
  newSubcategory: ISubcategoryCreate = { name: '', category: '', nameAr: '' };
  categories: ICategory[] = []; // Ensure this is an array

  constructor(
    private _subcategoriesService: SubcategoiesService,
    private _categoriesService: CatecoriesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllCategories();
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

  addNewSubcategory() {
    this._subcategoriesService.addSubcategory(this.newSubcategory).subscribe({
      next: (response) => {
        // Clear the form or reset as necessary
        this.newSubcategory = { name: '', category: '', nameAr: '' };
        this.router.navigateByUrl('/Subcategories');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
