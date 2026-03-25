"use client";

import Lenis from "lenis";
import { useEffect } from "react";

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
    useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    const handleScroll = () => {
      clearTimeout(timeout);

      timeout = setTimeout(() => {
      }, 1000);
    };

    window.addEventListener("scroll", handleScroll,{passive: false});

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeout);
    };
  }, []);
    useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08, // smoothness
      duration: 1.2,
      smoothWheel: true,
      wheelMultiplier: 0.8,
      touchMultiplier: 1,
      easing: (t: number) => 1 - Math.pow(1 - t, 4),

      // 🔥 IMPORTANT: prevent logic
      prevent: (node) => {
        return !!node.closest("[data-lenis-prevent]");
      },
    });

    // expose globally (for dynamic updates)
    (window as any).lenis = lenis;

    // RAF loop
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // cleanup
    return () => {
      lenis.destroy();
    };
  }, []);
  return <>{children}</>;
}