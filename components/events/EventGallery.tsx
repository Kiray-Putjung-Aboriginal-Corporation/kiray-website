import Image from "next/image";
import {urlForImage} from "@/sanity/lib/image";
import type {EventImage} from "@/sanity/types/event";

interface EventGalleryProps {
  images?: EventImage[];
}

export function EventGallery({images}: EventGalleryProps) {
  const availableImages = images?.filter((image) => image.asset) || [];
  if (availableImages.length === 0) {
    return null;
  }

  return (
    <section className="mt-14" aria-labelledby="event-gallery-heading">
      <h2 id="event-gallery-heading" className="text-3xl font-extrabold text-textPrimary">Event gallery</h2>
      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        {availableImages.map((image, index) => (
          <figure key={image._key || index}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-surface-muted">
              <Image
                src={urlForImage(image).width(900).height(675).url()}
                alt={image.alt || ""}
                fill
                sizes="(min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            {image.caption && <figcaption className="mt-2 text-sm text-textMuted">{image.caption}</figcaption>}
          </figure>
        ))}
      </div>
    </section>
  );
}
