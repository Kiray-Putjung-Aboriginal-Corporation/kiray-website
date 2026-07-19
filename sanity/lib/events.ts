import {cache} from "react";
import {sanityClient} from "@/sanity/lib/client";
import {
  eventBySlugQuery,
  previousEventCountQuery,
  previousEventDatesQuery,
  previousEventsQuery,
  upcomingEventsQuery,
} from "@/sanity/lib/queries";
import type {EventArchiveResult, KirayEvent} from "@/sanity/types/event";

export const EVENTS_PER_PAGE = 12;

interface ArchiveOptions {
  now: string;
  page: number;
  search: string;
  year?: number;
}

function getYearRange(year?: number) {
  if (!year) {
    return {yearStart: "", yearEnd: ""};
  }

  return {
    yearStart: new Date(Date.UTC(year, 0, 1)).toISOString(),
    yearEnd: new Date(Date.UTC(year + 1, 0, 1)).toISOString(),
  };
}

function getSearchPattern(search: string) {
  const terms = search
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((term) => term.replace(/[*?\\]/g, ""))
    .filter(Boolean);

  return terms.length > 0 ? terms.map((term) => "*" + term + "*").join(" ") : "";
}

export async function getUpcomingEvents(now: string): Promise<KirayEvent[]> {
  try {
    return await sanityClient.fetch<KirayEvent[]>(
      upcomingEventsQuery,
      {now},
      {next: {revalidate: 60}},
    );
  } catch (error) {
    console.error("Unable to load upcoming events from Sanity.", error);
    return [];
  }
}

export async function getPreviousEvents({
  now,
  page,
  search,
  year,
}: ArchiveOptions): Promise<EventArchiveResult> {
  const safePage = Math.max(1, page);
  const start = (safePage - 1) * EVENTS_PER_PAGE;
  const end = start + EVENTS_PER_PAGE;
  const yearRange = getYearRange(year);
  const params = {
    now,
    start,
    end,
    search: getSearchPattern(search),
    ...yearRange,
  };

  try {
    const [events, total] = await Promise.all([
      sanityClient.fetch<KirayEvent[]>(
        previousEventsQuery,
        params,
        {next: {revalidate: 60}},
      ),
      sanityClient.fetch<number>(
        previousEventCountQuery,
        params,
        {next: {revalidate: 60}},
      ),
    ]);

    const totalPages = Math.max(1, Math.ceil(total / EVENTS_PER_PAGE));

    if (safePage > totalPages && total > 0) {
      return getPreviousEvents({now, search, year, page: totalPages});
    }

    return {events, total, page: safePage, totalPages};
  } catch (error) {
    console.error("Unable to load previous events from Sanity.", error);
    return {events: [], total: 0, page: 1, totalPages: 1};
  }
}

export async function getPreviousEventYears(now: string): Promise<number[]> {
  try {
    const dates = await sanityClient.fetch<Array<{startDate?: string}>>(
      previousEventDatesQuery,
      {now},
      {next: {revalidate: 300}},
    );

    return Array.from(
      new Set(
        dates
          .map(({startDate}) => startDate ? new Date(startDate).getFullYear() : null)
          .filter((year): year is number => year !== null),
      ),
    ).sort((a, b) => b - a);
  } catch (error) {
    console.error("Unable to load event archive years from Sanity.", error);
    return [];
  }
}

export const getEventBySlug = cache(async (slug: string): Promise<KirayEvent | null> => {
  try {
    return await sanityClient.fetch<KirayEvent | null>(
      eventBySlugQuery,
      {slug},
      {next: {revalidate: 60}},
    );
  } catch (error) {
    console.error("Unable to load the event from Sanity.", error);
    return null;
  }
});
