"use client";
import React from "react";
import Features from "../Features";
import { useRef } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";

export default function FeaturesWrapper({active}:{active: boolean}) {
  const ref = useRef(null);
  return (
    <section ref={ref} className="min-h-[100vh]">
      <div className="sticky top-0">
        <Features/>
      </div>
    </section>
  );
}
