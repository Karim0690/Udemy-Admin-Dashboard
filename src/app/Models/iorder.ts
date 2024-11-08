export interface IOrder {
  _id: string;
  user: {};
  createdAt?: Date;
  country: string;
  orderStatus?: string | null;
  paymentMethod: string;
  summary: {};
}
