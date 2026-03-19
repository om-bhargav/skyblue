"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Textarea } from "./ui/textarea";

export function ExpandingFormModal({
  opened,
  saved,
}: {
  children?: React.ReactNode;
  opened: boolean;
  saved: boolean;
}) {
  const [passengers, setPassengers] = useState(1);
  const [addReturn, setAddReturn] = useState(false);
  const [title, setTitle] = useState("");

  return (
    <>
      {opened && (
        <div
          className="w-full h-full"
        >
          {saved ? (
            <div className="bg-transparent transition-all duration-400 h-full rounded-2xl p-6 md:p-8 w-full overflow-y-auto">
              <div>
                <span className="text-2xl font-semibold">
                  Plan Your Flight
                </span>
              </div>

              <div className="space-y-6 mt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <select
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="h-10 rounded-md border border-foreground bg-background px-3 text-sm bg-transparent"
                  >
                    <option>Mr.</option>
                    <option>Ms.</option>
                  </select>

                  <Input className="text-black! placeholder:text-black! border-foreground" placeholder="First name" />
                  <Input className="text-black! placeholder:text-black! border-foreground" placeholder="Last name" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Input className="text-black! placeholder:text-black! border-foreground" placeholder="Phone number" />
                  <select className="h-10 rounded-md border border-foreground bg-transparent px-3 text-sm">
                    <option>Please select</option>
                  </select>
                  <Input className="text-black! placeholder:text-black! border-foreground" placeholder="Email" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <select className="h-10 rounded-md border border-foreground bg-background px-3 text-sm bg-transparent">
                    <option>How often do you fly privately?</option>
                  </select>
                  <select className="h-10 rounded-md border border-foreground bg-background px-3 text-sm bg-transparent">
                    <option>What is your current flying solution?</option>
                  </select>
                </div>

                <select className="h-10 w-full rounded-md border border-foreground bg-background px-3 text-sm bg-transparent">
                  <option>How did you hear about us?</option>
                </select>

                <Textarea placeholder="Message" className="min-h-[120px] text-black placeholder:text-black border-foreground" />
              </div>
            </div>
          ) : (
            <motion.div 
            transition={{duration: 0}}
            className="bg-transparent transition-all duration-400 h-full rounded-2xl p-6 w-full">
              <div>
                <span className="text-2xl font-semibold">
                  Book Flight
                </span>
              </div>

              <div className="space-y-5 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input className="text-black! placeholder:text-black! border-foreground" placeholder="From" />
                  <Input className="text-black! placeholder:text-black! border-foreground" placeholder="To" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input className="text-black! placeholder:text-black! border-foreground" type="date" />

                  <div className="flex border-foreground items-center justify-between border rounded-md px-3 py-2">
                    <span className="text-sm">Add return</span>
                    <button
                      onClick={() => setAddReturn(!addReturn)}
                      className={`w-10 h-5 rounded-full transition ${
                        addReturn ? "bg-black" : "bg-gray-300"
                      } relative`}
                    >
                      <div
                        className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition ${
                          addReturn ? "right-0.5" : "left-0.5"
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {addReturn && <Input className="text-black! placeholder:text-black! border-foreground" type="date" />}

                <div className="flex border-foreground items-center justify-between border rounded-md px-3 py-3">
                  <span className="text-sm">Passengers</span>
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setPassengers((p) => Math.max(1, p - 1))
                      }
                    >
                      −
                    </Button>

                    <span className="w-5 text-center">
                      {passengers}
                    </span>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPassengers((p) => p + 1)}
                    >
                      +
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      )}
      </>
  );
}