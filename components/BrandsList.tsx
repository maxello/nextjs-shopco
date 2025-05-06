import Image from 'next/image'
import React from 'react'
import { cn } from '@/lib/utils';

const BrandsList = ({ className }: {className?: string}) => {
  const brands = [
    {
      label: "Versace",
      src: "/images/brands/versace-2x.png",
      width: 167,
      height: 37
    },
    {
      label: "Zara",
      src: "/images/brands/zara-2x.png",
      width: 91,
      height: 38
    },
    {
      label: "Gucci",
      src: "/images/brands/gucci-2x.png",
      width: 156,
      height: 36
    },
    {
      label: "Prada",
      src: "/images/brands/prada-2x.png",
      width: 194,
      height: 32
    },
    {
      label: "Calvin Klein",
      src: "/images/brands/ck-2x.png",
      width: 207,
      height: 34
    },
  ]
  return (
    <div className={cn('bg-primary text-primary-foreground', className)}>
      <ul className="flex items-center justify-center lg:justify-between gap-6 container py-8 flex-wrap animate-move duration-1000">
        { brands?.map((brand) => (
          <li key={brand.label} className="h-[1.35rem] lg:h-[1.55rem] xl:h-[2rem] block max-w-full">
            <Image 
              className="select-none h-full w-auto" 
              src={brand.src} 
              width={brand.width} 
              height={brand.height} 
              alt={brand.label} 
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default BrandsList