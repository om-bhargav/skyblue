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

    // 🧑‍✈️ Pilots (exactly 2)
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
  ],
});