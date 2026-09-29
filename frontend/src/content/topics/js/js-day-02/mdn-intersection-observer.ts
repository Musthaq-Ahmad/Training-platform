import type { ContentTopic } from '../../../types';

export const mdnIntersectionObserverTopics = {
  'mdn-intersection-observer': {
    id: 'mdn-intersection-observer',
    heading: 'Constructor',
    blocks: [
      {
        type: 'paragraph',
        text: 'IntersectionObserver()',
      },
      {
        type: 'paragraph',
        text: "Creates a new IntersectionObserver object which will execute a specified callback function when it detects that a target element's visibility has crossed one or more thresholds.",
      },
      {
        type: 'paragraph',
        text: 'IntersectionObserver.delay Read only',
      },
      {
        type: 'paragraph',
        text: 'An integer indicating the minimum delay between notifications from this observer.',
      },
      {
        type: 'paragraph',
        text: 'IntersectionObserver.root Read only',
      },
      {
        type: 'paragraph',
        text: "The Element or Document whose bounds are used as the bounding box when testing for intersection. If no root value was passed to the constructor or its value is null, the top-level document's viewport is used.",
      },
      {
        type: 'paragraph',
        text: 'IntersectionObserver.rootMargin Read only',
      },
      {
        type: 'paragraph',
        text: 'An offset rectangle applied to the root\'s bounding box when calculating intersections, effectively shrinking or growing the root for calculation purposes. The value returned by this property may not be the same as the one specified when calling the constructor as it may be changed to match internal requirements. Each offset can be expressed in pixels (px) or percentages (%). The default is "0px 0px 0px 0px".',
      },
      {
        type: 'paragraph',
        text: 'IntersectionObserver.scrollMargin Read only',
      },
      {
        type: 'paragraph',
        text: 'An offset rectangle applied to each scroll container on the path from intersection root to target, effectively shrinking or growing the clip rectangles used to calculate intersections. The value returned by this property may not be the same as the one specified when calling the constructor.',
      },
      {
        type: 'paragraph',
        text: 'IntersectionObserver.thresholds Read only',
      },
      {
        type: 'paragraph',
        text: 'A list of thresholds, sorted in increasing numeric order, where each threshold is a ratio of intersection area to bounding box area of an observed target. Notifications for a target are generated when any of the thresholds are crossed for that target. If no value was passed to the constructor, 0 is used.',
      },
      {
        type: 'paragraph',
        text: 'IntersectionObserver.trackVisibility Read only',
      },
      {
        type: 'paragraph',
        text: 'A boolean indicating whether this IntersectionObserver is checking that the target does not have compromised visibility.',
      },
      {
        type: 'paragraph',
        text: 'IntersectionObserver.disconnect()',
      },
      {
        type: 'paragraph',
        text: 'Stops the IntersectionObserver object from observing any target.',
      },
      {
        type: 'paragraph',
        text: 'IntersectionObserver.observe()',
      },
      {
        type: 'paragraph',
        text: 'Tells the IntersectionObserver a target element to observe.',
      },
      {
        type: 'paragraph',
        text: 'IntersectionObserver.takeRecords()',
      },
      {
        type: 'paragraph',
        text: 'Returns an array of IntersectionObserverEntry objects for all observed targets.',
      },
      {
        type: 'paragraph',
        text: 'IntersectionObserver.unobserve()',
      },
      {
        type: 'paragraph',
        text: 'Tells the IntersectionObserver to stop observing a particular target element.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'const intersectionObserver = new IntersectionObserver((entries) => {\n  // If intersectionRatio is 0, the target is out of view\n  // and we do not need to do anything.\n  if (entries[0].intersectionRatio <= 0) return;\n\n  loadItems(10);\n  console.log("Loaded new items");\n});\n// start observing\nintersectionObserver.observe(document.querySelector(".scrollerFooter"));',
        },
      },
      {
        type: 'table',
        headers: ['Specification'],
        rows: [
          ['[Intersection Observer'],
          [
            '# intersection-observer-interface](https://w3c.github.io/IntersectionObserver/#intersection-observer-interface)',
          ],
        ],
      },
      {
        type: 'list',
        ordered: false,
        items: ['MutationObserver', 'PerformanceObserver', 'ResizeObserver'],
      },
    ],
  },
} satisfies Record<string, ContentTopic>;
