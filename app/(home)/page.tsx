"use client";

import airoplane from "@/assets/airoplane.png";
import cloud from "@/assets/cloud.png";
import PlaneWindow from "@/assets/plane-window.png";
import plane from "@/assets/plane.png";
import background from "@/assets/sky-bg.png";
import SunnyDay from "@/assets/sunny-day.png";
import Loader from "@/components/Loader";
import { AnimatePresence, motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import CTAButton from "@/components/CTAButton";
import { useScrollSections } from "@/components/useScrollSections";
const Navbar = dynamic(() => import("@/components/Navbar"));
const Hero = dynamic(() => import("@/app/_components/wrappers/Hero"));
const Hero2 = dynamic(() => import("../_components/wrappers/Hero2"));
const Features = dynamic(() => import("../_components/wrappers/Features"));
const Branding = dynamic(() => import("../_components/wrappers/Branding"));
const Faq = dynamic(() => import("@/app/_components/wrappers/Faq"));
const Footer = dynamic(() => import("@/app/_components/wrappers/Footer"));

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
  const [loadedAssets, setLoadedAssets] = useState(0);
  const sectionRefs = [
    heroRef,
    hero2Ref,
    featuresRef,
    brandingRef,
    faqRef,
    footerRef,
  ];
  const totalAssets = images.length + 1;
  const updateProgress = () => {
    setLoadedAssets((prev) => {
      return prev + 1;
    });
  };
  const containerRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const progress = (loadedAssets / totalAssets) * 100;
  useEffect(() => {
    const loadAssets = async () => {
      await Promise.all(
        images.map((image) => {
          return new Promise<void>((resolve, reject) => {
            const img = new Image();
            img.src = image;

            img.onload = () => {
              updateProgress();
              resolve();
            };
            img.onerror = () => {
              updateProgress();
              reject();
            };
          });
        })
      );

      updateProgress();
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setLoaded(true);
    };

    loadAssets();
  }, []);
  const [section, setSection] = useState(1);
  // console.log(section);
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    sectionRefs.forEach((ref, index) => {
      if (!ref.current) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setSection(index + 1);
          }
        },
        {
          root: containerRef.current,
          threshold: 0.5, // 👈 when 60% visible = triggered
        }
      );

      observer.observe(ref.current);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [sectionRefs]);
  useEffect(() => {
    console.log(section);
  }, [section]);
  return (
    <>
      {!loaded && <Loader progress={progress} />}
      {section !== 6 && <CTAButton />}
      <Navbar section={section} />
      <motion.img
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        src={[3, 4].includes(section) ? images[1] : images[0]}
        className={`w-full max-h-screen h-full fixed inset-0 -z-10 object-cover ${section === 5 ? "hidden" : ""}`}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      />

      <div
        ref={containerRef}
        className="w-full h-screen overflow-auto snap-y snap-mandatory"
      >
        <div
          key={"Hero"}
          ref={heroRef as any}
          className="snap-start min-h-screen"
        >
          <Hero active={section === 1} />
        </div>
        <div
          key={"Hero2"}
          ref={hero2Ref as any}
          className="snap-start min-h-screen"
        >
          <Hero2 active={section === 2} containerRef={containerRef} />
        </div>
        <div
          key={"features"}
          ref={featuresRef as any}
          className="snap-start min-h-screen"
        >
          <Features active={section === 3} />
        </div>
        <div
          key={"branding"}
          ref={brandingRef as any}
          className="snap-start min-h-screen"
        >
          <Branding active={section === 4} containerRef={containerRef} />
        </div>
        <div
          key={"faq"}
          ref={faqRef as any}
          className="snap-start min-h-screen"
        >
          <Faq active={section === 5} />
        </div>
        <div
          key={"footer"}
          ref={footerRef as any}
          className="snap-start min-h-screen"
        >
          <Footer active={section === 6} />
        </div>
      </div>
    </>
  );
}
