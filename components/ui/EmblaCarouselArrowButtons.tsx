import React, {
  ComponentPropsWithRef,
  useCallback,
  useEffect,
  useState
} from 'react';
import { EmblaCarouselType } from 'embla-carousel';

type UsePrevNextButtonsType = {
  prevBtnDisabled: boolean
  nextBtnDisabled: boolean
  onPrevButtonClick: () => void
  onNextButtonClick: () => void
}

export const usePrevNextButtons = (
  emblaApi: EmblaCarouselType | undefined
): UsePrevNextButtonsType => {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true)
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true)

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return
    emblaApi.scrollPrev()
  }, [emblaApi])

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return
    emblaApi.scrollNext()
  }, [emblaApi])

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev())
    setNextBtnDisabled(!emblaApi.canScrollNext())
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    onSelect(emblaApi)
    emblaApi.on('reInit', onSelect).on('select', onSelect)
  }, [emblaApi, onSelect])

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  }
}

type PropType = ComponentPropsWithRef<'button'>

export const PrevButton: React.FC<PropType> = (props) => {
  const { children, ...restProps } = props

  return (
    <button
      className="w-[40px] aspect-square flex items-center justify-center cursor-pointer disabled:cursor-auto disabled:opacity-30"
      type="button"
      {...restProps}
    >
      <svg width="20" height="16" viewBox="0 0 20 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.70406 0.454104L0.954061 7.2041C0.849182 7.30862 0.765966 7.43281 0.709186 7.56956C0.652405 7.7063 0.623175 7.85291 0.623175 8.00098C0.623175 8.14904 0.652405 8.29565 0.709186 8.4324C0.765966 8.56915 0.849182 8.69334 0.954061 8.79785L7.70406 15.5479C7.91541 15.7592 8.20205 15.8779 8.50094 15.8779C8.79982 15.8779 9.08647 15.7592 9.29781 15.5479C9.50916 15.3365 9.62789 15.0499 9.62789 14.751C9.62789 14.4521 9.50916 14.1654 9.29781 13.9541L4.46875 9.12504L18.25 9.12504C18.5484 9.12504 18.8345 9.00651 19.0455 8.79554C19.2565 8.58456 19.375 8.29841 19.375 8.00004C19.375 7.70167 19.2565 7.41552 19.0455 7.20455C18.8345 6.99357 18.5484 6.87504 18.25 6.87504L4.46875 6.87504L9.29875 2.04598C9.51009 1.83463 9.62883 1.54799 9.62883 1.2491C9.62883 0.950218 9.51009 0.663574 9.29875 0.45223C9.08741 0.240885 8.80076 0.122151 8.50187 0.122151C8.20299 0.122151 7.91634 0.240885 7.705 0.45223L7.70406 0.454104Z" fill="black"/>
      </svg>
      {children}
    </button>
  )
}

export const NextButton: React.FC<PropType> = (props) => {
  const { children, ...restProps } = props

  return (
    <button
      className="w-[40px] aspect-square flex items-center justify-center cursor-pointer disabled:cursor-auto disabled:opacity-30"
      type="button"
      {...restProps}
    >
      <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.2959 0.454104L19.0459 7.2041C19.1508 7.30862 19.234 7.43281 19.2908 7.56956C19.3476 7.7063 19.3768 7.85291 19.3768 8.00098C19.3768 8.14904 19.3476 8.29565 19.2908 8.4324C19.234 8.56915 19.1508 8.69334 19.0459 8.79785L12.2959 15.5479C12.0846 15.7592 11.7979 15.8779 11.4991 15.8779C11.2002 15.8779 10.9135 15.7592 10.7022 15.5479C10.4908 15.3365 10.3721 15.0499 10.3721 14.751C10.3721 14.4521 10.4908 14.1654 10.7022 13.9541L15.5313 9.12504L1.75 9.12504C1.45163 9.12504 1.16548 9.00651 0.954505 8.79554C0.743527 8.58456 0.625 8.29841 0.625 8.00004C0.625 7.70167 0.743527 7.41552 0.954505 7.20455C1.16548 6.99357 1.45163 6.87504 1.75 6.87504L15.5313 6.87504L10.7013 2.04598C10.4899 1.83463 10.3712 1.54799 10.3712 1.2491C10.3712 0.950218 10.4899 0.663574 10.7013 0.45223C10.9126 0.240885 11.1992 0.122151 11.4981 0.122151C11.797 0.122151 12.0837 0.240885 12.295 0.45223L12.2959 0.454104Z" fill="black"/>
      </svg>
      {children}
    </button>
  )
}
