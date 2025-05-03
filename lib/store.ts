import { SearchParamsSortByProps, SearchParamsSortTypeProps } from "@/types";
import { wixClientServer } from "@/lib/wixClientServer";

type ProductOptionsProps = {
  categoryId: string;
  sortType?: SearchParamsSortTypeProps;
  sortBy?: SearchParamsSortByProps;
  limit?: number;
  page?: string;
  colors?: string;
  sizes?: string;
  max?: string;
  min?: string;
};

export const getCollectionBySlug = async (slug: string) => {
  const wixClient = await wixClientServer();
  return wixClient.collections.getCollectionBySlug(slug);
}

export const getProducts = async (options: ProductOptionsProps) => {
  const {
    categoryId,
    sortType = "descending",
    sortBy = "lastUpdated",
    limit = 0,
    page,
    colors,
    sizes,
    min,
    max
  } = options;
  const wixClient = await wixClientServer();
  try {
    const productQuery = wixClient.products
      .queryProducts()
      .eq("collectionIds", categoryId)
      .gt("priceData.price", min || 0)
      .le("priceData.price", max || 999999)

    const result = await productQuery[sortType](sortBy)
      // .limit(limit)
      // .skip(page ? (parseInt(page) - 1) * limit : 0)
      .find();

    /*  
      Unfortunatelly, there is no way to filter products by their options using wix studio functionality, including WIX REST API (V1). 
      V3 has this functionality according to documentation, but it is in early access at current moment and doesn't work properly.
      It's a temporary solution:
    */

    const colorsArr = colors?.length ? colors.split(",") : [];
    const sizesArr = sizes?.length ? sizes.split(",") : [];
    let products = result.items || [];
    
    products = products.filter((product) => {
      return product.variants?.some((option) => {
        const { variant, stock, choices } = option;
        const isColorMatch = colorsArr.length === 0 || choices?.Color && colorsArr.includes(choices.Color);
        const isSizeMatch = sizesArr.length === 0 || choices?.Size && sizesArr.includes(choices.Size);
        return stock?.inStock 
          && variant?.visible 
          && stock?.quantity 
          && stock.quantity > 0 
          && isColorMatch
          && isSizeMatch
      })
    });
    const from = page ? (parseInt(page) - 1) * limit : 0;
    const to = from + limit;
    const items = products.slice(from, to);
    return {
      items, 
      totalCount: products.length
    }
  } catch (e) {
    console.error(e);
    throw new Error("Failed to fetch Products.");
  }
};
