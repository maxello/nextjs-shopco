// import { cva } from 'class-variance-authority';
import clsx from 'clsx';
import Image from 'next/image';
import React from 'react';

const ProductRating = ({
  rating,
  size = 'default',
  className,
  ...props
}: React.ComponentProps<"div"> & { 
  rating: number,
  size?: 'md' | 'default'
}) => {
  const ratingInteger = rating && Math.floor(rating);

  const fullStarSizeVariants = {
    md: 'w-5 h-5 lg:w-7 lg:h-7',
    default: 'w-4 h-4 lg:w-5 lg:h-5'
  }

  const halfStarSizeVariants = {
    md: 'w-2.5 h-5 lg:w-3.5 lg:h-7',
    default: 'w-2 h-4 lg:w-2.5 lg:h-5'
  }

  const textSizeVariants = {
    md: 'text-sm lg:text-base',
    default: 'text-sm'
  }

  return (
    <div className={clsx("flex items-center flex-wrap gap-1", textSizeVariants[size], className)} {...props}>
      {[...Array(ratingInteger)].map((e, i) => (
        <Image key={i} className={`${fullStarSizeVariants[size]} select-none`} src={'/icons/star.svg'} width={25} height={25} alt="star" />
      ))}
      {ratingInteger && rating > ratingInteger && (
        <Image className={`${halfStarSizeVariants[size]} select-none`} src={'/icons/star-half.svg'} width={12.5} height={25} alt="half-star" />
      )}
      <div className="ml-2"><span className="text-primary">{rating}/</span>5</div>
    </div>
  )
}

export default ProductRating;