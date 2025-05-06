"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence } from "motion/react";
import * as motion from "motion/react-client";
import { useState } from "react";
import { ReviewsList } from "@/lib/data";
import ReviewItem from "../review/ReviewItem";

const ReviewsTabContent = () => {
  return (
    <>
      <div className="flex">
        {/* Controls here */}
        <br />
      </div>
      <div className="grid grid-cols-1 gap-3 md:gap-5 md:grid-cols-2">
        {ReviewsList?.map((elem) => (
          <ReviewItem key={elem.name} rating={elem.rating} text={elem.text} name={elem.name} />
        ))}
      </div>
    </>
  )
}

const ProductDetailsTabContent = () => {
  return (
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus eaque deserunt itaque enim quibusdam adipisci beatae ullam, similique sapiente, in omnis distinctio iusto sit error laboriosam, aliquid maxime rem? Esse. Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus eaque deserunt itaque enim quibusdam adipisci beatae ullam, similique sapiente, in omnis distinctio iusto sit error laboriosam, aliquid maxime rem? Esse.</p>
  )
}

const FaqsTabContent = () => {
  return (
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus eaque deserunt itaque enim quibusdam adipisci beatae ullam, similique sapiente, in omnis distinctio iusto sit error laboriosam, aliquid maxime rem? Esse. Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus eaque deserunt itaque enim quibusdam adipisci beatae ullam, similique sapiente, in omnis distinctio iusto sit error laboriosam, aliquid maxime rem? Esse. Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus eaque deserunt itaque enim quibusdam adipisci beatae ullam, similique sapiente, in omnis distinctio iusto sit error laboriosam, aliquid maxime rem? Esse. Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus eaque deserunt itaque enim quibusdam adipisci beatae ullam, similique sapiente, in omnis distinctio iusto sit error laboriosam, aliquid maxime rem? Esse.</p>
  )
}

const tabsData = [
  { label: "Product Details", content: ProductDetailsTabContent },
  { label: "Rating & Reviews", content: ReviewsTabContent },
  { label: "FAQs", content: FaqsTabContent },
]

export default function ProductTabs() {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const Content = tabsData[selectedTabIndex].content;
  return (
    <div className="overflow-hidden flex flex-col w-full">
      <nav className="border-b border-border">
        <ul className="md:text-[1.25rem] flex w-full justify-around md:justify-center items-end">
          {tabsData.map((item, index) => (
            <li
              key={item.label}
              className={cn("text-center flex justify-center relative cursor-pointer md:w-full select-none py-4 px-1 md:px-6", index === selectedTabIndex ? "font-medium after:absolute after:h-[2px] after:w-full after:bg-primary after:-bottom-[1px] after:left-0" : "")}
              onClick={() => setSelectedTabIndex(index)}
            >
              {item.label}
            </li>
          ))}
        </ul>
      </nav>
      <div className="py-5">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedTabIndex}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Content />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
