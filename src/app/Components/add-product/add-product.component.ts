import { Component, OnInit } from '@angular/core';
import { IProductCreate } from '../../Models/iproduct-create';
import { ICategory } from '../../Models/icategory';
import { IProductCategorySpecific } from '../../Models/iproduct-category-specific';
import { ProductService } from '../../Services/product.service';
import { CatecoriesService } from '../../Services/catecories.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ISpecificCategory } from '../../Models/ispecific-category';
import { elements } from 'chart.js';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css',
})
export class AddProductComponent implements OnInit {
  CategoryId: number = 0;
  newSpecificValue: string = '';
  formData: FormData = new FormData();
  newProduct: IProductCreate = {
    CreateOrUpdateProductDtos: {
      Id: 0,
      Description: '',
      Brand: '',
      ModelName: '',
      Price: 0,
      DiscountValue: 0,
      DiscountedPrice: 0,
      Warranty: '',
      Quantity: 0,
      DateAdded: new Date(),
      CategoryId: 0,
      UserId: '9bbe6e34-0cc6-4dd4-8260-9ed1dca62cf4',
      Images: [],
      Ar_ModelName: '',
      Ar_Description: '',
    },
    ProductCategorySpecifications: [],
  };
  newPrdCatSpecificationsDto: IProductCategorySpecific = {
    Id: 0,
    ProductId: 0,
    CategoryId: 0,
    SpecificationId: 0,
    Value: 'string',
  };

  categories: ICategory = {
    _id: '',
    name: '',
    slug: '',
  };
  // categorySpecific: ISpecificCategory = {
  //   entities: [
  //     {
  //       id: 0,
  //       name: '',
  //     },
  //   ],
  //   count: 0,
  // };

  constructor(
    private _productService: ProductService,
    private _categorService: CatecoriesService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.allCtegories();
  }

  addProduct() {
    this.formData.append(
      'Ar_Description',
      this.newProduct.CreateOrUpdateProductDtos.Ar_Description?.toString() || ''
    );
    this.formData.append(
      'Ar_ModelName',
      this.newProduct.CreateOrUpdateProductDtos.Ar_ModelName?.toString() || ''
    );
    this.formData.append(
      'Description',
      this.newProduct.CreateOrUpdateProductDtos.Description
    );
    this.formData.append(
      'UserId',
      this.newProduct.CreateOrUpdateProductDtos.UserId?.toString() || ''
    );
    this.formData.append(
      'DiscountedPrice',
      this.newProduct.CreateOrUpdateProductDtos.DiscountedPrice?.toString() ||
        ''
    );
    this.formData.append(
      'Brand',
      this.newProduct.CreateOrUpdateProductDtos.Brand
    );
    this.formData.append(
      'ModelName',
      this.newProduct.CreateOrUpdateProductDtos.ModelName
    );
    this.formData.append(
      'DiscountValue',
      this.newProduct.CreateOrUpdateProductDtos.DiscountValue?.toString() || ''
    );
    this.formData.append(
      'DiscountedPrice',
      this.newProduct.CreateOrUpdateProductDtos.DiscountedPrice?.toString() ||
        ''
    );
    this.formData.append(
      'Price',
      this.newProduct.CreateOrUpdateProductDtos.Price.toString()
    );
    this.formData.append(
      'Quantity',
      this.newProduct.CreateOrUpdateProductDtos.Quantity?.toString() || ''
    );
    this.formData.append(
      'Warranty',
      this.newProduct.CreateOrUpdateProductDtos.Warranty?.toString() || ''
    );
    this.formData.append(
      'CategoryId',
      this.newProduct.CreateOrUpdateProductDtos.CategoryId.toString()
    );
    this.newProduct.ProductCategorySpecifications.forEach(
      (specification, index) => {
        this.formData.append(
          `ProductCategorySpecifications[${index}].Id`,
          specification.Id?.toString() || ''
        );
        this.formData.append(
          `ProductCategorySpecifications[${index}].ProductId`,
          specification.ProductId?.toString() || ''
        );
        this.formData.append(
          `ProductCategorySpecifications[${index}].CategoryId`,
          specification.CategoryId?.toString() || ''
        );
        this.formData.append(
          `ProductCategorySpecifications[${index}].SpecificationId`,
          specification.SpecificationId?.toString() || ''
        );
        this.formData.append(
          `ProductCategorySpecifications[${index}].Value`,
          specification.Value
        );
      }
    );

    this._productService.addProduct(this.formData).subscribe({
      next: (response) => {
        this.newProduct = response;
        this.router.navigateByUrl('/Products');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  allCtegories() {
    this._categorService.getAllCategories().subscribe({
      next: (response: any) => {
        this.categories = response;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onImageSelected(event: any) {
    const files = (event.target as HTMLInputElement).files;
    if (files && files.length > 0) {
      this.newProduct.CreateOrUpdateProductDtos.Images = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        this.formData.append('Images', file, file.name);
      }
    }
  }
  // onCategorySelect(id: number) {
  //   this._categorService.getCategorySpecific(id).subscribe((resopnse: any) => {
  //     this.categorySpecific = resopnse;
  //   });
  // }
  addSpecificationValue(specific: any) {
    if (this.newSpecificValue.trim() !== '') {
      const newSpecification = {
        Id: 0,
        ProductId: this.newProduct.CreateOrUpdateProductDtos.Id,
        CategoryId: this.newProduct.CreateOrUpdateProductDtos.CategoryId,
        SpecificationId: specific.id,
        Value: this.newSpecificValue,
      };

      this.newProduct.ProductCategorySpecifications.push(newSpecification);

      this.newSpecificValue = '';
    }
  }
}
