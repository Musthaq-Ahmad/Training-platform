// Builds backend/prisma/seed-data/curriculum.json from the frontend's curriculum data:
// - day content: frontend/src/api/dayOverview (title, objectives, checklist, journal prompt)
// - tasks: frontend/src/api/mockTasks/catalog (the Phase 1 and Phase 2 trainee guides)
// - runtime, run command, setup SQL, starter files: frontend/src/api/mockTasks/starters.ts
//
// Run from the repo root after changing any of those files, then re-run the seed:
//   npx tsx scripts/export-curriculum.ts
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { CURRICULUM_COURSES } from '../frontend/src/constants/courses';
import { mockDayContents } from '../frontend/src/api/dayOverview';
import { cssDays } from '../frontend/src/api/mockTasks/catalog/css';
import { htmlDays } from '../frontend/src/api/mockTasks/catalog/html';
import { javascriptDays } from '../frontend/src/api/mockTasks/catalog/javascript';
import { nodejsDays } from '../frontend/src/api/mockTasks/catalog/nodejs';
import { postgresqlDays } from '../frontend/src/api/mockTasks/catalog/postgresql';
import { prismaDays } from '../frontend/src/api/mockTasks/catalog/prisma';
import { reactDays } from '../frontend/src/api/mockTasks/catalog/react';
import { typescriptDays } from '../frontend/src/api/mockTasks/catalog/typescript';
import { workspaceForDay } from '../frontend/src/api/mockTasks/starters';

const catalogDays = [
  ...htmlDays,
  ...cssDays,
  ...javascriptDays,
  ...typescriptDays,
  ...nodejsDays,
  ...postgresqlDays,
  ...prismaDays,
  ...reactDays,
];

function fail(message: string): never {
  throw new Error(`export-curriculum: ${message}`);
}

const courseIds = new Set(CURRICULUM_COURSES.map((c) => c.id));

const days = catalogDays.map((catalogDay) => {
  const content =
    mockDayContents[catalogDay.dayId] ?? fail(`no day content for ${catalogDay.dayId}`);
  const courseId = catalogDay.dayId.split('-day-')[0];
  if (!courseIds.has(courseId)) fail(`${catalogDay.dayId} has unknown course "${courseId}"`);
  if (content.dayId !== catalogDay.dayId)
    fail(`${catalogDay.dayId}: content says ${content.dayId}`);

  const workspace = workspaceForDay(catalogDay.dayId);

  return {
    id: catalogDay.dayId,
    courseId,
    dayNumber: catalogDay.dayNumber,
    title: content.title,
    subtitle: content.subtitle,
    lessonSummary: content.lessonSummary,
    journalPrompt: content.journalPrompt,
    // Ids are rebuilt from the day id: the content files reuse ids like "lo-1" across days.
    learningObjectives: content.learningObjectives.map((o, i) => ({
      id: `${catalogDay.dayId}-obj-${i + 1}`,
      code: o.code,
      title: o.title,
      description: o.description,
      sortOrder: i + 1,
    })),
    selfCheckItems: content.selfCheckItems.map((s, i) => ({
      id: `${catalogDay.dayId}-check-${i + 1}`,
      code: s.code,
      label: s.label,
      description: s.description,
      isRequired: s.isRequired,
      sortOrder: i + 1,
    })),
    tasks: catalogDay.tasks.map((task) => {
      if (!task.id.startsWith(`${catalogDay.dayId}-t-`))
        fail(`task ${task.id} is not under ${catalogDay.dayId}`);
      return {
        id: task.id,
        sequenceOrder: task.sequenceOrder,
        title: task.title,
        instructionsMarkdown: task.instructionsMarkdown,
        isStretchGoal: task.isStretchGoal,
        estimatedMinutes: task.estimatedMinutes,
        runtime: workspace.runtime,
        runCommand: workspace.runCommand,
        setupSql: workspace.setupSql,
        starterFiles: workspace.starterFiles(task),
      };
    }),
  };
});

const missing = Object.keys(mockDayContents).filter((id) => !days.some((d) => d.id === id));
if (missing.length > 0) fail(`day content without tasks: ${missing.join(', ')}`);

const curriculum = {
  courses: CURRICULUM_COURSES.map((c, i) => ({ id: c.id, title: c.label, sortOrder: i + 1 })),
  days,
};

const out = resolve(
  dirname(fileURLToPath(import.meta.url)),
  '../backend/prisma/seed-data/curriculum.json'
);
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, JSON.stringify(curriculum, null, 2) + '\n');

const taskCount = days.reduce((n, d) => n + d.tasks.length, 0);
console.log(
  `Wrote ${out}: ${curriculum.courses.length} courses, ${days.length} days, ${taskCount} tasks`
);
