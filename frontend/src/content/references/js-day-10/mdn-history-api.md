## [Concepts and usage](#concepts_and_usage)

Moving backward and forward through the user's history is done using the [`back()`](https://developer.mozilla.org/en-US/docs/Web/API/History/back 'back()'), [`forward()`](https://developer.mozilla.org/en-US/docs/Web/API/History/forward 'forward()'), and [`go()`](https://developer.mozilla.org/en-US/docs/Web/API/History/go 'go()') methods.

### [Moving forward and backward](#moving_forward_and_backward)

To move backward through history:

```
history.back();
```

This acts exactly as if the user clicked on the **Back** button in their browser toolbar.

Similarly, you can move forward (as if the user clicked the **Forward** button), like this:

```
history.forward();
```

### [Moving to a specific point in history](#moving_to_a_specific_point_in_history)

You can use the [`go()`](https://developer.mozilla.org/en-US/docs/Web/API/History/go 'go()') method to load a specific page from session history, identified by its relative position to the current page. (The current page's relative position is `0`.)

To move back one page (the equivalent of calling [`back()`](https://developer.mozilla.org/en-US/docs/Web/API/History/back 'back()')):

```
history.go(-1);
```

To move forward a page, just like calling [`forward()`](https://developer.mozilla.org/en-US/docs/Web/API/History/forward 'forward()'):

```
history.go(1);
```

Similarly, you can move forward 2 pages by passing `2`, and so forth.

Another use for the `go()` method is to refresh the current page by either passing `0`, or by invoking it without an argument:

```
// The following statements
// both have the effect of
// refreshing the page
history.go(0);
history.go();
```

You can determine the number of pages in the history stack by looking at the value of the `length` property:

```
const numberOfEntries = history.length;
```

## [Interfaces](#interfaces)

[`History`](https://developer.mozilla.org/en-US/docs/Web/API/History)

Allows manipulation of the browser _session history_ (that is, the pages visited in the tab or frame that the current page is loaded in).

[`PopStateEvent`](https://developer.mozilla.org/en-US/docs/Web/API/PopStateEvent)

The interface of the [`popstate`](https://developer.mozilla.org/en-US/docs/Web/API/Window/popstate_event 'popstate') event.

## [Examples](#examples)

The following example assigns a listener for the [`popstate`](https://developer.mozilla.org/en-US/docs/Web/API/Window/popstate_event 'popstate') event. It then illustrates some of the methods of the history object to add, replace, and move within the browser history for the current tab.

```
window.addEventListener("popstate", (event) => {
  alert(
    `location: ${document.location}, state: ${JSON.stringify(event.state)}`,
  );
});

history.pushState({ page: 1 }, "title 1", "?page=1");
history.pushState({ page: 2 }, "title 2", "?page=2");
history.replaceState({ page: 3 }, "title 3", "?page=3");
history.back(); // alerts "location: http://example.com/example.html?page=1, state: {"page":1}"
history.back(); // alerts "location: http://example.com/example.html, state: null"
history.go(2); // alerts "location: http://example.com/example.html?page=3, state: {"page":3}"
```

## [Specifications](#specifications)

| Specification                                                                                                 |
| ------------------------------------------------------------------------------------------------------------- |
| [HTML                                                                                                         |
| \# the-history-interface](https://html.spec.whatwg.org/multipage/nav-history-apis.html#the-history-interface) |

## [Browser compatibility](#browser_compatibility)

## [See also](#see_also)

- [`history`](https://developer.mozilla.org/en-US/docs/Web/API/Window/history 'history') global object
- [`popstate`](https://developer.mozilla.org/en-US/docs/Web/API/Window/popstate_event 'popstate') event
