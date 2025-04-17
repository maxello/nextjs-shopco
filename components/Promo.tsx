"use client";

import Image from 'next/image';
import React, { useState } from 'react';
import Button from './ui/Button';
import { motion } from "motion/react";
import AnimatedAmountNumber from './ui/AnimatedAmountNumber';
const Promo = () => {
  const [isPromoImageLoaded, setIsPromoImageLoaded] = useState(false);
  return (
    <div className="bg-promo-background">
      <div className="container grid md:grid-cols-2 items-center md:gap-6 overflow-hidden">
        <div className="py-7 md:py-5">
          <h1
            aria-label="Find clothes that matches your style"
            className="text-primary font-[family-name:var(--font-integralcf)] uppercase text-[2.25rem] sm:text-[3rem] sm:text-center md:text-left md:text-[2.5rem] xl:text-[4rem] leading-none mb-3 md:mb-6"
          >
            Find clothes that matches your style
          </h1>
          <p className="text-sm md:text-base mb-5 md:mb-6 sm:text-center md:text-left">Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.</p>
          <Button variant="default" className="mb-6 lg:mb-12 max-w-[358px] lg:max-w-[210px] sm:mx-auto md:mx-0">Shop Now</Button>
          <div className="flex justify-center flex-wrap lg:flex-nowrap gap-y-4 gap-x-14 lg:gap-x-16 lg:gap-y-0 max-w-[358px] sm:mx-auto md:mx-0 lg:max-w-full">
            <div className="lg:w-[33.33%] relative after:block after:w-[1px] after:absolute after:h-full after:bg-border after:top-0 after:-right-8">
              <AnimatedAmountNumber className="leading-[1.2] font-bold text-2xl md:text-3xl xl:text-[2.4rem] text-primary flex items-center" startValue={150} endValue={200} duration={1} text={'+'} />
              <p className="text-xs xl:text-[1rem]">International Brands</p>
            </div>
            <div className="lg:w-[33.33%] relative after:hidden lg:after:block after:w-[1px] after:absolute after:h-full after:bg-border after:top-0 after:-right-8">
              <AnimatedAmountNumber className="leading-[1.2] font-bold text-2xl md:text-3xl xl:text-[2.4rem] text-primary flex items-center" startValue={1500} endValue={2000} duration={1.5} text={'+'} />
              <p className="text-xs xl:text-[1rem]">High-Quality Products</p>
            </div>
            <div className="lg:w-[33.33%]">
              <AnimatedAmountNumber className="leading-[1.2] font-bold text-2xl md:text-3xl xl:text-[2.4rem] text-primary flex items-center" startValue={15000} endValue={30000} duration={2} text={'+'} />
              <p className="text-xs xl:text-[1rem]">Happy Customers</p>
            </div>
          </div>
        </div>
        <div className="h-full flex items-end">
          <div className="relative max-w-[358px] md:max-w-full mx-auto md:mx-0">
            {isPromoImageLoaded ? (
              <>
                <motion.div
                  className="absolute left-[3%] top-[30%] md:top-[45%]"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.4,
                    scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
                  }}>
                  <Image className="select-none max-w-[44px] lg:max-w-[55px] aspect-square" src={'/promo-decor.svg'} alt="" width={56} height={56} />
                </motion.div>
                <motion.div
                  className="absolute right-[-1%] top-[11%]"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.4,
                    scale: { type: "spring", visualDuration: 0.8, bounce: 0.5 },
                  }}>
                  <Image className="select-none max-w-[76px] lg:max-w-[104px] aspect-square" src={'/promo-decor.svg'} alt="" width={104} height={104} />
                </motion.div>
              </>
            ) : null}
            <div className="-mx-13 md:mx-0">
              <Image priority onLoadingComplete={() => setIsPromoImageLoaded(true)} className="select-none" src={'/images/promo-img.png'} alt="Find clothes that matches your style" width={672} height={663} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Promo;