import React from 'react';
import { wixClientServer } from '@/lib/wixClientServer';
import { getFilterValues } from '@/lib/utils';
import ProductsFilterForm from './ProductsFilterForm';

const ProductsFilter = async ({ categoryId, name }: { categoryId: string, name: string }) => {
  const wixClient = await wixClientServer();
  const productQuery = wixClient.products
    .queryProducts()
    .eq("collectionIds", categoryId);
  const result = await productQuery.find();
  const products = result.items || [];
  const filterOptions = getFilterValues(products);
  // await new Promise((resolve) => setTimeout(resolve, 3000));
  return (
    <ProductsFilterForm filterOptions={filterOptions} name={name} />
  )
}

export default ProductsFilter;