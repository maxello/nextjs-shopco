import ProductDetails from "@/components/product/ProductDetails";
import { ProductDetailsSkeleton, ProductListSkeleton } from "@/components/Skeletons";
import { Suspense } from "react";
import * as motion from "motion/react-client";
import ProductList from "@/components/product/ProductList";
import ProductTabs from "@/components/product/ProductTabs";

const SinglePage = async ({
  params
}: {
  params: Promise<{ slug: string }>
}) => {
  const slug = (await params).slug;

  return (
    <div className="container py-6">
      <div className="mb-6 md:mb-12">
        <Suspense fallback={<ProductDetailsSkeleton />}>
          <ProductDetails slug={slug} />
        </Suspense>
      </div>
      <ProductTabs />
      <motion.div
          className="py-6 md:py-10"
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <h2 className="text-primary text-center font-[family-name:var(--font-integralcf)] uppercase text-[2rem] xl:text-[3rem] leading-[1.2] lg:leading-none mb-8 md:mb-10 xl:mb-15">You might also like</h2>
          <Suspense fallback={<ProductListSkeleton />}>
            <ProductList 
              categoryId={process.env.TOP_SELLING_CATEGORY_ID!} 
              productsPerPage={4}
            />
          </Suspense>
        </motion.div>
    </div>
  );
};

export default SinglePage;