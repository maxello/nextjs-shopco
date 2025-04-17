import React from 'react';
import { EmblaOptionsType } from 'embla-carousel';
import {
  PrevButton,
  NextButton,
  usePrevNextButtons
} from '@/components/ui/EmblaCarouselArrowButtons';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
type PropType = {
  slides: {
    name: string,
    text: string,
    rating: number,
  }[];
  options?: EmblaOptionsType;
}

const ReviewCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi);

  return (
    <section className="relative">
      <div className="flex justify-end items-center gap-1 mb-2 xl:mb-8 absolute -top-[60px] -right-[9px] xl:-top-[70px] z-[1]">
        <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
        <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
      </div>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex -ml-[1rem] touch-pan-y">
          {slides.map((elem, index) => (
            <div className="select-none transform-3d grow-0 shrink-0 basis-[100%] min-w-0 pl-[1rem] sm:basis-[50%] md:basis-[33.33%]" key={index}>
              <div className="border border-border rounded-2xl h-full p-5 lg:px-8 lg:py-6">
                { elem.rating && (
                  <div className="flex items-center gap-x-1.5 mb-2.5 lg:mb-4">
                    {[...Array(Math.floor(elem.rating))].map((e, i) => (
                      <Image key={i} className="select-none w-[1.25rem] lg:w-[1.4375rem] aspect-square" src={'/icons/star.svg'} width={23} height={23} alt="star" />
                    ))}
                    {elem.rating > Math.floor(elem.rating) && (
                      <Image className="select-none" src={'/icons/star-half.svg'} width={11} height={23} alt="half-star" />
                    )}
                  </div>
                )}
                <div className="flex items-center mb-2">
                  <strong className="text-primary block font-bold text-base lg:text-xl mr-1.5">{elem.name}</strong>
                  <Image className="select-none max-w-[1rem] md:max-w-full" src={'/icons/review-check.svg'} width={19} height={19} alt="check" />
                </div>
                <p className="text-md leading-[1.35]">{elem.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ReviewCarousel;
