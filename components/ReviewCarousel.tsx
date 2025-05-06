import React from 'react';
import { EmblaOptionsType } from 'embla-carousel';
import {
  PrevButton,
  NextButton,
  usePrevNextButtons
} from '@/components/ui/EmblaCarouselArrowButtons';
import useEmblaCarousel from 'embla-carousel-react';
import ReviewItem from './review/ReviewItem';
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
              <ReviewItem rating={elem.rating} text={elem.text} name={elem.name} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ReviewCarousel;
