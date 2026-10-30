import {defineField, defineType} from "sanity";

export const sponsorType = defineType({
  name: "sponsor",
  title: "Sponsor",
  type: "document",
  groups: [
    {name: "details", title: "Sponsor details", default: true},
    {name: "display", title: "Website display"},
  ],
  fields: [
    defineField({
      name: "name",
      title: "Sponsor name",
      type: "string",
      group: "details",
      validation: (Rule) => Rule.required().min(2).max(120),
    }),
    defineField({
      name: "logo",
      title: "Sponsor logo",
      type: "image",
      group: "details",
      options: {hotspot: true},
      fields: [
        defineField({
          name: "alt",
          title: "Alternative text",
          description: "Usually the sponsor's full organisation name.",
          type: "string",
          validation: (Rule) => Rule.required().max(160),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "websiteUrl",
      title: "Sponsor website",
      description: "The sponsor's logo will link to this address when provided.",
      type: "url",
      group: "details",
      validation: (Rule) => Rule.uri({scheme: ["http", "https"]}),
    }),
    defineField({
      name: "tier",
      title: "Sponsor tier",
      type: "reference",
      group: "display",
      to: [{type: "sponsorTier"}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "sortOrder",
      title: "Order within tier",
      description: "Lower numbers appear first. Use this to override the alphabetical order within the tier.",
      type: "number",
      group: "display",
      initialValue: 100,
      validation: (Rule) => Rule.required().integer().min(0),
    }),
    defineField({
      name: "showOnSponsorsPage",
      title: "Show on Sponsors page",
      description: "Turn this off for former sponsors. Historical event acknowledgements will remain visible.",
      type: "boolean",
      group: "display",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: "name",
      tier: "tier.name",
      order: "sortOrder",
      media: "logo",
      visible: "showOnSponsorsPage",
    },
    prepare({title, tier, order, media, visible}) {
      return {
        title,
        subtitle: `${tier || "Tier not set"} · order ${order ?? 100}${visible === false ? " · hidden" : ""}`,
        media,
      };
    },
  },
});
