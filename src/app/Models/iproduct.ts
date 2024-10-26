export interface IProduct {
    entities:
        {
          id: number,
          description: string,
          modelName: string,
          brand: string,
          price: number,
          discountValue:number ,
          discountedPrice: number,
          quantity: number,
          images: [],
          categoryId: number,
          dateAdded: Date,
          isDeleted: boolean
        }[],
      count: number
}
