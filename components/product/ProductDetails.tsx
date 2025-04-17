import React from 'react';
import Breadcrumbs from "@/components/Breadcrumbs";
// import AddToCart from "@/components/AddToCart";
import CustomizeProducts from "@/components/CustomizeProducts";
// import ProductImages from "@/components/ProductImages";
// import Reviews from "@/components/Reviews";
import { wixClientServer } from "@/lib/wixClientServer";
import { notFound } from "next/navigation";
// import { Suspense } from "react";
import DOMPurify from "isomorphic-dompurify";

import AddToCart from "@/components/cart/AddToCart";
import ProductPrice from "@/components/product/ProductPrice";
import ProductRating from "@/components/product/ProductRating";
import ProductImagesCarousel from "@/components/product/ProductImagesCarousel";
import { EmblaOptionsType } from 'embla-carousel';

const ProductDetails = async ({ slug }: { slug: string }) => {
  const wixClient = await wixClientServer();
  const products = await wixClient.products
    .queryProducts()
    .eq("slug", slug)
    .find();

  if (!products.items[0]) {
    return notFound();
  }

  const product = products.items[0];
  console.log("------", product);

  const OPTIONS: EmblaOptionsType = {
    containScroll: 'keepSnaps',
    // dragFree: true,
    // axis: 'y',
    breakpoints: {
      '(min-width: 768px)': { axis: 'y' }
    }
  }
  // const SLIDES = Array.from(Array(SLIDE_COUNT).keys())
  const SLIDES = product.media?.items?.map((item) => {
    return item?.image?.url;
  }).filter((item) => item !== undefined) || [];

  const breadcrumbs = [
    {
      label: 'Home',
      href: '/'
    },
    {
      label: product.name || "..."
    },
  ]

  return (
    <>
      <Breadcrumbs className="mb-6 md:mb-7" breadcrumbs={breadcrumbs} />
      <div className="relative flex flex-col lg:flex-row gap-10">
        <div className="w-full lg:w-1/2 lg:sticky lg:top-[132px] h-max lg:pt-1">
          <ProductImagesCarousel slides={SLIDES} options={OPTIONS} />
        </div>
        <div className="w-full lg:w-1/2 flex flex-col">
          <h2 className="text-primary font-[family-name:var(--font-integralcf)] uppercase text-[1.8rem] xl:text-[2.5rem] leading-[1.2] lg:leading-none mb-3 md:mb-4">{product.name}</h2>
          <ProductRating size={'md'} rating={4.5} className="mb-3" />
          <ProductPrice
            price={product.priceData?.price}
            discountedPrice={product.priceData?.discountedPrice}
            discountType={product.discount?.type}
            discountValue={product.discount?.value}
            className="mb-3"
            size={'md'}
          />
          {product.description && (
            <div
              className="mb-4"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(
                  product.description
                ),
              }}
            ></div>
          )}
          {product.variants && product.productOptions ? (
            <CustomizeProducts
              productId={product._id!}
              variants={product.variants}
              productOptions={product.productOptions}
            />
          ) : (
            <AddToCart
              productId={product._id!}
              variantId=""
              stockNumber={product.stock?.quantity || 0}
            />
          )}
          {/* <Suspense fallback="Loading...">
              <Reviews productId={product._id!} />
            </Suspense> */}
        </div>
      </div>
    </>
  )
}

export default ProductDetails;