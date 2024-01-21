import { DefaultUser } from "next-auth";

export type LinkInfo = {
  label: string;
  path: string;
  component?: string;
};

export type SideBarLinkInfo = LinkInfo & {
  component?: string;
};

export type UserDetails =
  | Omit<DefaultUser, "id">
  | (DefaultUser & {
      mobile?: string;
      address?: string;
    })
  | undefined;

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


export type Provider = {
  id: string,
  name: string,
  type: string,
  signinUrl: string,
  callbackUrl: string
};

export type Providers=Array<Provider>