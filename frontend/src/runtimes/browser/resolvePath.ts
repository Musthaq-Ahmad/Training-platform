// Any URL scheme (https:, data:, mailto:, javascript:, …) or a protocol-relative //host
const EXTERNAL_REF = /^([a-z][a-z\d+.-]*:|\/\/)/i;

/**
 * Turns a reference inside a workspace file (href, src, url(), import) into a workspace path.
 * Returns null for anything that isn't a workspace file, or that climbs above the root.
 */
export function resolvePath(fromFile: string, ref: string): string | null {
  const trimmed = ref.trim();
  if (trimmed === '' || trimmed.startsWith('#') || EXTERNAL_REF.test(trimmed)) return null;

  const withoutSuffix = trimmed.split(/[?#]/)[0];
  if (withoutSuffix === '') return null;

  let decoded = withoutSuffix;
  try {
    decoded = decodeURIComponent(withoutSuffix);
  } catch {
    // a stray % — keep the text as written
  }

  const parts = decoded.startsWith('/') ? [] : fromFile.split('/').slice(0, -1);
  for (const segment of decoded.split('/')) {
    if (segment === '' || segment === '.') continue;
    if (segment === '..') {
      if (parts.length === 0) return null;
      parts.pop();
    } else {
      parts.push(segment);
    }
  }

  return parts.length > 0 ? parts.join('/') : null;
}
