import ProductList from "@/components/ProductList";
import { ProductListSkeleton } from "@/components/Skeletons";
import { Suspense } from "react";
import { wixClientServer } from "@/lib/wixClientServer";
import Filter from "@/components/Filter";
import { SearchParams } from "@/types";

const CollectionPage = async ({
  params,
  searchParams
}: {
  params: Promise<{ slug: string }>,
  searchParams?: Promise<SearchParams>;
}) => {
  const wixClient = await wixClientServer();
  const slug = (await params).slug;
  const searchP = await searchParams;
  const category = await wixClient.collections.getCollectionBySlug(slug);
  return (
    <>
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-[2rem] font-bold text-primary mb-1.5">{category?.collection?.name}</h1>
        <div>
          {/* Showing 1-10 of 100 Products */}
          Sort by: <Filter />
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
          <p className="text-destructive text-lg text-center">Something went wrong with collection.</p>
        </div>
      )}
    </>
  );
};

export default CollectionPage;