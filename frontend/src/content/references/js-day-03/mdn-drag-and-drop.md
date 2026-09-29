## [Concepts and usage](#concepts_and_usage)

On the surface, Drag and Drop actually has three distinct use cases: [dragging elements within a page](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/Kanban_board), dragging data out of a page, and [dragging data into a page](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/File_drag_and_drop). They have subtly different requirements and implementations. However, the Drag and Drop API provides a unified model to think about all these interactions.

At its core, a drag operation involves three things:

- The [item being dragged](#draggable_items)
- The [underlying data to be transferred](#drag_data_store)
- The [drop target](#drop_target)

It's not necessarily true that all three are under your control, or you need to define them yourself:

- When dragging external data into a page, there's no draggable item to be defined (for example, it could be a file in the operating system's file explorer).
- When dragging elements within a page, you often don't need to define any transferred data; you just manipulate the dragged element.
- When dragging out of the page, there's no drop target to be defined.

We'll look at how each one can be defined and used.

### [Drag events](#drag_events)

HTML drag-and-drop uses the [DOM event model](https://developer.mozilla.org/en-US/docs/Web/API/Event) and _[drag events](https://developer.mozilla.org/en-US/docs/Web/API/DragEvent)_ inherited from [mouse events](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent). During drag operations, several event types are fired, and some events might fire many times, such as the [`drag`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/drag_event 'drag') and [`dragover`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dragover_event 'dragover') events.

| Event                                                                                                   | Fires when...                                                                              |
| ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| [`dragstart`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dragstart_event 'dragstart') | ...the [draggable item](#draggable_items) starts to be dragged.                            |
| [`drag`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/drag_event 'drag')                | ...the draggable item is being dragged (fires repeatedly).                                 |
| [`dragenter`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dragenter_event 'dragenter') | ...the element has a draggable item entering it.                                           |
| [`dragleave`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dragleave_event 'dragleave') | ...the element has a draggable item leaving it.                                            |
| [`dragover`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dragover_event 'dragover')    | ...the element has a draggable item being dragged over it (fires repeatedly).              |
| [`drop`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/drop_event 'drop')                | ...the element is a [drop target](#drop_target) and the draggable item is dropped over it. |
| [`dragend`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dragend_event 'dragend')       | ...the draggable item stops being dragged.                                                 |

**Note:** The `dragstart`, `drag`, and `dragend` events are fired on the dragged item, and therefore can't fire when dragging a file into the browser from the OS.

Similarly, the `dragenter`, `dragleave`, `dragover`, and `drop` events are fired on elements that are potential drop targets, and therefore can't fire when dragging an item out of the browser.

For more information, see [Drag operations](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/Drag_operations).

### [Draggable items](#draggable_items)

In HTML, images, links, and selections are draggable by default. To make an arbitrary element draggable, set the [`draggable`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/draggable) attribute to the value `"true"`.

```
<p id="p1" draggable="true">This element is draggable.</p>
```

At this point, the element already has the dragging appearance, although it has no behavior defined yet:

For images and links, `draggable` defaults to `true`, so you would only set it to `false` to disable dragging of these elements. For non-draggable elements, the "dragging" gesture usually selects the text instead.

**Note:** When an element is made draggable, text or other elements within it can no longer be selected in the normal way by clicking and dragging with the mouse. Instead, the user must hold down the Alt key to select text with the mouse, or use the keyboard.

A selection is also draggable. In this case, the _source node_, or the node on which various events such as `dragstart` and `dragend` are fired, is the text node that the drag started on. The selection can partially or fully contain multiple nodes, including text nodes and element nodes, which are all considered dragged simultaneously.

As aforementioned, the dragged item can also be something not on a webpage—for example, a file in the operating system's file explorer. However, only items on the webpage can cause the [`dragstart`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dragstart_event 'dragstart') and [`dragend`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dragend_event 'dragend') events to fire.

For more information, see the [Drag operations guide](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/Drag_operations).

### [Drag data store](#drag_data_store)

You can't transfer JavaScript objects directly to arbitrary webpages, and surely not to external applications, so to transfer data in and out of the webpage, the data must be serialized to a string (or as a [`File`](https://developer.mozilla.org/en-US/docs/Web/API/File)). In drag and drop, this string is encapsulated in a [`DataTransferItem`](https://developer.mozilla.org/en-US/docs/Web/API/DataTransferItem) object, which also defines a particular `type`—typically a MIME type such as `text/html`—that defines how the string should be interpreted.

Each drag and drop operation has an associated _drag data store_, which is a [`DataTransfer`](https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer) object accessible via the [`DragEvent`](https://developer.mozilla.org/en-US/docs/Web/API/DragEvent)'s [`dataTransfer`](https://developer.mozilla.org/en-US/docs/Web/API/DragEvent/dataTransfer 'dataTransfer') property. For the default-draggable items such as images, links, and selections, the drag data is already defined by the browser; for custom draggable elements defined using the `draggable` attribute, you must define the drag data yourself. The only time to make any modifications to the data store is within the [`dragstart`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dragstart_event 'dragstart') handler—for the `dataTransfer` of any other drag event, the data store is unmodifiable.

The [`setData()`](https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer/setData 'setData()') method can be used to add an item to the drag data, as shown in the following example.

```
function dragstartHandler(ev) {
  // Add different types of drag data
  ev.dataTransfer.setData("text/plain", ev.target.innerText);
  ev.dataTransfer.setData("text/html", ev.target.outerHTML);
  ev.dataTransfer.setData(
    "text/uri-list",
    ev.target.ownerDocument.location.href,
  );
}

const p1 = document.getElementById("p1");
p1.addEventListener("dragstart", dragstartHandler);
```

Furthermore, the only time you can _read_ from the data store, apart from the `dragstart` event, is during the `drop` event (allowing the drop target to retrieve the data). For all other events, the data store cannot be accessed.

For more information, read [Working with the drag data store](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/Drag_data_store).

### [Drop target](#drop_target)

A _drop target_ is an element on which a user can drop a dragged item. By default, most elements are not drop targets, and if you release the drag, a "fly-back" animation displays, indicating that the drag and drop failed. Any element can become a drop target by canceling the [`dragover`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dragover_event 'dragover') event that fires on it with `preventDefault()`.

The [`drop`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/drop_event 'drop') event only fires on drop targets, and it is the only time you can read the drag data store.

The following example shows a minimal valid drop target, and also combines the code from the previous examples.

```
<p id="target">Drop Zone</p>
```

```
const target = document.getElementById("target");

// Cancel dragover so that drop can fire
target.addEventListener("dragover", (ev) => {
  ev.preventDefault();
});
target.addEventListener("drop", (ev) => {
  ev.preventDefault();
  const data = ev.dataTransfer.getData("text/plain");
  ev.target.append(data);
});
```

For more information, see [Specifying drop targets](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/Drag_operations#dragging_over_elements_and_specifying_drop_targets).

## [Guides](#guides)

[Drag operations](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/Drag_operations)

Describes the steps that occur during a drag and drop operation, and what the application is supposed to do within each handler.

[Working with the drag data store](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/Drag_data_store)

Describes how to read and write to the drag data store during a drag and drop operation.

[File drag and drop](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/File_drag_and_drop)

A hands-on guide implementing a basic interface accepting file drops.

[Kanban board with drag and drop](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/Kanban_board)

A hands-on guide implementing a Kanban board involving dragging and dropping elements within a webpage.

## [Interfaces](#interfaces)

[`DragEvent`](https://developer.mozilla.org/en-US/docs/Web/API/DragEvent)

The event object passed to drag event handlers.

[`DataTransfer`](https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer)

Holds any data transferred between contexts, consisting of text items and file items. Initially designed for drag and drop, it is now also used in other contexts such as [Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API).

[`DataTransferItem`](https://developer.mozilla.org/en-US/docs/Web/API/DataTransferItem)

Represents one item in the drag data store, which can be a text item or a file item.

[`DataTransferItemList`](https://developer.mozilla.org/en-US/docs/Web/API/DataTransferItemList)

Represents the list of [`DataTransferItem`](https://developer.mozilla.org/en-US/docs/Web/API/DataTransferItem) objects in the drag data store.

## [Examples](#examples)

- [Copying and moving elements with the `DataTransfer` interface](https://mdn.github.io/dom-examples/drag-and-drop/copy-move-DataTransfer.html 'External link (opens in new tab)')
- [Copying and moving elements with the `DataTransferListItem` interface](https://mdn.github.io/dom-examples/drag-and-drop/copy-move-DataTransferItemList.html 'External link (opens in new tab)')

Reference pages for each interface also have individual examples.

## [Specifications](#specifications)

| Specification                                           |
| ------------------------------------------------------- |
| [HTML](https://html.spec.whatwg.org/multipage/dnd.html) |

## [See also](#see_also)

- [Drag Operations](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/Drag_operations)
- [Working with the drag data store](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/Drag_data_store)
- [HTML Living Standard: Drag and Drop](https://html.spec.whatwg.org/multipage/interaction.html#dnd 'External link (opens in new tab)')
- [Drag and Drop interoperability data from CanIUse](https://caniuse.com/#search=draganddrop 'External link (opens in new tab)')
