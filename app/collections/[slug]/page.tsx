import ProductList from "@/components/product/ProductList";
import { ProductListSkeleton } from "@/components/Skeletons";
import { Suspense } from "react";
// import { wixClientServer } from "@/lib/wixClientServer";
import Filter from "@/components/Filter";
import { SearchParams } from "@/types";
import { getCollectionBySlug } from "@/lib/store";

const CollectionPage = async ({
  params,
  searchParams
}: {
  params: Promise<{ slug: string }>,
  searchParams?: Promise<SearchParams>;
}) => {
  // const wixClient = await wixClientServer();
  const slug = (await params).slug;
  const searchP = await searchParams;
  // const category = await wixClient.collections.getCollectionBySlug(slug);
  const category = await getCollectionBySlug(slug);
  
  return (
    <>
      <div className="md:flex justify-between items-center mb-4.5 md:mb-2">
        <h1 className="text-2xl xl:text-[2rem] font-bold text-primary mb-1.5 hidden md:block">{category?.collection?.name}</h1>
        <div className="xl:flex items-center gap-3">
          {/* <div>Showing 1-10 of {category.collection?.numberOfProducts} Products</div> */}
          <div className="flex items-center gap-2">Sort by: <Filter /></div>
        </div>
      </div>
      {category.collection?._id ? (
        <Suspense fallback={<ProductListSkeleton amount={6} cols={"md"} />} key={JSON.stringify(searchP)}>
          <ProductList
            categoryId={
              category.collection?._id
            }
            productsPerPage={6}
            searchParams={searchP}
            cols={"md"}
            isPaginated={true}
          />
        </Suspense>
      ) : (
        <div>
          <p className="text-destructive text-lg text-center">Something went wrong with the collection.</p>
        </div>
      )}
    </>
  );
};

export default CollectionPage;