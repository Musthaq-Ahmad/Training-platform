import type { DayContent } from '@itp/types';
export const mockDayContent: DayContent = {
  dayId: 'day-01',
  courseSlug: 'css',
  dayNumber: 1,
  totalDays: 7,
  title: 'Selectors, Box Model, Colours & Typography',
  subtitle:
    'Master the bedrock fundamentals of cascading styles: CSS specificity hierarchy, exact margin border-padding calculations, standard visual units, and font rendering rules required for cross browser enterprise interfaces.',
  lessonSummary:
    'You will build and test a pixel-accurate, responsive card layout implementing the CSS Box Model with strict margin collapsing logic, class-based inheritance, and calibrated semantic typography tokens without utility frameworks.',
  learningObjectives: [
    {
      id: 'lo-1',
      code: '01',
      title: 'Specificity Weight & Cascading Cascade',
      description:
        'Calculate exact selector specificity IDs, classes, attributed to predict rule inheritance.',
    },
    {
      id: 'lo-2',
      code: '02',
      title: 'Box Sizing Model & Margin Collapsing',
      description:
        'Differentiate content-box from border-box and resolve parent-child vertical margin collapse.',
    },
    {
      id: 'lo-3',
      code: '03',
      title: 'Visual Units, Rem Scaling & Colors',
      description:
        'Construct consistent typography scales using rem/em ratios with hex and HSL alpha channels.',
    },
    {
      id: 'lo-4',
      code: '04',
      title: 'Font Metrics & Vertical Baseline Rhythm',
      description:
        'Implement font-face declarations, line-height multipliers, and legible baseline spacing.',
    },
  ],
  selfCheckItems: [
    {
      id: 'sc-1',
      code: 'SEC 1-2',
      label: 'Specificity Isolation Rules',
      description: 'Verify selector authored using !important flags in styles.css',
      isRequired: true,
    },
    {
      id: 'sc-2',
      code: 'SEC 2-3',
      label: 'Border-Box Verification',
      description: 'Inspect layout in DevTools to confirm dimensions include padding & border.',
      isRequired: true,
    },
    {
      id: 'sc-3',
      code: 'SEC 3-4',
      label: 'Margin Collapse Resolution',
      description: 'Eliminate vertical collapse using padding or overflow containers.',
      isRequired: true,
    },
    {
      id: 'sc-4',
      code: 'SEC 3-5',
      label: 'Relative Typography Ratios',
      description: 'Ensure all font-sized and line-height scale are accurate — no raw rem units.',
      isRequired: true,
    },
  ],
  tasks: [
    {
      id: 't-1',
      sequenceOrder: 1,
      title: 'Implement the Universal Box-Sizing & Reset',
      status: 'not_started',
      isStretchGoal: false,
    },
    {
      id: 't-2',
      sequenceOrder: 2,
      title: 'Calculate Specificity & Resolve Cascading Conflict',
      status: 'not_started',
      isStretchGoal: false,
    },
    {
      id: 't-3',
      sequenceOrder: 3,
      title: 'Isolate Margin Collapsing via Block Formatting Context',
      status: 'not_started',
      isStretchGoal: false,
    },
    {
      id: 't-4',
      sequenceOrder: 4,
      title: 'Build Fluid Typography Scale with Relative Units',
      status: 'not_started',
      isStretchGoal: false,
    },
    {
      id: 't-5',
      sequenceOrder: 5,
      title: 'Tokenize HSL Colour Variables with Alpha Transparency',
      status: 'not_started',
      isStretchGoal: false,
    },
    {
      id: 't-6',
      sequenceOrder: 6,
      title: 'Assemble Responsive Multi-Column Card Layout',
      status: 'not_started',
      isStretchGoal: true,
    },
  ],
  references: [
    {
      id: 'ref-1',
      label: 'MDN — The Box Model',
      url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_box_model',
    },
    {
      id: 'ref-2',
      label: 'MDN — Specificity',
      url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity',
    },
    {
      id: 'ref-3',
      label: 'web.dev — Responsive Typography',
      url: 'https://web.dev/patterns/layout/responsive-typography',
    },
  ],
  journalPrompt:
    'What surprised you most about the Box Model or margin collapsing behavior today, and how did you resolve it?',
  journalResponse: null,
  isLocked: false,
  isCompleted: false,
};

export const mockLockedDayContent: DayContent = {
  ...mockDayContent,
  dayId: 'day-04',
  dayNumber: 4,
  isLocked: true,
};
export const mockDayContents: Record<string, DayContent> = {
  'day-01': mockDayContent,
  'day-04': mockLockedDayContent,
};
