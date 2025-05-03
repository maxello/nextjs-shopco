import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { products } from "@wix/stores";
import ProductPrice from './product/ProductPrice';
import ProductRating from './product/ProductRating';

const ProductCard = ({
  product
}: {
  product: products.Product
}) => {
  return (
    <Link href={`/product/${product.slug}`} className="flex flex-col">
      <div className="aspect-square rounded-2xl bg-secondary mb-2 lg:mb-3.5">
        <div className="w-full h-full overflow-hidden relative rounded-2xl">
          <Image className="w-full h-full absolute object-cover z-1 hover:opacity-0 transition-opacity easy duration-500" src={product.media?.mainMedia?.image?.url || "/images/product.png"} alt={product?.name || "Product image"} width={300} height={300} />
          {product.media?.items && (
            <Image
              src={product.media?.items[1]?.image?.url || "/images/product.png"}
              alt={product?.name || "Product image"}
              fill
              className="absolute object-cover rounded-md"
            />
          )}
        </div>
      </div>
      <div className="flex flex-col justify-between h-full">
        <div>
          <h3 className="text-primary font-bold text-base lg:text-[1.25rem] lg:mb-1.5">{product.name}</h3>
          <ProductRating rating={4.5} className="mb-1 lg:mb-2" />
        </div>
        <ProductPrice 
          price={product.priceData?.price}
          // formattedPrice={product.priceData?.formatted?.price}
          discountedPrice={product.priceData?.discountedPrice}
          // formattedDiscountedPrice={product.priceData?.formatted?.discountedPrice}
          discountType={product.discount?.type}
          discountValue={product.discount?.value}
        />
      </div>
    </Link>
  )
}

export default ProductCard;