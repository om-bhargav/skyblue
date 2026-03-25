"use client";
import {motion} from "framer-motion";
import { roxter,syne } from "@/utils/fonts";


import { Skeleton } from "@/components/ui/skeleton";

export function FeatureCardSkeleton({ index }: { index: number }) {
  return (
    <div className="flex flex-col justify-center items-center md:items-start space-y-3 md:space-y-5 w-full">
      
      {/* Title */}
      <Skeleton className="h-6 w-[60%] md:w-[40%] rounded-md" />

      {/* Divider line */}
      <Skeleton className="h-[1.5px] w-[80px] rounded-md" />

      {/* Description lines */}
      <div className="space-y-2 w-full flex flex-col items-center md:items-start">
        <Skeleton className="h-4 w-full md:w-[90%] rounded-md" />
        <Skeleton className="h-4 w-[90%] md:w-[80%] rounded-md" />
        <Skeleton className="h-4 w-[80%] md:w-[70%] rounded-md" />
      </div>
    </div>
  );
}

export function FeatureCard({
  feature,
  index,
}: {
  index: number;
  feature: { title: string; description: string };
}) {
  return (
    <motion.div
      className="flex flex-col z-100 justify-center tracking-wide! items-center md:items-start space-y-3 md:space-y-5 w-full"
      initial={{ x: -200 }}
      whileInView={{ x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.4, ease: "easeInOut" }}
      whileHover={{ scale: 1.03 }}
    >
      <motion.div
        className={`text-background font-bold text-lg sm:text-xl ${roxter.className}`}
        initial={{ opacity: 0, x: index % 2 ? 10 : -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ delay: 1 }}
        viewport={{ once: true }}
      >
        {feature.title}
      </motion.div>

      <motion.div
        className="h-[1.5px] bg-white"
        style={{ width: "80px" }}
        initial={{ opacity: 0, width: 0 }}
        whileInView={{ opacity: 1, width: 80 }}
        transition={{ delay: 1, duration: 0.5 }}
        viewport={{ once: true }}
      />

      <motion.div
        className={`text-background line-clamp-5 max-md:text-center text-xs sm:text-base md:text-lg font-thin ${syne.className}`}
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ delay: 1 }}
        viewport={{ once: true }}
      >
        {feature.description}
      </motion.div>
    </motion.div>
  );
}