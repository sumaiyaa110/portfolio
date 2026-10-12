const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

/** "2025-03-14T00:00:00.000Z" becomes "14 Mar 2025". */
export function formatDate(iso: string) {
  return dateFormatter.format(new Date(iso));
}
