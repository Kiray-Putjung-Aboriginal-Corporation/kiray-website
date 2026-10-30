import type {Metadata} from "next";
import {EventArchiveSearch} from "@/components/events/EventArchiveSearch";
import {EventCard} from "@/components/events/EventCard";
import {EventPagination} from "@/components/events/EventPagination";
import {ButtonLink} from "@/components/ui/ButtonLink";
import {Container} from "@/components/ui/Container";
import {PageHero} from "@/components/ui/PageHero";
import {SectionHeading} from "@/components/ui/SectionHeading";
import {
  getPreviousEvents,
  getPreviousEventYears,
  getUpcomingEvents,
} from "@/sanity/lib/events";

export const metadata: Metadata = {
  title: "Events",
  description: "Find upcoming Kiray Putjung activities and browse previous community events.",
};

export const dynamic = "force-dynamic";

interface EventsPageProps {
  searchParams: Promise<{
    q?: string | string[];
    year?: string | string[];
    page?: string | string[];
  }>;
}

function getSingleParam(value?: string | string[]) {
  return Array.isArray(value) ? value[0] || "" : value || "";
}

function parsePositiveInteger(value: string, fallback: number) {
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

export default async function EventsPage({searchParams}: EventsPageProps) {
  const params = await searchParams;
  const search = getSingleParam(params.q).trim().slice(0, 80);
  const yearValue = getSingleParam(params.year);
  const parsedYear = parsePositiveInteger(yearValue, 0);
  const currentYear = new Date().getFullYear();
  const year =
    parsedYear >= 2000 && parsedYear <= currentYear
      ? parsedYear
      : undefined;
  const page = parsePositiveInteger(getSingleParam(params.page), 1);
  const now = new Date().toISOString();

  const [upcomingEvents, archive, archiveYears] = await Promise.all([
    getUpcomingEvents(now),
    getPreviousEvents({now, page, search, year}),
    getPreviousEventYears(now),
  ]);

  return (
    <>
      <PageHero
        eyebrow="Events"
        title="Come together with community"
        description="Find upcoming Kiray Putjung activities, cultural programs and community events, or look back through previous events."
      />

      <section className="bg-background py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="What’s coming up"
            title="Upcoming events"
            description="Events appear here as soon as the Kiray team publishes them."
          />

          {upcomingEvents.length > 0 ? (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {upcomingEvents.map((event) => (
                <EventCard event={event} key={event._id} />
              ))}
            </div>
          ) : (
            <div className="mt-8 rounded-[2rem] border border-border bg-surface p-8 text-center shadow-[0_16px_45px_rgba(69,47,31,0.06)] sm:p-12">
              <div className="mx-auto grid size-20 place-items-center rounded-full border-4 border-dotted border-ochre text-2xl font-black text-accent" aria-hidden="true">
                K
              </div>
              <h2 className="mt-6 text-3xl font-extrabold text-textPrimary">
                No upcoming events have been published yet
              </h2>
              <p className="mx-auto mt-4 max-w-2xl leading-7 text-textSecondary">
                Please check back soon or contact Kiray Putjung if you would like to ask about upcoming community activities.
              </p>
              <div className="mt-7">
                <ButtonLink href="/contact" variant="outline">Contact Kiray</ButtonLink>
              </div>
            </div>
          )}
        </Container>
      </section>

      <section id="previous-events" className="scroll-mt-28 bg-surface py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="Our event archive"
            title="Previous events"
            description="Search by event name, description or venue, filter by year, and step back through Kiray Putjung’s event history."
          />

          <div className="mt-8">
            <EventArchiveSearch
              search={search}
              selectedYear={year}
              years={archiveYears}
            />
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm font-bold text-textSecondary" aria-live="polite">
              {archive.total === 1
                ? "1 previous event found"
                : archive.total + " previous events found"}
            </p>
            {archive.totalPages > 1 && (
              <p className="text-sm text-textMuted">
                Page {archive.page} of {archive.totalPages}
              </p>
            )}
          </div>

          {archive.events.length > 0 ? (
            <>
              <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {archive.events.map((event) => (
                  <EventCard event={event} key={event._id} />
                ))}
              </div>
              <EventPagination
                currentPage={archive.page}
                totalPages={archive.totalPages}
                search={search}
                year={year}
              />
            </>
          ) : (
            <div className="mt-5 rounded-[1.75rem] border border-border bg-background p-8 text-center">
              <h3 className="text-2xl font-extrabold text-textPrimary">
                {search || year ? "No events match those filters" : "No previous events have been added yet"}
              </h3>
              <p className="mx-auto mt-3 max-w-xl leading-7 text-textSecondary">
                {search || year
                  ? "Try another search term, choose a different year or clear the filters."
                  : "Past events and community galleries will appear here after they are published."}
              </p>
              {(search || year) && (
                <div className="mt-6">
                  <ButtonLink href="/events#previous-events" variant="outline">Clear filters</ButtonLink>
                </div>
              )}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
