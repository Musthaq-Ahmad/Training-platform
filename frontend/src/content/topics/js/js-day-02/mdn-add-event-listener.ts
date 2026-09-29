import type { ContentTopic } from '../../../types';

export const mdnAddEventListenerTopics = {
  'mdn-add-event-listener': {
    id: 'mdn-add-event-listener',
    heading: 'Syntax',
    blocks: [
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'addEventListener(type, listener)\naddEventListener(type, listener, options)\naddEventListener(type, listener, useCapture)',
        },
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Parameters',
      },
      {
        type: 'paragraph',
        text: 'type',
      },
      {
        type: 'paragraph',
        text: 'A case-sensitive string representing the event type to listen for.',
      },
      {
        type: 'paragraph',
        text: 'listener',
      },
      {
        type: 'paragraph',
        text: 'The object that receives a notification (an object that implements the Event interface) when an event of the specified type occurs. This must be null, an object with a handleEvent() method, or a JavaScript function. See The event listener callback for details on the callback itself.',
      },
      {
        type: 'paragraph',
        text: 'options Optional',
      },
      {
        type: 'paragraph',
        text: 'An object that specifies characteristics about the event listener. The available options are:',
      },
      {
        type: 'paragraph',
        text: 'capture Optional',
      },
      {
        type: 'paragraph',
        text: 'A boolean value indicating that events of this type will be dispatched to the registered listener before being dispatched to any EventTarget beneath it in the DOM tree. If not specified, defaults to false.',
      },
      {
        type: 'paragraph',
        text: 'once Optional',
      },
      {
        type: 'paragraph',
        text: 'A boolean value indicating that the listener should be invoked at most once after being added. If true, the listener would be automatically removed when invoked. If not specified, defaults to false.',
      },
      {
        type: 'paragraph',
        text: 'passive Optional',
      },
      {
        type: 'paragraph',
        text: 'A boolean value that, if true, indicates that the function specified by listener will never call preventDefault(). If a passive listener calls preventDefault(), nothing will happen and a console warning may be generated.',
      },
      {
        type: 'paragraph',
        text: 'If this option is not specified it defaults to false – except that in browsers other than Safari, it defaults to true for wheel, mousewheel, touchstart and touchmove events. See Using passive listeners to learn more.',
      },
      {
        type: 'paragraph',
        text: 'signal Optional',
      },
      {
        type: 'paragraph',
        text: 'An AbortSignal. The listener will be removed when the abort() method of the AbortController which owns the AbortSignal is called. If not specified, no AbortSignal is associated with the listener.',
      },
      {
        type: 'paragraph',
        text: 'useCapture Optional',
      },
      {
        type: 'paragraph',
        text: 'A boolean value indicating whether events of this type will be dispatched to the registered listener before being dispatched to any EventTarget beneath it in the DOM tree. Events that are bubbling upward through the tree will not trigger a listener designated to use capture. Event bubbling and capturing are two ways of propagating events that occur in an element that is nested within another element, when both elements have registered a handle for that event. The event propagation mode determines the order in which elements receive the event. See the DOM spec and JavaScript Event order for a detailed explanation. If not specified, useCapture defaults to false.',
      },
      {
        type: 'paragraph',
        text: 'Note: For event listeners attached to the event target, the event is in the target phase, rather than the capturing and bubbling phases. Event listeners in the capturing phase are called before event listeners in the target and bubbling phases.',
      },
      {
        type: 'paragraph',
        text: 'wantsUntrusted Optional',
      },
      {
        type: 'paragraph',
        text: 'A Firefox (Gecko)-specific parameter. If true, the listener receives synthetic events dispatched by web content (the default is false for browser chrome and true for regular web pages). This parameter is useful for code found in add-ons, as well as the browser itself.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Return value',
      },
      {
        type: 'paragraph',
        text: 'None (undefined).',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'The event listener callback',
      },
      {
        type: 'paragraph',
        text: 'The event listener can be specified as either a callback function or an object whose handleEvent() method serves as the callback function.',
      },
      {
        type: 'paragraph',
        text: 'The callback function itself has the same parameters and return value as the handleEvent() method; that is, the callback accepts a single parameter: an object based on Event describing the event that has occurred, and it returns nothing.',
      },
      {
        type: 'paragraph',
        text: 'For example, an event handler callback that can be used to handle both fullscreenchange and fullscreenerror might look like this:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'function handleEvent(event) {\n  if (event.type === "fullscreenchange") {\n    /* handle a full screen toggle */\n  } else {\n    /* handle a full screen toggle error */\n  }\n}',
        },
      },
      {
        type: 'subheading',
        level: 3,
        text: 'The value of "this" within the handler',
      },
      {
        type: 'paragraph',
        text: 'It is often desirable to reference the element on which the event handler was fired, such as when using a generic handler for a set of similar elements.',
      },
      {
        type: 'paragraph',
        text: 'When attaching a handler function to an element using addEventListener(), the value of this inside the handler will be a reference to the element. It will be the same as the value of the currentTarget property of the event argument that is passed to the handler.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'myElement.addEventListener("click", function (e) {\n  console.log(this.className); // logs the className of myElement\n  console.log(e.currentTarget === this); // logs `true`\n});',
        },
      },
      {
        type: 'paragraph',
        text: 'As a reminder, arrow functions do not have their own this context.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'myElement.addEventListener("click", (e) => {\n  console.log(this.className); // WARNING: `this` is not `myElement`\n  console.log(e.currentTarget === this); // logs `false`\n});',
        },
      },
      {
        type: 'paragraph',
        text: 'If an event handler (for example, onclick) is specified on an element in the HTML source, the JavaScript code in the attribute value is effectively wrapped in a handler function that binds the value of this in a manner consistent with the addEventListener(); an occurrence of this within the code represents a reference to the element.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '<table id="my-table" onclick="console.log(this.id);">\n  <!-- `this` refers to the table; logs \'my-table\' -->\n  …\n</table>',
        },
      },
      {
        type: 'paragraph',
        text: 'Note that the value of this inside a function, called by the code in the attribute value, behaves as per standard rules. This is shown in the following example:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '<script>\n  function logID() {\n    console.log(this.id);\n  }\n</script>\n<table id="my-table" onclick="logID();">\n  <!-- when called, `this` will refer to the global object -->\n  …\n</table>',
        },
      },
      {
        type: 'paragraph',
        text: 'The value of this within logID() is a reference to the global object Window (or undefined in the case of strict mode.',
      },
      {
        type: 'subheading',
        level: 4,
        text: 'Specifying "this" using bind()',
      },
      {
        type: 'paragraph',
        text: "The Function.prototype.bind() method lets you establish a fixed this context for all subsequent calls — bypassing problems where it's unclear what this will be, depending on the context from which your function was called. Note, however, that you'll need to keep a reference to the listener around so you can remove it later.",
      },
      {
        type: 'paragraph',
        text: 'This is an example with and without bind():',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'class Something {\n  name = "Something Good";\n  constructor(element) {\n    // bind causes a fixed `this` context to be assigned to `onclick2`\n    this.onclick2 = this.onclick2.bind(this);\n    element.addEventListener("click", this.onclick1);\n    element.addEventListener("click", this.onclick2); // Trick\n  }\n  onclick1(event) {\n    console.log(this.name); // undefined, as `this` is the element\n  }\n  onclick2(event) {\n    console.log(this.name); // \'Something Good\', as `this` is bound to the Something instance\n  }\n}\n\nconst s = new Something(document.body);',
        },
      },
      {
        type: 'paragraph',
        text: 'Another solution is using a special function called handleEvent() to catch any events:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'class Something {\n  name = "Something Good";\n  constructor(element) {\n    // Note that the listeners in this case are `this`, not this.handleEvent\n    element.addEventListener("click", this);\n    element.addEventListener("dblclick", this);\n  }\n  handleEvent(event) {\n    console.log(this.name); // \'Something Good\', as this is bound to newly created object\n    switch (event.type) {\n      case "click":\n        // some code here…\n        break;\n      case "dblclick":\n        // some code here…\n        break;\n    }\n  }\n}\n\nconst s = new Something(document.body);',
        },
      },
      {
        type: 'paragraph',
        text: "Another way of handling the reference to this is to use an arrow function, which doesn't create a separate this context.",
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'class SomeClass {\n  name = "Something Good";\n\n  register() {\n    window.addEventListener("keydown", (e) => {\n      this.someMethod(e);\n    });\n  }\n\n  someMethod(e) {\n    console.log(this.name);\n    switch (e.code) {\n      case "ArrowUp":\n        // some code here…\n        break;\n      case "ArrowDown":\n        // some code here…\n        break;\n    }\n  }\n}\n\nconst myObject = new SomeClass();\nmyObject.register();',
        },
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Getting data into and out of an event listener',
      },
      {
        type: 'paragraph',
        text: 'Event listeners only take one argument, an Event or a subclass of Event, which is automatically passed to the listener, and the return value is ignored. Therefore, to get data into and out of an event listener, instead of passing the data through parameters and return values, you need to create closures instead.',
      },
      {
        type: 'paragraph',
        text: 'The functions passed as event listeners have access to all variables declared in the outer scopes that contain the function.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'const myButton = document.getElementById("my-button-id");\nlet someString = "Data";\n\nmyButton.addEventListener("click", () => {\n  console.log(someString);\n  // \'Data\' on first click,\n  // \'Data Again\' on second click\n\n  someString = "Data Again";\n});\n\nconsole.log(someString); // Expected Value: \'Data\' (will never output \'Data Again\')',
        },
      },
      {
        type: 'paragraph',
        text: 'Read the function guide for more information about function scopes.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Memory issues',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'const elems = document.getElementsByTagName("*");\n\n// Case 1\nfor (const elem of elems) {\n  elem.addEventListener("click", (e) => {\n    // Do something\n  });\n}\n\n// Case 2\nfunction processEvent(e) {\n  // Do something\n}\n\nfor (const elem of elems) {\n  elem.addEventListener("click", processEvent);\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'In the first case above, a new (anonymous) handler function is created with each iteration of the loop. In the second case, the same previously declared function is used as an event handler, which results in smaller memory consumption because there is only one handler function created. Moreover, in the first case, it is not possible to call removeEventListener() because no reference to the anonymous function is kept (or here, not kept to any of the multiple anonymous functions the loop might create.) In the second case, it\'s possible to do myElement.removeEventListener("click", processEvent, false) because processEvent is the function reference.',
      },
      {
        type: 'paragraph',
        text: 'Actually, regarding memory consumption, the lack of keeping a function reference is not the real issue; rather it is the lack of keeping a static function reference.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Using passive listeners',
      },
      {
        type: 'paragraph',
        text: "If an event has a default action — for example, a wheel event that scrolls the container by default — the browser is in general unable to start the default action until the event listener has finished, because it doesn't know in advance whether the event listener might cancel the default action by calling Event.preventDefault(). If the event listener takes too long to execute, this can cause a noticeable delay, also known as jank, before the default action can be executed.",
      },
      {
        type: 'paragraph',
        text: 'By setting the passive option to true, an event listener declares that it will not cancel the default action, so the browser can start the default action immediately, without waiting for the listener to finish. If the listener does then call Event.preventDefault(), this will have no effect.',
      },
      {
        type: 'paragraph',
        text: "The specification for addEventListener() defines the default value for the passive option as always being false. However, to realize the scroll performance benefits of passive listeners in legacy code, modern browsers have changed the default value of the passive option to true for the wheel, mousewheel, touchstart and touchmove events on the document-level nodes Window, Document, and Document.body. That prevents the event listener from canceling the event, so it can't block page rendering while the user is scrolling.",
      },
      {
        type: 'paragraph',
        text: 'Because of that, when you want to override that behavior and ensure the passive option is false, you must explicitly set the option to false (rather than relying on the default).',
      },
      {
        type: 'paragraph',
        text: "You don't need to worry about the value of passive for the basic scroll event. Since it can't be canceled, event listeners can't block page rendering anyway.",
      },
      {
        type: 'paragraph',
        text: 'See Improving scroll performance using passive listeners for an example showing the effect of passive listeners.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Add a simple listener',
      },
      {
        type: 'paragraph',
        text: 'This example demonstrates how to use addEventListener() to watch for mouse clicks on an element.',
      },
      {
        type: 'subheading',
        level: 4,
        text: 'HTML',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '<table id="outside">\n  <tbody>\n    <tr>\n      <td id="t1">one</td>\n    </tr>\n    <tr>\n      <td id="t2">two</td>\n    </tr>\n  </tbody>\n</table>',
        },
      },
      {
        type: 'subheading',
        level: 4,
        text: 'JavaScript',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '// Function to change the content of t2\nfunction modifyText() {\n  const t2 = document.getElementById("t2");\n  const isNodeThree = t2.firstChild.nodeValue === "three";\n  t2.firstChild.nodeValue = isNodeThree ? "two" : "three";\n}\n\n// Add event listener to table\nconst el = document.getElementById("outside");\nel.addEventListener("click", modifyText);',
        },
      },
      {
        type: 'paragraph',
        text: 'In this code, modifyText() is a listener for click events registered using addEventListener(). A click anywhere in the table bubbles up to the handler and runs modifyText().',
      },
      {
        type: 'subheading',
        level: 4,
        text: 'Result',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Add an abortable listener',
      },
      {
        type: 'paragraph',
        text: 'This example demonstrates how to add an addEventListener() that can be aborted with an AbortSignal.',
      },
      {
        type: 'subheading',
        level: 4,
        text: 'HTML',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '<table id="outside">\n  <tbody>\n    <tr>\n      <td id="t1">one</td>\n    </tr>\n    <tr>\n      <td id="t2">two</td>\n    </tr>\n  </tbody>\n</table>',
        },
      },
      {
        type: 'subheading',
        level: 4,
        text: 'JavaScript',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '// Add an abortable event listener to table\nconst controller = new AbortController();\nconst el = document.getElementById("outside");\nel.addEventListener("click", modifyText, { signal: controller.signal });\n\n// Function to change the content of t2\nfunction modifyText() {\n  const t2 = document.getElementById("t2");\n  if (t2.firstChild.nodeValue === "three") {\n    t2.firstChild.nodeValue = "two";\n  } else {\n    t2.firstChild.nodeValue = "three";\n    controller.abort(); // remove listener after value reaches "three"\n  }\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'In the example above, we modify the code in the previous example such that after the second row\'s content changes to "three", we call abort() from the AbortController we passed to the addEventListener() call. That results in the value remaining as "three" forever because we no longer have any code listening for a click event.',
      },
      {
        type: 'subheading',
        level: 4,
        text: 'Result',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Event listener with anonymous function',
      },
      {
        type: 'paragraph',
        text: "Here, we'll take a look at how to use an anonymous function to pass parameters into the event listener.",
      },
      {
        type: 'subheading',
        level: 4,
        text: 'HTML',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '<table id="outside">\n  <tbody>\n    <tr>\n      <td id="t1">one</td>\n    </tr>\n    <tr>\n      <td id="t2">two</td>\n    </tr>\n  </tbody>\n</table>',
        },
      },
      {
        type: 'subheading',
        level: 4,
        text: 'JavaScript',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '// Function to change the content of t2\nfunction modifyText(newText) {\n  const t2 = document.getElementById("t2");\n  t2.firstChild.nodeValue = newText;\n}\n\n// Function to add event listener to table\nconst el = document.getElementById("outside");\nel.addEventListener("click", function () {\n  modifyText("four");\n});',
        },
      },
      {
        type: 'paragraph',
        text: 'Notice that the listener is an anonymous function that encapsulates code that is then, in turn, able to send parameters to the modifyText() function, which is responsible for actually responding to the event.',
      },
      {
        type: 'subheading',
        level: 4,
        text: 'Result',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Event listener with an arrow function',
      },
      {
        type: 'paragraph',
        text: 'This example demonstrates an event listener implemented using arrow function notation.',
      },
      {
        type: 'subheading',
        level: 4,
        text: 'HTML',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '<table id="outside">\n  <tbody>\n    <tr>\n      <td id="t1">one</td>\n    </tr>\n    <tr>\n      <td id="t2">two</td>\n    </tr>\n  </tbody>\n</table>',
        },
      },
      {
        type: 'subheading',
        level: 4,
        text: 'JavaScript',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '// Function to change the content of t2\nfunction modifyText(newText) {\n  const t2 = document.getElementById("t2");\n  t2.firstChild.nodeValue = newText;\n}\n\n// Add event listener to table with an arrow function\nconst el = document.getElementById("outside");\nel.addEventListener("click", () => {\n  modifyText("four");\n});',
        },
      },
      {
        type: 'subheading',
        level: 4,
        text: 'Result',
      },
      {
        type: 'paragraph',
        text: 'Please note that while anonymous and arrow functions are similar, they have different this bindings. While anonymous (and all traditional JavaScript functions) create their own this bindings, arrow functions inherit the this binding of the containing function.',
      },
      {
        type: 'paragraph',
        text: 'That means that the variables and constants available to the containing function are also available to the event handler when using an arrow function.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Example of options usage',
      },
      {
        type: 'subheading',
        level: 4,
        text: 'HTML',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '<div class="outer">\n  outer, once & none-once\n  <div class="middle" target="_blank">\n    middle, capture & none-capture\n    <a class="inner1" href="https://www.mozilla.org" target="_blank">\n      inner1, passive & preventDefault(which is not allowed)\n    </a>\n    <a class="inner2" href="https://developer.mozilla.org/" target="_blank">\n      inner2, none-passive & preventDefault(not open new page)\n    </a>\n  </div>\n</div>\n<hr />\n<button class="clear-button">Clear logs</button>\n<section class="demo-logs"></section>',
        },
      },
      {
        type: 'subheading',
        level: 4,
        text: 'CSS',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '.outer,\n.middle,\n.inner1,\n.inner2 {\n  display: block;\n  width: 520px;\n  padding: 15px;\n  margin: 15px;\n  text-decoration: none;\n}\n.outer {\n  border: 1px solid red;\n  color: red;\n}\n.middle {\n  border: 1px solid green;\n  color: green;\n  width: 460px;\n}\n.inner1,\n.inner2 {\n  border: 1px solid purple;\n  color: purple;\n  width: 400px;\n}',
        },
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '.demo-logs {\n  width: 530px;\n  height: 16rem;\n  background-color: #dddddd;\n  overflow-x: auto;\n  padding: 1rem;\n}',
        },
      },
      {
        type: 'subheading',
        level: 4,
        text: 'JavaScript',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'const clearBtn = document.querySelector(".clear-button");\nconst demoLogs = document.querySelector(".demo-logs");\n\nfunction log(msg) {\n  demoLogs.innerText += `${msg}\\n`;\n}\n\nclearBtn.addEventListener("click", () => {\n  demoLogs.innerText = "";\n});',
        },
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'const outer = document.querySelector(".outer");\nconst middle = document.querySelector(".middle");\nconst inner1 = document.querySelector(".inner1");\nconst inner2 = document.querySelector(".inner2");\n\nconst capture = {\n  capture: true,\n};\nconst noneCapture = {\n  capture: false,\n};\nconst once = {\n  once: true,\n};\nconst noneOnce = {\n  once: false,\n};\nconst passive = {\n  passive: true,\n};\nconst nonePassive = {\n  passive: false,\n};\n\nouter.addEventListener("click", onceHandler, once);\nouter.addEventListener("click", noneOnceHandler, noneOnce);\nmiddle.addEventListener("click", captureHandler, capture);\nmiddle.addEventListener("click", noneCaptureHandler, noneCapture);\ninner1.addEventListener("click", passiveHandler, passive);\ninner2.addEventListener("click", nonePassiveHandler, nonePassive);\n\nfunction onceHandler(event) {\n  log("outer, once");\n}\nfunction noneOnceHandler(event) {\n  log("outer, none-once, default\\n");\n}\nfunction captureHandler(event) {\n  // event.stopImmediatePropagation();\n  log("middle, capture");\n}\nfunction noneCaptureHandler(event) {\n  log("middle, none-capture, default");\n}\nfunction passiveHandler(event) {\n  // Unable to preventDefault inside passive event listener invocation.\n  event.preventDefault();\n  log("inner1, passive, open new page");\n}\nfunction nonePassiveHandler(event) {\n  event.preventDefault();\n  // event.stopPropagation();\n  log("inner2, none-passive, default, not open new page");\n}',
        },
      },
      {
        type: 'subheading',
        level: 4,
        text: 'Result',
      },
      {
        type: 'paragraph',
        text: 'Click the outer, middle, inner containers respectively to see how the options work.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Event listener with multiple options',
      },
      {
        type: 'paragraph',
        text: 'You can set more than one of the options in the options parameter. In the following example we are setting two options:',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'passive, to assert that the handler will not call preventDefault()',
          'once, to ensure that the event handler will only be called once.',
        ],
      },
      {
        type: 'subheading',
        level: 4,
        text: 'HTML',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '<button id="example-button">You have not clicked this button.</button>\n<button id="reset-button">Click this button to reset the first button.</button>',
        },
      },
      {
        type: 'subheading',
        level: 4,
        text: 'JavaScript',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'const buttonToBeClicked = document.getElementById("example-button");\n\nconst resetButton = document.getElementById("reset-button");\n\n// the text that the button is initialized with\nconst initialText = buttonToBeClicked.textContent;\n\n// the text that the button contains after being clicked\nconst clickedText = "You have clicked this button.";\n\n// we hoist the event listener callback function\n// to prevent having duplicate listeners attached\nfunction eventListener() {\n  buttonToBeClicked.textContent = clickedText;\n}\n\nfunction addListener() {\n  buttonToBeClicked.addEventListener("click", eventListener, {\n    passive: true,\n    once: true,\n  });\n}\n\n// when the reset button is clicked, the example button is reset,\n// and allowed to have its state updated again\nresetButton.addEventListener("click", () => {\n  buttonToBeClicked.textContent = initialText;\n  addListener();\n});\n\naddListener();',
        },
      },
      {
        type: 'subheading',
        level: 4,
        text: 'Result',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Improving scroll performance using passive listeners',
      },
      {
        type: 'paragraph',
        text: 'The following example shows the effect of setting passive. It includes a &lt;div&gt; that contains some text, and a checkbox.',
      },
      {
        type: 'subheading',
        level: 4,
        text: 'HTML',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '<div id="container">\n  <p>\n    But down there it would be dark now, and not the lovely lighted aquarium she\n    imagined it to be during the daylight hours, eddying with schools of tiny,\n    delicate animals floating and dancing slowly to their own serene currents\n    and creating the look of a living painting. That was wrong, in any case. The\n    ocean was different from an aquarium, which was an artificial environment.\n    The ocean was a world. And a world is not art. Dorothy thought about the\n    living things that moved in that world: large, ruthless and hungry. Like us\n    up here.\n  </p>\n</div>\n\n<div>\n  <input type="checkbox" id="passive" name="passive" checked />\n  <label for="passive">passive</label>\n</div>',
        },
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '#container {\n  width: 150px;\n  height: 200px;\n  overflow: scroll;\n  margin: 2rem 0;\n  padding: 0.4rem;\n  border: 1px solid black;\n}',
        },
      },
      {
        type: 'subheading',
        level: 4,
        text: 'JavaScript',
      },
      {
        type: 'paragraph',
        text: "The code adds a listener to the container's wheel event, which by default scrolls the container. The listener runs a long-running operation. Initially the listener is added with the passive option, and whenever the checkbox is toggled, the code toggles the passive option.",
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'const passive = document.querySelector("#passive");\nconst container = document.querySelector("#container");\n\npassive.addEventListener("change", (event) => {\n  container.removeEventListener("wheel", wheelHandler);\n  container.addEventListener("wheel", wheelHandler, {\n    passive: passive.checked,\n    once: true,\n  });\n});\n\ncontainer.addEventListener("wheel", wheelHandler, {\n  passive: true,\n  once: true,\n});\n\nfunction wheelHandler() {\n  function isPrime(n) {\n    for (let c = 2; c <= Math.sqrt(n); ++c) {\n      if (n % c === 0) {\n        return false;\n      }\n    }\n    return true;\n  }\n\n  const quota = 1000000;\n  const primes = [];\n  const maximum = 1000000;\n\n  while (primes.length < quota) {\n    const candidate = Math.floor(Math.random() * (maximum + 1));\n    if (isPrime(candidate)) {\n      primes.push(candidate);\n    }\n  }\n\n  console.log(primes);\n}',
        },
      },
      {
        type: 'subheading',
        level: 4,
        text: 'Result',
      },
      {
        type: 'paragraph',
        text: 'The effect is that:',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'Initially, the listener is passive, so trying to scroll the container with the wheel is immediate.',
          'If you uncheck "passive" and try to scroll the container using the wheel, then there is a noticeable delay before the container scrolls, because the browser has to wait for the long-running listener to finish.',
        ],
      },
      {
        type: 'table',
        headers: ['Specification'],
        rows: [
          ['[DOM'],
          [
            '# ref-for-dom-eventtarget-addeventlistener③](https://dom.spec.whatwg.org/#ref-for-dom-eventtarget-addeventlistener%E2%91%A2)',
          ],
        ],
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'EventTarget.removeEventListener()',
          'Creating and dispatching custom events',
          'More details on the use of this in event handlers',
        ],
      },
    ],
  },
} satisfies Record<string, ContentTopic>;
