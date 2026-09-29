import type { ContentTopic } from '../../../types';

export const mdnRequestAnimationFrameTopics = {
  'mdn-request-animation-frame': {
    id: 'mdn-request-animation-frame',
    heading: 'Syntax',
    blocks: [
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'requestAnimationFrame(callback)',
        },
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Parameters',
      },
      {
        type: 'paragraph',
        text: 'callback',
      },
      {
        type: 'paragraph',
        text: "The function to call when it's time to update your animation for the next repaint. This callback function is passed a single argument:",
      },
      {
        type: 'paragraph',
        text: 'timestamp',
      },
      {
        type: 'paragraph',
        text: "A DOMHighResTimeStamp indicating the end time of the previous frame's rendering (based on the number of milliseconds since time origin). The timestamp is a decimal number, in milliseconds, but with a minimal precision of 1 millisecond. For Window objects (not Workers), it is equal to document.timeline.currentTime. This timestamp is shared between all windows that run on the same agent (all same-origin windows and, more importantly, same-origin iframes) — which allows synchronizing animations across multiple requestAnimationFrame callbacks. The timestamp value is also similar to calling performance.now() at the start of the callback function, but it is never the same value.",
      },
      {
        type: 'paragraph',
        text: "When multiple callbacks queued by requestAnimationFrame() begin to fire in a single frame, each receives the same timestamp even though time has passed during the computation of every previous callback's workload.",
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Return value',
      },
      {
        type: 'paragraph',
        text: 'An unsigned long integer value, the request ID, that uniquely identifies the entry in the callback list. You should not make any assumptions about its value. You can pass this value to window.cancelAnimationFrame() to cancel the refresh callback request.',
      },
      {
        type: 'paragraph',
        text: "Warning: The request ID is typically implemented as a per-window incrementing counter. Therefore, even when it starts counting at 1, it may overflow and end up reaching 0. While unlikely to cause issues for short-lived applications, you should avoid 0 as a sentinel value for invalid request identifier IDs and instead prefer unattainable values such as null. The spec doesn't specify the overflowing behavior, so browsers have divergent behaviors. When overflowing, the value would either wrap around to 0, to a negative value, or fail with an error. Unless overflow throws, request IDs are also not truly unique because there are only finitely many 32-bit integers for possibly infinitely many callbacks. Note, however, that it would take approximately 800 days to reach the issue when rendering at 60Hz with a single call to requestAnimationFrame() per frame.",
      },
      {
        type: 'paragraph',
        text: "In this example, an element is animated for 2 seconds (2000 milliseconds). The element moves at a speed of 0.1px/ms to the right, so its relative position (in CSS pixels) can be calculated in function of the time elapsed since the start of the animation (in milliseconds) with 0.1 * elapsed. The element's final position is 200px (0.1 * 2000) to the right of its initial position.",
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'const element = document.getElementById("some-element-you-want-to-animate");\nlet start;\n\nfunction step(timestamp) {\n  if (start === undefined) {\n    start = timestamp;\n  }\n  const elapsed = timestamp - start;\n\n  // Math.min() is used here to make sure the element stops at exactly 200px\n  const shift = Math.min(0.1 * elapsed, 200);\n  element.style.transform = `translateX(${shift}px)`;\n  if (shift < 200) {\n    requestAnimationFrame(step);\n  }\n}\n\nrequestAnimationFrame(step);',
        },
      },
      {
        type: 'paragraph',
        text: "The following three examples illustrate different approaches to setting the zero point in time, the baseline for calculating the progress of your animation in each frame. If you want to synchronize to an external clock, such as BaseAudioContext.currentTime, the highest precision available is the duration of a single frame, 16.67ms @60Hz. The callback's timestamp argument represents the end of the previous frame, so the soonest your newly calculated value(s) will be rendered is in the next frame.",
      },
      {
        type: 'paragraph',
        text: 'This example waits until the first callback executes to set zero. If your animation jumps to a new value when it starts, you must structure it this way. If you do not need to synchronize to anything external, such as audio, then this approach is recommended because some browsers have a multi-frame delay between the initial call to requestAnimationFrame() and the first call to the callback function.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'let zero;\nrequestAnimationFrame(firstFrame);\nfunction firstFrame(timestamp) {\n  zero = timestamp;\n  animate(timestamp);\n}\nfunction animate(timestamp) {\n  const value = (timestamp - zero) / duration;\n  if (value < 1) {\n    element.style.opacity = value;\n    requestAnimationFrame((t) => animate(t));\n  } else element.style.opacity = 1;\n}',
        },
      },
      {
        type: 'paragraph',
        text: "This example uses document.timeline.currentTime to set a zero value before the first call to requestAnimationFrame. document.timeline.currentTime aligns with the timestamp argument, so the zero value is equivalent to the 0th frame's timestamp.",
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'const zero = document.timeline.currentTime;\nrequestAnimationFrame(animate);\nfunction animate(timestamp) {\n  const value = (timestamp - zero) / duration; // animation-timing-function: linear\n  if (value < 1) {\n    element.style.opacity = value;\n    requestAnimationFrame((t) => animate(t));\n  } else element.style.opacity = 1;\n}',
        },
      },
      {
        type: 'paragraph',
        text: "This example animates using performance.now() instead of the callback's timestamp value. You might use this to achieve slightly higher synchronization precision, though the extra degree of precision is variable and not much of an increase.",
      },
      {
        type: 'paragraph',
        text: 'Note: This example does not allow you to synchronize animation callbacks reliably.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'const zero = performance.now();\nrequestAnimationFrame(animate);\nfunction animate() {\n  const value = (performance.now() - zero) / duration;\n  if (value < 1) {\n    element.style.opacity = value;\n    requestAnimationFrame(animate);\n  } else element.style.opacity = 1;\n}',
        },
      },
      {
        type: 'table',
        headers: ['Specification'],
        rows: [
          ['[HTML'],
          [
            '# dom-animationframeprovider-requestanimationframe](https://html.spec.whatwg.org/multipage/imagebitmap-and-animations.html#dom-animationframeprovider-requestanimationframe)',
          ],
        ],
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'Window.cancelAnimationFrame()',
          'DedicatedWorkerGlobalScope.requestAnimationFrame()',
          'Animating with JavaScript: from setInterval to requestAnimationFrame - Blog post',
          'TestUFO: Test your web browser for requestAnimationFrame() Timing Deviations',
          'Firefox switching to uint32_t for the requestAnimationFrame request ID',
        ],
      },
    ],
  },
} satisfies Record<string, ContentTopic>;
