"use client";

import React, { useState } from 'react'
import { motion, AnimatePresence } from "motion/react";
import { ChevronUp } from 'lucide-react';

const Accordion = ({ 
  label, 
  isOpened = false,
  children 
}: {
  label: string, 
  isOpened?: boolean, 
  children: React.ReactElement
}) => {
  const [expanded, setExpanded] = useState(isOpened);

  return (
    <div className="relative after:w-full first:after:h-0 after:h-[1px] after:absolute after:-top-4 after:bg-border">
      <motion.button
        initial={false}
        onClick={() => setExpanded((prev) => !prev)}
        className="py-2 cursor-pointer flex w-full text-lg text-primary font-bold justify-between items-center"
      >
        {label}
        <ChevronUp size={20} className={`transition-transform ${expanded && "rotate-180"}`} />
      </motion.button>
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.section
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 }
            }}
            transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden"
          >
            <div className="py-3">
              {children}
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Accordion