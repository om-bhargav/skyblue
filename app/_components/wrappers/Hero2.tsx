"use client";
import React, { useRef, useState } from "react";
import Hero2 from "../Hero2";
import { useMotionValueEvent, useScroll } from "framer-motion";
export default function Hero2Wrapper({containerRef,active}:{containerRef: any;active: boolean;}) {
  const [isScrolled,setIsScrolled] = useState(false);
  const ref = useRef(null);
  const {scrollYProgress} = useScroll({
    container: containerRef,
    target: ref,
    offset: ["start start","end end"]
  });
  useMotionValueEvent(scrollYProgress,"change",(v)=>{
    if(v>=0.5){
      setIsScrolled(true);
    }else{
      setIsScrolled(false);
    }
  });
  return (
    <section ref={ref} className="min-h-[200vh]">
        <Hero2 isScrolled={isScrolled}/>
    </section>
  );
}
