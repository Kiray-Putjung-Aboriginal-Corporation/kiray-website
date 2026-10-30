const DEFAULT_TIMEZONE = "Australia/Sydney";

const dayFormatter = new Intl.DateTimeFormat("en-AU", {
  timeZone: DEFAULT_TIMEZONE,
  weekday: "short",
  day: "numeric",
  month: "short",
  year: "numeric",
});

const timeFormatter = new Intl.DateTimeFormat("en-AU", {
  timeZone: DEFAULT_TIMEZONE,
  hour: "numeric",
  minute: "2-digit",
});

const monthFormatter = new Intl.DateTimeFormat("en-AU", {
  timeZone: DEFAULT_TIMEZONE,
  month: "short",
});

const dayNumberFormatter = new Intl.DateTimeFormat("en-AU", {
  timeZone: DEFAULT_TIMEZONE,
  day: "numeric",
});

export function formatEventDateRange(startDate: string, endDate: string) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const sameDay =
    start.toLocaleDateString("en-CA", {timeZone: DEFAULT_TIMEZONE}) ===
    end.toLocaleDateString("en-CA", {timeZone: DEFAULT_TIMEZONE});

  if (sameDay) {
    return dayFormatter.format(start) + ", " + timeFormatter.format(start) + "–" + timeFormatter.format(end);
  }

  return dayFormatter.format(start) + ", " + timeFormatter.format(start) + " – " + dayFormatter.format(end) + ", " + timeFormatter.format(end);
}

export function getEventDateParts(startDate: string) {
  const date = new Date(startDate);
  return {
    day: dayNumberFormatter.format(date),
    month: monthFormatter.format(date).toUpperCase(),
  };
}

export function formatRegistrationClosingDate(date: string) {
  return dayFormatter.format(new Date(date)) + " at " + timeFormatter.format(new Date(date));
}
