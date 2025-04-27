import { SearchParamsSortByProps, SearchParamsSortTypeProps } from "@/types";
import { wixClientServer } from "@/lib/wixClientServer";

type ProductOptionsProps = {
  categoryId: string;
  sortType?: SearchParamsSortTypeProps;
  sortBy?: SearchParamsSortByProps;
  limit?: number;
  page?: string;
  // colors?: string;
  // sizes?: string;
};

export const getProducts = async (options: ProductOptionsProps) => {
  const {
    categoryId,
    sortType = "descending",
    sortBy = "lastUpdated",
    limit = 0,
    page,
  } = options;
  const wixClient = await wixClientServer();
  try {
    const productQuery = wixClient.products
      .queryProducts()
      .eq("collectionIds", categoryId);

    const result = productQuery[sortType](sortBy)
      .limit(limit)
      .skip(page ? (parseInt(page) - 1) * limit : 0)
      .find();
    return result;
  } catch (e) {
    console.error(e);
    throw new Error("Failed to fetch Products.");
  }
  // const data = await result;
  // const products = data.items || [];
  // const colors = "Blue,Green";
  // const color = colors.split(",");
  // let filteredProducts;
  //   if (color) {
  //     filteredProducts = products.filter(
  //     (product) => {
  //       return product.productOptions &&
  //       product.productOptions.Color &&
  //       product.productOptions.Color.choices.some((choice) => choice.description === color.includes(choice.description))
  //     }

  //   );
  // }
};
