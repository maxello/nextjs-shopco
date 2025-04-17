export type ProductSize = {
  id: number; //string further
  title: "Small" | "Medium" | "Large" | "X-Large";
}

type ProductColor = {
  id: number; //string further
  title: string;
}

export type ProductProps = {
  title: string;
  price: number;
  discountPercentage: number;
  rating: number;
  thumbnail: string;
  id: number;
  brand: string;
  sku: string;
  //
  sizeVariants: ProductSize[];
  colorVariants: ProductColor[];
  availableForSale: boolean;
}

export type CartItem = {
  id: string;
  // quantity: number;
  title: string;
  brand: string;
  color: string;
  size: ProductSize["title"];
  sku: string;
  price: number;
}

export type ProductsParams = {
  products: ProductProps[];
  total: number;
  skip: number;
  limit: number;
}