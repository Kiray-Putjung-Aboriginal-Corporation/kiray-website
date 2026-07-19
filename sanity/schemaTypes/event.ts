import {defineArrayMember, defineField, defineType} from "sanity";

export const eventType = defineType({
  name: "event",
  title: "Event",
  type: "document",
  groups: [
    {name: "details", title: "Event details", default: true},
    {name: "location", title: "Location"},
    {name: "registration", title: "Registration"},
    {name: "sponsors", title: "Sponsor acknowledgement"},
    {name: "afterEvent", title: "After the event"},
  ],
  fields: [
    defineField({
      name: "title",
      title: "Event title",
      type: "string",
      group: "details",
      validation: (Rule) => Rule.required().min(5).max(120),
    }),
    defineField({
      name: "slug",
      title: "Website address",
      description: "Generate this from the event title.",
      type: "slug",
      group: "details",
      options: {source: "title", maxLength: 96},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "summary",
      title: "Short summary",
      description: "Used on event cards and search results.",
      type: "text",
      rows: 3,
      group: "details",
      validation: (Rule) => Rule.required().min(20).max(240),
    }),
    defineField({
      name: "body",
      title: "Full event description",
      type: "blockContent",
      group: "details",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      group: "details",
      options: {
        list: [
          "Community",
          "Culture",
          "Education",
          "Youth",
          "Elders",
          "Fundraising",
          "Meeting",
          "Other",
        ],
      },
    }),
    defineField({
      name: "startDate",
      title: "Starts",
      type: "datetime",
      group: "details",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "endDate",
      title: "Ends",
      type: "datetime",
      group: "details",
      validation: (Rule) =>
        Rule.required().custom((endDate, context) => {
          const startDate = context.document?.startDate;
          if (typeof endDate !== "string" || typeof startDate !== "string") {
            return true;
          }

          return new Date(endDate) > new Date(startDate)
            ? true
            : "The end time must be after the start time.";
        }),
    }),
    defineField({
      name: "timezone",
      title: "Timezone",
      type: "string",
      group: "details",
      initialValue: "Australia/Sydney",
      options: {
        list: [{title: "Australia/Sydney", value: "Australia/Sydney"}],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "eventStatus",
      title: "Event status",
      type: "string",
      group: "details",
      initialValue: "scheduled",
      options: {
        layout: "radio",
        list: [
          {title: "Scheduled", value: "scheduled"},
          {title: "Postponed", value: "postponed"},
          {title: "Cancelled", value: "cancelled"},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "statusMessage",
      title: "Status message",
      description: "Explain what community members should know.",
      type: "text",
      rows: 3,
      group: "details",
      hidden: ({document}) => document?.eventStatus === "scheduled",
      validation: (Rule) =>
        Rule.custom((message, context) => {
          return context.document?.eventStatus === "scheduled" || message
            ? true
            : "Add a message explaining the event change.";
        }),
    }),
    defineField({
      name: "mainImage",
      title: "Main event image",
      type: "image",
      group: "details",
      options: {hotspot: true},
      fields: [
        defineField({
          name: "alt",
          title: "Alternative text",
          description: "Describe the image for people using screen readers.",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: "featured",
      title: "Feature this event",
      description: "Reserved for a future upcoming-events section on the home page.",
      type: "boolean",
      group: "details",
      initialValue: false,
    }),
    defineField({
      name: "locationType",
      title: "Location type",
      type: "string",
      group: "location",
      initialValue: "venue",
      options: {
        layout: "radio",
        list: [
          {title: "At a venue", value: "venue"},
          {title: "Online", value: "online"},
          {title: "To be announced", value: "tba"},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "venueName",
      title: "Venue name",
      type: "string",
      group: "location",
      hidden: ({document}) => document?.locationType !== "venue",
    }),
    defineField({
      name: "address",
      title: "Address",
      type: "text",
      rows: 2,
      group: "location",
      hidden: ({document}) => document?.locationType !== "venue",
    }),
    defineField({
      name: "mapUrl",
      title: "Map link",
      type: "url",
      group: "location",
      hidden: ({document}) => document?.locationType !== "venue",
      validation: (Rule) => Rule.uri({scheme: ["http", "https"]}),
    }),
    defineField({
      name: "onlineUrl",
      title: "Online event link",
      description: "Only publish a link here when it is safe for anyone to access.",
      type: "url",
      group: "location",
      hidden: ({document}) => document?.locationType !== "online",
      validation: (Rule) => Rule.uri({scheme: ["http", "https"]}),
    }),
    defineField({
      name: "registrationEnabled",
      title: "Show registration buttons",
      description: "Leave this off until event registration is ready.",
      type: "boolean",
      group: "registration",
      initialValue: false,
    }),
    defineField({
      name: "registrationClosingDate",
      title: "Registration closes",
      type: "datetime",
      group: "registration",
      hidden: ({document}) => !document?.registrationEnabled,
    }),
    defineField({
      name: "registrationLinks",
      title: "Registration buttons",
      description: "You can add more than one button when different booking options are needed.",
      type: "array",
      group: "registration",
      hidden: ({document}) => !document?.registrationEnabled,
      of: [
        defineArrayMember({
          name: "registrationLink",
          title: "Registration button",
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Button label",
              type: "string",
              validation: (Rule) => Rule.required().max(40),
            }),
            defineField({
              name: "url",
              title: "Registration URL",
              type: "url",
              validation: (Rule) =>
                Rule.required().uri({scheme: ["http", "https"]}),
            }),
          ],
          preview: {
            select: {title: "label", subtitle: "url"},
          },
        }),
      ],
      validation: (Rule) =>
        Rule.custom((links, context) => {
          if (!context.document?.registrationEnabled) {
            return true;
          }

          return Array.isArray(links) && links.length > 0
            ? true
            : "Add at least one registration button or turn registration off.";
        }),
    }),
    defineField({
      name: "sponsorAcknowledgement",
      title: "Sponsor acknowledgement",
      description: "Optional event-specific thanks shown above the selected sponsor logos.",
      type: "blockContent",
      group: "sponsors",
    }),
    defineField({
      name: "eventSponsors",
      title: "Event sponsors",
      description: "Select existing sponsors to recognise them on this event page.",
      type: "array",
      group: "sponsors",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{type: "sponsor"}],
        }),
      ],
      validation: (Rule) => Rule.unique(),
    }),
    defineField({
      name: "recap",
      title: "Event recap",
      description: "Add a write-up after the event has finished.",
      type: "blockContent",
      group: "afterEvent",
    }),
    defineField({
      name: "gallery",
      title: "Event gallery",
      type: "array",
      group: "afterEvent",
      of: [
        defineArrayMember({
          type: "image",
          options: {hotspot: true},
          fields: [
            defineField({
              name: "alt",
              title: "Alternative text",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "caption",
              title: "Caption",
              type: "string",
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      startDate: "startDate",
      status: "eventStatus",
      media: "mainImage",
    },
    prepare({title, startDate, status, media}) {
      const date = startDate
        ? new Intl.DateTimeFormat("en-AU", {
            day: "numeric",
            month: "short",
            year: "numeric",
          }).format(new Date(startDate))
        : "Date not set";

      return {
        title,
        subtitle: status === "scheduled" ? date : status + " — " + date,
        media,
      };
    },
  },
});
