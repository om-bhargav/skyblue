"use client";
import React, { useRef } from "react";
import background from "@/assets/sunny-day.png";
import Image from "next/image";
import { roxter, syne } from "@/utils/fonts";
import { motion, useInView } from "framer-motion";
import airoplane from "@/assets/airoplane.png";
import { SITE_NAME } from "@/lib/constants";
export default function Features() {
  return (
    <div className="h-screen flex items-center justify-center w-full relative overflow-hidden px-4 md:px-6 py-6">
      {/* Background */}
      <Image
        src={background.src}
        alt="Sky background"
        fill
        className="object-cover -z-10"
      />

      {/* Center Title */}
      <h1
        className={`absolute uppercase text-white text-sm sm:text-2xl md:text-3xl ${roxter.className}`}
      >
        {SITE_NAME}
      </h1>

      <h1
        className={`absolute uppercase [-webkit-text-stroke:1px_#ffffff] text-transparent text-sm sm:text-2xl md:text-3xl z-50 text-center ${roxter.className}`}
      >
        {SITE_NAME}
      </h1>

      {/* Airplane */}
      <motion.div
        initial={{ scale: 0, x: -40 }}
        whileInView={{ x: 0, scale: 1 }}
        transition={{ duration: 1}}
        viewport={{ once: true }}
        exit={{scale: 3, y: 100}}
        className="absolute"
      >
        <img
          src={airoplane.src}
          alt="Plane"
          className="h-20 w-20 sm:h-32 sm:w-32 md:h-40 md:w-40 rotate-180 rotate-y-180!"
        />
      </motion.div>
    </div>
  );
}
