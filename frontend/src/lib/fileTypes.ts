export type FileType = {
  label: string;
  monacoLanguage: string;
  colorVar: string;
  isText: boolean;
};

const TYPES_BY_EXTENSION: Record<string, FileType> = {
  html: { label: 'HTML', monacoLanguage: 'html', colorVar: '--color-filetype-html', isText: true },
  htm: { label: 'HTML', monacoLanguage: 'html', colorVar: '--color-filetype-html', isText: true },
  css: { label: 'CSS', monacoLanguage: 'css', colorVar: '--color-filetype-css', isText: true },
  js: { label: 'JS', monacoLanguage: 'javascript', colorVar: '--color-filetype-js', isText: true },
  mjs: { label: 'JS', monacoLanguage: 'javascript', colorVar: '--color-filetype-js', isText: true },
  cjs: { label: 'JS', monacoLanguage: 'javascript', colorVar: '--color-filetype-js', isText: true },
  jsx: { label: 'JS', monacoLanguage: 'javascript', colorVar: '--color-filetype-js', isText: true },
  ts: { label: 'TS', monacoLanguage: 'typescript', colorVar: '--color-filetype-ts', isText: true },
  tsx: { label: 'TS', monacoLanguage: 'typescript', colorVar: '--color-filetype-ts', isText: true },
  json: { label: 'JSON', monacoLanguage: 'json', colorVar: '--color-text-secondary', isText: true },
  sql: { label: 'SQL', monacoLanguage: 'sql', colorVar: '--color-accent-label', isText: true },
  md: { label: 'MD', monacoLanguage: 'markdown', colorVar: '--color-text-secondary', isText: true },
  svg: { label: 'SVG', monacoLanguage: 'xml', colorVar: '--color-status-success', isText: true },
  png: {
    label: 'IMG',
    monacoLanguage: 'plaintext',
    colorVar: '--color-status-success',
    isText: false,
  },
  jpg: {
    label: 'IMG',
    monacoLanguage: 'plaintext',
    colorVar: '--color-status-success',
    isText: false,
  },
  jpeg: {
    label: 'IMG',
    monacoLanguage: 'plaintext',
    colorVar: '--color-status-success',
    isText: false,
  },
  gif: {
    label: 'IMG',
    monacoLanguage: 'plaintext',
    colorVar: '--color-status-success',
    isText: false,
  },
  webp: {
    label: 'IMG',
    monacoLanguage: 'plaintext',
    colorVar: '--color-status-success',
    isText: false,
  },
};

const DEFAULT_TYPE: FileType = {
  label: 'TXT',
  monacoLanguage: 'plaintext',
  colorVar: '--color-text-dim',
  isText: true,
};

/** Match the last extension, case-insensitive. Files with no extension (e.g. `.env`) fall back to TXT. */
export function getFileType(path: string): FileType {
  const name = path.split('/').pop() ?? path;
  const dotIndex = name.lastIndexOf('.');
  if (dotIndex <= 0) return DEFAULT_TYPE;

  const extension = name.slice(dotIndex + 1).toLowerCase();
  return TYPES_BY_EXTENSION[extension] ?? DEFAULT_TYPE;
}
