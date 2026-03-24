"use client";

import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import background from "@/assets/sky-bg.png";
import SunnyDay from "@/assets/sunny-day.png";
import dynamic from "next/dynamic";
const Navbar = dynamic(() => import("@/components/Navbar"));
const Hero = dynamic(() => import("@/app/_components/Hero"));
const Hero2 = dynamic(() => import("../_components/Hero2"));
const Features = dynamic(() => import("../_components/Features"));
const Branding1 = dynamic(() => import("../_components/Branding1"));
const Faq = dynamic(() => import("@/app/_components/Faq"));
const Footer = dynamic(() => import("@/components/Footer"));
import Loader from "@/components/Loader";
import { useEffect } from "react";

let images = [background.src, SunnyDay.src];

export default function Home() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const [loaded, setLoaded] = useState(false);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  useEffect(() => {
    const loadAssets = async () => {
      await Promise.all(
        images.map((image) => {
          new Promise((resolve) => {
            const img = new Image();
            img.src = image;
            img.onload = resolve;
            return img;
          });
        })
      );
      setLoaded(true);
    };
    loadAssets();
  }, []);
  const [section, setSection] = useState(1);

  const totalSections = 6;

  // 🔥 Dynamic section detection
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const current = Math.min(
      totalSections,
      Math.max(1, Math.ceil(v * totalSections))
    );
    setSection(current);
  });

  return (
    <>
      {!loaded && <Loader />}
      <Navbar section={section} />
      <div ref={containerRef} className="relative">
        {/* 🔥 Sticky Background */}
        <div
          className={`sticky top-0 min-h-screen ${
            section === 5 || section === 6
              ? "overflow-y-auto"
              : "overflow-hidden"
          }`}
        >
          <AnimatePresence mode="sync">
            {section !== 5 && (
              <motion.img
                key={[3, 4].includes(section) ? "sunny" : "sky"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                src={[3, 4].includes(section) ? images[1] : images[0]}
                className="w-full h-full absolute inset-0 -z-10 object-cover"
                transition={{ duration: 1, ease: "easeInOut" }}
              />
            )}
          </AnimatePresence>

          <AnimatePresence mode="popLayout">
            <motion.div
              key={section}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="w-full h-full absolute inset-0"
            >
              {section === 1 && <Hero />}
              {section === 2 && <Hero2 />}
              {section === 3 && <Features />}
              {section === 4 && <Branding1 scrollProgress={scrollYProgress} />}
              {section === 5 && <Faq scrollProgress={scrollYProgress} />}
              {section === 6 && <Footer />}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 🔥 Real Sections (dynamic height) */}
        <section
          ref={(el) => (sectionRefs.current[0] = el) as any}
          className="min-h-[100vh]"
        />
        <section className="prevent min-h-[120vh]" ref={(el) => (sectionRefs.current[1] = el) as any} data-lenis-prevent data-lenis-prevent-touch/>
        <section
          ref={(el) => (sectionRefs.current[2] = el) as any}
          className="min-h-[130vh]"
        />
        <section
          ref={(el) => (sectionRefs.current[3] = el) as any}
          className="min-h-[130vh]"
        />
        <section
          ref={(el) => (sectionRefs.current[4] = el) as any}
          className="min-h-[430vh]"
        />
        <section
          ref={(el) => (sectionRefs.current[5] = el) as any}
          className="min-h-[160vh]"
        />
      </div>
    </>
  );
}
