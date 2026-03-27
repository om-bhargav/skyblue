import { defineType, defineField } from "sanity";

export default defineType({
  name: "flightControl",
  title: "Flight Control",
  type: "document",
  fields: [
    defineField({
      name: "flightNumber",
      title: "Flight Number",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "flightName",
      title: "Flight Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    // 🧑‍✈️ Pilots
    defineField({
      name: "pilots",
      title: "Pilots",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "person" }],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),

    // 👩‍✈️ Cabin Crew
    defineField({
      name: "staff",
      title: "Cabin Crew",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "person" }],
        },
      ],
    }),

    // 🧍 Passengers
    defineField({
      name: "passengers",
      title: "Passengers",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "person" }],
        },
      ],
    }),

    // 🌍 Route
    defineField({
      name: "from",
      title: "From",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "to",
      title: "To",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    // ✈️ Aircraft Specifications
    defineField({
      name: "specifications",
      title: "Specifications",
      type: "object",
      fields: [
        defineField({
          name: "maximumOperatingRange",
          title: "Maximum Operating Range (KM)",
          type: "number",
        }),
        defineField({
          name: "speed",
          title: "Speed (Knots)",
          type: "number",
        }),
        defineField({
          name: "passengerCapacity",
          title: "Passenger Capacity",
          type: "string", // keeping string because of "+1 cabin server"
        }),
        defineField({
          name: "endurance",
          title: "Endurance (hrs)",
          type: "string",
        }),
        defineField({
          name: "baggageCapacity",
          title: "Baggage Capacity (m³)",
          type: "number",
        }),
        defineField({
          name: "cruisingAltitude",
          title: "Cruising Altitude (m)",
          type: "number",
        }),

        // Cabin Specs
        defineField({
          name: "cabinLength",
          title: "Cabin Length (m)",
          type: "number",
        }),
        defineField({
          name: "cabinWidth",
          title: "Cabin Width (m)",
          type: "number",
        }),
        defineField({
          name: "cabinHeight",
          title: "Cabin Height (m)",
          type: "number",
        }),
      ],
    }),
  ],
});