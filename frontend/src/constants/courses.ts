// Static, frontend-owned list of course tracks — the tab order/labels don't depend on the API.
// NOTE for reviewer: these `id`s must match whatever the backend eventually uses for course.id.

export type CurriculumCourse = {
  id: string;
  label: string;
};

export const CURRICULUM_COURSES: CurriculumCourse[] = [
  { id: 'html', label: 'HTML' },
  { id: 'css', label: 'CSS' },
  { id: 'js', label: 'JavaScript' },
  { id: 'ts', label: 'TypeScript' },
  { id: 'node', label: 'Node.js' },
  { id: 'postgresql', label: 'PostgreSQL' },
  { id: 'prisma', label: 'Prisma' },
  { id: 'react', label: 'React' },
];
