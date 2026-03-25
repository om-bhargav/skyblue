"use client";

import cloud from "@/assets/cloud.png";
import { STYLED_SITE_NAME } from "@/lib/constants";
import {
  motion
} from "framer-motion";
function Hero() {
  const viewport = { once: false};
  return (
    <div className="h-screen overflow-hidden" >
       <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
         <div className="relative">
           <motion.h1
             viewport={viewport}
             initial={{ opacity: 0, y: -500 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.5, ease: "easeInOut" }}
             exit={{scale: 0.3}}
             className="font-streach absolute uppercase text-white text-[2.6rem] md:text-[9rem]"
           >
             {STYLED_SITE_NAME}
           </motion.h1>
           <motion.h1
             viewport={viewport}
             exit={{scale: 0.3}}
             initial={{ opacity: 0, y: -500 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.5, ease: "easeInOut" }}
             className="font-streach absolute uppercase [-webkit-text-stroke:4px_#ffffff] text-transparent relative text-[2.6rem] md:text-[9rem] z-50 text-center"
           >
             {STYLED_SITE_NAME}
           </motion.h1>
         </div>
         <div className="w-full h-2/3 absolute bottom-0">
           <motion.img
             viewport={viewport}
             src={cloud.src}
             alt="plane"
             initial={{ opacity: 1, y: 540, filter: "brightness(50%)" }}
             animate={{ opacity: 1, y: 0, filter: "brightness(105%)" }}
             exit={{opacity: 0}}
             transition={{ duration: 1, ease: "easeOut" }}
             className="absolute max-md:object-cover bottom-0 max-md:h-180 md:h-150 w-full"
           />
         </div>
       </div>
    </div>
  );
}

export default Hero;
