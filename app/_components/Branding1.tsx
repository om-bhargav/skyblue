"use client";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { dmSans, roxter, streach, syne } from "@/utils/fonts";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import airoplane from "@/assets/airoplane.png";
import { fetcher, SITE_NAME } from "@/lib/constants";
import { Separator } from "@/components/ui/separator";
import useSWR from "swr";
import HandleSkeleton from "./Skeleton";
import sunnyDay from "@/assets/sunny-day.png";
export default function Branding1({
  scrollYProgress,
}: {
  scrollYProgress: any;
}) {
  const { data, isLoading } = useSWR("/api/flight-details", fetcher);
  const flightData = data?.data ?? {};
  const aircraftDetails = [
    {
      label: "Maximum Operating Range",
      value: flightData?.specifications?.maximumOperatingRange,
    },
    {
      label: "Speed",
      value: flightData?.specifications?.speed,
    },
    {
      label: "Passenger Capacity",
      value: flightData?.passengersCount,
    },
    {
      label: "Endurance",
      value: flightData?.specifications?.endurance,
    },
    {
      label: "Baggage Capacity",
      value: flightData?.specifications?.baggageCapacity,
    },
    {
      label: "Cruising Altitude",
      value: flightData?.specifications?.cruisingAltitude,
    },
    {
      label: "Cabin Length",
      value: flightData?.specifications?.cabinLength,
    },
    {
      label: "Cabin Width",
      value: flightData?.specifications?.cabinWidth,
    },
    {
      label: "Cabin Height",
      value: flightData?.specifications?.cabinHeight,
    },
  ];
  const specifications = aircraftDetails.slice(6);
  const firstDetails = aircraftDetails.slice(0, 6);
  const [showDetails, setShowDetails] = useState(false);

  const scaleValue = useSpring(
    useTransform(scrollYProgress, [0.1, 0.5], [1, 5]),
    {
      bounce: 0,
    }
  );
  useMotionValueEvent(scrollYProgress, "change", (v: number) => {
    if (v > 0.6) {
      setShowDetails(true);
    } else {
      setShowDetails(false);
    }
  });
  return (
    <div
      className={`h-screen sticky top-0 flex items-center justify-center w-full relative overflow-hidden`}
    >
      <h1
        className={`font-streach max-md:hidden absolute uppercase text-white text-3xl md:text-5xl ${roxter.className}`}
      >
        {SITE_NAME}
      </h1>
      <h1
        className={`font-streach max-md:hidden absolute uppercase [-webkit-text-stroke:1px_#ffffff] text-transparent text-3xl md:text-5xl z-50 text-center ${roxter.className}`}
      >
        {SITE_NAME}
      </h1>
      <motion.div
        initial={{ y: -500, opacity: 0, scale: 1 }}
        whileInView={{ opacity: 1 }}
        style={{ scale: scaleValue }}
        transition={{ duration: 1.7, ease: "easeInOut" }}
        viewport={{ once: false }}
        className={`absolute -top-70 z-100 max-md:hidden`}
      >
        <img
          src={airoplane.src}
          alt={"Plane"}
          className="rotate-180 h-250 object-cover rotate-y-180!"
        />
      </motion.div>
      <AnimatePresence mode="popLayout">
        {!showDetails && (
          <div
            key={"Initial Layout"}
            className="w-full max-h-[75%]  py-10 px-5 h-full absolute gap-5 grid md:grid-cols-2"
          >
            <div className="h-full flex items-start justify-center">
              <motion.span
                initial={{ x: -150, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
                viewport={{ once: false }}
                className={`text-background ${roxter.className} uppercase text-5xl md:text-8xl`}
              >
                fly in
              </motion.span>
            </div>

            <div className="h-full flex flex-col gap-5 items-end text-right justify-end">
              <motion.span
                initial={{ x: 150, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
                viewport={{ once: false }}
                className={`uppercase text-5xl md:text-7xl text-background ${roxter.className}`}
              >
                LUXURY
              </motion.span>
              <motion.span
                initial={{ y: 150 }}
                whileInView={{ y: 0 }}
                transition={{ duration: 1, delay: 1 }}
                viewport={{ once: false }}
                className={`uppercase text-sm md:text-xl text-background ${syne.className} font-extrabold [font-stretch:normal] [font-variation-settings:'wdth'_100]`}
              >
                luxury that <br /> actually{" "}
                <span className="font-streach">feels</span>
              </motion.span>
            </div>
          </div>
        )}
        {showDetails && (
          <motion.div
            key={"details"}
            initial={{
              opacity: 0,
              display: showDetails ? "flex" : "none",
            }}
            whileInView={{
              opacity: 1,
            }}
            transition={{ duration: 0.5 }}
            className="bg-[#372d22] z-[999] w-full h-full py-20"
            exit={{ scale: 0, opacity: 0 }}
          >
            <motion.div
              initial={{ left: -100, opacity: 0 }}
              whileInView={{ left: 0, opacity: 1 }}
              exit={{ opacity: 0, bottom: 100 }}
              viewport={{ once: false }}
              className="md:ml-5 w-full text-background max-w-[450px] h-full flex flex-col justify-between gap-5 text-right items-center"
            >
              <div className="flex flex-col items-start w-full gap-3">
                <span
                  className={`text-3xl font-bold capitalize ${syne.className}`}
                >
                  Gulfstream
                </span>
                <span className={`text-7xl uppercase font-extrabold`}>
                  65oer
                </span>
              </div>
              <div className="grid w-full text-left gap-4">
                <div className="grid gap-2">
                  <Separator />
                  <div className="grid md:grid-cols-3 gap-5">
                    {firstDetails.map(
                      (
                        { label, value }: { label: string; value: string },
                        index
                      ) => {
                        return (
                          <SectionDetailsVertical
                            loading={isLoading}
                            key={index}
                            title={label}
                            value={value}
                          />
                        );
                      }
                    )}
                  </div>
                </div>
                <div className="grid gap-2">
                  <Separator />
                  <span
                    className={`uppercase text-lg text-background/70 font-bold ${syne.className}`}
                  >
                    specifications
                  </span>
                  <div>
                    {specifications.map(
                      (
                        { label, value }: { label: string; value: string },
                        index
                      ) => {
                        return (
                          <SectionDetailsHorizontal
                            key={index}
                            title={label}
                            value={value}
                          />
                        );
                      }
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ right: 100, opacity: 0 }}
              whileInView={{ right: 0, opacity: 1 }}
              exit={{ opacity: 0, bottom: 100 }}
              viewport={{ once: false }}
              className="max-md:text-left max-h-[350px] w-full max-w-[350px] text-background h-full flex flex-col justify-between gap-5 items-center ml-auto md:mr-10"
            >
              <span className={`text-3xl font-bold ${syne.className}`}>
                Ultra-Long-Range AirCraft
              </span>
              <div className="flex flex-col gap-2">
                <Separator />
                <span className="font-semibold mb-3">
                  Direct Access To Private Travel
                </span>
                <span className="font-normal">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vel,
                  est. Mollitia velit maiores necessitatibus ex eaque. Esse
                  magni explicabo harum ab corporis dignissimos et impedit omnis
                  consequatur pariatur, voluptatem, blanditiis qui
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function SectionDetailsHorizontal({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="grid grid-cols-2">
      <span className={`uppercase text-sm font-semibold`}>{title}</span>
      <span className={`uppercase text-xs text-background/70 font-semibold`}>
        {value}
      </span>
    </div>
  );
}

export function SectionDetailsVertical({
  loading,
  title,
  value,
}: {
  loading: boolean;
  title: string;
  value: string;
}) {
  return (
    <div className="grid">
      <HandleSkeleton loading={loading}>
        <span className={`uppercase text-sm font-semibold text-background/70`}>
          {title}
        </span>
      </HandleSkeleton>
      <HandleSkeleton loading={loading}>
        <span className={`uppercase text-xs font-semibold`}>{value}</span>
      </HandleSkeleton>
    </div>
  );
}
