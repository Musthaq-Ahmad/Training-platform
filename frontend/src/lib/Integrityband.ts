export type IntegrityBand = 'high' | 'mid' | 'low';

/** Score thresholds for the badge colour. Display only: nothing else depends on these. */
export const INTEGRITY_HIGH_MIN = 90;
export const INTEGRITY_MID_MIN = 75;

/** 90-100 -> high, 75-89 -> mid, 0-74 -> low. `null` (no score yet) -> null, so the badge stays neutral. */
export function getIntegrityBand(score: number | null): IntegrityBand | null {
  if (score === null) return null;
  if (score >= INTEGRITY_HIGH_MIN) return 'high';
  if (score >= INTEGRITY_MID_MIN) return 'mid';
  return 'low';
}
