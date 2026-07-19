import Image from "next/image";
import {
  PortableText,
  type PortableTextComponents,
} from "@portabletext/react";
import type {PortableTextBlock} from "@portabletext/types";
import {urlForImage} from "@/sanity/lib/image";

interface EventBodyProps {
  value?: PortableTextBlock[];
}

const components: PortableTextComponents = {
  block: {
    normal: ({children}) => <p className="my-5 leading-8 text-textSecondary">{children}</p>,
    h2: ({children}) => <h2 className="mb-4 mt-10 text-3xl font-extrabold text-textPrimary">{children}</h2>,
    h3: ({children}) => <h3 className="mb-3 mt-8 text-2xl font-extrabold text-textPrimary">{children}</h3>,
    blockquote: ({children}) => (
      <blockquote className="my-8 border-l-4 border-ochre pl-5 text-xl font-semibold italic leading-8 text-textSecondary">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({children}) => <ul className="my-5 list-disc space-y-2 pl-6 text-textSecondary">{children}</ul>,
    number: ({children}) => <ol className="my-5 list-decimal space-y-2 pl-6 text-textSecondary">{children}</ol>,
  },
  marks: {
    link: ({children, value}) => {
      const href = typeof value?.href === "string" ? value.href : "#";
      const external = href.startsWith("http");
      return (
        <a
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          className="font-semibold text-primary-button underline decoration-2 underline-offset-4 hover:text-accent"
        >
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({value}) => {
      if (!value?.asset) return null;
      const imageUrl = urlForImage(value).width(1200).url();

      return (
        <figure className="my-8">
          <div className="relative aspect-[16/10] overflow-hidden rounded-[1.5rem] bg-surface-muted">
            <Image src={imageUrl} alt={value.alt || ""} fill sizes="(min-width: 1024px) 760px, 100vw" className="object-cover" />
          </div>
          {value.caption && <figcaption className="mt-2 text-sm text-textMuted">{value.caption}</figcaption>}
        </figure>
      );
    },
  },
};

export function EventBody({value}: EventBodyProps) {
  if (!value?.length) {
    return null;
  }

  return <PortableText value={value} components={components} />;
}
