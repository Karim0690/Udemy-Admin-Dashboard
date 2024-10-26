import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../Models/iproduct';
import { ProductService } from '../../Services/product.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-product',
  standalone: true,

  imports: [CommonModule ,FormsModule , RouterLink, NgxPaginationModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
  products: IProduct = { entities: [], count: 0 };
  textSearch: string = ''
  resultOfSearch: any | IProduct[];
  id: number = 0;
  pageItem:number=4;
  pageNumber:number=1 ;
  totalCount:number=0;
  constructor(private _productService: ProductService,
     private router: Router ,
     private dialog: MatDialog
     ) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this._productService.grtAllProducts(this.pageItem, this.pageNumber).subscribe({
      next: (resopnse: any) => {
        this.products = resopnse;
        this.totalCount=resopnse.count
      },
      error: (err) => {
        console.log(err);

      }
    })
  }
  Details(id: number) {
    this.router.navigateByUrl(`/ProductDetails/${id}`)
  }
  SearchByName(){
    this._productService.SearchProductByName(this.textSearch).subscribe((result:any)=>{
      this.resultOfSearch=result.entities;
      this.totalCount=result.count;
    })
  }
  

  deleteProduct(id: number) {
    // Open the confirmation dialog
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: 'Are you sure you want to delete this product?'
    });

    dialogRef.afterClosed().subscribe(result => {
      // Check if the user confirmed the deletion
      if (result === true) {
        // Proceed with deleting the product
        this._productService.deleteProduct(id).subscribe({
          next: () => {
            // Navigate to the product list page after deletion
            this.router.navigateByUrl('/Products');
            // Reload the product list
            this.getAll();
          },
          error: (error) => {
            console.log(error);
          }
        });
      }
    });
  }
  onPageChange(pageNumber:number) {
    this.pageNumber = pageNumber;    
    this.getAll()
  }
updateProduct(id:number){
  this.router.navigateByUrl(`UpdateProduct/${id}`)
}

}
