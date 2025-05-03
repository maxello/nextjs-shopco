import BrandsList from "@/components/BrandsList";
import ProductList from "@/components/ProductList";
import CollectionsPromo from "@/components/CollectionsPromo";
import Promo from "@/components/Promo";
import Reviews from "@/components/Reviews";
import { Suspense } from "react";
import * as motion from "motion/react-client";
import { ProductListSkeleton } from "@/components/Skeletons";
import Link from "next/link";

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
            <ProductList categoryId={process.env.NEW_ARRIVALS_CATEGORY_ID!} productsPerPage={4} />
          </Suspense>
          <Link href={'/collections/all-products?sortType=descending&sortBy=lastUpdated'} className="max-w-[358px] lg:max-w-[210px] h-13 px-5 mx-auto w-full text-base flex justify-center items-center focus:outline-none disabled:text-white disabled:bg-gray-300 disabled:border-gray-300 cursor-pointer disabled:cursor-not-allowed font-medium rounded-full [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 transition text-primary border border-border bg-primary-foreground hover:bg-background-light active:bg-background-light active:border-border">View All</Link>
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
            <ProductList 
              categoryId={process.env.TOP_SELLING_CATEGORY_ID!} 
              productsPerPage={4}
            />
          </Suspense>
          <Link href={'/collections/top-selling'} className="max-w-[358px] lg:max-w-[210px] h-13 px-5 mx-auto w-full text-base flex justify-center items-center focus:outline-none disabled:text-white disabled:bg-gray-300 disabled:border-gray-300 cursor-pointer disabled:cursor-not-allowed font-medium rounded-full [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 transition text-primary border border-border bg-primary-foreground hover:bg-background-light active:bg-background-light active:border-border">View All</Link>
        </motion.div>
        <CollectionsPromo title={'Browse by Dress Style'} />
        <Reviews title={'Our Happy Customers'} />
      </div>
    </>
  );
}
