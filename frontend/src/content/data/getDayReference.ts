import type { ContentTopic, DayReferenceContent } from '../types';

import {
  ariaRolesTopics,
  basicHtmlSyntaxTopics,
  htmlAccessibilityTopics,
  htmlInputTopics,
  htmlTableBasicsTopics,
  webFormsTopics,
  htmlVideoAndAudioTopics,
  responsiveImagesTopics,
  whatIsAUrlTopics,
} from '../topics/html';

import {
  cssBasicSelectorsTopics,
  cssGettingStartedTopics,
  cssCustomPropertiesTopics,
  cssFlexboxTopics,
  cssGridTopics,
  cssResponsiveDesignTopics,
  cssAnimationsTopics,
  cssPrefersReducedMotionTopics,
  cssClampTopics,
  stylelintTopics,
  stylelintGettingStartedTopics,
} from '../topics/css';

import { dayReferences } from './dayReferences';

const courseTopics: Record<string, ContentTopic[]> = {
  html: [
    ...Object.values(basicHtmlSyntaxTopics),
    ...Object.values(htmlAccessibilityTopics),
    ...Object.values(ariaRolesTopics),
    ...Object.values(htmlInputTopics),
    ...Object.values(webFormsTopics),
    ...Object.values(htmlTableBasicsTopics),
    ...Object.values(htmlVideoAndAudioTopics),
    ...Object.values(responsiveImagesTopics),
    ...Object.values(whatIsAUrlTopics),
  ],

  css: [
    ...Object.values(cssBasicSelectorsTopics),
    ...Object.values(cssGettingStartedTopics),
    ...Object.values(cssCustomPropertiesTopics),
    ...Object.values(cssFlexboxTopics),
    ...Object.values(cssGridTopics),
    ...Object.values(cssResponsiveDesignTopics),
    ...Object.values(cssAnimationsTopics),
    ...Object.values(cssPrefersReducedMotionTopics),
    ...Object.values(cssClampTopics),
    ...Object.values(stylelintTopics),
    ...Object.values(stylelintGettingStartedTopics),
  ],
};

export function getDayReference(dayId: string): DayReferenceContent | null {
  const config = dayReferences.find((item) => item.id === dayId);

  if (!config) {
    return null;
  }

  const topics = courseTopics[config.courseId] ?? [];

  const sections = config.topicIds
    .map((topicId) => topics.find((topic) => topic.id === topicId))
    .filter((topic): topic is ContentTopic => Boolean(topic))
    .map((topic, index) => ({
      ...topic,
      number: index + 1,
    }));

  return {
    courseId: config.courseId,
    dayNumber: config.dayNumber,
    videos: config.videos,
    videoAtStart: config.videoAtStart,
    videoAfterTopicId: config.videoAfterTopicId,
    sections,
  };
}
