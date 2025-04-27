"use client";

import React, { useState, useEffect, useCallback } from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import Image from "next/image";
import { cn } from '@/lib/utils';

type PropType = {
  slides: string[]
  options?: EmblaOptionsType
}

const ProductImagesCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props;
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel(options)

  const [selectedThumbsIndex, setSelectedThumbsIndex] = useState(0);

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaThumbsApi) return
      setSelectedThumbsIndex(index);
    },
    [emblaThumbsApi]
  )

  const [isGrabbing, setIsGrabbing] = useState(false);

  const onPointerChange = useCallback((flag: boolean) => {
    if (!emblaThumbsApi) return
    setIsGrabbing(flag);
  }, [emblaThumbsApi, setIsGrabbing])

  useEffect(() => {
    if (!emblaThumbsApi) return;
    emblaThumbsApi.on('pointerDown', () => onPointerChange(true));
    emblaThumbsApi.on('pointerUp', () => onPointerChange(false));
  }, [emblaThumbsApi, onPointerChange])
  
  return (
    <div className="max-w-[500px] md:max-w-[550px] lg:max-w-full flex flex-col md:flex-row gap-[0.8rem] md:-mt-[0.8rem]">
      <div className="grow border rounded-2xl bg-secondary border-transparent h-[290px] md:h-[530px] md:mt-[0.8rem] md:order-2">
        <Image className="rounded-2xl pointer-events-none select-none object-cover h-full" src={slides[selectedThumbsIndex]} width={700} height={700} alt="" />
      </div>
      <div className="min-w-[111px] md:min-w-[152px] overflow-hidden" ref={emblaThumbsRef}>
        <div className="md:h-full touch-pan-y md:touch-pan-x flex flex-row md:flex-col -ml-[0.8rem] md:ml-0">
          {slides.map((src, index) => (
            <div
              key={index}
              className="transform-3d pl-[0.8rem] md:pl-0 md:pt-[0.8rem] min-w-0 grow-0 shrink-0 h-[106px] md:h-[33.33%] basis-[33.33%]"
            >
              <button
                onClick={() => onThumbClick(index)}
                type="button"
                className={cn("relative rounded-2xl bg-secondary border w-full h-full", index === selectedThumbsIndex ? "border-primary" : "border-transparent", isGrabbing ? "cursor-grabbing" : "cursor-grab")}
              >
                <Image className="top-0 rounded-2xl bottom-0 left-0 right-0 absolute select-none object-cover h-full" src={src} width={200} height={200} alt="" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProductImagesCarousel;
