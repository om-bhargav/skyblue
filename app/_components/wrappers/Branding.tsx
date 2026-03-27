"use client";
import Branding1 from "../Branding1";
import { useRef } from "react";
import { useScroll } from "framer-motion";
import {motion} from "framer-motion";
import sunnyDay from "@/assets/sunny-day.png";
export default function BrandingWrapper({ containerRef,active }: {containerRef: any;active: boolean}) {
  const ref = useRef(null);
  const {scrollYProgress} = useScroll({
    container: containerRef,
    target: ref,
    offset: ["start start","end end"]
  });
  return (
    <section ref={ref} className="min-h-[200vh] relative">
      <Branding1 scrollYProgress={scrollYProgress}/>
    </section>
  );
}
