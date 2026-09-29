// frontend/src/content/types.ts

export type CodeBlock = {
  filename: string;
  language: string;
  code: string;
};

export type Callout = {
  variant: 'info' | 'warning';
  title: string;
  body: string;
};

export type ContentBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'subheading'; level: 3 | 4 | 5 | 6; text: string }
  | { type: 'image'; src: string; alt: string }
  | { type: 'code'; code: CodeBlock }
  | { type: 'callout'; callout: Callout }
  | { type: 'list'; ordered: boolean; start?: number; items: string[] }
  | { type: 'definitions'; items: { term: string; description: string }[] }
  | { type: 'table'; headers: string[]; rows: string[][] }
  | { type: 'htmlTable'; html: string };

export type ContentTopic = {
  id: string;
  heading: string;
  blocks: ContentBlock[];
  sourceUrl?: string;
};

export type ReferenceVideo = {
  title: string;
  embedUrl: string;
};

export type DayReferenceResource = {
  name: string;
  url: string;
  description: string;
};
export type DayReferenceConfig = {
  id: string;
  courseId: string;
  dayNumber: number;
  videos?: ReferenceVideo[];
  videoAfterTopicId?: string;
  videoAtStart?: boolean;
  resources?: DayReferenceResource[];
  topicIds: string[];
};

export type ResolvedSection = ContentTopic & {
  number: number;
};

export type DayReferenceContent = {
  courseId: string;
  dayNumber: number;
  videos?: ReferenceVideo[];
  videoAfterTopicId?: string;
  sections: ResolvedSection[];
  videoAtStart?: boolean;
};
