export interface IOrder {
  entities:
  {
    id:number,
    userName: string,
    orderDate?: Date,
    shippingAddress?: string | null,
    totalPrice?: number | null,
    orderStatus?: string | null,
    deliveryDate: string,
    phone:string,
  }[],
  count: number
}

