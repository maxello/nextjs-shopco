"use client";

import React from "react";
import { EmblaOptionsType } from 'embla-carousel';
import ReviewCarousel from "./ReviewCarousel";
import * as motion from "motion/react-client";
import { ReviewsList } from "@/lib/data";

const Reviews = ({
  title
}: {
  title: string
}) => {
  const OPTIONS: EmblaOptionsType = {
    slidesToScroll: 1, 
    loop: true,
    align: 'start'
  }

  return (
    <motion.div 
      className="py-12 md:py-11 lg:mb-9"
      initial={{ y: 100, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <h2 className="text-primary font-[family-name:var(--font-integralcf)] uppercase text-[2rem] xl:text-[3rem] leading-[1.2] lg:leading-none mb-6 xl:mb-11">{title}</h2>
      <ReviewCarousel slides={ReviewsList} options={OPTIONS} />
    </motion.div>
  )
}

export default Reviews;