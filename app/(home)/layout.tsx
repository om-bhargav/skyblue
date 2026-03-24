import SmoothScroll from "@/components/SmoothScroll";
import React from "react";
import { Toaster } from "react-hot-toast";

export default function layout({ children }: React.PropsWithChildren) {
  return (
    <SmoothScroll>
      <Toaster />
      {children}
    </SmoothScroll>
  );
}
