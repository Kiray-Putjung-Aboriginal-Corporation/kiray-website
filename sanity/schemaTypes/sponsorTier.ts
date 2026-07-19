import {defineField, defineType} from "sanity";

export const sponsorTierType = defineType({
  name: "sponsorTier",
  title: "Sponsor tier",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Tier name",
      description: "Examples: Principal Partner, Major Sponsor or Community Partner.",
      type: "string",
      validation: (Rule) => Rule.required().min(2).max(80),
    }),
    defineField({
      name: "slug",
      title: "Internal identifier",
      description: "Generate this from the tier name. It is not shown publicly.",
      type: "slug",
      options: {source: "name", maxLength: 80},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Public description",
      description: "Optional text shown beneath this tier on the Sponsors page.",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.max(240),
    }),
    defineField({
      name: "sortOrder",
      title: "Tier order",
      description: "Lower numbers appear first. Leave gaps such as 10, 20 and 30 for easy reordering.",
      type: "number",
      initialValue: 100,
      validation: (Rule) => Rule.required().integer().min(0),
    }),
  ],
  preview: {
    select: {title: "name", order: "sortOrder"},
    prepare({title, order}) {
      return {
        title,
        subtitle: `Tier order: ${order ?? 100}`,
      };
    },
  },
});
