import type { ContentTopic } from '../../../types';

export const mdnDragAndDropTopics = {
  'mdn-drag-and-drop': {
    id: 'mdn-drag-and-drop',
    heading: 'Concepts and usage',
    blocks: [
      {
        type: 'paragraph',
        text: 'On the surface, Drag and Drop actually has three distinct use cases: dragging elements within a page, dragging data out of a page, and dragging data into a page. They have subtly different requirements and implementations. However, the Drag and Drop API provides a unified model to think about all these interactions.',
      },
      {
        type: 'paragraph',
        text: 'At its core, a drag operation involves three things:',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'The item being dragged',
          'The underlying data to be transferred',
          'The drop target',
        ],
      },
      {
        type: 'paragraph',
        text: "It's not necessarily true that all three are under your control, or you need to define them yourself:",
      },
      {
        type: 'list',
        ordered: false,
        items: [
          "When dragging external data into a page, there's no draggable item to be defined (for example, it could be a file in the operating system's file explorer).",
          "When dragging elements within a page, you often don't need to define any transferred data; you just manipulate the dragged element.",
          "When dragging out of the page, there's no drop target to be defined.",
        ],
      },
      {
        type: 'paragraph',
        text: "We'll look at how each one can be defined and used.",
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Drag events',
      },
      {
        type: 'paragraph',
        text: 'HTML drag-and-drop uses the DOM event model and drag events inherited from mouse events. During drag operations, several event types are fired, and some events might fire many times, such as the drag and dragover events.',
      },
      {
        type: 'table',
        headers: ['Event', 'Fires when...'],
        rows: [
          ['dragstart', '...the draggable item starts to be dragged.'],
          ['drag', '...the draggable item is being dragged (fires repeatedly).'],
          ['dragenter', '...the element has a draggable item entering it.'],
          ['dragleave', '...the element has a draggable item leaving it.'],
          [
            'dragover',
            '...the element has a draggable item being dragged over it (fires repeatedly).',
          ],
          ['drop', '...the element is a drop target and the draggable item is dropped over it.'],
          ['dragend', '...the draggable item stops being dragged.'],
        ],
      },
      {
        type: 'paragraph',
        text: "Note: The dragstart, drag, and dragend events are fired on the dragged item, and therefore can't fire when dragging a file into the browser from the OS.",
      },
      {
        type: 'paragraph',
        text: "Similarly, the dragenter, dragleave, dragover, and drop events are fired on elements that are potential drop targets, and therefore can't fire when dragging an item out of the browser.",
      },
      {
        type: 'paragraph',
        text: 'For more information, see Drag operations.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Draggable items',
      },
      {
        type: 'paragraph',
        text: 'In HTML, images, links, and selections are draggable by default. To make an arbitrary element draggable, set the draggable attribute to the value "true".',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '<p id="p1" draggable="true">This element is draggable.</p>',
        },
      },
      {
        type: 'paragraph',
        text: 'At this point, the element already has the dragging appearance, although it has no behavior defined yet:',
      },
      {
        type: 'paragraph',
        text: 'For images and links, draggable defaults to true, so you would only set it to false to disable dragging of these elements. For non-draggable elements, the "dragging" gesture usually selects the text instead.',
      },
      {
        type: 'paragraph',
        text: 'Note: When an element is made draggable, text or other elements within it can no longer be selected in the normal way by clicking and dragging with the mouse. Instead, the user must hold down the Alt key to select text with the mouse, or use the keyboard.',
      },
      {
        type: 'paragraph',
        text: 'A selection is also draggable. In this case, the source node, or the node on which various events such as dragstart and dragend are fired, is the text node that the drag started on. The selection can partially or fully contain multiple nodes, including text nodes and element nodes, which are all considered dragged simultaneously.',
      },
      {
        type: 'paragraph',
        text: "As aforementioned, the dragged item can also be something not on a webpage—for example, a file in the operating system's file explorer. However, only items on the webpage can cause the dragstart and dragend events to fire.",
      },
      {
        type: 'paragraph',
        text: 'For more information, see the Drag operations guide.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Drag data store',
      },
      {
        type: 'paragraph',
        text: "You can't transfer JavaScript objects directly to arbitrary webpages, and surely not to external applications, so to transfer data in and out of the webpage, the data must be serialized to a string (or as a File). In drag and drop, this string is encapsulated in a DataTransferItem object, which also defines a particular type—typically a MIME type such as text/html—that defines how the string should be interpreted.",
      },
      {
        type: 'paragraph',
        text: "Each drag and drop operation has an associated drag data store, which is a DataTransfer object accessible via the DragEvent's dataTransfer property. For the default-draggable items such as images, links, and selections, the drag data is already defined by the browser; for custom draggable elements defined using the draggable attribute, you must define the drag data yourself. The only time to make any modifications to the data store is within the dragstart handler—for the dataTransfer of any other drag event, the data store is unmodifiable.",
      },
      {
        type: 'paragraph',
        text: 'The setData() method can be used to add an item to the drag data, as shown in the following example.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'function dragstartHandler(ev) {\n  // Add different types of drag data\n  ev.dataTransfer.setData("text/plain", ev.target.innerText);\n  ev.dataTransfer.setData("text/html", ev.target.outerHTML);\n  ev.dataTransfer.setData(\n    "text/uri-list",\n    ev.target.ownerDocument.location.href,\n  );\n}\n\nconst p1 = document.getElementById("p1");\np1.addEventListener("dragstart", dragstartHandler);',
        },
      },
      {
        type: 'paragraph',
        text: 'Furthermore, the only time you can read from the data store, apart from the dragstart event, is during the drop event (allowing the drop target to retrieve the data). For all other events, the data store cannot be accessed.',
      },
      {
        type: 'paragraph',
        text: 'For more information, read Working with the drag data store.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Drop target',
      },
      {
        type: 'paragraph',
        text: 'A drop target is an element on which a user can drop a dragged item. By default, most elements are not drop targets, and if you release the drag, a "fly-back" animation displays, indicating that the drag and drop failed. Any element can become a drop target by canceling the dragover event that fires on it with preventDefault().',
      },
      {
        type: 'paragraph',
        text: 'The drop event only fires on drop targets, and it is the only time you can read the drag data store.',
      },
      {
        type: 'paragraph',
        text: 'The following example shows a minimal valid drop target, and also combines the code from the previous examples.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '<p id="target">Drop Zone</p>',
        },
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'const target = document.getElementById("target");\n\n// Cancel dragover so that drop can fire\ntarget.addEventListener("dragover", (ev) => {\n  ev.preventDefault();\n});\ntarget.addEventListener("drop", (ev) => {\n  ev.preventDefault();\n  const data = ev.dataTransfer.getData("text/plain");\n  ev.target.append(data);\n});',
        },
      },
      {
        type: 'paragraph',
        text: 'For more information, see Specifying drop targets.',
      },
      {
        type: 'paragraph',
        text: 'Drag operations',
      },
      {
        type: 'paragraph',
        text: 'Describes the steps that occur during a drag and drop operation, and what the application is supposed to do within each handler.',
      },
      {
        type: 'paragraph',
        text: 'Working with the drag data store',
      },
      {
        type: 'paragraph',
        text: 'Describes how to read and write to the drag data store during a drag and drop operation.',
      },
      {
        type: 'paragraph',
        text: 'File drag and drop',
      },
      {
        type: 'paragraph',
        text: 'A hands-on guide implementing a basic interface accepting file drops.',
      },
      {
        type: 'paragraph',
        text: 'Kanban board with drag and drop',
      },
      {
        type: 'paragraph',
        text: 'A hands-on guide implementing a Kanban board involving dragging and dropping elements within a webpage.',
      },
      {
        type: 'paragraph',
        text: 'DragEvent',
      },
      {
        type: 'paragraph',
        text: 'The event object passed to drag event handlers.',
      },
      {
        type: 'paragraph',
        text: 'DataTransfer',
      },
      {
        type: 'paragraph',
        text: 'Holds any data transferred between contexts, consisting of text items and file items. Initially designed for drag and drop, it is now also used in other contexts such as Clipboard API.',
      },
      {
        type: 'paragraph',
        text: 'DataTransferItem',
      },
      {
        type: 'paragraph',
        text: 'Represents one item in the drag data store, which can be a text item or a file item.',
      },
      {
        type: 'paragraph',
        text: 'DataTransferItemList',
      },
      {
        type: 'paragraph',
        text: 'Represents the list of DataTransferItem objects in the drag data store.',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'Copying and moving elements with the DataTransfer interface',
          'Copying and moving elements with the DataTransferListItem interface',
        ],
      },
      {
        type: 'paragraph',
        text: 'Reference pages for each interface also have individual examples.',
      },
      {
        type: 'table',
        headers: ['Specification'],
        rows: [['HTML']],
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'Drag Operations',
          'Working with the drag data store',
          'HTML Living Standard: Drag and Drop',
          'Drag and Drop interoperability data from CanIUse',
        ],
      },
    ],
  },
} satisfies Record<string, ContentTopic>;
