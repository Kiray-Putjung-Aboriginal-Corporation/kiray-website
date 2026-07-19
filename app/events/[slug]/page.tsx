import type {Metadata} from "next";
import Image from "next/image";
import Link from "next/link";
import {notFound} from "next/navigation";
import {EventBody} from "@/components/events/EventBody";
import {EventGallery} from "@/components/events/EventGallery";
import {EventRegistrationLinks} from "@/components/events/EventRegistrationLinks";
import {EventStatusBadge} from "@/components/events/EventStatusBadge";
import {ReminderSignupPanel} from "@/components/events/ReminderSignupPanel";
import {ButtonLink} from "@/components/ui/ButtonLink";
import {Container} from "@/components/ui/Container";
import {PageHero} from "@/components/ui/PageHero";
import {formatEventDateRange} from "@/sanity/lib/dates";
import {getEventBySlug} from "@/sanity/lib/events";
import {urlForImage} from "@/sanity/lib/image";

export const dynamic = "force-dynamic";

interface EventPageProps {
  params: Promise<{slug: string}>;
}

export async function generateMetadata({params}: EventPageProps): Promise<Metadata> {
  const {slug} = await params;
  const event = await getEventBySlug(slug);

  if (!event) {
    return {title: "Event not found"};
  }

  return {
    title: event.title,
    description: event.summary,
  };
}

function getLocationSummary(locationType: string, venueName?: string, address?: string) {
  if (locationType === "online") return "Online event";
  if (locationType === "tba") return "Location to be announced";
  return [venueName, address].filter(Boolean).join(", ") || "Venue details coming soon";
}

export default async function EventPage({params}: EventPageProps) {
  const {slug} = await params;
  const event = await getEventBySlug(slug);

  if (!event) {
    notFound();
  }

  const imageUrl = event.mainImage?.asset
    ? urlForImage(event.mainImage).width(1600).height(900).url()
    : null;
  const isPreviousEvent = new Date(event.endDate) < new Date();

  return (
    <>
      <PageHero
        eyebrow={isPreviousEvent ? "Previous event" : "Upcoming event"}
        title={event.title}
        description={event.summary}
      />

      <section className="bg-background py-12 sm:py-16">
        <Container>
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-sm font-bold text-primary-button hover:text-accent"
          >
            <span aria-hidden="true">←</span> Back to all events
          </Link>

          {imageUrl && (
            <div className="relative mt-7 aspect-[16/8] overflow-hidden rounded-[2rem] bg-surface-muted shadow-[0_20px_60px_rgba(69,47,31,0.12)]">
              <Image
                src={imageUrl}
                alt={event.mainImage?.alt || ""}
                fill
                priority
                sizes="(min-width: 1280px) 1180px, 100vw"
                className="object-cover"
              />
            </div>
          )}

          <div className="mt-10 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_22rem]">
            <div>
              {event.eventStatus !== "scheduled" && (
                <div className="mb-8 rounded-[1.5rem] border-2 border-accent bg-surface p-6">
                  <EventStatusBadge status={event.eventStatus} />
                  {event.statusMessage && (
                    <p className="mt-3 font-semibold leading-7 text-textPrimary">{event.statusMessage}</p>
                  )}
                </div>
              )}

              <div className="rounded-[1.75rem] border border-border bg-surface px-6 py-3 sm:px-8">
                <EventBody value={event.body} />
              </div>

              {isPreviousEvent && event.recap?.length ? (
                <section className="mt-10 rounded-[1.75rem] border border-border bg-surface p-6 sm:p-8" aria-labelledby="event-recap-heading">
                  <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-accent">Looking back</p>
                  <h2 id="event-recap-heading" className="mt-2 text-3xl font-extrabold text-textPrimary">Event recap</h2>
                  <EventBody value={event.recap} />
                </section>
              ) : null}

              <EventGallery images={event.gallery} />
            </div>

            <aside className="grid gap-6 lg:sticky lg:top-28">
              <section className="rounded-[1.75rem] border border-border bg-surface p-6 shadow-[0_16px_45px_rgba(69,47,31,0.06)]" aria-labelledby="event-details-heading">
                <h2 id="event-details-heading" className="text-2xl font-extrabold text-textPrimary">Event details</h2>
                <dl className="mt-5 grid gap-5">
                  <div>
                    <dt className="text-xs font-extrabold uppercase tracking-[0.15em] text-accent">Date and time</dt>
                    <dd className="mt-1 leading-7 text-textSecondary">{formatEventDateRange(event.startDate, event.endDate)}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-extrabold uppercase tracking-[0.15em] text-accent">Location</dt>
                    <dd className="mt-1 whitespace-pre-line leading-7 text-textSecondary">
                      {getLocationSummary(event.locationType, event.venueName, event.address)}
                    </dd>
                    {event.mapUrl && event.locationType === "venue" && (
                      <a href={event.mapUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block font-bold text-primary-button underline decoration-2 underline-offset-4 hover:text-accent">
                        View map
                      </a>
                    )}
                  </div>
                </dl>
              </section>

              <EventRegistrationLinks
                enabled={event.registrationEnabled}
                links={event.registrationLinks}
                closingDate={event.registrationClosingDate}
              />

              {!isPreviousEvent && (
                <ReminderSignupPanel eventTitle={event.title} />
              )}
            </aside>
          </div>

          <div className="mt-12">
            <ButtonLink href="/events" variant="outline">View all events</ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
