import React from "react";
import LoadingPlane from "@/assets/plane-loading.png";
import Image from "next/image";
import { syne } from "@/utils/fonts";
import { AnimatedCircularProgressBar } from "@/components/ui/animated-circular-progress-bar"
export default function Loader({ progress = 0 }: { progress: number }) {
  return (
    <div className="min-h-screen bg-background fixed top-0 w-full flex justify-center z-[9999] items-center">
      <div className="flex flex-col justify-center items-center gap-10">
        <div className="relative">
          {/* <Image priority src={LoadingPlane} alt={"Loading..."} fill /> */}
          <AnimatedCircularProgressBar
            className="stroke-orange-500"
            value={progress}
            gaugePrimaryColor="orange"
            gaugeSecondaryColor="gray"
          />
          {/* <div className="absolute right-[100%] scale-103 right-100 left-2 top-13  bottom-0 bg-gradient-to-br w-28 h-6 rounded-full from-gray-700 to-gray-900 opacity-[0.2] blur-xs z-150"/> */}
        </div>
        {/* <span className={`uppercase bg-orange-500 text-5xl text-gray-500 bg-clip-text font-extrabold ${syne.className}`}>Loading</span> */}
        <h1
          className={`fill-text uppercase text-5xl font-bold font-extrabold ${syne.className}`}
          data-text="loading"
        >
          Loading
        </h1>
      </div>
    </div>
  );
}
