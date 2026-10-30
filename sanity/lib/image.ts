import {createImageUrlBuilder, type SanityImageSource} from "@sanity/image-url";
import {dataset, projectId} from "@/sanity/env";

const builder = createImageUrlBuilder({projectId, dataset});

export function urlForImage(source: unknown) {
  return builder.image(source as SanityImageSource).auto("format").fit("max");
}
