import { products } from "@wix/stores";
import Pagination from "@/components/ui/Pagination";
import ProductCard from "./ProductCard";
import { SearchParams } from "@/types";
import { getProducts } from "@/lib/store";

const ProductList = async ({
  categoryId,
  productsPerPage = 6,
  searchParams,
  cols = "default",
  isPaginated
}: {
  categoryId: string;
  productsPerPage?: number;
  cols?: "default" | "md";
  searchParams?: SearchParams,
  isPaginated?: boolean
}) => {

  const options = {
    categoryId,
    sortType: searchParams?.sortType,
    sortBy: searchParams?.sortBy,
    limit: productsPerPage,
    page: searchParams?.page,
    colors: searchParams?.colors,
    sizes: searchParams?.sizes,
    min: searchParams?.min,
    max: searchParams?.max
  }

  const {items: products, totalCount} = await getProducts(options);
  const totalPages = Math.ceil(totalCount / productsPerPage);
  
  const variants = {
    default: "md:grid-cols-4",
    md: "lg:grid-cols-3",
  }

  return (
    <div>
      { products?.length > 0 ? (
        <div className={`grid grid-cols-2 ${variants[cols]} gap-x-5 gap-y-9 mb-6 md:mb-9 max-w-[500px] md:max-w-full mx-auto`}>
          {products?.map((product: products.Product) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center py-10">
          No products found
        </div>
      )}
      {isPaginated && totalCount > productsPerPage && products.length > 0 ? (
        <Pagination totalPages={totalPages} />)
      : null}
      
    </div>
  );
};

export default ProductList;