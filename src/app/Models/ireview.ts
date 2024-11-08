export interface IReview {
  _id: string;
  course: {
    _id: string;
    title: string;
  };
  user: {
    _id: string;
    name: string;
    email: string;
  };
  rating: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
}
