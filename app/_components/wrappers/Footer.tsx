"use client";
import React, { useRef } from "react";
import Footer from "@/components/Footer";
export default function FooterWrapper({active}:{active: boolean}) {
  const ref = useRef(null);
  return (
    <section ref={ref} className="min-h-[101vh]">
      <div className="sticky top-0">
        <Footer />
      </div>
    </section>
  );
}
