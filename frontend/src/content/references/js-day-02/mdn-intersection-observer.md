Baseline

Widely available

\*

This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2019.

\* Some parts of this feature may have varying levels of support.

- [See full compatibility](#browser_compatibility)
- [Learn more](https://developer.mozilla.org/en-US/docs/Glossary/Baseline/Compatibility)

The **`IntersectionObserver`** interface of the [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) provides a way to asynchronously observe changes in the intersection of a target element with an ancestor element or with a top-level document's [viewport](https://developer.mozilla.org/en-US/docs/Glossary/Viewport). The ancestor element or viewport is referred to as the root.

When an `IntersectionObserver` is created, it's configured to watch for given ratios of visibility within the root. The configuration cannot be changed once the `IntersectionObserver` is created, so a given observer object is only useful for watching for specific changes in degree of visibility; however, you can watch multiple target elements with the same observer.

## [Constructor](#constructor)

[`IntersectionObserver()`](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/IntersectionObserver 'IntersectionObserver()')

Creates a new `IntersectionObserver` object which will execute a specified callback function when it detects that a target element's visibility has crossed one or more thresholds.

## [Instance properties](#instance_properties)

[`IntersectionObserver.delay`](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/delay) Read only

An integer indicating the minimum delay between notifications from this observer.

[`IntersectionObserver.root`](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/root) Read only

The [`Element`](https://developer.mozilla.org/en-US/docs/Web/API/Element) or [`Document`](https://developer.mozilla.org/en-US/docs/Web/API/Document) whose bounds are used as the bounding box when testing for intersection. If no `root` value was passed to the constructor or its value is `null`, the top-level document's viewport is used.

[`IntersectionObserver.rootMargin`](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/rootMargin) Read only

An offset rectangle applied to the root's [bounding box](https://developer.mozilla.org/en-US/docs/Glossary/Bounding_box) when calculating intersections, effectively shrinking or growing the root for calculation purposes. The value returned by this property may not be the same as the one specified when calling the constructor as it may be changed to match internal requirements. Each offset can be expressed in pixels (`px`) or percentages (`%`). The default is "0px 0px 0px 0px".

[`IntersectionObserver.scrollMargin`](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/scrollMargin) Read only

An offset rectangle applied to each [scroll container](https://developer.mozilla.org/en-US/docs/Glossary/Scroll_container) on the path from intersection root to target, effectively shrinking or growing the clip rectangles used to calculate intersections. The value returned by this property may not be the same as the one specified when calling the constructor.

[`IntersectionObserver.thresholds`](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/thresholds) Read only

A list of thresholds, sorted in increasing numeric order, where each threshold is a ratio of intersection area to bounding box area of an observed target. Notifications for a target are generated when any of the thresholds are crossed for that target. If no value was passed to the constructor, 0 is used.

[`IntersectionObserver.trackVisibility`](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/trackVisibility) Read only

A boolean indicating whether this `IntersectionObserver` is checking that the target does not have compromised visibility.

## [Instance methods](#instance_methods)

[`IntersectionObserver.disconnect()`](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/disconnect)

Stops the `IntersectionObserver` object from observing any target.

[`IntersectionObserver.observe()`](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/observe)

Tells the `IntersectionObserver` a target element to observe.

[`IntersectionObserver.takeRecords()`](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/takeRecords)

Returns an array of [`IntersectionObserverEntry`](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry) objects for all observed targets.

[`IntersectionObserver.unobserve()`](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/unobserve)

Tells the `IntersectionObserver` to stop observing a particular target element.

## [Examples](#examples)

```
const intersectionObserver = new IntersectionObserver((entries) => {
  // If intersectionRatio is 0, the target is out of view
  // and we do not need to do anything.
  if (entries[0].intersectionRatio <= 0) return;

  loadItems(10);
  console.log("Loaded new items");
});
// start observing
intersectionObserver.observe(document.querySelector(".scrollerFooter"));
```

## [Specifications](#specifications)

| Specification                                                                                                    |
| ---------------------------------------------------------------------------------------------------------------- |
| [Intersection Observer                                                                                           |
| \# intersection-observer-interface](https://w3c.github.io/IntersectionObserver/#intersection-observer-interface) |

## [Browser compatibility](#browser_compatibility)

## [See also](#see_also)

- [`MutationObserver`](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver)
- [`PerformanceObserver`](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceObserver)
- [`ResizeObserver`](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver)
