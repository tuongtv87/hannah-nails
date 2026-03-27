"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type AnimatedInViewProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function AnimatedInView({ children, className, delay = 0 }: AnimatedInViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 42, scale: 0.96, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
