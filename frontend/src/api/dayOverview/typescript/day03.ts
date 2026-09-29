import type { DayContent } from '@itp/types';

export const tsDay03: DayContent = {
  dayId: 'ts-day-03',
  courseSlug: 'typescript',
  courseTitle: 'TypeScript',
  dayNumber: 3,
  totalDays: 5,
  title: 'TypeScript Classes, Interfaces & Access Modifiers',
  subtitle: 'Wednesday — Week 5',
  lessonSummary:
    'Learn access modifiers, parameter properties, interfaces, abstract classes, declaration merging, and decorators. Convert EventEmitter and FormValidator to TypeScript and implement typed design patterns.',
  learningObjectives: [
    {
      id: 'ts-day-03-lo-01',
      code: 'LO-01',
      title: 'Use access modifiers',
      description:
        'Use public, private, protected, and readonly correctly, including parameter properties and the difference between TypeScript private and JavaScript #private.',
    },
    {
      id: 'ts-day-03-lo-02',
      code: 'LO-02',
      title: 'Implement interfaces',
      description:
        'Define interfaces and implement them in classes using implements, including classes that satisfy multiple interfaces.',
    },
    {
      id: 'ts-day-03-lo-03',
      code: 'LO-03',
      title: 'Build abstract classes',
      description:
        'Create abstract classes with abstract methods and concrete implementations, and understand when to use interfaces, type aliases, or abstract classes.',
    },
    {
      id: 'ts-day-03-lo-04',
      code: 'LO-04',
      title: 'Understand declaration merging',
      description:
        'Use interface merging and module augmentation to extend existing types, including Array and Window.',
    },
    {
      id: 'ts-day-03-lo-05',
      code: 'LO-05',
      title: 'Build typed classes and patterns',
      description:
        'Convert EventEmitter and FormValidator to TypeScript and implement typed observer and command patterns with explicit return types.',
    },
  ],
  selfCheckItems: [
    {
      id: 'ts-day-03-sc-01',
      code: 'SC-01',
      label: 'I can use access modifiers',
      description: 'I can use public, private, protected, and readonly correctly.',
      isRequired: true,
    },
    {
      id: 'ts-day-03-sc-02',
      code: 'SC-02',
      label: 'I understand private fields',
      description:
        'I can explain the difference between TypeScript private and JavaScript #private.',
      isRequired: true,
    },
    {
      id: 'ts-day-03-sc-03',
      code: 'SC-03',
      label: 'I can implement interfaces',
      description: 'I can define interfaces and implement them on classes.',
      isRequired: true,
    },
    {
      id: 'ts-day-03-sc-04',
      code: 'SC-04',
      label: 'I understand abstract classes',
      description: 'I understand when to use an abstract class versus an interface.',
      isRequired: true,
    },
    {
      id: 'ts-day-03-sc-05',
      code: 'SC-05',
      label: 'EventEmitter and FormValidator are typed',
      description:
        'EventEmitter and FormValidator are fully converted to TypeScript with zero any types.',
      isRequired: true,
    },
  ],
  journalPrompt:
    'When should you use interface vs type alias vs abstract class? Write a decision tree.\n\nTypeScript private vs JavaScript #private — what is the practical difference and when does it matter?\n\nWhat is one thing you want to look up more deeply tomorrow?',
  journalResponse: null,
  isLocked: true,
  isCompleted: false,
};
