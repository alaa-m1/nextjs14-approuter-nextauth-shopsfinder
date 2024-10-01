export type LinkInfo = {
  label: string;
  path: string;
  component?: string;
  protected: boolean;
};

export type SideBarLinkInfo = Omit<LinkInfo, "protected"> & {
  component?: string;
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

export type Provider = {
  id: string;
  name: string;
  type: string;
  signinUrl: string;
  callbackUrl: string;
};

export type Providers = Array<Provider>;

export type UserInfo = {
  provider: string;
  firstName: string;
  lastName: string;
  userName: string;
  address: string;
  email: string;
  mobile: string;
  image: UserPhoto;
  id: string;
  gender: "custom" | "male" | "female";
  expires_at?: string;
};
export type UserPhoto = {
  publicId: string;
  imgURL: string;
  createdAt?: string;
  updatedAt?: string;
};

export type DecodedToken = {
  id: string;
};

type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;

export type Color= RGB | RGBA | HEX