/** "Rahul Sharma" -> "RS"; a single name gives one letter; no name falls back to the email. */
export function getInitials(name: string, email: string): string {
  const words = name.trim().split(/\s+/).filter(Boolean);
  const source = words.length > 0 ? words : [email];
  const first = source[0]?.[0] ?? '';
  const last = source.length > 1 ? (source[source.length - 1]?.[0] ?? '') : '';
  return (first + last).toUpperCase();
}
