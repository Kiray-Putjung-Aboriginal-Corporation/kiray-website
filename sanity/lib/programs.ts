import {sanityClient} from "@/sanity/lib/client";
import {visibleProgramsQuery} from "@/sanity/lib/queries";
import type {Program} from "@/sanity/types/program";

export async function getVisiblePrograms(): Promise<Program[] | null> {
  try {
    return await sanityClient.fetch<Program[]>(
      visibleProgramsQuery,
      {},
      {useCdn: false, perspective: "published", next: {revalidate: 60}},
    );
  } catch {
    // Do not log response bodies, credentials or unpublished content.
    console.error("Unable to load programs from Sanity.");
    return null;
  }
}
