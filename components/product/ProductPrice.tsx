import { cn } from '@/lib/utils';
import React from 'react';

const ProductPrice = ({
  price,
  formattedPrice,
  formattedDiscountedPrice,
  discountedPrice,
  discountType,
  discountValue,
  className,
  size = 'default',
  ...props
}: 
  React.ComponentProps<"div"> & { 
  price: number | undefined | null,
  formattedPrice?: string | undefined,
  formattedDiscountedPrice?: string | undefined,
  discountedPrice: number | undefined | null,
  discountType: string | undefined,
  discountValue: number | undefined,
  size?: 'md' | 'default'
}) => {
  if (!price) {
    return null;
  }

  const sizeVariants = {
    md: "text-[2rem]",
    default: "text-[1.25rem] lg:text-2xl"
  }

  const sizeBadgeVariants = {
    md: "text-xs lg:text-base py-1 px-2 lg:py-1.5 lg:px-4",
    default: "text-[0.625rem] lg:text-xs py-1 px-2 lg:py-1.5 lg:px-4"
  }

  return (
    <div className={cn("flex flex-wrap items-center gap-1.5 lg:gap-2.5", sizeVariants[size], className)} {...props}>
      {price === discountedPrice ? (
        <span className="text-primary font-bold">{formattedPrice || `$${price}`}</span>
      ) : (
        <>
          <span className="text-primary font-bold">{formattedDiscountedPrice || `$${discountedPrice}`}</span>
          <span className="line-through decoration-[0.1rem] text-foreground/40 font-bold">{formattedPrice || `$${price}`}</span>
          {discountType === "PERCENT" && (
            <span className={cn("font-medium text-destructive rounded-full bg-destructive/10", sizeBadgeVariants[size])}>-{discountValue}%</span>
          )}
        </>
      )}
    </div>
  )
}

export default ProductPrice;