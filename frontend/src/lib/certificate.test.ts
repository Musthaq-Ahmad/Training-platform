import { describe, expect, it } from 'vitest';
import { certificateDocumentTitle, formatCertificateDate, formatDayCount } from './certificate';

describe('certificate helpers', () => {
  it('formats the date like "6 October 2026"', () => {
    expect(formatCertificateDate('2026-10-06T09:00:00.000Z')).toBe('6 October 2026');
  });

  it('uses the platform calendar day (Asia/Kolkata)', () => {
    // 20:00 UTC on the 5th is already the 6th in India.
    expect(formatCertificateDate('2026-10-05T20:00:00.000Z')).toBe('6 October 2026');
  });

  it('pluralises the day count', () => {
    expect(formatDayCount(1)).toBe('1 day');
    expect(formatDayCount(15)).toBe('15 days');
  });

  it('builds the PDF file name', () => {
    expect(certificateDocumentTitle('CSS', 'Asha Rao')).toBe('Vinkup certificate - CSS - Asha Rao');
  });
});
