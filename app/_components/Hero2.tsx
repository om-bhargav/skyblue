"use client";
import Image from "next/image";
import background from "@/assets/sky-bg.png";
import PlaneWindow from "@/assets/plane-window.png";
import LiquidGlass from "@/elements/LiquidGlass";
import Button from "@/elements/Button";
import { Plane } from "lucide-react";
import {
  delay,
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { fetcher, SITE_NAME } from "@/lib/constants";
import { roxter, syne } from "@/utils/fonts";
import { easeInOut } from "framer-motion";
import useSWR from "swr";
import ErrorLoading from "@/components/ErrorLoading";
import { FeatureCard, FeatureCardSkeleton } from "./FeatureCard";
import useMobile from "@/hooks/useMobile";
export function transformFeatures(tasks: any[]) {
  return tasks.map((task) => {
    const obj: any = {
      id: task.gid,
      title: "",
      description: "",
    };

    task.custom_fields.forEach((field: any) => {
      if (field.name === "title") {
        obj.title = field.text_value || "";
      }

      if (field.name === "feature_description") {
        obj.description = field.text_value || "";
      }
    });

    return obj;
  });
}
function Hero2() {
  const transition = { duration: 0.8, ease: easeInOut };
  const { data, isLoading, error } = useSWR("/api/features", fetcher);
  const isMobile = useMobile();
  const features = data?.data ? transformFeatures(data.data) : [];
  const {scrollY} = useScroll();
  const [isScrolled,setIsScrolled] = useState(false);
  useMotionValueEvent(scrollY,"change",(v)=>{
    if(v>2000){
      setIsScrolled(true);
    }else{
      setIsScrolled(false);
    }
  });
  return (
    <div 
    className="min-h-screen relative flex items-center justify-center prevent">
      <motion.img
        src={PlaneWindow.src}
        initial={{ scale: 5 }}
        alt="Plane window"
        whileInView={{scale: isScrolled ? 3: 1,...isScrolled ? {x: "-100%"}:{}}}
        transition={transition}
        exit={{scale: 5}}
        viewport={{ once: false }}
        className={`w-full h-full -z-[5] absolute top-0 ${isScrolled ? "object-fit": "object-cover"} `}
      />
      {! isScrolled && 
      <div className="absolute flex md:grid md:grid-cols-3 justify-between items-center text-background px-2 md:px-5 w-full h-full">
        <motion.div
          viewport={{ once: false, amount: "some" }}
          initial={{ opacity: 1, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className={`flex flex-col max-md:absolute max-md:top-[9%] justify-start uppercase overflow-hidden items-start md:gap-2 ${roxter.className}`}
        >
          <span className={`text-2xl md:text-8xl`}>book</span>
          <span className={`text-md md:text-5xl`}>private jet</span>
        </motion.div>
        <motion.div
          viewport={{ once: false, amount: "some" }}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={`overflow-hidden max-md:absolute left-23 text-center text-3xl ${roxter.className}`}
        >
          {SITE_NAME}
        </motion.div>
        <div className="flex max-md:max-h-[630px] max-md:h-full flex-col justify-between overflow-hidden items-end gap-2 md:gap-5">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 2 }}
            viewport={{ once: false, amount: "some" }}
            className="uppercase max-md:pt-2 font-streach flex flex-col items-start md:pr-5"
          >
            <span className="text-2xl md:text-5xl">10+</span>{" "}
            <span className="text-lg md:text-3xl">jeets</span>
          </motion.span>
          <div className="h-100 w-5 md:w-10">
            <span
              className={`uppercase flex items-center whitespace-nowrap text-background/90 gap-5 rotate-90`}
            >
              <div className="min-w-30 border-1 border-background/40" /> Scroll
              down <div className="min-w-30 border-1 border-background/40" />
            </span>
          </div>
          <motion.span
            initial={{ x: 20 }}
            whileInView={{ x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false, amount: "some" }}
            className={`${syne.className} max-md:bottom-12  max-md:left-0 max-md:text-center w-full md:max-w-md text-right font-thin! text-sm md:text-lg md:pr-5`}
          >
            SkyAero enables seamless private jet bookings —connecting you to
            luxury aircraft, global destinations, and uncompromising comfort.
          </motion.span>
        </div>
      </div>
        }
      {isScrolled && <ErrorLoading
        loading={isLoading}
        error={error}
        loadingCard={FeatureCardSkeleton}
        loadingCount={4}
        loadingCols={2}
        loadingRows={2}
        className="w-full overflow-scroll"
        loaderClassName="mx-auto max-w-[1200px] place-items-center w-full mt-12 min-h-[400px]"
      >
        <div className="mx-auto md:pt-20 max-w-[1200px] max-h-[600px] overflow-y-auto max-md:py-2 grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-10 md:gap-x-20 w-full h-full items-center prevent"  data-lenis-prevent data-lenis-prevent-touch>
          {features.map((feature: any, index: number) => {
            return <FeatureCard key={index} index={index} feature={feature} />;
          })}
        </div>
      </ErrorLoading>}
    </div>
  );
}

export default Hero2;
