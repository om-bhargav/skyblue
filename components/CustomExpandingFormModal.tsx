"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { motion } from "framer-motion";
import { Textarea } from "./ui/textarea";
import { PlanFlight } from "@/app/actions/AsanaActions";
import SubmitButton from "./SubmitButton";
import toast from "react-hot-toast";
import { X } from "lucide-react";
const flightHoursOptions = [
  "How often do you fly privately?",
  "1-25 hours",
  "25-50 hours",
  "50-75 hours",
  "75-100 hours",
  "100+ hours",
  "I am new to private aviation",
];
const flightTypeOptions = [
  "What is your current flying solution?",
  "Charter",
  "Commercial",
  "Fractional Ownership",
  "Aircraft Ownership",
  "Jet Card",
];
const sourceOptions = [
  "How did you hear about us?",
  "Wall Street Journal",
  "New York Times",
  "Forbes",
  "CNBC",
  "Google Search",
  "Social Media",
  "Event",
  "Recommendation",
  "Other",
];
const stateOptions = [
  "Select State",
  "Andaman and Nicobar Islands",
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chandigarh",
  "Chhattisgarh",
  "Daman and Diu",
  "Delhi",
  "Dadra and Nagar Haveli",
  "Goa",
  "Gujarat",
  "Himachal Pradesh",
  "Haryana",
  "Jharkhand",
  "Jammu and Kashmir",
  "Karnataka",
  "Kerala",
  "Lakshadweep",
  "Maharashtra",
  "Meghalaya",
  "Manipur",
  "Madhya Pradesh",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Puducherry",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];
export function ExpandingFormModal({
  handleNext,
  opened,
  saved,
  handleClose,
}: {
  children?: React.ReactNode;
  opened: boolean;
  saved: boolean;
  handleNext: any;
  handleClose: any;
}) {
  const [form, setForm] = useState({
    title: "Mr.",
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    frequency: "",
    solution: "",
    source: "",
    message: "",
    state: "",
    from: "",
    to: "",
    journeyDate: "",
    addReturn: false,
    returnDate: "",
    passengers: 1,
  });
  const handleChange = (e: React.FormEvent, key: string) => {
    setForm((prev) => {
      return { ...prev, [key]: (e.target as any).value };
    });
  };
  return (
    <>
      {opened && (
        <form
          action={async (_) => {
            const fd = new FormData();
            fd.append("title", form.title);
            fd.append("firstName", form.firstName);
            fd.append("lastName", form.lastName);
            fd.append("phone", form.phone);
            fd.append("email", form.email);
            fd.append("frequency", form.frequency);
            fd.append("solution", form.solution);
            fd.append("source", form.source);
            fd.append("message", form.message);
            fd.append("state", form.state);
            fd.append("from", form.from);
            fd.append("to", form.to);
            fd.append("journey_date", form.journeyDate);
            fd.append("add_return", form.addReturn ? "yes" : "no");
            fd.append("return_date", form.returnDate);
            fd.append("passengers", form.passengers.toString());
            const response = await PlanFlight(fd);
            if (response.success) {
              toast.success(response.message);
              handleNext();
            } else {
              toast.error(response.message);
            }
          }}
          className="w-full h-full"
        >
          {saved ? (
            <motion.div
              transition={{ duration: 0.4, ease: "easeInOut" }}
              viewport={{once: true}}
              className="bg-transparent transition-all duration-400 h-full rounded-2xl p-6 py-10 md:p-8 w-full overflow-y-auto"
            >
              <div className="flex justify-between items-center">
                <span className="text-2xl font-semibold">Plan Your Flight</span>
                {opened && (
                  <Button type="button" size={"icon"} onClick={handleClose}>
                    <X />
                  </Button>
                )}
              </div>

              <div className="space-y-6 mt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <select
                    value={form.title}
                    onChange={(e) => handleChange(e, "title")}
                    name="title"
                    className="h-10 rounded-md border shadow-md bg-background px-3 text-sm bg-transparent"
                  >
                    <option value="Mr.">Mr.</option>
                    <option value="Ms.">Ms.</option>
                  </select>

                  <Input
                    name="firstName"
                    className="text-black! placeholder:text-black! py-5 shadow-md"
                    placeholder="First name"
                    value={form.firstName}
                    onChange={(e) => handleChange(e, "firstName")}
                  />
                  <Input
                    name="lastName"
                    className="text-black! placeholder:text-black! py-5 shadow-md"
                    placeholder="Last name"
                    value={form.lastName}
                    onChange={(e) => handleChange(e, "lastName")}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Input
                    name="phone"
                    className="text-black! placeholder:text-black! py-5 shadow-md"
                    placeholder="Phone number"
                    value={form.phone}
                    onChange={(e) => handleChange(e, "phone")}
                  />
                  <select
                    name="state"
                    className="h-10 rounded-md border shadow-md bg-transparent px-3 text-sm"
                    value={form.state}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, state: e.target.value }))
                    }
                  >
                    {stateOptions.map((option, index) => (
                      <option key={index} value={index === 0 ? "" : option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <Input
                    name="email"
                    className="text-black! placeholder:text-black! py-5 shadow-md"
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) => handleChange(e, "email")}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <select
                    name="frequency"
                    className="h-10 rounded-md border shadow-md bg-background px-3 text-sm bg-transparent"
                    value={form.frequency}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        frequency: e.target.value,
                      }))
                    }
                  >
                    {flightHoursOptions.map((option, index) => (
                      <option key={index} value={index === 0 ? "" : option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <select
                    name="solution"
                    value={form.solution}
                    className="h-10 rounded-md border shadow-md bg-background px-3 text-sm bg-transparent"
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, solution: e.target.value }))
                    }
                  >
                    {flightTypeOptions.map((option, index) => (
                      <option key={index} value={index === 0 ? "" : option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <select
                  name="source"
                  value={form.source}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, source: e.target.value }))
                  }
                  className="h-10 w-full rounded-md border shadow-md bg-background px-3 text-sm bg-transparent"
                >
                  {sourceOptions.map((option, index) => (
                    <option key={index} value={index === 0 ? "" : option}>
                      {option}
                    </option>
                  ))}
                </select>

                <Textarea
                  name="message"
                  placeholder="Message"
                  value={form.message}
                  onChange={(e) => handleChange(e, "message")}
                  className="min-h-[120px] text-black placeholder:text-black shadow-md"
                />
                {/* <Button type="button" className="py-5 text-md w-full">Submit</Button> */}
                <SubmitButton
                  type="submit"
                  text="Submit"
                  className="w-full py-5 text-md"
                />
              </div>
            </motion.div>
          ) : (
            <motion.div
              transition={{ duration: 0 }}
              className="bg-transparent transition-all duration-400 h-full rounded-2xl p-6 w-full"
            >
              <div className="flex justify-between items-center">
                <span className="text-2xl font-semibold">Book Flight</span>
                                {opened && (
                  <Button type="button" size={"icon"} onClick={handleClose}>
                    <X />
                  </Button>
                )}
              </div>

              <div className="space-y-5 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    className="text-black! placeholder:text-black! py-5 shadow-md"
                    placeholder="From"
                    name="from"
                    value={form.from}
                    onChange={(e) => handleChange(e, "from")}
                  />
                  <Input
                    className="text-black! placeholder:text-black! py-5 shadow-md"
                    placeholder="To"
                    name="to"
                    value={form.to}
                    onChange={(e) => handleChange(e, "to")}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    className="text-black! placeholder:text-black! py-5 shadow-md"
                    type="date"
                    value={form.journeyDate}
                    onChange={(e) => handleChange(e, "journeyDate")}
                  />

                  <div className="flex shadow-md items-center justify-between border rounded-md px-3 py-2">
                    <span className="text-sm">Add return</span>
                    <button
                      type="button"
                      onClick={() =>
                        setForm((prev) => ({
                          ...prev,
                          addReturn: !prev.addReturn,
                        }))
                      }
                      className={`w-10 h-5 rounded-full transition ${
                        form.addReturn ? "bg-black" : "bg-gray-300"
                      } relative`}
                    >
                      <div
                        className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition ${
                          form.addReturn ? "right-0.5" : "left-0.5"
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {form.addReturn && (
                  <Input
                    className="text-black! placeholder:text-black! py-5 shadow-md"
                    type="date"
                    value={form.returnDate}
                    onChange={(e) => handleChange(e, "returnDate")}
                  />
                )}

                <div className="flex shadow-md items-center justify-between border rounded-md px-3 py-3">
                  <span className="text-sm">Passengers</span>
                  <div className="flex items-center gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setForm((prev) => ({
                          ...prev,
                          passengers: Math.max(1, prev.passengers - 1),
                        }))
                      }
                    >
                      −
                    </Button>

                    <span className="w-5 text-center">{form.passengers}</span>

                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setForm((prev) => ({
                          ...prev,
                          passengers: Math.max(1, prev.passengers + 1),
                        }))
                      }
                    >
                      +
                    </Button>
                  </div>
                </div>
                <Button
                  type="button"
                  onClick={handleNext}
                  className="py-5 text-md w-full"
                >
                  Next
                </Button>
              </div>
            </motion.div>
          )}
        </form>
      )}
    </>
  );
}
