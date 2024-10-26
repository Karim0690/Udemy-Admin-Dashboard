export interface IOrderResult {
    isSuccess: boolean,
  message: string,
  entity: {
    order: {
      userId: string,
      shippingAddress: string,
      shippingMethod: string,
      orderStatus: string,
      paymentStatus: string
    },
    details:
      {
        id: number,
        productId: number,
        orderId: number,
        image: string,
        description: string,
        price: number,
        quantity: number
      }[]
  }
}
