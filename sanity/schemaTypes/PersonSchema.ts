import { defineType, defineField } from "sanity";

export default defineType({
  name: "person",
  title: "Person",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Full Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "role",
      title: "Role",
      type: "string",
      options: {
        list: [
          { title: "Pilot", value: "pilot" },
          { title: "Co-Pilot", value: "co-pilot" },
          { title: "Cabin Crew", value: "cabin-crew" },
          { title: "Passenger", value: "passenger" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "age",
      title: "Age",
      type: "number",
    }),

    defineField({
      name: "gender",
      title: "Gender",
      type: "string",
      options: {
        list: ["Male", "Female", "Other"],
      },
    }),

    defineField({
      name: "nationality",
      title: "Nationality",
      type: "string",
    }),
  ],
});