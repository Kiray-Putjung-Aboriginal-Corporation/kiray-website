import {SponsorTierSection} from "@/components/sponsors/SponsorTierSection";
import type {Sponsor} from "@/sanity/types/sponsor";

interface SponsorDirectoryProps {
  sponsors: Sponsor[];
}

interface SponsorGroup {
  id: string;
  name: string;
  description?: string;
  sponsors: Sponsor[];
}

function groupSponsors(sponsors: Sponsor[]) {
  const groups = new Map<string, SponsorGroup>();

  sponsors.forEach((sponsor) => {
    const id = sponsor.tier?._id || "supporters";
    const existing = groups.get(id);

    if (existing) {
      existing.sponsors.push(sponsor);
      return;
    }

    groups.set(id, {
      id,
      name: sponsor.tier?.name || "Community supporters",
      description: sponsor.tier?.description,
      sponsors: [sponsor],
    });
  });

  return Array.from(groups.values());
}

export function SponsorDirectory({sponsors}: SponsorDirectoryProps) {
  const groups = groupSponsors(sponsors);

  return (
    <div className="grid gap-14">
      {groups.map((group, index) => (
        <SponsorTierSection
          key={group.id}
          name={group.name}
          description={group.description}
          sponsors={group.sponsors}
          index={index}
        />
      ))}
    </div>
  );
}
