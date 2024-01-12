export type LinkInfo = {
  label: string;
  path: string;
  component?: string;
};

export type SideBarLinkInfo = LinkInfo & {
  component?: string;
};

export type User = {
  id: number;
  name: string;
  email: string;
  mobile: string;
};

export type Products = Array<Product>;
export type Product = {
  id: number;
  category: string;
  title: string;
  price: number;
  description: string;
  image: string;
  rating?: Rating;
  uId: string;
};

type Rating = {
  rate: number;
  count: number;
};

export type CategoriesRes = Array<string>;
export type Category = { label: string; id: string };
export type Categories = Array<Category>;
