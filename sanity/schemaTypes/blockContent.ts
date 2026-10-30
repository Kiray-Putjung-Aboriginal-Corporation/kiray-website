import {defineArrayMember, defineType} from "sanity";

export const blockContentType = defineType({
  name: "blockContent",
  title: "Page content",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        {title: "Normal", value: "normal"},
        {title: "Heading 2", value: "h2"},
        {title: "Heading 3", value: "h3"},
        {title: "Quote", value: "blockquote"},
      ],
      lists: [
        {title: "Bullets", value: "bullet"},
        {title: "Numbered", value: "number"},
      ],
      marks: {
        decorators: [
          {title: "Strong", value: "strong"},
          {title: "Emphasis", value: "em"},
        ],
        annotations: [
          {
            name: "link",
            title: "Link",
            type: "object",
            fields: [
              {
                name: "href",
                title: "URL",
                type: "url",
                validation: (Rule) =>
                  Rule.uri({allowRelative: true, scheme: ["http", "https", "mailto", "tel"]}),
              },
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: "image",
      title: "Image",
      options: {hotspot: true},
      fields: [
        {
          name: "alt",
          title: "Alternative text",
          description: "Describe the image for people using screen readers.",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "caption",
          title: "Caption",
          type: "string",
        },
      ],
    }),
  ],
});
