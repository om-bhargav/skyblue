"use client";
import Button from "@/elements/Button";
import LiquidGlass from "@/elements/LiquidGlass";
import { motion } from "framer-motion";
import { Plane, X } from "lucide-react";
import { ExpandingFormModal } from "./CustomExpandingFormModal";
import { useState } from "react";
import useMobile from "@/hooks/useMobile";
import { Button as SButton } from "./ui/button";
export default function CTAButton() {
  const [saved, setSaved] = useState(false);
  const [opened, setOpened] = useState(false);
  const isMobile = useMobile();
  const handleNext = () => {
    if (!saved) {
      setSaved(true);
    } else {
      setSaved(false);
      setOpened(false);
    }
  };
  const handleClose = () => {
    setSaved(false);
    setOpened(false);
  };
  return (
    <div className="fixed z-[999] bottom-10 left-1/2 -translate-x-1/2  px-4">
      <div
        className={`p-1 shadow-md bg-white ${
          opened ? "rounded-xl " : "rounded-full"
        }`}
      >
        <motion.div
          layout={false}
          transition={{ layout: { duration: 0.5, ease: "easeInOut" } }}
          className="flex flex-col relative justify-center overflow-auto items-center gap-2 max-w-[95vw] prevent"
          animate={{
            width: opened
              ? saved
                ? isMobile
                  ? "95vw"
                  : "72rem"
                : isMobile
                  ? "90vw"
                  : "36rem"
              : isMobile
                ? "55vw"
                : "17rem",

            height: opened
              ? saved
                ? isMobile
                  ? "90vh"
                  : "85vh"
                : isMobile
                  ? "62vh"
                  : "55vh"
              : isMobile
                ? "2.8rem"
                : "3.7rem",
          }}
          data-lenis-prevent
          data-lenis-prevent-touch
        >
          <ExpandingFormModal
            handleNext={handleNext}
            opened={opened}
            saved={saved}
            handleClose={handleClose}
          />
          <div
            onClick={() => {
              if (!opened) {
                setOpened(true);
                return;
              }
            }}
            className={`flex items-center gap-2 flex-1 max-h-[50px] h-full `}
          >
            <Button className="max-md:text-xs whitespace-nowrap px-5 py-3.5">
              Plan a flight
            </Button>

            <Button className="max-md:text-xs p-2 md:p-4" varient={"dark"}>
              <Plane size={18} />
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
