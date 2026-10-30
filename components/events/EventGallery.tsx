import {EventGalleryCarousel} from "@/components/events/EventGalleryCarousel";
import {urlForImage} from "@/sanity/lib/image";
import type {EventImage} from "@/sanity/types/event";

interface EventGalleryProps {
  images?: EventImage[];
}

export function EventGallery({images}: EventGalleryProps) {
  const availableImages = images?.filter((image) => image.asset?._id || image.asset?.url) || [];
  if (availableImages.length === 0) {
    return null;
  }

  // Build from the asset so the gallery shows the whole photograph, including
  // portrait images, independently of a crop chosen in Sanity.
  return <EventGalleryCarousel images={availableImages.map((image, index) => ({
    key: image._key || String(index),
    src: urlForImage(image.asset).width(1600).url(),
    largeSrc: urlForImage(image.asset).width(2400).url(),
    thumbnailSrc: urlForImage(image.asset).width(192).url(),
    alt: image.alt || "",
    caption: image.caption,
  }))} />;
}
