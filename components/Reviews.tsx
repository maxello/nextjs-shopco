"use client";

import React from "react";
import { EmblaOptionsType } from 'embla-carousel';
import ReviewCarousel from "./ReviewCarousel";
// import { motion } from "motion/react";
import * as motion from "motion/react-client";
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
  const SLIDES = [
    {
      name: "Sarah M.",
      text: "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.",
      rating: 4.5
    },
    {
      name: "Alex K.",
      text: "Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions.",
      rating: 5
    },
    {
      name: "James L.",
      text: "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends.",
      rating: 5
    },
    {
      name: "Ava H.",
      text: "I'm not just wearing a t-shirt; I'm wearing a piece of design philosophy. The intricate details and thoughtful layout of the design make this shirt a conversation starter.",
      rating: 5
    },
    {
      name: "Olivia P.",
      text: "As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles but also feels great to wear. It's evident that the designer poured their creativity into making this t-shirt stand out.",
      rating: 5
    },
    {
      name: "Liam K.",
      text: "This t-shirt is a fusion of comfort and creativity. The fabric is soft, and the design speaks volumes about the designer's skill. It's like wearing a piece of art that reflects my passion for both design and fashion.",
      rating: 5
    },
  ]
  return (
    <motion.div 
      className="py-12 md:py-11 lg:mb-9"
      initial={{ y: 100, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <h2 className="text-primary font-[family-name:var(--font-integralcf)] uppercase text-[2rem] xl:text-[3rem] leading-[1.2] lg:leading-none mb-6 xl:mb-11">{title}</h2>
      <ReviewCarousel slides={SLIDES} options={OPTIONS} />
    </motion.div>
  )
}

export default Reviews;