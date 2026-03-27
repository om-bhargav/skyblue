"use client";
import React from "react";
import Hero from "../Hero";
import { useRef } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import {motion} from "framer-motion";
export default function HeroWrapper({active}:{active: boolean}) {
  const ref = useRef(null);
  return (
    <section ref={ref} className="min-h-[101vh]">
      <div className="sticky top-0">
        <Hero />
      </div>
    </section>
  );
}
