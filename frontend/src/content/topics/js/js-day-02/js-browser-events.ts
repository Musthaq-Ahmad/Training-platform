import type { ContentTopic } from '../../../types';

export const jsBrowserEventsTopics = {
  'js-browser-events': {
    id: 'js-browser-events',
    heading: 'Event handlers',
    blocks: [
      {
        type: 'paragraph',
        text: 'To react on events we can assign a handler – a function that runs in case of an event.',
      },
      {
        type: 'paragraph',
        text: 'Handlers are a way to run JavaScript code in case of user actions.',
      },
      {
        type: 'paragraph',
        text: 'There are several ways to assign a handler. Let’s see them, starting from the simplest one.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'HTML-attribute',
      },
      {
        type: 'paragraph',
        text: 'A handler can be set in HTML with an attribute named on&lt;event&gt;.',
      },
      {
        type: 'paragraph',
        text: 'For instance, to assign a click handler for an input, we can use onclick, like here:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '<input value="Click me" onclick="alert(\'Click!\')" type="button">',
        },
      },
      {
        type: 'paragraph',
        text: 'On mouse click, the code inside onclick runs.',
      },
      {
        type: 'paragraph',
        text: 'Please note that inside onclick we use single quotes, because the attribute itself is in double quotes. If we forget that the code is inside the attribute and use double quotes inside, like this: onclick="alert("Click!")", then it won’t work right.',
      },
      {
        type: 'paragraph',
        text: 'An HTML-attribute is not a convenient place to write a lot of code, so we’d better create a JavaScript function and call it there.',
      },
      {
        type: 'paragraph',
        text: 'Here a click runs the function countRabbits():',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '<script>\n  function countRabbits() {\n    for(let i=1; i<=3; i++) {\n      alert("Rabbit number " + i);\n    }\n  }\n</script>\n\n<input type="button" onclick="countRabbits()" value="Count rabbits!">',
        },
      },
      {
        type: 'paragraph',
        text: 'As we know, HTML attribute names are not case-sensitive, so ONCLICK works as well as onClick and onCLICK… But usually attributes are lowercased: onclick.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'DOM property',
      },
      {
        type: 'paragraph',
        text: 'We can assign a handler using a DOM property on&lt;event&gt;.',
      },
      {
        type: 'paragraph',
        text: 'For instance, elem.onclick:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '<input id="elem" type="button" value="Click me">\n<script>\n  elem.onclick = function() {\n    alert(\'Thank you\');\n  };\n</script>',
        },
      },
      {
        type: 'paragraph',
        text: 'If the handler is assigned using an HTML-attribute then the browser reads it, creates a new function from the attribute content and writes it to the DOM property.',
      },
      {
        type: 'paragraph',
        text: 'So this way is actually the same as the previous one.',
      },
      {
        type: 'paragraph',
        text: 'These two code pieces work the same:',
      },
      {
        type: 'list',
        ordered: true,
        items: [
          'Only HTML: &lt;input type="button" onclick="alert(\'Click!\')" value="Button"&gt;',
          'HTML + JS: &lt;input type="button" id="button" value="Button"&gt; &lt;script&gt; button.onclick = function() { alert(\'Click!\'); }; &lt;/script&gt;',
        ],
      },
      {
        type: 'paragraph',
        text: 'In the first example, the HTML attribute is used to initialize the button.onclick, while in the second example – the script, that’s all the difference.',
      },
      {
        type: 'paragraph',
        text: 'As there’s only one onclick property, we can’t assign more than one event handler.',
      },
      {
        type: 'paragraph',
        text: 'In the example below adding a handler with JavaScript overwrites the existing handler:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '<input type="button" id="elem" onclick="alert(\'Before\')" value="Click me">\n<script>\n  elem.onclick = function() { // overwrites the existing handler\n    alert(\'After\'); // only this will be shown\n  };\n</script>',
        },
      },
      {
        type: 'paragraph',
        text: 'To remove a handler – assign elem.onclick = null.',
      },
      {
        type: 'paragraph',
        text: 'The value of this inside a handler is the element. The one which has the handler on it.',
      },
      {
        type: 'paragraph',
        text: 'In the code below button shows its contents using this.innerHTML:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '<button onclick="alert(this.innerHTML)">Click me</button>',
        },
      },
      {
        type: 'paragraph',
        text: 'If you’re starting to work with events – please note some subtleties.',
      },
      {
        type: 'paragraph',
        text: 'We can set an existing function as a handler:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "function sayThanks() {\n  alert('Thanks!');\n}\n\nelem.onclick = sayThanks;",
        },
      },
      {
        type: 'paragraph',
        text: 'But be careful: the function should be assigned as sayThanks, not sayThanks().',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '// right\nbutton.onclick = sayThanks;\n\n// wrong\nbutton.onclick = sayThanks();',
        },
      },
      {
        type: 'paragraph',
        text: 'If we add parentheses, then sayThanks() becomes a function call. So the last line actually takes the result of the function execution, that is undefined (as the function returns nothing), and assigns it to onclick. That doesn’t work.',
      },
      {
        type: 'paragraph',
        text: '…On the other hand, in the markup we do need the parentheses:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '<input type="button" id="button" onclick="sayThanks()">',
        },
      },
      {
        type: 'paragraph',
        text: 'The difference is easy to explain. When the browser reads the attribute, it creates a handler function with body from the attribute content.',
      },
      {
        type: 'paragraph',
        text: 'So the markup generates this property:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'button.onclick = function() {\n  sayThanks(); // <-- the attribute content goes here\n};',
        },
      },
      {
        type: 'paragraph',
        text: 'Don’t use setAttribute for handlers.',
      },
      {
        type: 'paragraph',
        text: 'Such a call won’t work:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "// a click on <body> will generate errors,\n// because attributes are always strings, function becomes a string\ndocument.body.setAttribute('onclick', function() { alert(1) });",
        },
      },
      {
        type: 'paragraph',
        text: 'DOM-property case matters.',
      },
      {
        type: 'paragraph',
        text: 'Assign a handler to elem.onclick, not elem.ONCLICK, because DOM properties are case-sensitive.',
      },
      {
        type: 'paragraph',
        text: 'The fundamental problem of the aforementioned ways to assign handlers is that we can’t assign multiple handlers to one event.',
      },
      {
        type: 'paragraph',
        text: 'Let’s say, one part of our code wants to highlight a button on click, and another one wants to show a message on the same click.',
      },
      {
        type: 'paragraph',
        text: 'We’d like to assign two event handlers for that. But a new DOM property will overwrite the existing one:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'input.onclick = function() { alert(1); }\n// ...\ninput.onclick = function() { alert(2); } // replaces the previous handler',
        },
      },
      {
        type: 'paragraph',
        text: 'Developers of web standards understood that long ago and suggested an alternative way of managing handlers using the special methods addEventListener and removeEventListener which aren’t bound by such constraint.',
      },
      {
        type: 'paragraph',
        text: 'The syntax to add a handler:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'element.addEventListener(event, handler, [options]);',
        },
      },
      {
        type: 'paragraph',
        text: 'event',
      },
      {
        type: 'paragraph',
        text: 'Event name, e.g. "click".',
      },
      {
        type: 'paragraph',
        text: 'handler',
      },
      {
        type: 'paragraph',
        text: 'The handler function.',
      },
      {
        type: 'paragraph',
        text: 'options',
      },
      {
        type: 'paragraph',
        text: 'An additional optional object with properties:',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'once: if true, then the listener is automatically removed after it triggers.',
          'capture: the phase where to handle the event, to be covered later in the chapter Bubbling and capturing. For historical reasons, options can also be false/true, that’s the same as {capture: false/true}.',
          'passive: if true, then the handler will not call preventDefault(), we’ll explain that later in Browser default actions.',
        ],
      },
      {
        type: 'paragraph',
        text: 'To remove the handler, use removeEventListener:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'element.removeEventListener(event, handler, [options]);',
        },
      },
      {
        type: 'paragraph',
        text: 'Removal requires the same function',
      },
      {
        type: 'paragraph',
        text: 'To remove a handler we should pass exactly the same function as was assigned.',
      },
      {
        type: 'paragraph',
        text: 'This doesn’t work:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'elem.addEventListener( "click" , () => alert(\'Thanks!\'));\n// ....\nelem.removeEventListener( "click", () => alert(\'Thanks!\'));',
        },
      },
      {
        type: 'paragraph',
        text: 'The handler won’t be removed, because removeEventListener gets another function – with the same code, but that doesn’t matter, as it’s a different function object.',
      },
      {
        type: 'paragraph',
        text: 'Here’s the right way:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'function handler() {\n  alert( \'Thanks!\' );\n}\n\ninput.addEventListener("click", handler);\n// ....\ninput.removeEventListener("click", handler);',
        },
      },
      {
        type: 'paragraph',
        text: 'Please note – if we don’t store the function in a variable, then we can’t remove it. There’s no way to “read back” handlers assigned by addEventListener.',
      },
      {
        type: 'paragraph',
        text: 'Multiple calls to addEventListener allow it to add multiple handlers, like this:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '<input id="elem" type="button" value="Click me"/>\n\n<script>\n  function handler1() {\n    alert(\'Thanks!\');\n  };\n\n  function handler2() {\n    alert(\'Thanks again!\');\n  }\n\n  elem.onclick = () => alert("Hello");\n  elem.addEventListener("click", handler1); // Thanks!\n  elem.addEventListener("click", handler2); // Thanks again!\n</script>',
        },
      },
      {
        type: 'paragraph',
        text: 'As we can see in the example above, we can set handlers both using a DOM-property and addEventListener. But generally we use only one of these ways.',
      },
      {
        type: 'paragraph',
        text: 'For some events, handlers only work with addEventListener',
      },
      {
        type: 'paragraph',
        text: 'There exist events that can’t be assigned via a DOM-property. Only with addEventListener.',
      },
      {
        type: 'paragraph',
        text: 'For instance, the DOMContentLoaded event, that triggers when the document is loaded and the DOM has been built.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '// will never run\ndocument.onDOMContentLoaded = function() {\n  alert("DOM built");\n};',
        },
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '// this way it works\ndocument.addEventListener("DOMContentLoaded", function() {\n  alert("DOM built");\n});',
        },
      },
      {
        type: 'paragraph',
        text: 'So addEventListener is more universal. Although, such events are an exception rather than the rule.',
      },
      {
        type: 'paragraph',
        text: 'To properly handle an event we’d want to know more about what’s happened. Not just a “click” or a “keydown”, but what were the pointer coordinates? Which key was pressed? And so on.',
      },
      {
        type: 'paragraph',
        text: 'When an event happens, the browser creates an event object, puts details into it and passes it as an argument to the handler.',
      },
      {
        type: 'paragraph',
        text: 'Here’s an example of getting pointer coordinates from the event object:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '<input type="button" value="Click me" id="elem">\n\n<script>\n  elem.onclick = function(event) {\n    // show event type, element and coordinates of the click\n    alert(event.type + " at " + event.currentTarget);\n    alert("Coordinates: " + event.clientX + ":" + event.clientY);\n  };\n</script>',
        },
      },
      {
        type: 'paragraph',
        text: 'Some properties of event object:',
      },
      {
        type: 'paragraph',
        text: 'event.type',
      },
      {
        type: 'paragraph',
        text: 'Event type, here it’s "click".',
      },
      {
        type: 'paragraph',
        text: 'event.currentTarget',
      },
      {
        type: 'paragraph',
        text: 'Element that handled the event. That’s exactly the same as this, unless the handler is an arrow function, or its this is bound to something else, then we can get the element from event.currentTarget.',
      },
      {
        type: 'paragraph',
        text: 'event.clientX / event.clientY',
      },
      {
        type: 'paragraph',
        text: 'Window-relative coordinates of the cursor, for pointer events.',
      },
      {
        type: 'paragraph',
        text: 'There are more properties. Many of them depend on the event type: keyboard events have one set of properties, pointer events – another one, we’ll study them later when as we move on to the details of different events.',
      },
      {
        type: 'paragraph',
        text: 'The event object is also available in HTML handlers',
      },
      {
        type: 'paragraph',
        text: 'If we assign a handler in HTML, we can also use the event object, like this:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '<input type="button" onclick="alert(event.type)" value="Event type">',
        },
      },
      {
        type: 'paragraph',
        text: 'That’s possible because when the browser reads the attribute, it creates a handler like this: function(event) { alert(event.type) }. That is: its first argument is called "event", and the body is taken from the attribute.',
      },
      {
        type: 'paragraph',
        text: 'We can assign not just a function, but an object as an event handler using addEventListener. When an event occurs, its handleEvent method is called.',
      },
      {
        type: 'paragraph',
        text: 'For instance:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '<button id="elem">Click me</button>\n\n<script>\n  let obj = {\n    handleEvent(event) {\n      alert(event.type + " at " + event.currentTarget);\n    }\n  };\n\n  elem.addEventListener(\'click\', obj);\n</script>',
        },
      },
      {
        type: 'paragraph',
        text: 'As we can see, when addEventListener receives an object as the handler, it calls obj.handleEvent(event) in case of an event.',
      },
      {
        type: 'paragraph',
        text: 'We could also use objects of a custom class, like this:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "<button id=\"elem\">Click me</button>\n\n<script>\n  class Menu {\n    handleEvent(event) {\n      switch(event.type) {\n        case 'mousedown':\n          elem.innerHTML = \"Mouse button pressed\";\n          break;\n        case 'mouseup':\n          elem.innerHTML += \"...and released.\";\n          break;\n      }\n    }\n  }\n\n  let menu = new Menu();\n\n  elem.addEventListener('mousedown', menu);\n  elem.addEventListener('mouseup', menu);\n</script>",
        },
      },
      {
        type: 'paragraph',
        text: 'Here the same object handles both events. Please note that we need to explicitly setup the events to listen using addEventListener. The menu object only gets mousedown and mouseup here, not any other types of events.',
      },
      {
        type: 'paragraph',
        text: 'The method handleEvent does not have to do all the job by itself. It can call other event-specific methods instead, like this:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '<button id="elem">Click me</button>\n\n<script>\n  class Menu {\n    handleEvent(event) {\n      // mousedown -> onMousedown\n      let method = \'on\' + event.type[0].toUpperCase() + event.type.slice(1);\n      this[method](event);\n    }\n\n    onMousedown() {\n      elem.innerHTML = "Mouse button pressed";\n    }\n\n    onMouseup() {\n      elem.innerHTML += "...and released.";\n    }\n  }\n\n  let menu = new Menu();\n  elem.addEventListener(\'mousedown\', menu);\n  elem.addEventListener(\'mouseup\', menu);\n</script>',
        },
      },
      {
        type: 'paragraph',
        text: 'Now event handlers are clearly separated, that may be easier to support.',
      },
      {
        type: 'paragraph',
        text: 'There are 3 ways to assign event handlers:',
      },
      {
        type: 'list',
        ordered: true,
        items: [
          'HTML attribute: onclick="...".',
          'DOM property: elem.onclick = function.',
          'Methods: elem.addEventListener(event, handler[, phase]) to add, removeEventListener to remove.',
        ],
      },
      {
        type: 'paragraph',
        text: 'HTML attributes are used sparingly, because JavaScript in the middle of an HTML tag looks a little bit odd and alien. Also can’t write lots of code in there.',
      },
      {
        type: 'paragraph',
        text: 'DOM properties are ok to use, but we can’t assign more than one handler of the particular event. In many cases that limitation is not pressing.',
      },
      {
        type: 'paragraph',
        text: 'The last way is the most flexible, but it is also the longest to write. There are few events that only work with it, for instance transitionend and DOMContentLoaded (to be covered). Also addEventListener supports objects as event handlers. In that case the method handleEvent is called in case of the event.',
      },
      {
        type: 'paragraph',
        text: 'No matter how you assign the handler – it gets an event object as the first argument. That object contains the details about what’s happened.',
      },
      {
        type: 'paragraph',
        text: 'We’ll learn more about events in general and about different types of events in the next chapters.',
      },
      {
        type: 'paragraph',
        text: 'Let’s start with an example.',
      },
      {
        type: 'paragraph',
        text: 'This handler is assigned to &lt;div&gt;, but also runs if you click any nested tag like &lt;em&gt; or &lt;code&gt;:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '<div onclick="alert(\'The handler!\')">\n  <em>If you click on <code>EM</code>, the handler on <code>DIV</code> runs.</em>\n</div>',
        },
      },
      {
        type: 'paragraph',
        text: 'Isn’t it a bit strange? Why does the handler on &lt;div&gt; run if the actual click was on &lt;em&gt;?',
      },
      {
        type: 'paragraph',
        text: 'The bubbling principle is simple.',
      },
      {
        type: 'paragraph',
        text: 'When an event happens on an element, it first runs the handlers on it, then on its parent, then all the way up on other ancestors.',
      },
      {
        type: 'paragraph',
        text: 'Let’s say we have 3 nested elements FORM &gt; DIV &gt; P with a handler on each of them:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '<style>\n  body * {\n    margin: 10px;\n    border: 1px solid blue;\n  }\n</style>\n\n<form onclick="alert(\'form\')">FORM\n  <div onclick="alert(\'div\')">DIV\n    <p onclick="alert(\'p\')">P</p>\n  </div>\n</form>',
        },
      },
      {
        type: 'paragraph',
        text: 'A click on the inner &lt;p&gt; first runs onclick:',
      },
      {
        type: 'list',
        ordered: true,
        items: [
          'On that &lt;p&gt;.',
          'Then on the outer &lt;div&gt;.',
          'Then on the outer &lt;form&gt;.',
          'And so on upwards till the document object.',
        ],
      },
      {
        type: 'paragraph',
        text: 'So if we click on &lt;p&gt;, then we’ll see 3 alerts: p → div → form.',
      },
      {
        type: 'paragraph',
        text: 'The process is called “bubbling”, because events “bubble” from the inner element up through parents like a bubble in the water.',
      },
      {
        type: 'paragraph',
        text: 'Almost all events bubble.',
      },
      {
        type: 'paragraph',
        text: 'The key word in this phrase is “almost”.',
      },
      {
        type: 'paragraph',
        text: 'For instance, a focus event does not bubble. There are other examples too, we’ll meet them. But still it’s an exception, rather than a rule, most events do bubble.',
      },
      {
        type: 'paragraph',
        text: 'A handler on a parent element can always get the details about where it actually happened.',
      },
      {
        type: 'paragraph',
        text: 'The most deeply nested element that caused the event is called a target element, accessible as event.target.',
      },
      {
        type: 'paragraph',
        text: 'Note the differences from this (=event.currentTarget):',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'event.target – is the “target” element that initiated the event, it doesn’t change through the bubbling process.',
          'this – is the “current” element, the one that has a currently running handler on it.',
        ],
      },
      {
        type: 'paragraph',
        text: 'For instance, if we have a single handler form.onclick, then it can “catch” all clicks inside the form. No matter where the click happened, it bubbles up to &lt;form&gt; and runs the handler.',
      },
      {
        type: 'paragraph',
        text: 'In form.onclick handler:',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'this (=event.currentTarget) is the &lt;form&gt; element, because the handler runs on it.',
          'event.target is the actual element inside the form that was clicked.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Check it out:',
      },
      {
        type: 'paragraph',
        text: 'Result',
      },
      {
        type: 'paragraph',
        text: 'script.js',
      },
      {
        type: 'paragraph',
        text: 'example.css',
      },
      {
        type: 'paragraph',
        text: 'index.html',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'form.onclick = function(event) {\n  event.target.style.backgroundColor = \'yellow\';\n\n  // chrome needs some time to paint yellow\n  setTimeout(() => {\n    alert("target = " + event.target.tagName + ", this=" + this.tagName);\n    event.target.style.backgroundColor = \'\'\n  }, 0);\n};',
        },
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'form {\n  background-color: green;\n  position: relative;\n  width: 150px;\n  height: 150px;\n  text-align: center;\n  cursor: pointer;\n}\n\ndiv {\n  background-color: blue;\n  position: absolute;\n  top: 25px;\n  left: 25px;\n  width: 100px;\n  height: 100px;\n}\n\np {\n  background-color: red;\n  position: absolute;\n  top: 25px;\n  left: 25px;\n  width: 50px;\n  height: 50px;\n  line-height: 50px;\n  margin: 0;\n}\n\nbody {\n  line-height: 25px;\n  font-size: 16px;\n}',
        },
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '<!DOCTYPE HTML>\n<html>\n\n<head>\n  <meta charset="utf-8">\n  <link rel="stylesheet" href="example.css">\n</head>\n\n<body>\n  A click shows both <code>event.target</code> and <code>this</code> to compare:\n\n  <form id="form">FORM\n    <div>DIV\n      <p>P</p>\n    </div>\n  </form>\n\n  <script src="script.js"></script>\n</body>\n</html>',
        },
      },
      {
        type: 'paragraph',
        text: 'It’s possible that event.target could equal this – it happens when the click is made directly on the &lt;form&gt; element.',
      },
      {
        type: 'paragraph',
        text: 'A bubbling event goes from the target element straight up. Normally it goes upwards till &lt;html&gt;, and then to document object, and some events even reach window, calling all handlers on the path.',
      },
      {
        type: 'paragraph',
        text: 'But any handler may decide that the event has been fully processed and stop the bubbling.',
      },
      {
        type: 'paragraph',
        text: 'The method for it is event.stopPropagation().',
      },
      {
        type: 'paragraph',
        text: 'For instance, here body.onclick doesn’t work if you click on &lt;button&gt;:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '<body onclick="alert(`the bubbling doesn\'t reach here`)">\n  <button onclick="event.stopPropagation()">Click me</button>\n</body>',
        },
      },
      {
        type: 'paragraph',
        text: 'event.stopImmediatePropagation()',
      },
      {
        type: 'paragraph',
        text: 'If an element has multiple event handlers on a single event, then even if one of them stops the bubbling, the other ones still execute.',
      },
      {
        type: 'paragraph',
        text: 'In other words, event.stopPropagation() stops the move upwards, but on the current element all other handlers will run.',
      },
      {
        type: 'paragraph',
        text: 'To stop the bubbling and prevent handlers on the current element from running, there’s a method event.stopImmediatePropagation(). After it no other handlers execute.',
      },
      {
        type: 'paragraph',
        text: 'Don’t stop bubbling without a need!',
      },
      {
        type: 'paragraph',
        text: 'Bubbling is convenient. Don’t stop it without a real need: obvious and architecturally well thought out.',
      },
      {
        type: 'paragraph',
        text: 'Sometimes event.stopPropagation() creates hidden pitfalls that later may become problems.',
      },
      {
        type: 'paragraph',
        text: 'For instance:',
      },
      {
        type: 'list',
        ordered: true,
        items: [
          'We create a nested menu. Each submenu handles clicks on its elements and calls stopPropagation so that the outer menu won’t trigger.',
          "Later we decide to catch clicks on the whole window, to track users’ behavior (where people click). Some analytic systems do that. Usually the code uses document.addEventListener('click'…) to catch all clicks.",
          'Our analytic won’t work over the area where clicks are stopped by stopPropagation. Sadly, we’ve got a “dead zone”.',
        ],
      },
      {
        type: 'paragraph',
        text: 'There’s usually no real need to prevent the bubbling. A task that seemingly requires that may be solved by other means. One of them is to use custom events, we’ll cover them later. Also we can write our data into the event object in one handler and read it in another one, so we can pass to handlers on parents information about the processing below.',
      },
      {
        type: 'paragraph',
        text: 'There’s another phase of event processing called “capturing”. It is rarely used in real code, but sometimes can be useful.',
      },
      {
        type: 'paragraph',
        text: 'The standard DOM Events describes 3 phases of event propagation:',
      },
      {
        type: 'list',
        ordered: true,
        items: [
          'Capturing phase – the event goes down to the element.',
          'Target phase – the event reached the target element.',
          'Bubbling phase – the event bubbles up from the element.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Here’s the picture, taken from the specification, of the capturing (1), target (2) and bubbling (3) phases for a click event on a &lt;td&gt; inside a table:',
      },
      {
        type: 'paragraph',
        text: 'That is: for a click on &lt;td&gt; the event first goes through the ancestors chain down to the element (capturing phase), then it reaches the target and triggers there (target phase), and then it goes up (bubbling phase), calling handlers on its way.',
      },
      {
        type: 'paragraph',
        text: 'Until now, we only talked about bubbling, because the capturing phase is rarely used.',
      },
      {
        type: 'paragraph',
        text: 'In fact, the capturing phase was invisible for us, because handlers added using on&lt;event&gt;-property or using HTML attributes or using two-argument addEventListener(event, handler) don’t know anything about capturing, they only run on the 2nd and 3rd phases.',
      },
      {
        type: 'paragraph',
        text: 'To catch an event on the capturing phase, we need to set the handler capture option to true:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'elem.addEventListener(..., {capture: true})\n\n// or, just "true" is an alias to {capture: true}\nelem.addEventListener(..., true)',
        },
      },
      {
        type: 'paragraph',
        text: 'There are two possible values of the capture option:',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'If it’s false (default), then the handler is set on the bubbling phase.',
          'If it’s true, then the handler is set on the capturing phase.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Note that while formally there are 3 phases, the 2nd phase (“target phase”: the event reached the element) is not handled separately: handlers on both capturing and bubbling phases trigger at that phase.',
      },
      {
        type: 'paragraph',
        text: 'Let’s see both capturing and bubbling in action:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '<style>\n  body * {\n    margin: 10px;\n    border: 1px solid blue;\n  }\n</style>\n\n<form>FORM\n  <div>DIV\n    <p>P</p>\n  </div>\n</form>\n\n<script>\n  for(let elem of document.querySelectorAll(\'*\')) {\n    elem.addEventListener("click", e => alert(`Capturing: ${elem.tagName}`), true);\n    elem.addEventListener("click", e => alert(`Bubbling: ${elem.tagName}`));\n  }\n</script>',
        },
      },
      {
        type: 'paragraph',
        text: 'The code sets click handlers on every element in the document to see which ones are working.',
      },
      {
        type: 'paragraph',
        text: 'If you click on &lt;p&gt;, then the sequence is:',
      },
      {
        type: 'list',
        ordered: true,
        items: [
          'HTML → BODY → FORM → DIV -&gt; P (capturing phase, the first listener):',
          'P → DIV → FORM → BODY → HTML (bubbling phase, the second listener).',
        ],
      },
      {
        type: 'paragraph',
        text: 'Please note, the P shows up twice, because we’ve set two listeners: capturing and bubbling. The target triggers at the end of the first and at the beginning of the second phase.',
      },
      {
        type: 'paragraph',
        text: 'There’s a property event.eventPhase that tells us the number of the phase on which the event was caught. But it’s rarely used, because we usually know it in the handler.',
      },
      {
        type: 'paragraph',
        text: 'To remove the handler, removeEventListener needs the same phase',
      },
      {
        type: 'paragraph',
        text: 'If we addEventListener(..., true), then we should mention the same phase in removeEventListener(..., true) to correctly remove the handler.',
      },
      {
        type: 'paragraph',
        text: 'Listeners on the same element and same phase run in their set order',
      },
      {
        type: 'paragraph',
        text: 'If we have multiple event handlers on the same phase, assigned to the same element with addEventListener, they run in the same order as they are created:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'elem.addEventListener("click", e => alert(1)); // guaranteed to trigger first\nelem.addEventListener("click", e => alert(2));',
        },
      },
      {
        type: 'paragraph',
        text: 'The event.stopPropagation() during the capturing also prevents the bubbling',
      },
      {
        type: 'paragraph',
        text: 'The event.stopPropagation() method and its sibling event.stopImmediatePropagation() can also be called on the capturing phase. Then not only the futher capturing is stopped, but the bubbling as well.',
      },
      {
        type: 'paragraph',
        text: 'In other words, normally the event goes first down (“capturing”) and then up (“bubbling”). But if event.stopPropagation() is called during the capturing phase, then the event travel stops, no bubbling will occur.',
      },
      {
        type: 'paragraph',
        text: 'When an event happens – the most nested element where it happens gets labeled as the “target element” (event.target).',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'Then the event moves down from the document root to event.target, calling handlers assigned with addEventListener(..., true) on the way (true is a shorthand for {capture: true}).',
          'Then handlers are called on the target element itself.',
          'Then the event bubbles up from event.target to the root, calling handlers assigned using on&lt;event&gt;, HTML attributes and addEventListener without the 3rd argument or with the 3rd argument false/{capture:false}.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Each handler can access event object properties:',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'event.target – the deepest element that originated the event.',
          'event.currentTarget (=this) – the current element that handles the event (the one that has the handler on it)',
          'event.eventPhase – the current phase (capturing=1, target=2, bubbling=3).',
        ],
      },
      {
        type: 'paragraph',
        text: 'Any event handler can stop the event by calling event.stopPropagation(), but that’s not recommended, because we can’t really be sure we won’t need it above, maybe for completely different things.',
      },
      {
        type: 'paragraph',
        text: 'The capturing phase is used very rarely, usually we handle events on bubbling. And there’s a logical explanation for that.',
      },
      {
        type: 'paragraph',
        text: 'In real world, when an accident happens, local authorities react first. They know best the area where it happened. Then higher-level authorities if needed.',
      },
      {
        type: 'paragraph',
        text: 'The same for event handlers. The code that set the handler on a particular element knows maximum details about the element and what it does. A handler on a particular &lt;td&gt; may be suited for that exactly &lt;td&gt;, it knows everything about it, so it should get the chance first. Then its immediate parent also knows about the context, but a little bit less, and so on till the very top element that handles general concepts and runs the last one.',
      },
      {
        type: 'paragraph',
        text: 'Bubbling and capturing lay the foundation for “event delegation” – an extremely powerful event handling pattern that we study in the next chapter.',
      },
      {
        type: 'paragraph',
        text: 'Capturing and bubbling allow us to implement one of the most powerful event handling patterns called event delegation.',
      },
      {
        type: 'paragraph',
        text: 'The idea is that if we have a lot of elements handled in a similar way, then instead of assigning a handler to each of them – we put a single handler on their common ancestor.',
      },
      {
        type: 'paragraph',
        text: 'In the handler we get event.target to see where the event actually happened and handle it.',
      },
      {
        type: 'paragraph',
        text: 'Let’s see an example – the Ba-Gua diagram reflecting the ancient Chinese philosophy.',
      },
      {
        type: 'paragraph',
        text: 'Here it is:',
      },
      {
        type: 'paragraph',
        text: 'The HTML is like this:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '<table>\n  <tr>\n    <th colspan="3"><em>Bagua</em> Chart: Direction, Element, Color, Meaning</th>\n  </tr>\n  <tr>\n    <td class="nw"><strong>Northwest</strong><br>Metal<br>Silver<br>Elders</td>\n    <td class="n">...</td>\n    <td class="ne">...</td>\n  </tr>\n  <tr>...2 more lines of this kind...</tr>\n  <tr>...2 more lines of this kind...</tr>\n</table>',
        },
      },
      {
        type: 'paragraph',
        text: 'The table has 9 cells, but there could be 99 or 9999, doesn’t matter.',
      },
      {
        type: 'paragraph',
        text: 'Our task is to highlight a cell &lt;td&gt; on click.',
      },
      {
        type: 'paragraph',
        text: 'Instead of assign an onclick handler to each &lt;td&gt; (can be many) – we’ll setup the “catch-all” handler on &lt;table&gt; element.',
      },
      {
        type: 'paragraph',
        text: 'It will use event.target to get the clicked element and highlight it.',
      },
      {
        type: 'paragraph',
        text: 'The code:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "let selectedTd;\n\ntable.onclick = function(event) {\n  let target = event.target; // where was the click?\n\n  if (target.tagName != 'TD') return; // not on TD? Then we're not interested\n\n  highlight(target); // highlight it\n};\n\nfunction highlight(td) {\n  if (selectedTd) { // remove the existing highlight if any\n    selectedTd.classList.remove('highlight');\n  }\n  selectedTd = td;\n  selectedTd.classList.add('highlight'); // highlight the new td\n}",
        },
      },
      {
        type: 'paragraph',
        text: 'Such a code doesn’t care how many cells there are in the table. We can add/remove &lt;td&gt; dynamically at any time and the highlighting will still work.',
      },
      {
        type: 'paragraph',
        text: 'Still, there’s a drawback.',
      },
      {
        type: 'paragraph',
        text: 'The click may occur not on the &lt;td&gt;, but inside it.',
      },
      {
        type: 'paragraph',
        text: 'In our case if we take a look inside the HTML, we can see nested tags inside &lt;td&gt;, like &lt;strong&gt;:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '<td>\n  <strong>Northwest</strong>\n  ...\n</td>',
        },
      },
      {
        type: 'paragraph',
        text: 'Naturally, if a click happens on that &lt;strong&gt; then it becomes the value of event.target.',
      },
      {
        type: 'paragraph',
        text: 'In the handler table.onclick we should take such event.target and find out whether the click was inside &lt;td&gt; or not.',
      },
      {
        type: 'paragraph',
        text: 'Here’s the improved code:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "table.onclick = function(event) {\n  let td = event.target.closest('td'); // (1)\n\n  if (!td) return; // (2)\n\n  if (!table.contains(td)) return; // (3)\n\n  highlight(td); // (4)\n};",
        },
      },
      {
        type: 'paragraph',
        text: 'Explanations:',
      },
      {
        type: 'list',
        ordered: true,
        items: [
          'The method elem.closest(selector) returns the nearest ancestor that matches the selector. In our case we look for &lt;td&gt; on the way up from the source element.',
          'If event.target is not inside any &lt;td&gt;, then the call returns immediately, as there’s nothing to do.',
          'In case of nested tables, event.target may be a &lt;td&gt;, but lying outside of the current table. So we check if that’s actually our table’s &lt;td&gt;.',
          'And, if it’s so, then highlight it.',
        ],
      },
      {
        type: 'paragraph',
        text: 'As the result, we have a fast, efficient highlighting code, that doesn’t care about the total number of &lt;td&gt; in the table.',
      },
      {
        type: 'paragraph',
        text: 'There are other uses for event delegation.',
      },
      {
        type: 'paragraph',
        text: 'Let’s say, we want to make a menu with buttons “Save”, “Load”, “Search” and so on. And there’s an object with methods save, load, search… How to match them?',
      },
      {
        type: 'paragraph',
        text: 'The first idea may be to assign a separate handler to each button. But there’s a more elegant solution. We can add a handler for the whole menu and data-action attributes for buttons that has the method to call:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '<button data-action="save">Click to Save</button>',
        },
      },
      {
        type: 'paragraph',
        text: 'The handler reads the attribute and executes the method. Take a look at the working example:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '<div id="menu">\n  <button data-action="save">Save</button>\n  <button data-action="load">Load</button>\n  <button data-action="search">Search</button>\n</div>\n\n<script>\n  class Menu {\n    constructor(elem) {\n      this._elem = elem;\n      elem.onclick = this.onClick.bind(this); // (*)\n    }\n\n    save() {\n      alert(\'saving\');\n    }\n\n    load() {\n      alert(\'loading\');\n    }\n\n    search() {\n      alert(\'searching\');\n    }\n\n    onClick(event) {\n      let action = event.target.dataset.action;\n      if (action) {\n        this[action]();\n      }\n    };\n  }\n\n  new Menu(menu);\n</script>',
        },
      },
      {
        type: 'paragraph',
        text: 'Please note that this.onClick is bound to this in (*). That’s important, because otherwise this inside it would reference the DOM element (elem), not the Menu object, and this[action] would not be what we need.',
      },
      {
        type: 'paragraph',
        text: 'So, what advantages does delegation give us here?',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'We don’t need to write the code to assign a handler to each button. Just make a method and put it in the markup.',
          'The HTML structure is flexible, we can add/remove buttons at any time.',
        ],
      },
      {
        type: 'paragraph',
        text: 'We could also use classes .action-save, .action-load, but an attribute data-action is better semantically. And we can use it in CSS rules too.',
      },
      {
        type: 'paragraph',
        text: 'We can also use event delegation to add “behaviors” to elements declaratively, with special attributes and classes.',
      },
      {
        type: 'paragraph',
        text: 'The pattern has two parts:',
      },
      {
        type: 'list',
        ordered: true,
        items: [
          'We add a custom attribute to an element that describes its behavior.',
          'A document-wide handler tracks events, and if an event happens on an attributed element – performs the action.',
        ],
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Behavior: Counter',
      },
      {
        type: 'paragraph',
        text: 'For instance, here the attribute data-counter adds a behavior: “increase value on click” to buttons:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'Counter: <input type="button" value="1" data-counter>\nOne more counter: <input type="button" value="2" data-counter>\n\n<script>\n  document.addEventListener(\'click\', function(event) {\n\n    if (event.target.dataset.counter != undefined) { // if the attribute exists...\n      event.target.value++;\n    }\n\n  });\n</script>',
        },
      },
      {
        type: 'paragraph',
        text: 'If we click a button – its value is increased. Not buttons, but the general approach is important here.',
      },
      {
        type: 'paragraph',
        text: 'There can be as many attributes with data-counter as we want. We can add new ones to HTML at any moment. Using the event delegation we “extended” HTML, added an attribute that describes a new behavior.',
      },
      {
        type: 'paragraph',
        text: 'For document-level handlers – always addEventListener',
      },
      {
        type: 'paragraph',
        text: 'When we assign an event handler to the document object, we should always use addEventListener, not document.on&lt;event&gt;, because the latter will cause conflicts: new handlers overwrite old ones.',
      },
      {
        type: 'paragraph',
        text: 'For real projects it’s normal that there are many handlers on document set by different parts of the code.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Behavior: Toggler',
      },
      {
        type: 'paragraph',
        text: 'One more example of behavior. A click on an element with the attribute data-toggle-id will show/hide the element with the given id:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '<button data-toggle-id="subscribe-mail">\n  Show the subscription form\n</button>\n\n<form id="subscribe-mail" hidden>\n  Your mail: <input type="email">\n</form>\n\n<script>\n  document.addEventListener(\'click\', function(event) {\n    let id = event.target.dataset.toggleId;\n    if (!id) return;\n\n    let elem = document.getElementById(id);\n\n    elem.hidden = !elem.hidden;\n  });\n</script>',
        },
      },
      {
        type: 'paragraph',
        text: 'Let’s note once again what we did. Now, to add toggling functionality to an element – there’s no need to know JavaScript, just use the attribute data-toggle-id.',
      },
      {
        type: 'paragraph',
        text: 'That may become really convenient – no need to write JavaScript for every such element. Just use the behavior. The document-level handler makes it work for any element of the page.',
      },
      {
        type: 'paragraph',
        text: 'We can combine multiple behaviors on a single element as well.',
      },
      {
        type: 'paragraph',
        text: 'The “behavior” pattern can be an alternative to mini-fragments of JavaScript.',
      },
      {
        type: 'paragraph',
        text: 'Event delegation is really cool! It’s one of the most helpful patterns for DOM events.',
      },
      {
        type: 'paragraph',
        text: 'It’s often used to add the same handling for many similar elements, but not only for that.',
      },
      {
        type: 'paragraph',
        text: 'The algorithm:',
      },
      {
        type: 'list',
        ordered: true,
        items: [
          'Put a single handler on the container.',
          'In the handler – check the source element event.target.',
          'If the event happened inside an element that interests us, then handle the event.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Benefits:',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'Simplifies initialization and saves memory: no need to add many handlers.',
          'Less code: when adding or removing elements, no need to add/remove handlers.',
          'DOM modifications: we can mass add/remove elements with innerHTML and the like.',
        ],
      },
      {
        type: 'paragraph',
        text: 'The delegation has its limitations of course:',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'First, the event must be bubbling. Some events do not bubble. Also, low-level handlers should not use event.stopPropagation().',
          'Second, the delegation may add CPU load, because the container-level handler reacts on events in any place of the container, no matter whether they interest us or not. But usually the load is negligible, so we don’t take it into account.',
        ],
      },
    ],
  },
} satisfies Record<string, ContentTopic>;
