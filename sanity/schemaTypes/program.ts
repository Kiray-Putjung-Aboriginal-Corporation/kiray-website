import {defineField, defineType} from "sanity";

export const programType = defineType({
  name: "program",
  title: "Program",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Program name",
      type: "string",
      validation: (Rule) => Rule.required().min(2).max(120).custom(
        (value) => !value || value.trim().length >= 2 || "Enter a program name.",
      ),
    }),
    defineField({
      name: "description",
      title: "Description",
      description: "The plain-text description shown on the program card. Use approved public wording.",
      type: "text",
      rows: 5,
      validation: (Rule) => Rule.required().min(10).max(1000).custom(
        (value) => !value || value.trim().length >= 10 || "Enter a description of at least 10 characters.",
      ),
    }),
    defineField({
      name: "sortOrder",
      title: "Display order",
      description: "Lower numbers appear first. Use 10, 20, 30 and so on to leave room between programs.",
      type: "number",
      initialValue: 100,
      validation: (Rule) => Rule.required().integer().min(0),
    }),
    defineField({
      name: "showOnWebsite",
      title: "Show on website",
      description: "Turn off and publish to hide this program. Turn on and publish to restore it. Keep the record for later use.",
      type: "boolean",
      initialValue: true,
      validation: (Rule) => Rule.required(),
    }),
  ],
  orderings: [{
    title: "Website order",
    name: "websiteOrder",
    by: [{field: "sortOrder", direction: "asc"}, {field: "name", direction: "asc"}],
  }],
  preview: {
    select: {title: "name", order: "sortOrder", visible: "showOnWebsite"},
    prepare({title, order, visible}) {
      return {
        title,
        subtitle: `Order ${order ?? 100} · ${visible === true ? "Shown when published" : "Hidden from website"}`,
      };
    },
  },
});
