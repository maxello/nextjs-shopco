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
  return (
    <>
      {products.length > 1 ? (
        <ProductsFilterForm filterOptions={filterOptions} name={name} />
      ) : null}
    </>
  )
}

export default ProductsFilter;