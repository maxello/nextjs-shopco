import { clsx, ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Product } from '@wix/auto_sdk_stores_products';
import { FilterProps } from "@/types";

const availabledSizeNames = ['xs', 's', 'm', 'l', 'xl', '2xl', '3xl', '4xl'];

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getFilterValues = (products: Product[]): FilterProps => {
  const filters: FilterProps = {
    price: {
      min: 0,
      max: 0
    },
    colors: [],
    sizes: []
  };
  for (const product of products) {
    const { productOptions = [], priceData } = product;
    console.log("product", product);
    if (product.stock?.quantity && product.stock?.quantity > 0) {
      for (const productOption of productOptions) {
        const { name, choices = [] } = productOption;

        const normalizedName = name?.toLowerCase();

        for (const choice of choices) {
          const { description, value } = choice;
          if (description && value) {
            if (normalizedName === "size" && !filters.sizes.some((item) => item.description === choice.description)) {
              filters.sizes.push({ description, value });
            }
            if (normalizedName === "color" && !filters.colors.some((item) => item.description === choice.description)) {
              filters.colors.push({ description, value })
            }
          }
        }
      }
    }
    if (priceData?.discountedPrice) {
      if (!filters.price.min) {
        filters.price.min = priceData.discountedPrice;
      }
      filters.price.min = Math.min(filters.price.min, priceData.discountedPrice);
      filters.price.max = Math.max(filters.price.max, priceData.discountedPrice);
    }
  }

  filters.sizes.sort((a, b) => {
    return availabledSizeNames.indexOf(a.value.toLowerCase()) - availabledSizeNames.indexOf(b.value.toLowerCase());
  });

  return filters;
}

export const generatePagination = (currentPage: number, totalPages: number) => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages];
  }

  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }

  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ];
};

export const splitPlus = (string: string = '', divider: string = '') => {
  const a = string.split(divider)
  if (a[0] == '' && a.length == 1) return [];
  return a;
 };