import { wixClientServer } from "@/lib/wixClientServer";
import { products } from "@wix/stores";
import Pagination from "@/components/ui/Pagination";
import ProductCard from "./ProductCard";

const PRODUCT_PER_PAGE = 8;

const ProductList = async ({
  categoryId,
  limit,
  searchParams,
}: {
  categoryId: string;
  limit?: number;
  searchParams?: { 
    name: string | undefined,
    type: string | undefined,
    min: string | undefined,
    max: string | undefined,
    page: string | undefined,
    sort: string | undefined,
    cat: string | undefined
   }
}) => {
  const wixClient = await wixClientServer();
  const productQuery = wixClient.products
    .queryProducts()
    .startsWith("name", searchParams?.name || "")
    .eq("collectionIds", categoryId)
    .hasSome(
      "productType",
      searchParams?.type ? [searchParams.type] : ["physical", "digital"]
    )
    .gt("priceData.price", searchParams?.min || 0)
    .lt("priceData.price", searchParams?.max || 999999)
    .limit(limit || PRODUCT_PER_PAGE)
    .skip(
      searchParams?.page
        ? parseInt(searchParams.page) * (limit || PRODUCT_PER_PAGE)
        : 0
    );

  // if (searchParams?.sort) {
  //   const [sortType, sortBy] = searchParams.sort.split(" ");

  //   if (sortType === "asc") {
  //     productQuery.ascending(sortBy);
  //   }
  //   if (sortType === "desc") {
  //     productQuery.descending(sortBy);
  //   }
  // }

  const res = await productQuery.find();
  const products = res.items;
  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-6 md:mb-9 max-w-[500px] md:max-w-full mx-auto">
        {products.map((product: products.Product) => (
          <ProductCard
            key={product._id}
            product={product}
          />
        ))}
      </div>
      {searchParams?.cat || searchParams?.name ? (
        <Pagination
          currentPage={res.currentPage || 0}
          hasPrev={res.hasPrev()}
          hasNext={res.hasNext()}
        />
      ) : null}
    </div>
  );
};

export default ProductList;