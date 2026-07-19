import {EventBody} from "@/components/events/EventBody";
import {SponsorLogoCard} from "@/components/sponsors/SponsorLogoCard";
import type {PortableTextBlock} from "@portabletext/types";
import type {Sponsor} from "@/sanity/types/sponsor";

interface EventSponsorAcknowledgementProps {
  acknowledgement?: PortableTextBlock[];
  sponsors?: Sponsor[];
}

export function EventSponsorAcknowledgement({
  acknowledgement,
  sponsors,
}: EventSponsorAcknowledgementProps) {
  const availableSponsors = sponsors?.filter((sponsor) => sponsor.logo?.asset) || [];

  if (!acknowledgement?.length && availableSponsors.length === 0) {
    return null;
  }

  return (
    <section
      className="mt-10 rounded-[1.75rem] border border-border bg-surface p-6 sm:p-8"
      aria-labelledby="event-sponsors-heading"
    >
      <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-accent">
        Sponsor acknowledgement
      </p>
      <h2 id="event-sponsors-heading" className="mt-2 text-3xl font-extrabold text-textPrimary">
        With thanks to our event sponsors
      </h2>

      {acknowledgement?.length ? (
        <div className="mt-2">
          <EventBody value={acknowledgement} />
        </div>
      ) : null}

      {availableSponsors.length > 0 && (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {availableSponsors.map((sponsor) => (
            <SponsorLogoCard key={sponsor._id} sponsor={sponsor} compact />
          ))}
        </div>
      )}
    </section>
  );
}
