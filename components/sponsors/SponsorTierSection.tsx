import {SponsorLogoCard} from "@/components/sponsors/SponsorLogoCard";
import type {Sponsor} from "@/sanity/types/sponsor";

interface SponsorTierSectionProps {
  name: string;
  description?: string;
  sponsors: Sponsor[];
  index: number;
}

export function SponsorTierSection({
  name,
  description,
  sponsors,
  index,
}: SponsorTierSectionProps) {
  const headingId = `sponsor-tier-${index}`;

  return (
    <section aria-labelledby={headingId} className="border-t border-border pt-10 first:border-t-0 first:pt-0">
      <div className="max-w-3xl">
        <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-accent">
          Sponsor tier
        </p>
        <h2 id={headingId} className="mt-2 text-3xl font-extrabold text-textPrimary sm:text-4xl">
          {name}
        </h2>
        {description && (
          <p className="mt-3 leading-7 text-textSecondary">{description}</p>
        )}
      </div>

      <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {sponsors.map((sponsor) => (
          <SponsorLogoCard key={sponsor._id} sponsor={sponsor} />
        ))}
      </div>
    </section>
  );
}
