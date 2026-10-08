import { afterEach, beforeEach, describe, expect, it, vi, type MockInstance } from 'vitest';
import { csvFilename, downloadCsv } from './downloadCsv';

describe('csvFilename', () => {
  it('is vinkup-trainees-YYYY-MM-DD.csv', () => {
    expect(csvFilename(new Date('2026-10-08T06:00:00.000Z'))).toBe(
      'vinkup-trainees-2026-10-08.csv'
    );
  });

  it("uses the platform's calendar day (Asia/Kolkata), not the machine's", () => {
    // 20:00 UTC on the 8th is already 01:30 on the 9th in India.
    expect(csvFilename(new Date('2026-10-08T20:00:00.000Z'))).toBe(
      'vinkup-trainees-2026-10-09.csv'
    );
  });
});

describe('downloadCsv', () => {
  const createObjectURL = vi.fn((_blob: Blob) => 'blob:vinkup/123');
  const revokeObjectURL = vi.fn();
  let clickSpy: MockInstance<() => void>;
  let wasInPageWhenClicked: boolean;

  beforeEach(() => {
    wasInPageWhenClicked = false;
    Object.defineProperty(URL, 'createObjectURL', { configurable: true, value: createObjectURL });
    Object.defineProperty(URL, 'revokeObjectURL', { configurable: true, value: revokeObjectURL });
    clickSpy = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(function (
      this: HTMLAnchorElement
    ) {
      wasInPageWhenClicked = document.body.contains(this);
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
    createObjectURL.mockClear();
    revokeObjectURL.mockClear();
  });

  it('makes a text/csv blob with the csv in it', async () => {
    downloadCsv('Name,Email\nAsha,a@b.c', 'x.csv');

    const blob = createObjectURL.mock.calls[0][0];
    expect(blob.type).toBe('text/csv');
    expect(await blob.text()).toBe('Name,Email\nAsha,a@b.c');
  });

  it('starts the file with a UTF-8 byte-order mark so Excel reads · and — correctly', async () => {
    downloadCsv('Day 3 — Functions', 'x.csv');

    const bytes = new Uint8Array(await createObjectURL.mock.calls[0][0].arrayBuffer());
    expect([...bytes.slice(0, 3)]).toEqual([0xef, 0xbb, 0xbf]);
    expect(new TextDecoder().decode(bytes.slice(3))).toBe('Day 3 — Functions');
  });

  it('clicks a temporary link with the filename, then removes it', () => {
    downloadCsv('a', 'vinkup-trainees-2026-10-08.csv');

    expect(clickSpy).toHaveBeenCalledTimes(1);
    const link = clickSpy.mock.contexts[0] as HTMLAnchorElement;
    expect(link.download).toBe('vinkup-trainees-2026-10-08.csv');
    expect(link.getAttribute('href')).toBe('blob:vinkup/123');
    expect(wasInPageWhenClicked).toBe(true);
    expect(document.querySelector('a[download]')).toBeNull();
  });

  it('releases the blob URL afterwards', () => {
    downloadCsv('a', 'x.csv');

    expect(revokeObjectURL).toHaveBeenCalledWith('blob:vinkup/123');
  });
});
