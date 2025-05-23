"use client";

import clsx from "clsx";
import { motion } from "framer-motion";
import React, { useMemo, type JSX, useState, useEffect } from "react";

export type ShimmerProps = {
  children: string;
  as?: React.ElementType;
  className?: string;
  duration?: number;
  spread?: number;
};

export function Shimmer({
  children,
  as: Component = "p",
  className,
  duration = 2,
  spread = 2,
}: ShimmerProps) {
  const MotionComponent = motion.create(
    Component as keyof JSX.IntrinsicElements
  );

  const dynamicSpread = useMemo(() => {
    return children.length * spread;
  }, [children, spread]);

  return (
    <MotionComponent
      className={clsx(
        "relative inline-block bg-[length:250%_100%,auto] bg-clip-text",
        "text-transparent [--base-color:#a1a1aa] [--base-gradient-color:#000]",
        "[--bg:linear-gradient(90deg,#0000_calc(50%-var(--spread)),var(--base-gradient-color),#0000_calc(50%+var(--spread)))] [background-repeat:no-repeat,padding-box]",
        "dark:[--base-color:#71717a] dark:[--base-gradient-color:#ffffff] dark:[--bg:linear-gradient(90deg,#0000_calc(50%-var(--spread)),var(--base-gradient-color),#0000_calc(50%+var(--spread)))]",
        className
      )}
      initial={{ backgroundPosition: "100% center" }}
      animate={{ backgroundPosition: "0% center" }}
      transition={{
        repeat: Infinity,
        duration,
        ease: "linear",
      }}
      style={
        {
          "--spread": `${dynamicSpread}px`,
          backgroundImage: `var(--bg), linear-gradient(var(--base-color), var(--base-color))`,
        } as React.CSSProperties
      }
    >
      {children}
    </MotionComponent>
  );
}

const loadingTexts = [
  {
    title: "Collecting Data...",
    subtitle: "Pulling in the latest information to get started.",
  },
  {
    title: "Analyzing Signals...",
    subtitle: "Looking for patterns and meaningful connections.",
  },
  {
    title: "Composing Response...",
    subtitle: "Organizing what we've learned into a clear output.",
  },
  {
    title: "Finalizing Output...",
    subtitle: "Getting everything ready for display.",
  },
];

export const Loader = () => {
  const [loadingTextIndex, setLoadingTextIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setLoadingTextIndex((prev) => (prev + 1) % loadingTexts.length);
    }, 2500);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap">
      <Shimmer as="h1" className="text-2xl font-medium">
        {loadingTexts[loadingTextIndex].title}
      </Shimmer>
      <p className="text-secondary">
        {loadingTexts[loadingTextIndex].subtitle}
      </p>
    </div>
  );
};
