import BrandsList from "@/components/BrandsList";
import ProductList from "@/components/ProductList";
import CollectionsPromo from "@/components/CollectionsPromo";
import Promo from "@/components/Promo";
import Reviews from "@/components/Reviews";
import { Suspense } from "react";
import * as motion from "motion/react-client";
import Button from "@/components/ui/Button";
import { ProductListSkeleton } from "@/components/Skeletons";

export default function Home() {
  return (
    <>
      <Promo />
      <BrandsList className="lg:mb-3" />
      <div className="container">
        <motion.div
          className="py-10 md:py-12 xl:py-16"
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <h2 className="text-primary text-center font-[family-name:var(--font-integralcf)] uppercase text-[2rem] xl:text-[3rem] leading-[1.2] lg:leading-none mb-8 md:mb-10 xl:mb-15">New Arrivals</h2>
          <Suspense fallback={<ProductListSkeleton />}>
            <ProductList categoryId={process.env.NEW_ARRIVALS_CATEGORY_ID!} limit={4} />
          </Suspense>
          <Button className="max-w-[358px] lg:max-w-[210px] mx-auto" variant="outline">View All</Button>
        </motion.div>
        <div className="h-[1px] w-full bg-border"></div>
        <motion.div
          className="py-10 md:py-12 xl:py-16"
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <h2 className="text-primary text-center font-[family-name:var(--font-integralcf)] uppercase text-[2rem] xl:text-[3rem] leading-[1.2] lg:leading-none mb-8 md:mb-10 xl:mb-15">Top Selling</h2>
          <Suspense fallback={<ProductListSkeleton />}>
            <ProductList categoryId={process.env.TOP_SELLING_CATEGORY_ID!} limit={4} />
          </Suspense>
          <Button className="max-w-[358px] lg:max-w-[210px] mx-auto" variant="outline">View All</Button>
        </motion.div>
        <CollectionsPromo title={'Browse by Dress Style'} />
        <Reviews title={'Our Happy Customers'} />
      </div>
    </>
  );
}
