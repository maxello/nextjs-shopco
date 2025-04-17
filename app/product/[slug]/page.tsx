import ProductDetails from "@/components/product/ProductDetails";
import { ProductDetailsSkeleton } from "@/components/Skeletons";
import { Suspense } from "react";

const SinglePage = async ({
  params
}: {
  params: Promise<{ slug: string }>
}) => {
  const slug = (await params).slug;

  return (
    <div className="container py-6">
      <Suspense fallback={<ProductDetailsSkeleton />}>
        <ProductDetails slug={slug} />
      </Suspense>
    </div>
  );
};

export default SinglePage;