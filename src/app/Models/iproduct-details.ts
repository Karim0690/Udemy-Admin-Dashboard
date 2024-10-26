export interface IProductDetails {
  isSuccess: boolean,
  message:string,
    entity: {
        productsDtos: {
          id: number,
          description: string,
          modelName: string,
          brand: string,
          price: number,
          discountValue: number,
          discountedPrice: number,
          quantity: number,
          images: [],
          image: null,
          categoryId: number,
          dateAdded: string,
          warranty:string, 
          ar_ModelName:string,
          ar_Description :string,
        },
        specificationsNameValueDtos: {
            name: string,
            value: string
          }[] 
    }
}
