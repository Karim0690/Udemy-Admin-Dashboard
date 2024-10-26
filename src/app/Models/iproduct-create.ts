import { IProductCategorySpecific } from "./iproduct-category-specific";

export interface IProductCreate {
    CreateOrUpdateProductDtos:{
        Id: number,
        Description: string,
        Brand: string,
        ModelName: string,
        Price: number,
        DiscountValue?: number | null,
        DiscountedPrice?: number,
        Warranty?: string | null,
        Quantity?: number | null,
        DateAdded?: Date,
        CategoryId: number,
        UserId?: string|null,
        Images: File[] | null,
        Ar_ModelName?:string|null,
        Ar_Description ?:string|null,
    } , 
    ProductCategorySpecifications :IProductCategorySpecific[]
}
