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

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeout);
    };
  }, []);

    useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1, // Smoothness intensity
      duration: 0.8,
      easing: (t: number) => 1 - Math.pow(1 - t, 4), // Quartic easeOut
      wheelMultiplier: 1,
      touchMultiplier: 1,
      smoothWheel: true,
      prevent: (node)=>{
        return !!node.closest(".prevent");
      }
    });

    const MAX_DELTA = 80; // 👈 max pixels per scroll

    // Override wheel behavior
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();

      let delta = e.deltaY;

      // 🔥 Clamp the scroll amount
      if (delta > MAX_DELTA) delta = MAX_DELTA;
      if (delta < -MAX_DELTA) delta = -MAX_DELTA;

      lenis.scrollTo(lenis.scroll + delta, {
        immediate: true,
      });
    };

    window.addEventListener("wheel", onWheel);

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      window.removeEventListener("wheel", onWheel);
      lenis.destroy();
    };
  }, []);
  return <>{children}</>;
}