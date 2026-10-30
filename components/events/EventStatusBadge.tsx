import type {EventStatus} from "@/sanity/types/event";

interface EventStatusBadgeProps {
  status: EventStatus;
}

const labels: Record<EventStatus, string> = {
  scheduled: "Scheduled",
  postponed: "Postponed",
  cancelled: "Cancelled",
};

export function EventStatusBadge({status}: EventStatusBadgeProps) {
  if (status === "scheduled") {
    return null;
  }

  const tone = status === "cancelled"
    ? "bg-accent text-textLight"
    : "bg-ochre text-textPrimary";

  return (
    <span className={"inline-flex rounded-full px-3 py-1 text-xs font-black uppercase tracking-[0.12em] " + tone}>
      {labels[status]}
    </span>
  );
}
