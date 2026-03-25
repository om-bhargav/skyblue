"use client";

import airoplane from "@/assets/airoplane.png";
import cloud from "@/assets/cloud.png";
import PlaneWindow from "@/assets/plane-window.png";
import plane from "@/assets/plane.png";
import background from "@/assets/sky-bg.png";
import SunnyDay from "@/assets/sunny-day.png";
import Loader from "@/components/Loader";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import CTAButton from "@/components/CTAButton";
const Navbar = dynamic(() => import("@/components/Navbar"));
const Hero = dynamic(() => import("@/app/_components/Hero"));
const Hero2 = dynamic(() => import("../_components/Hero2"));
const Features = dynamic(() => import("../_components/Features"));
const Branding1 = dynamic(() => import("../_components/Branding1"));
const Faq = dynamic(() => import("@/app/_components/Faq"));
const Footer = dynamic(() => import("@/components/Footer"));

let images = [
  background.src,
  SunnyDay.src,
  cloud.src,
  PlaneWindow.src,
  airoplane.src,
  "https://picsum.photos/1080/1080",
  plane.src,
];

export default function Home() {
  const heroRef = useRef<HTMLElement | null>(null);
  const hero2Ref = useRef<HTMLElement | null>(null);
  const featuresRef = useRef<HTMLElement | null>(null);
  const brandingRef = useRef<HTMLElement | null>(null);
  const faqRef = useRef<HTMLElement | null>(null);
  const footerRef = useRef<HTMLElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sectionRefs = [
    heroRef,
    hero2Ref,
    featuresRef,
    brandingRef,
    faqRef,
    footerRef,
  ];
  const [loaded, setLoaded] = useState(false);
  const { scrollY } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  useEffect(() => {
    const loadAssets = async () => {
      await Promise.all(
        images.map((image) => {
          return new Promise<void>((resolve, reject) => {
            const img = new Image();
            img.src = image;

            img.onload = () => resolve();
            img.onerror = () => reject(); // good practice
          });
        })
      );

      await new Promise((resolve) => setTimeout(resolve, 1000));

      setLoaded(true);
    };

    loadAssets();
  }, []);
  useMotionValueEvent(scrollY, "change", (y) => {
    const triggerLine = y + window.innerHeight * 0.4;

    let newIndex = -1;

    sectionRefs.forEach((ref, index) => {
      const section = ref.current;
      if (!section) return;

      const top = section.offsetTop;
      const bottom = top + section.offsetHeight;

      if (triggerLine >= top && triggerLine < bottom) {
        newIndex = index;
      }
    });

    if (newIndex !== -1) {
      setSection(newIndex + 1);
    }
  });
  const [section, setSection] = useState(1);
  return loaded ? (
    <>
      {section !== 6 && <CTAButton />}
      <Navbar section={section} />
      <AnimatePresence mode="sync">
        {section !== 5 && (
          <motion.img
            key={[3, 4].includes(section) ? "sunny" : "sky"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            src={[3, 4].includes(section) ? images[1] : images[0]}
            className="w-full max-h-screen h-full fixed inset-0 -z-10 object-cover"
            transition={{ duration: 1, ease: "easeInOut" }}
          />
        )}
      </AnimatePresence>
      <div ref={containerRef}>
        {/* Sticky UI */}
        <div className="sticky top-0 overflow-hidden">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={section}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full h-full"
            >
              {section === 1 && <Hero />}
              {section === 2 && <Hero2 ref={hero2Ref} />}
              {section === 3 && <Features />}
              {section === 4 && <Branding1 ref={brandingRef} />}
              {section === 5 && <Faq ref={faqRef} />}
              {section === 6 && <Footer />}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 🔥 Scroll spacers (define heights) */}
        <section ref={sectionRefs[0] as any} className="h-[15vh]" />
        <section
          ref={sectionRefs[1] as any}
          className="min-h-[180vh] prevent"
          data-lenis-prevent
          data-lenis-prevent-touch
          data-lenis-prevent-wheel
        />
        <section ref={sectionRefs[2] as any} className="min-h-[130vh]" />
        <section ref={sectionRefs[3] as any} className="min-h-[330vh]" />
        <section ref={sectionRefs[4] as any} className="min-h-[130vh]" />
        <section ref={sectionRefs[5] as any} className="min-h-[120vh]" />
      </div>
    </>
  ) : (
    <>
      <Loader />
      <div ref={containerRef}></div>
    </>
  );
}
