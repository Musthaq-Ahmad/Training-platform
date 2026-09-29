import type { DayContent } from '@itp/types';
import { cssDay01 } from './css/day01';
import { cssDay02 } from './css/day02';
import { cssDay03 } from './css/day03';
import { cssDay04 } from './css/day04';
import { cssDay05 } from './css/day05';

import { htmlDay01 } from './html/day01';
import { htmlDay02 } from './html/day02';
import { htmlDay03 } from './html/day03';
import { htmlDay04 } from './html/day04';
import { htmlDay05 } from './html/day05';

import { jsDay01 } from './javascript/day01';
import { jsDay02 } from './javascript/day02';
import { jsDay03 } from './javascript/day03';
import { jsDay04 } from './javascript/day04';
import { jsDay05 } from './javascript/day05';
import { jsDay06 } from './javascript/day06';
import { jsDay07 } from './javascript/day07';
import { jsDay08 } from './javascript/day08';
import { jsDay09 } from './javascript/day09';
import { jsDay10 } from './javascript/day10';

import { tsDay01 } from './typescript/day01';
import { tsDay02 } from './typescript/day02';
import { tsDay03 } from './typescript/day03';
import { tsDay04 } from './typescript/day04';
import { tsDay05 } from './typescript/day05';

import { nodejsDay01 } from './nodeJs/day01';
import { nodejsDay02 } from './nodeJs/day02';
import { nodejsDay03 } from './nodeJs/day03';
import { nodejsDay04 } from './nodeJs/day04';
import { nodejsDay05 } from './nodeJs/day05';

import { postgresqlDay01 } from './postgresql/day01';
import { postgresqlDay02 } from './postgresql/day02';
import { postgresqlDay03 } from './postgresql/day03';
import { postgresqlDay04 } from './postgresql/day04';
import { postgresqlDay05 } from './postgresql/day05';
import { postgresqlDay06 } from './postgresql/day06';

import { prismaDay01 } from './prisma/day01';
import { prismaDay02 } from './prisma/day02';
import { prismaDay03 } from './prisma/day03';
import { prismaDay04 } from './prisma/day04';
import { prismaDay05 } from './prisma/day05';
import { prismaDay06 } from './prisma/day06';
import { prismaDay07 } from './prisma/day07';
import { prismaDay08 } from './prisma/day08';

import { reactDay01 } from './react/day01';
import { reactDay02 } from './react/day02';
import { reactDay03 } from './react/day03';
import { reactDay04 } from './react/day04';
import { reactDay05 } from './react/day05';
import { reactDay06 } from './react/day06';
import { reactDay07 } from './react/day07';
import { reactDay08 } from './react/day08';
import { reactDay09 } from './react/day09';
import { reactDay10 } from './react/day10';

// Add each new day here as its file is created.
export const mockDayContents: Record<string, DayContent> = {
  'html-day-01': htmlDay01,
  'html-day-02': htmlDay02,
  'html-day-03': htmlDay03,
  'html-day-04': htmlDay04,
  'html-day-05': htmlDay05,

  'css-day-01': cssDay01,
  'css-day-02': cssDay02,
  'css-day-03': cssDay03,
  'css-day-04': cssDay04,
  'css-day-05': cssDay05,

  'js-day-01': jsDay01,
  'js-day-02': jsDay02,
  'js-day-03': jsDay03,
  'js-day-04': jsDay04,
  'js-day-05': jsDay05,
  'js-day-06': jsDay06,
  'js-day-07': jsDay07,
  'js-day-08': jsDay08,
  'js-day-09': jsDay09,
  'js-day-10': jsDay10,

  'ts-day-01': tsDay01,
  'ts-day-02': tsDay02,
  'ts-day-03': tsDay03,
  'ts-day-04': tsDay04,
  'ts-day-05': tsDay05,

  'nodejs-day-01': nodejsDay01,
  'nodejs-day-02': nodejsDay02,
  'nodejs-day-03': nodejsDay03,
  'nodejs-day-04': nodejsDay04,
  'nodejs-day-05': nodejsDay05,

  'postgresql-day-01': postgresqlDay01,
  'postgresql-day-02': postgresqlDay02,
  'postgresql-day-03': postgresqlDay03,
  'postgresql-day-04': postgresqlDay04,
  'postgresql-day-05': postgresqlDay05,
  'postgresql-day-06': postgresqlDay06,

  'prisma-day-01': prismaDay01,
  'prisma-day-02': prismaDay02,
  'prisma-day-03': prismaDay03,
  'prisma-day-04': prismaDay04,
  'prisma-day-05': prismaDay05,
  'prisma-day-06': prismaDay06,
  'prisma-day-07': prismaDay07,
  'prisma-day-08': prismaDay08,

  'react-day-01': reactDay01,
  'react-day-02': reactDay02,
  'react-day-03': reactDay03,
  'react-day-04': reactDay04,
  'react-day-05': reactDay05,
  'react-day-06': reactDay06,
  'react-day-07': reactDay07,
  'react-day-08': reactDay08,
  'react-day-09': reactDay09,
  'react-day-10': reactDay10,
  // // Locked-day mock for testing the locked state
  // 'day-04': { ...cssDay01, dayId: 'day-04', dayNumber: 4, isLocked: true },
};
