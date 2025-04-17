"use client"

import { animate, motion, useMotionValue, useTransform } from "motion/react";
import { useEffect, useState } from "react"

export default function AnimatedAmountNumber({
  startValue = 0,
  endValue = 100,
  duration = 2,
  delay = 0,
  text,
  ...props
}: React.ComponentProps<"div"> & {
  startValue?: number,
  endValue?: number,
  duration?: number,
  delay?: number,
  text?: string
}) {
    const count = useMotionValue(startValue)
    const rounded = useTransform(() => Math.round(count.get()))
    const [isResolve, setIsResolve] = useState(false);
    useEffect(() => {
        const controls = animate(count, endValue, { duration, delay })
        controls.then(() => {
          setIsResolve(true);
        });
        return () => controls.stop()
    }, [count, duration, delay, endValue])

    return (
      <div {...props}>
        <motion.div>{rounded}</motion.div>
        {isResolve && text}
      </div>
    )
}
