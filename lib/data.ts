import { ProductProps, ProductsParams } from "./types";

export async function getProducts(slug: string, limit: number = 0): Promise<ProductsParams> {
  try {
    console.log('Fetching products data...');
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const response = await fetch(`https://dummyjson.com/products/category/${slug}?limit=${limit}`);
   
    // console.log('Data fetch completed after 3 seconds.');

    return response.json();
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch products data.');
  }
}

export async function getProduct(id: string): Promise<ProductProps> {
  try {
    console.log('Fetching product data...');
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const response = await fetch(`https://dummyjson.com/products/${id}`);
   
    // console.log('Data fetch completed after 3 seconds.');

    return response.json();
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch product data.');
  }
}

// await fetch(`https://dummyjson.com/products/category/${slug}?limit=4`)
//     .then(res => res.json())