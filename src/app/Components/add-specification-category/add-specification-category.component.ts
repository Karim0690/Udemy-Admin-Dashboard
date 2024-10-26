import { Component, OnInit } from '@angular/core';
import { CatecoriesService } from '../../Services/catecories.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ISpecificCreateCategory } from '../../Models/ispecific-create-category';

@Component({
  selector: 'app-add-specification-category',
  standalone: true,
  imports: [CommonModule , FormsModule],
  templateUrl: './add-specification-category.component.html',
  styleUrl: './add-specification-category.component.css'
})
export class AddSpecificationCategoryComponent implements OnInit {
  newSpecification:ISpecificCreateCategory={Id:0 , Name:''};
  specification:ISpecificCreateCategory={Id:0 , Name:''}
  catId:number=0 ;
constructor(private _categoryService :CatecoriesService , private router:Router , private _activateRoute:ActivatedRoute ){}
  ngOnInit() {
    this.catId= Number(this._activateRoute.snapshot.paramMap.get('id'));

  }

addSpecification(){
// this._categoryService.addSpecificationToCategory(this.catId , this.newSpecification).subscribe({
//   next:(reponse)=>{
//     this.router.navigateByUrl('/Category')
//   }
// }) ;
}
// addNewSpecific() {
//   this.newSpecification.push({ ...this.specification });
//   this.specification = { Id: 0, Name: '' };
// }

}
