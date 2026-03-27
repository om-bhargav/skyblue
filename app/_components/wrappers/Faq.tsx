"use client";
import React, { useRef } from "react";
import Faq from "../Faq";
import { AnimatePresence } from "framer-motion";
export default function Hero2Wrapper({active}: {active: boolean}) {
  const ref = useRef(null);
  return (
    <section ref={ref} className="min-h-[100vh]">
      <div className="sticky top-0">
          <Faq ref={ref} />
      </div>
    </section>
  );
}
