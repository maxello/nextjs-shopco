import Image from 'next/image';
import React from 'react';

const ReviewItem = ({
  rating,
  name,
  text
}: {
  rating: number,
  name: string,
  text: string
}) => {
  return (
    <div className="border border-border rounded-2xl h-full p-5 lg:px-8 lg:py-6">
      { rating && (
        <div className="flex items-center gap-x-1.5 mb-2.5 lg:mb-4">
          {[...Array(Math.floor(rating))].map((e, i) => (
            <Image key={i} className="select-none w-[1.25rem] lg:w-[1.4375rem] aspect-square" src={'/icons/star.svg'} width={23} height={23} alt="star" />
          ))}
          {rating > Math.floor(rating) && (
            <Image className="select-none" src={'/icons/star-half.svg'} width={11} height={23} alt="half-star" />
          )}
        </div>
      )}
      <div className="flex items-center mb-2">
        <strong className="text-primary block font-bold text-base lg:text-xl mr-1.5">{name}</strong>
        <Image className="select-none max-w-[1rem] md:max-w-full" src={'/icons/review-check.svg'} width={19} height={19} alt="check" />
      </div>
      <p className="text-md leading-[1.35]">{text}</p>
    </div>
  )
}

export default ReviewItem;