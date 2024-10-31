export interface ISubcategories {
  _id: string;
  name: string;
  nameAr: string;
  slug: string;
  category: {
    _id: string;
    name: string;
    slug: string;
  };
  topics: [string];
}
