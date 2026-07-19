import {ButtonLink} from "@/components/ui/ButtonLink";
import {formatRegistrationClosingDate} from "@/sanity/lib/dates";
import type {EventRegistrationLink} from "@/sanity/types/event";

interface EventRegistrationLinksProps {
  enabled?: boolean;
  links?: EventRegistrationLink[];
  closingDate?: string;
}

export function EventRegistrationLinks({
  enabled,
  links,
  closingDate,
}: EventRegistrationLinksProps) {
  if (!enabled || !links?.length) {
    return null;
  }

  return (
    <section className="rounded-[1.75rem] bg-primary-button p-6 text-textLight sm:p-8" aria-labelledby="event-registration-heading">
      <h2 id="event-registration-heading" className="text-2xl font-extrabold">
        Register for this event
      </h2>
      {closingDate && (
        <p className="mt-2 text-sm text-teal-50">
          Registration closes {formatRegistrationClosingDate(closingDate)}.
        </p>
      )}
      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        {links.map((link) => (
          <ButtonLink key={link._key} href={link.url} variant="light" external>
            {link.label}
          </ButtonLink>
        ))}
      </div>
    </section>
  );
}
