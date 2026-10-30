import Image from "next/image";
import {ButtonLink} from "@/components/ui/ButtonLink";
import {EventStatusBadge} from "@/components/events/EventStatusBadge";
import {formatEventDateRange, getEventDateParts} from "@/sanity/lib/dates";
import {urlForImage} from "@/sanity/lib/image";
import type {KirayEvent} from "@/sanity/types/event";

interface EventCardProps {
  event: KirayEvent;
}

function getLocationLabel(event: KirayEvent) {
  if (event.locationType === "online") {
    return "Online event";
  }

  if (event.locationType === "tba") {
    return "Location to be announced";
  }

  return event.venueName || event.address || "Venue details coming soon";
}

export function EventCard({event}: EventCardProps) {
  const date = getEventDateParts(event.startDate);
  const imageUrl = event.mainImage?.asset
    ? urlForImage(event.mainImage).width(900).height(560).url()
    : null;

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-border bg-surface shadow-[0_16px_45px_rgba(69,47,31,0.07)]">
      <div className="relative aspect-[16/10] overflow-hidden bg-surface-muted">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={event.mainImage?.alt || ""}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        ) : (
          <div className="grid h-full place-items-center" aria-hidden="true">
            <div className="grid size-24 place-items-center rounded-full border-4 border-dotted border-ochre text-3xl font-black text-accent">
              K
            </div>
          </div>
        )}

        <div className="absolute left-5 top-5 grid min-w-16 place-items-center rounded-2xl bg-surface px-3 py-2 text-center shadow-lg">
          <span className="text-xs font-black tracking-[0.12em] text-accent">{date.month}</span>
          <span className="text-2xl font-black leading-none text-textPrimary">{date.day}</span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-2">
          {event.category && (
            <span className="text-xs font-extrabold uppercase tracking-[0.15em] text-primary-button">
              {event.category}
            </span>
          )}
          <EventStatusBadge status={event.eventStatus} />
        </div>

        <h3 className="mt-3 text-2xl font-extrabold leading-tight text-textPrimary">
          {event.title}
        </h3>
        <p className="mt-3 text-sm font-semibold leading-6 text-textSecondary">
          {formatEventDateRange(event.startDate, event.endDate)}
        </p>
        <p className="mt-1 text-sm leading-6 text-textMuted">{getLocationLabel(event)}</p>
        <p className="mt-4 line-clamp-3 leading-7 text-textSecondary">{event.summary}</p>

        <div className="mt-auto pt-6">
          <ButtonLink href={"/events/" + event.slug} variant="outline" className="w-full sm:w-auto">
            View event
          </ButtonLink>
        </div>
      </div>
    </article>
  );
}
