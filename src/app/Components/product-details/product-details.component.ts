import { Component, OnInit } from '@angular/core';
import { IProductDetails } from '../../Models/iproduct-details';
import { ProductService } from '../../Services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit{
  productDetails:IProductDetails= { isSuccess: false,
    message: '', entity: {
    productsDtos: {
      id: 0,
      description: '',
      modelName: '',
      brand: '',
      price: 0,
      discountValue: 0,
      discountedPrice: 0,
      quantity: 0,
      images: [],
      image: null,
      categoryId: 0,
      dateAdded: '', 
      warranty:'' , 
      ar_Description:'' , 
      ar_ModelName:'',
    },
    specificationsNameValueDtos: []
  }
};
  id:number=0;
  constructor(  private _activateRoute:ActivatedRoute ,  private _productService: ProductService, private router: Router) { }
  ngOnInit(): void {
   this.id= Number(this._activateRoute.snapshot.paramMap.get('id'));
   this._productService.grtOneProduct(this.id).subscribe({
    next: (response: any) => {
      this.productDetails= response;
      console.log(response);
      
    },
    error: (error) => {
      console.error( error);
    }
  });
  }


}
