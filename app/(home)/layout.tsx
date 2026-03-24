import SmoothScroll from "@/components/SmoothScroll";
import React from "react";
import { Toaster } from "react-hot-toast";
import CTAButton from "@/components/CTAButton";

export default function layout({ children }: React.PropsWithChildren) {
  return (
    <SmoothScroll>
      <CTAButton/>
      <Toaster />
      {children}
    </SmoothScroll>
  );
}
