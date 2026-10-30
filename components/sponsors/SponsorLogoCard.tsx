import Image from "next/image";
import {urlForImage} from "@/sanity/lib/image";
import type {Sponsor} from "@/sanity/types/sponsor";

interface SponsorLogoCardProps {
  sponsor: Sponsor;
  compact?: boolean;
}

function SponsorCardContent({sponsor, compact}: SponsorLogoCardProps) {
  if (!sponsor.logo?.asset) {
    return null;
  }

  const imageUrl = urlForImage(sponsor.logo)
    .width(compact ? 420 : 640)
    .height(compact ? 240 : 360)
    .url();

  return (
    <>
      <div className={`relative w-full ${compact ? "h-28" : "h-36 sm:h-40"}`}>
        <Image
          src={imageUrl}
          alt={sponsor.logo.alt || sponsor.name}
          fill
          sizes={compact ? "(min-width: 640px) 220px, 44vw" : "(min-width: 1024px) 280px, (min-width: 640px) 33vw, 100vw"}
          className="object-contain"
        />
      </div>
      <p className={`font-extrabold text-textPrimary ${compact ? "mt-3 text-sm" : "mt-5"}`}>
        {sponsor.name}
      </p>
      {sponsor.websiteUrl && (
        <span className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-primary-button">
          Visit website <span aria-hidden="true">↗</span>
        </span>
      )}
    </>
  );
}

export function SponsorLogoCard({sponsor, compact = false}: SponsorLogoCardProps) {
  if (!sponsor.logo?.asset) {
    return null;
  }

  const classes = [
    "flex h-full flex-col items-center justify-center rounded-[1.5rem] border border-border bg-surface text-center shadow-[0_14px_38px_rgba(69,47,31,0.06)] transition duration-200",
    compact ? "p-4" : "p-6 sm:p-7",
    sponsor.websiteUrl ? "hover:-translate-y-1 hover:border-ochre hover:shadow-[0_18px_45px_rgba(69,47,31,0.12)] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-primary-button" : "",
  ].filter(Boolean).join(" ");

  if (sponsor.websiteUrl) {
    return (
      <a
        href={sponsor.websiteUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        aria-label={`Visit ${sponsor.name} website`}
      >
        <SponsorCardContent sponsor={sponsor} compact={compact} />
      </a>
    );
  }

  return (
    <article className={classes}>
      <SponsorCardContent sponsor={sponsor} compact={compact} />
    </article>
  );
}
