import { describe, expect, it } from 'vitest';
import { DEFAULT_PRINT_OPTIONS, reportDocumentTitle } from './printReport';

describe('reportDocumentTitle', () => {
  it('names the file after the trainee and the IST calendar day', () => {
    expect(reportDocumentTitle('Asha Rao', new Date('2026-10-08T06:30:00.000Z'))).toBe(
      'Report – Asha Rao – 2026-10-08'
    );
  });

  it('uses the IST day just after midnight in India (still the previous day in UTC)', () => {
    // 00:30 IST on 9 Oct = 19:00 UTC on 8 Oct
    expect(reportDocumentTitle('Asha Rao', new Date('2026-10-08T19:00:00.000Z'))).toBe(
      'Report – Asha Rao – 2026-10-09'
    );
  });
});

describe('DEFAULT_PRINT_OPTIONS', () => {
  it('includes the journal and the flagged events', () => {
    expect(DEFAULT_PRINT_OPTIONS).toEqual({ includeJournal: true, includeFlags: true });
  });
});
