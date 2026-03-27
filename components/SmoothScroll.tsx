"use client";

import Lenis from "lenis";
import { useEffect } from "react";

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {

  //   useEffect(() => {
  //   const lenis = new Lenis({
  //     lerp: 0.05, // smoothness
  //     duration: 0.1,
  //     smoothWheel: true,
  //     wheelMultiplier: 0.5,
  //     touchMultiplier: 0.6,
  //     easing: (t: number) => 1 - Math.pow(1 - t, 4),

  //     // 🔥 IMPORTANT: prevent logic
  //     prevent: (node) => {
  //       return !!node.closest("[data-lenis-prevent]");
  //     },
  //   });

  //   // expose globally (for dynamic updates)
  //   (window as any).lenis = lenis;

  //   // RAF loop
  //   function raf(time: number) {
  //     lenis.raf(time);
  //     requestAnimationFrame(raf);
  //   }

  //   requestAnimationFrame(raf);

  //   // cleanup
  //   return () => {
  //     lenis.destroy();
  //   };
  // }, []);
  return <>{children}</>;
}