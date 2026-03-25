"use client";
import { fetcher } from "@/lib/constants";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import React, { useState } from "react";
import useSWR from "swr";
import { FAQCard, FAQCardSkeleton } from "./FaqCard";
import ErrorLoading from "@/components/ErrorLoading";
// const faqData = [
//   {
//     question: "What is SkyBlue?",
//     answer:
//       "SkyBlue is a revolutionary platform that offers an unparalleled flying experience.",
//   },
//   {
//     question: "How can I book a flight with SkyBlue?",
//     answer:
//       "Booking a flight with SkyBlue is easy! Simply visit our website, select your desired destination and dates, and follow the prompts to complete your booking.",
//   },
//   {
//     question: "What makes SkyBlue different from other airlines?",
//     answer:
//       "SkyBlue stands out for its commitment to sustainability, exceptional customer service, and innovative technology that enhances the flying experience.",
//   },
//   {
//     question: "Can I change or cancel my booking?",
//     answer:
//       "Yes, you can change or cancel your booking. Please refer to our cancellation policy for more details and any applicable fees.",
//   },
// ];

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
function Faq({ref}:{ref: any}) {
  const [isOpen, setIsOpen] = useState<null | number>(null);
  const [expand, setExpand] = useState(false);
  const [slide, setSlide] = useState(false);
  const {data,isLoading,error} = useSWR("/api/faqs",fetcher);
  const faqs = data?.data ? transformFaqs(data.data) : [];
  const {scrollYProgress} = useScroll({
    target: ref,
    offset: ["start start","end start"]
  })
  useMotionValueEvent(scrollYProgress, "change", (v: number) => {
    if (v > 0.84) setExpand(true);
    else setExpand(false);

    if (v > 0.88) setSlide(true);
    else setSlide(false);
  });

  return (
    <div className="flex min-h-screen flex-col items-center py-18 md:pt-20 px-3 md:px-6 gap-6">
      {/* Top Section */}
      <div className="max-w-[1300px] overflow-auto md:h-[460px] w-full flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
        {/* FAQ */}
        <div className="w-full lg:w-[55%]">
          <h1 className="uppercase font-roxter text-2xl md:text-4xl text-gray-300">
            skyblue
          </h1>
          <p className="uppercase font-syne text-xs md:text-base text-gray-600 font-bold mt-1">
            A BETTER WAY TO FLY
          </p>

          <div className="flex flex-col  gap-4 mt-6">
            {/* {faqData.map((item, i) => (
              <FAQCard item={item} i={i} isOpen={isOpen} setIsOpen={setIsOpen}/>
            ))} */}
            <ErrorLoading error={error} emptyMessage="No Faqs found" loadingCard={FAQCardSkeleton} loading={isLoading} dataLength={faqs.length} loadingCount={4} loadingRows={4} loadingCols={1}>
              {
                faqs.map((faq,i)=>{
                  return <FAQCard key={i} isOpen={isOpen} setIsOpen={setIsOpen} i={i} item={faq}/>
                })
              }
            </ErrorLoading>
          </div>
        </div>

        {/* Image */}
        <motion.div
          layout
          initial={{ bottom: 0, scale: 2 }}
          animate={{
            scale: expand ? 1.5 : 1,
            width: expand ? "100%" : "45%",
            ...(expand
              ? { height: "100%", bottom: 0, top: "80px" }
              : { overflow: "hidden" }),
            ...(slide ? { top: "-70rem" } : {}),
          }}
          style={{ transformOrigin: "center center" }}
          transition={{ duration: 0.4 }}
          className={`${
            !expand && "max-md:hidden md:max-h-[450px]"
          } w-full w-[45%] flex-1 overflow-hidden flex justify-center items-center ${
            expand ? "absolute right-0 inset-0 z-50 w-full" : "relative"
          }`}
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

