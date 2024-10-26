import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../Services/product.service';
import { IProductDetails } from '../../Models/iproduct-details';
import { ICategory } from '../../Models/icategory';
import { ISpecificCategory } from '../../Models/ispecific-category';
import { IProductCategorySpecific } from '../../Models/iproduct-category-specific';
import { CatecoriesService } from '../../Services/catecories.service';
import { IProductCreate } from '../../Models/iproduct-create';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ISpecificationProduct } from '../../Models/ispecification-product';

@Component({
  selector: 'app-update-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.css',
})
export class UpdateProductComponent implements OnInit {
  productId: number = 0;
  CategoryId: number = 0;
  newSpecificValue: string = '';
  specificValue: any[] = [];
  specificationId: number = 0;
  formData: FormData = new FormData();
  productDetails: IProductDetails = {
    isSuccess: false,
    message: '',
    entity: {
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
        warranty: '',
        ar_Description: '',
        ar_ModelName: '',
      },
      specificationsNameValueDtos: [
        {
          name: '',
          value: '',
        },
      ],
    },
  };
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
    Value: '',
  };

  categories: ICategory = {
    _id: '',
    name: '',
    slug: '',
  };
  categorySpecific: ISpecificCategory = {
    entities: [
      {
        id: 0,
        name: '',
      },
    ],
    count: 0,
  };
  constructor(
    private _activedRouter: ActivatedRoute,
    private _router: Router,
    private _productService: ProductService,
    private _categoryservice: CatecoriesService
  ) {}
  ngOnInit() {
    this.allCtegories();
    this.productId = Number(this._activedRouter.snapshot.paramMap.get('id'));
    this.getOneProduct();
  }
  getMatchingValue(specName: string): string | undefined {
    const match = this.productDetails.entity.specificationsNameValueDtos.find(
      (val) => val.name === specName
    );
    return match ? match.value : undefined;
  }
  getOneProduct() {
    this._productService
      .grtOneProduct(this.productId)
      .subscribe((result: IProductDetails) => {
        this.productDetails = result;
        this.CategoryId = this.productDetails.entity.productsDtos.categoryId;
        const product = this.newProduct.CreateOrUpdateProductDtos;
        const prdSpesific = this.newProduct.ProductCategorySpecifications;
        const prdResult = result.entity.productsDtos;
        product.Id = prdResult.id;
        product.Brand = prdResult.brand;
        product.Description = prdResult.description;
        product.Warranty = prdResult.warranty;
        product.ModelName = prdResult.modelName;
        product.Price = prdResult.price;
        product.DiscountValue = prdResult.discountValue;
        product.Quantity = prdResult.quantity;
        product.CategoryId = prdResult.categoryId;
        product.Ar_Description = prdResult.ar_Description;
        product.Ar_ModelName = prdResult.ar_ModelName;
        product.Images = result.entity.productsDtos.images;
      //   this._categoryservice
      //     .getCategorySpecific(this.CategoryId)
      //     .subscribe((response: any) => {
      //       this.categorySpecific = response;
      //       result.entity.specificationsNameValueDtos.forEach((spec) => {
      //         const newSpecification = {
      //           Id: 0,
      //           ProductId: prdResult.id,
      //           CategoryId: prdResult.categoryId,
      //           SpecificationId: null,
      //           Value: spec.value,
      //         };

      //         const matchingEntity = response.entities.find(
      //           (entity: { name: string; id: any }) => entity.name === spec.name
      //         );
      //         if (matchingEntity) {
      //           newSpecification.SpecificationId = matchingEntity.id;
      //         }
      //         prdSpesific.push(newSpecification);
      //       });
      //     });
      });
  }
  updateProduct() {
    this.formData.append(
      'Id',
      this.newProduct.CreateOrUpdateProductDtos.Id?.toString()
    );
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

    this._productService.UpdateProduct(this.formData).subscribe({
      next: (response) => {
        this._router.navigateByUrl('/Products');
        this.newProduct = response;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  allCtegories() {
    this._categoryservice.getAllCategories().subscribe({
      next: (response: any) => {
        this.categories = response;
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
  //   this._categoryservice.getCategorySpecific(id).subscribe((resopnse: any) => {
  //     this.categorySpecific = resopnse;
  //   });
  // }
  updateSpecificationValue(specific: any, newval: any) {
    const existingSpecification =
      this.newProduct.ProductCategorySpecifications.find(
        (spec: any) => spec.SpecificationId === specific.id
      );
    if (existingSpecification) {
      existingSpecification.Value = newval.target.value.trim();
    } else {
      const newSpecification = {
        Id: 0,
        ProductId: this.newProduct.CreateOrUpdateProductDtos.Id,
        CategoryId: this.newProduct.CreateOrUpdateProductDtos.CategoryId,
        SpecificationId: specific.id,
        Value: newval.target.value.trim(),
      };

      this.newProduct.ProductCategorySpecifications.push(newSpecification);
    }
    specific.value = '';
  }
}
