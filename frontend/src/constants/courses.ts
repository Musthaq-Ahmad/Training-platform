// Static, frontend-owned list of course tracks — the tab order/labels don't depend on the API.
// NOTE for reviewer: these `id`s must match whatever the backend eventually uses for course.id.

export type CurriculumCourse = {
  id: string;
  label: string;
};

export const CURRICULUM_COURSES: CurriculumCourse[] = [
  { id: 'course-html', label: 'HTML' },
  { id: 'course-css', label: 'CSS' },
  { id: 'course-js', label: 'JavaScript' },
  { id: 'course-ts', label: 'TypeScript' },
  { id: 'course-node', label: 'Node.js' },
  { id: 'course-postgresql', label: 'PostgreSQL' },
  { id: 'course-prisma', label: 'Prisma' },
  { id: 'course-react', label: 'React' },
];
