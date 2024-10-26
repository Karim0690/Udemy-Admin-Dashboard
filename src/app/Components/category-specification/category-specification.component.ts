import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CatecoriesService } from '../../Services/catecories.service';
import { ISpecificCategory } from '../../Models/ispecific-category';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-category-specification',
  standalone: true,
  imports: [CommonModule ,FormsModule],
  templateUrl: './category-specification.component.html',
  styleUrl: './category-specification.component.css'
})
export class CategorySpecificationComponent implements OnInit{
  CategorySpecific:ISpecificCategory= { 
    entities: [{
     id: 0,
     name:''
    }],
   count:0
  }
  id:number=0;
  constructor(  private _activateRoute:ActivatedRoute ,  private _categoryService: CatecoriesService 
    , private router:Router , private dialog:MatDialog) { }
  ngOnInit(): void {
   this.id= Number(this._activateRoute.snapshot.paramMap.get('id'));
  //  this._categoryService.getCategorySpecific(this.id).subscribe({
  //   next: (response: any) => {
  //     this.CategorySpecific= response;
  //   },
  //   error: (error) => {
  //     console.error( error);
  //   }
  // });
  }

deleteSpecification(catId:number, specificId:number){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: 'Are you sure you want to delete this Specification?'
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
  // this._categoryService.deleteSpecification(catId , specificId).subscribe((res)=>{
  // this.router.navigateByUrl(`/SpecificationCategory/${catId}`)
  // this.ngOnInit()
  // }) ; 
}
    });
}

}
