export interface IUserCreate {
  _id?: string;
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  password: string;
  photo: File | null;
  role: string[];
}
