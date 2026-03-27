"use client";
import { fetcher } from "@/lib/constants";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import React, { useState } from "react";
import useSWR from "swr";
import { FAQCard, FAQCardSkeleton } from "./FaqCard";
import ErrorLoading from "@/components/ErrorLoading";

const clients = [
  { id: 1, name: "Adani", logo: "https://picsum.photos/1080/1080" },
  { id: 2, name: "Adani", logo: "https://picsum.photos/1080/1080" },
  { id: 3, name: "Adani", logo: "https://picsum.photos/1080/1080" },
  { id: 4, name: "Adani", logo: "https://picsum.photos/1080/1080" },
  { id: 5, name: "Adani", logo: "https://picsum.photos/1080/1080" },
  { id: 6, name: "Adani", logo: "https://picsum.photos/1080/1080" },
  { id: 7, name: "Adani", logo: "https://picsum.photos/1080/1080" },
];
export function transformFaqs(tasks: any[]) {
  return tasks.map((task) => {
    const obj: any = {
      id: task.gid,
    };

    task.custom_fields.forEach((field: any) => {
      if (field.type === "text") {
        obj[field.name] = field.text_value;
      }
    });

    return obj;
  });
}
function Faq({ ref }: { ref: any }) {
  const [isOpen, setIsOpen] = useState<null | number>(null);
  const [expand, setExpand] = useState(false);
  const [slide, setSlide] = useState(false);
  const { data, isLoading, error } = useSWR("/api/faqs", fetcher);
  const faqs = data?.data ? transformFaqs(data.data) : [];
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  return (
    <div className="flex h-screen flex-col items-center py-18 md:pt-20 px-3 md:px-6 gap-6">
      {/* Top Section */}
      <div className="max-w-[1300px] overflow-auto w-full flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
        {/* FAQ */}
        <div className="w-full lg:w-[55%]">
          <div className="sticky top-0 bg-background">
          <h1 className="uppercase font-roxter text-2xl md:text-4xl text-gray-300">
            skyblue
          </h1>
          <p className="uppercase font-syne text-xs md:text-base text-gray-600 font-bold mt-1">
            A BETTER WAY TO FLY
          </p>
          </div>
          <div className="flex flex-col gap-4 mt-6">
            <ErrorLoading
              error={error}
              emptyMessage="No Faqs found"
              loadingCard={FAQCardSkeleton}
              loading={isLoading}
              dataLength={faqs.length}
              loadingCount={4}
              loadingRows={4}
              loadingCols={1}
            >
              <div
                className="max-h-[600px] overflow-auto"
                data-lenis-prevent
                data-lenis-prevent-touch
                data-lenis-prevent-wheel
              >
                {faqs.map((faq, i) => {
                  return (
                    <FAQCard
                      key={i}
                      isOpen={isOpen}
                      setIsOpen={setIsOpen}
                      i={i}
                      item={faq}
                    />
                  );
                })}
              </div>
            </ErrorLoading>
          </div>
        </div>

        {/* Image */}
        <motion.div
          layout
          className="hidden md:block overflow-hidden  sticky! right-0 top-20 md:max-w-[550px]"
        >
          <div className="w-full h-full bg-gray-200">
            <img
              src="https://picsum.photos/1080/1080"
              alt="FAQ"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>
      </div>

      {/* Clients */}
      <h1 className="font-streach mt-2 uppercase text-2xl md:text-4xl text-center">
        our clients
      </h1>

      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 md:gap-4 w-full max-w-[1300px]">
        {clients.map((item, i) => (
          <div
            key={item.id + i}
            className="w-full h-15 sm:h-20 md:h-24 bg-red-400"
          >
            <img
              src={item.logo}
              alt={item.name}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Faq;
