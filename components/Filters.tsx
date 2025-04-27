import React from 'react';
import { wixClientServer } from '@/lib/wixClientServer';
import { getFilterValues } from '@/lib/utils';

import FiltersForm from './FiltersForm';

const Filters = async ({ categoryId }: { categoryId: string }) => {
  const wixClient = await wixClientServer();
  const productQuery = wixClient.products
    .queryProducts()
    .eq("collectionIds", categoryId);
  const result = await productQuery.find();
  const products = result.items;
  const filterOptions = getFilterValues(products);
  // await new Promise((resolve) => setTimeout(resolve, 3000));
  return (
    <FiltersForm filterOptions={filterOptions} />
  )
}

export default Filters;