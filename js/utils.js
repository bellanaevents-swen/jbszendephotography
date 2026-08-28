export function formatDate(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  }).format(date);
}
export function truncateText(text, maxLength = 100) {
  if (!text || text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}
export const LOCATION_HUB = "Odorheiu Secuiesc, Harghita, Romania";
export const COPYRIGHT_NOTICE = "\xA9 2026 SwenTech. All rights reserved.";
