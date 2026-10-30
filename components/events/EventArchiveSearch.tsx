import {Button} from "@/components/ui/Button";
import {ButtonLink} from "@/components/ui/ButtonLink";

interface EventArchiveSearchProps {
  search: string;
  selectedYear?: number;
  years: number[];
}

export function EventArchiveSearch({
  search,
  selectedYear,
  years,
}: EventArchiveSearchProps) {
  return (
    <form
      action="/events#previous-events"
      method="get"
      className="grid gap-4 rounded-[1.5rem] border border-border bg-background p-5 sm:grid-cols-[1fr_12rem_auto] sm:items-end"
    >
      <label className="grid gap-2 text-sm font-bold text-textPrimary">
        Search previous events
        <input
          type="search"
          name="q"
          defaultValue={search}
          placeholder="Search by title, venue or description"
          className="min-h-12 rounded-xl border border-border bg-surface px-4 text-base font-normal text-textPrimary outline-none transition placeholder:text-textMuted focus:border-primary-button focus:ring-3 focus:ring-primary-button/15"
        />
      </label>

      <label className="grid gap-2 text-sm font-bold text-textPrimary">
        Year
        <select
          name="year"
          defaultValue={selectedYear || ""}
          className="min-h-12 rounded-xl border border-border bg-surface px-4 text-base font-normal text-textPrimary outline-none transition focus:border-primary-button focus:ring-3 focus:ring-primary-button/15"
        >
          <option value="">All years</option>
          {years.map((year) => (
            <option value={year} key={year}>{year}</option>
          ))}
        </select>
      </label>

      <div className="flex flex-col gap-2 sm:flex-row">
        <Button type="submit">Search</Button>
        {(search || selectedYear) && (
          <ButtonLink href="/events#previous-events" variant="outline">Clear</ButtonLink>
        )}
      </div>
    </form>
  );
}
