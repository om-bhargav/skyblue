"use client";
import Button from "@/elements/Button";
import LiquidGlass from "@/elements/LiquidGlass";
import { motion } from "framer-motion";
import { Plane } from "lucide-react";
import { ExpandingFormModal } from "./CustomExpandingFormModal";
import { useState } from "react";

export default function CTAButton() {
  const [saved, setSaved] = useState(false);
  const [opened, setOpened] = useState(false);
  return (
    <div className="fixed z-[999] bottom-3 left-1/2 -translate-x-1/2  px-4">
      <div className={`p-1 bg-white ${opened ? "rounded-xl ":"rounded-full"}`}>
        <motion.div
          layout
          transition={{ layout: { duration: 0.5, ease: "easeOut" } }}
          className="flex flex-col justify-center overflow-hidden items-center gap-2"
          animate={{
            width: opened ? (saved ? "72rem" : "36rem") : "auto",
            height: opened ? (saved ? "80vh" : "50vh") : "auto",
          }}
        >
          <ExpandingFormModal opened={opened} saved={saved}/>
          <div
            onClick={() => {
              if (!opened) {
                setOpened(true);
                return;
              }
              if (!saved) {
                setSaved(true);
              } else {
                setSaved(false);
                setOpened(false);
              }
            }}
            className={`flex items-center gap-2 flex-1 max-h-[50px] h-full ${opened || saved ? "absolute bottom-2":""}`}
          >
            <Button className="max-md:text-xs whitespace-nowrap px-5 py-3.5">
              Plan a flight
            </Button>

            <Button className="max-md:text-xs p-4" varient={"dark"}>
              <Plane size={18} />
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
