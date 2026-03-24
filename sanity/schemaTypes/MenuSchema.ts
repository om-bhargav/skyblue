import { defineType, defineField } from "sanity";

export default defineType({
  name: "Menu",
  title: "Menu",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "mainBody",
      title: "Main Body",
      type: "array",
      of: [
        {
          type: "block", // rich text editor
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
  ],
});