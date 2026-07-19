import {sanityClient} from "@/sanity/lib/client";
import {activeSponsorsQuery} from "@/sanity/lib/queries";
import type {Sponsor} from "@/sanity/types/sponsor";

export async function getActiveSponsors(): Promise<Sponsor[]> {
  try {
    return await sanityClient.fetch<Sponsor[]>(
      activeSponsorsQuery,
      {},
      {next: {revalidate: 60}},
    );
  } catch (error) {
    console.error("Unable to load sponsors from Sanity.", error);
    return [];
  }
}
