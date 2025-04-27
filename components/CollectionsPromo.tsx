import { cn } from '@/lib/utils';
import React from 'react';

const CollectionsPromo = ({
  title
} : {
  title: string
}) => {
  const collections = [
    {
      label: "Casual",
      src: "/images/collection-img-1.png",
      href: "/"
    },
    {
      label: "Formal",
      src: "/images/collection-img-2.png",
      href: "/"
    },
    {
      label: "Party",
      src: "/images/collection-img-3.png",
      href: "/"
    },
    {
      label: "Gym",
      src: "/images/collection-img-4.png",
      href: "/"
    }
  ]
  return (
    <div className="bg-input rounded-2xl md:rounded-[2.25rem] mt-2.5 xl:mt-0 pt-10 pb-7 px-6 xl:py-19 xl:px-16 lg:mb-6 xl:mb-10">
      <h2 className="text-primary text-center font-[family-name:var(--font-integralcf)] uppercase text-[2rem] xl:text-[3rem] leading-[1.2] lg:leading-none mb-7 lg:mb-10 xl:mb-17">{title}</h2>
      <div className="grid md:grid-cols-24 gap-4 lg:gap-5">
        { collections?.map((item, i) => (
          <a 
            href={item.href}
            key={item.label} 
            className={cn(i % 5 === 0 || i % 5 === 3 ? 'lg:col-span-9' : 'lg:col-span-15', 'block bg-background bg-right-bottom md:bg-center lg:bg-right-bottom bg-no-repeat md:col-span-12 p-5 md:py-5 md:px-9 rounded-2xl h-[190px] md:h-[289px]')}
            style={{
              backgroundImage: `url(${item.src})`,
              backgroundSize: 'cover',
              backgroundPositionX: '40%'
            }}
          >
            <h3 className="text-primary text-2xl lg:text-3xl xl:text-4xl font-bold">{item.label}</h3>
          </a>
        ))}
      </div>
    </div>
  )
}

export default CollectionsPromo;