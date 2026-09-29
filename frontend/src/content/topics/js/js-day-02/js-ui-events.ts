import type { ContentTopic } from '../../../types';

export const jsUiEventsTopics = {
  'js-ui-events': {
    id: 'js-ui-events',
    heading: 'Mouse event types',
    blocks: [
      {
        type: 'paragraph',
        text: 'We’ve already seen some of these events:',
      },
      {
        type: 'paragraph',
        text: 'mousedown/mouseup',
      },
      {
        type: 'paragraph',
        text: 'Mouse button is clicked/released over an element.',
      },
      {
        type: 'paragraph',
        text: 'mouseover/mouseout',
      },
      {
        type: 'paragraph',
        text: 'Mouse pointer comes over/out from an element.',
      },
      {
        type: 'paragraph',
        text: 'mousemove',
      },
      {
        type: 'paragraph',
        text: 'Every mouse move over an element triggers that event.',
      },
      {
        type: 'paragraph',
        text: 'click',
      },
      {
        type: 'paragraph',
        text: 'Triggers after mousedown and then mouseup over the same element if the left mouse button was used.',
      },
      {
        type: 'paragraph',
        text: 'dblclick',
      },
      {
        type: 'paragraph',
        text: 'Triggers after two clicks on the same element within a short timeframe. Rarely used nowadays.',
      },
      {
        type: 'paragraph',
        text: 'contextmenu',
      },
      {
        type: 'paragraph',
        text: 'Triggers when the right mouse button is pressed. There are other ways to open a context menu, e.g. using a special keyboard key, it triggers in that case also, so it’s not exactly the mouse event.',
      },
      {
        type: 'paragraph',
        text: '…There are several other events too, we’ll cover them later.',
      },
      {
        type: 'paragraph',
        text: 'As you can see from the list above, a user action may trigger multiple events.',
      },
      {
        type: 'paragraph',
        text: 'For instance, a left-button click first triggers mousedown, when the button is pressed, then mouseup and click when it’s released.',
      },
      {
        type: 'paragraph',
        text: 'In cases when a single action initiates multiple events, their order is fixed. That is, the handlers are called in the order mousedown → mouseup → click.',
      },
      {
        type: 'paragraph',
        text: 'Click the button below and you’ll see the events. Try double-click too.',
      },
      {
        type: 'paragraph',
        text: 'On the teststand below, all mouse events are logged, and if there is more than a 1 second delay between them, they are separated by a horizontal rule.',
      },
      {
        type: 'paragraph',
        text: 'Also, we can see the button property that allows us to detect the mouse button; it’s explained below.',
      },
      {
        type: 'paragraph',
        text: 'Click-related events always have the button property, which allows to get the exact mouse button.',
      },
      {
        type: 'paragraph',
        text: 'We usually don’t use it for click and contextmenu events, because the former happens only on left-click, and the latter – only on right-click.',
      },
      {
        type: 'paragraph',
        text: 'On the other hand, mousedown and mouseup handlers may need event.button, because these events trigger on any button, so button allows to distinguish between “right-mousedown” and “left-mousedown”.',
      },
      {
        type: 'paragraph',
        text: 'The possible values of event.button are:',
      },
      {
        type: 'table',
        headers: ['Button state', 'event.button'],
        rows: [
          ['Left button (primary)', '0'],
          ['Middle button (auxiliary)', '1'],
          ['Right button (secondary)', '2'],
          ['X1 button (back)', '3'],
          ['X2 button (forward)', '4'],
        ],
      },
      {
        type: 'paragraph',
        text: 'Most mouse devices only have the left and right buttons, so possible values are 0 or 2. Touch devices also generate similar events when one taps on them.',
      },
      {
        type: 'paragraph',
        text: 'Also there’s event.buttons property that has all currently pressed buttons as an integer, one bit per button. In practice this property is very rarely used, you can find details at MDN if you ever need it.',
      },
      {
        type: 'paragraph',
        text: 'The outdated event.which',
      },
      {
        type: 'paragraph',
        text: 'Old code may use event.which property that’s an old non-standard way of getting a button, with possible values:',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'event.which == 1 – left button,',
          'event.which == 2 – middle button,',
          'event.which == 3 – right button.',
        ],
      },
      {
        type: 'paragraph',
        text: 'As of now, event.which is deprecated, we shouldn’t use it.',
      },
      {
        type: 'paragraph',
        text: 'All mouse events include the information about pressed modifier keys.',
      },
      {
        type: 'paragraph',
        text: 'Event properties:',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'shiftKey: Shift',
          'altKey: Alt (or Opt for Mac)',
          'ctrlKey: Ctrl',
          'metaKey: Cmd for Mac',
        ],
      },
      {
        type: 'paragraph',
        text: 'They are true if the corresponding key was pressed during the event.',
      },
      {
        type: 'paragraph',
        text: 'For instance, the button below only works on Alt+Shift+click:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '<button id="button">Alt+Shift+Click on me!</button>\n\n<script>\n  button.onclick = function(event) {\n    if (event.altKey && event.shiftKey) {\n      alert(\'Hooray!\');\n    }\n  };\n</script>',
        },
      },
      {
        type: 'paragraph',
        text: 'Attention: on Mac it’s usually Cmd instead of Ctrl',
      },
      {
        type: 'paragraph',
        text: 'On Windows and Linux there are modifier keys Alt, Shift and Ctrl. On Mac there’s one more: Cmd, corresponding to the property metaKey.',
      },
      {
        type: 'paragraph',
        text: 'In most applications, when Windows/Linux uses Ctrl, on Mac Cmd is used.',
      },
      {
        type: 'paragraph',
        text: 'That is: where a Windows user presses Ctrl+Enter or Ctrl+A, a Mac user would press Cmd+Enter or Cmd+A, and so on.',
      },
      {
        type: 'paragraph',
        text: 'So if we want to support combinations like Ctrl+click, then for Mac it makes sense to use Cmd+click. That’s more comfortable for Mac users.',
      },
      {
        type: 'paragraph',
        text: 'Even if we’d like to force Mac users to Ctrl+click – that’s kind of difficult. The problem is: a left-click with Ctrl is interpreted as a right-click on MacOS, and it generates the contextmenu event, not click like Windows/Linux.',
      },
      {
        type: 'paragraph',
        text: 'So if we want users of all operating systems to feel comfortable, then together with ctrlKey we should check metaKey.',
      },
      {
        type: 'paragraph',
        text: 'For JS-code it means that we should check if (event.ctrlKey || event.metaKey).',
      },
      {
        type: 'paragraph',
        text: 'There are also mobile devices',
      },
      {
        type: 'paragraph',
        text: 'Keyboard combinations are good as an addition to the workflow. So that if the visitor uses a keyboard – they work.',
      },
      {
        type: 'paragraph',
        text: 'But if their device doesn’t have it – then there should be a way to live without modifier keys.',
      },
      {
        type: 'paragraph',
        text: 'All mouse events provide coordinates in two flavours:',
      },
      {
        type: 'list',
        ordered: true,
        start: 1,
        items: ['Window-relative: clientX and clientY.', 'Document-relative: pageX and pageY.'],
      },
      {
        type: 'paragraph',
        text: 'We already covered the difference between them in the chapter Coordinates.',
      },
      {
        type: 'paragraph',
        text: 'In short, document-relative coordinates pageX/Y are counted from the left-upper corner of the document, and do not change when the page is scrolled, while clientX/Y are counted from the current window left-upper corner. When the page is scrolled, they change.',
      },
      {
        type: 'paragraph',
        text: 'For instance, if we have a window of the size 500x500, and the mouse is in the left-upper corner, then clientX and clientY are 0, no matter how the page is scrolled.',
      },
      {
        type: 'paragraph',
        text: 'And if the mouse is in the center, then clientX and clientY are 250, no matter what place in the document it is. They are similar to position:fixed in that aspect.',
      },
      {
        type: 'paragraph',
        text: 'Move the mouse over the input field to see clientX/clientY (the example is in the iframe, so coordinates are relative to that iframe):',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '<input onmousemove="this.value=event.clientX+\':\'+event.clientY" value="Mouse over me">',
        },
      },
      {
        type: 'paragraph',
        text: 'Double mouse click has a side effect that may be disturbing in some interfaces: it selects text.',
      },
      {
        type: 'paragraph',
        text: 'For instance, double-clicking on the text below selects it in addition to our handler:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '<span ondblclick="alert(\'dblclick\')">Double-click me</span>',
        },
      },
      {
        type: 'paragraph',
        text: 'If one presses the left mouse button and, without releasing it, moves the mouse, that also makes the selection, often unwanted.',
      },
      {
        type: 'paragraph',
        text: 'There are multiple ways to prevent the selection, that you can read in the chapter Selection and Range.',
      },
      {
        type: 'paragraph',
        text: 'In this particular case the most reasonable way is to prevent the browser action on mousedown. It prevents both these selections:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'Before...\n<b ondblclick="alert(\'Click!\')" onmousedown="return false">\n  Double-click me\n</b>\n...After',
        },
      },
      {
        type: 'paragraph',
        text: 'Now the bold element is not selected on double clicks, and pressing the left button on it won’t start the selection.',
      },
      {
        type: 'paragraph',
        text: 'Please note: the text inside it is still selectable. However, the selection should start not on the text itself, but before or after it. Usually that’s fine for users.',
      },
      {
        type: 'paragraph',
        text: 'Preventing copying',
      },
      {
        type: 'paragraph',
        text: 'If we want to disable selection to protect our page content from copy-pasting, then we can use another event: oncopy.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '<div oncopy="alert(\'Copying forbidden!\');return false">\n  Dear user,\n  The copying is forbidden for you.\n  If you know JS or HTML, then you can get everything from the page source though.\n</div>',
        },
      },
      {
        type: 'paragraph',
        text: 'If you try to copy a piece of text in the <div>, that won’t work, because the default action oncopy is prevented.',
      },
      {
        type: 'paragraph',
        text: 'Surely the user has access to HTML-source of the page, and can take the content from there, but not everyone knows how to do it.',
      },
      {
        type: 'paragraph',
        text: 'Mouse events have the following properties:',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'Button: button.',
          'Modifier keys (true if pressed): altKey, ctrlKey, shiftKey and metaKey (Mac). * If you want to handle Ctrl, then don’t forget Mac users, they usually use Cmd, so it’s better to check if (e.metaKey || e.ctrlKey).',
          'Window-relative coordinates: clientX/clientY.',
          'Document-relative coordinates: pageX/pageY.',
        ],
      },
      {
        type: 'paragraph',
        text: 'The default browser action of mousedown is text selection, if it’s not good for the interface, then it should be prevented.',
      },
      {
        type: 'paragraph',
        text: 'In the next chapter we’ll see more details about events that follow pointer movement and how to track element changes under it.',
      },
      {
        type: 'paragraph',
        text: 'Before we get to keyboard, please note that on modern devices there are other ways to “input something”. For instance, people use speech recognition (especially on mobile devices) or copy/paste with the mouse.',
      },
      {
        type: 'paragraph',
        text: 'So if we want to track any input into an <input> field, then keyboard events are not enough. There’s another event named input to track changes of an <input> field, by any means. And it may be a better choice for such task. We’ll cover it later in the chapter Events: change, input, cut, copy, paste.',
      },
      {
        type: 'paragraph',
        text: 'Keyboard events should be used when we want to handle keyboard actions (virtual keyboard also counts). For instance, to react on arrow keys Up and Down or hotkeys (including combinations of keys).',
      },
      {
        type: 'paragraph',
        text: 'To better understand keyboard events, you can use the teststand below.',
      },
      {
        type: 'paragraph',
        text: 'Try different key combinations in the text field.',
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
        text: 'style.css',
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
          code: "kinput.onkeydown = kinput.onkeyup = kinput.onkeypress = handle;\n\nlet lastTime = Date.now();\n\nfunction handle(e) {\n  if (form.elements[e.type + 'Ignore'].checked) return;\n\n  area.scrollTop = 1e6;\n\n  let text = e.type +\n    ' key=' + e.key +\n    ' code=' + e.code +\n    (e.shiftKey ? ' shiftKey' : '') +\n    (e.ctrlKey ? ' ctrlKey' : '') +\n    (e.altKey ? ' altKey' : '') +\n    (e.metaKey ? ' metaKey' : '') +\n    (e.repeat ? ' (repeat)' : '') +\n    \"\\n\";\n\n  if (area.value && Date.now() - lastTime > 250) {\n    area.value += new Array(81).join('-') + '\\n';\n  }\n  lastTime = Date.now();\n\n  area.value += text;\n\n  if (form.elements[e.type + 'Stop'].checked) {\n    e.preventDefault();\n  }\n}",
        },
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '#kinput {\n  font-size: 150%;\n  box-sizing: border-box;\n  width: 95%;\n}\n\n#area {\n  width: 95%;\n  box-sizing: border-box;\n  height: 250px;\n  border: 1px solid black;\n  display: block;\n}\n\nform label {\n  display: inline;\n  white-space: nowrap;\n}',
        },
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '<!DOCTYPE HTML>\n<html>\n\n<head>\n  <meta charset="utf-8">\n  <link rel="stylesheet" href="style.css">\n</head>\n\n<body>\n\n  <form id="form" onsubmit="return false">\n\n    Prevent default for:\n    <label>\n      <input type="checkbox" name="keydownStop" value="1"> keydown</label>&nbsp;&nbsp;&nbsp;\n    <label>\n      <input type="checkbox" name="keyupStop" value="1"> keyup</label>\n\n    <p>\n      Ignore:\n      <label>\n        <input type="checkbox" name="keydownIgnore" value="1"> keydown</label>&nbsp;&nbsp;&nbsp;\n      <label>\n        <input type="checkbox" name="keyupIgnore" value="1"> keyup</label>\n    </p>\n\n    <p>Focus on the input field and press a key.</p>\n\n    <input type="text" placeholder="Press keys here" id="kinput">\n\n    <textarea id="area" readonly></textarea>\n    <input type="button" value="Clear" onclick="area.value = \'\'" />\n  </form>\n  <script src="script.js"></script>\n\n</body>\n</html>',
        },
      },
      {
        type: 'paragraph',
        text: 'The keydown events happens when a key is pressed down, and then keyup – when it’s released.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'event.code and event.key',
      },
      {
        type: 'paragraph',
        text: 'The key property of the event object allows to get the character, while the code property of the event object allows to get the “physical key code”.',
      },
      {
        type: 'paragraph',
        text: 'For instance, the same key Z can be pressed with or without Shift. That gives us two different characters: lowercase z and uppercase Z.',
      },
      {
        type: 'paragraph',
        text: 'The event.key is exactly the character, and it will be different. But event.code is the same:',
      },
      {
        type: 'table',
        headers: ['Key', 'event.key', 'event.code'],
        rows: [
          ['Z', 'z (lowercase)', 'KeyZ'],
          ['Shift+Z', 'Z (uppercase)', 'KeyZ'],
        ],
      },
      {
        type: 'paragraph',
        text: 'If a user works with different languages, then switching to another language would make a totally different character instead of "Z". That will become the value of event.key, while event.code is always the same: "KeyZ".',
      },
      {
        type: 'paragraph',
        text: '“KeyZ” and other key codes',
      },
      {
        type: 'paragraph',
        text: 'Every key has the code that depends on its location on the keyboard. Key codes described in the UI Events code specification.',
      },
      {
        type: 'paragraph',
        text: 'For instance:',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'Letter keys have codes "Key<letter>": "KeyA", "KeyB" etc.',
          'Digit keys have codes: "Digit<number>": "Digit0", "Digit1" etc.',
          'Special keys are coded by their names: "Enter", "Backspace", "Tab" etc.',
        ],
      },
      {
        type: 'paragraph',
        text: 'There are several widespread keyboard layouts, and the specification gives key codes for each of them.',
      },
      {
        type: 'paragraph',
        text: 'Read the alphanumeric section of the spec for more codes, or just press a key in the teststand above.',
      },
      {
        type: 'paragraph',
        text: 'Case matters: "KeyZ", not "keyZ"',
      },
      {
        type: 'paragraph',
        text: 'Seems obvious, but people still make mistakes.',
      },
      {
        type: 'paragraph',
        text: 'Please evade mistypes: it’s KeyZ, not keyZ. The check like event.code=="keyZ" won’t work: the first letter of "Key" must be uppercase.',
      },
      {
        type: 'paragraph',
        text: 'What if a key does not give any character? For instance, Shift or F1 or others. For those keys, event.key is approximately the same as event.code:',
      },
      {
        type: 'table',
        headers: ['Key', 'event.key', 'event.code'],
        rows: [
          ['F1', 'F1', 'F1'],
          ['Backspace', 'Backspace', 'Backspace'],
          ['Shift', 'Shift', 'ShiftRight or ShiftLeft'],
        ],
      },
      {
        type: 'paragraph',
        text: 'Please note that event.code specifies exactly which key is pressed. For instance, most keyboards have two Shift keys: on the left and on the right side. The event.code tells us exactly which one was pressed, and event.key is responsible for the “meaning” of the key: what it is (a “Shift”).',
      },
      {
        type: 'paragraph',
        text: 'Let’s say, we want to handle a hotkey: Ctrl+Z (or Cmd+Z for Mac). Most text editors hook the “Undo” action on it. We can set a listener on keydown and check which key is pressed.',
      },
      {
        type: 'paragraph',
        text: 'There’s a dilemma here: in such a listener, should we check the value of event.key or event.code?',
      },
      {
        type: 'paragraph',
        text: 'On one hand, the value of event.key is a character, it changes depending on the language. If the visitor has several languages in OS and switches between them, the same key gives different characters. So it makes sense to check event.code, it’s always the same.',
      },
      {
        type: 'paragraph',
        text: 'Like this:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "document.addEventListener('keydown', function(event) {\n  if (event.code == 'KeyZ' && (event.ctrlKey || event.metaKey)) {\n    alert('Undo!')\n  }\n});",
        },
      },
      {
        type: 'paragraph',
        text: 'On the other hand, there’s a problem with event.code. For different keyboard layouts, the same key may have different characters.',
      },
      {
        type: 'paragraph',
        text: 'For example, here are US layout (“QWERTY”) and German layout (“QWERTZ”) under it (from Wikipedia):',
      },
      {
        type: 'paragraph',
        text: 'For the same key, US layout has “Z”, while German layout has “Y” (letters are swapped).',
      },
      {
        type: 'paragraph',
        text: 'Literally, event.code will equal KeyZ for people with German layout when they press Y.',
      },
      {
        type: 'paragraph',
        text: "If we check event.code == 'KeyZ' in our code, then for people with German layout such test will pass when they press Y.",
      },
      {
        type: 'paragraph',
        text: 'That sounds really odd, but so it is. The specification explicitly mentions such behavior.',
      },
      {
        type: 'paragraph',
        text: 'So, event.code may match a wrong character for unexpected layout. Same letters in different layouts may map to different physical keys, leading to different codes. Luckily, that happens only with several codes, e.g. keyA, keyQ, keyZ (as we’ve seen), and doesn’t happen with special keys such as Shift. You can find the list in the specification.',
      },
      {
        type: 'paragraph',
        text: 'To reliably track layout-dependent characters, event.key may be a better way.',
      },
      {
        type: 'paragraph',
        text: 'On the other hand, event.code has the benefit of staying always the same, bound to the physical key location. So hotkeys that rely on it work well even in case of a language switch.',
      },
      {
        type: 'paragraph',
        text: 'Do we want to handle layout-dependant keys? Then event.key is the way to go.',
      },
      {
        type: 'paragraph',
        text: 'Or we want a hotkey to work even after a language switch? Then event.code may be better.',
      },
      {
        type: 'paragraph',
        text: 'If a key is being pressed for a long enough time, it starts to “auto-repeat”: the keydown triggers again and again, and then when it’s released we finally get keyup. So it’s kind of normal to have many keydown and a single keyup.',
      },
      {
        type: 'paragraph',
        text: 'For events triggered by auto-repeat, the event object has event.repeat property set to true.',
      },
      {
        type: 'paragraph',
        text: 'Default actions vary, as there are many possible things that may be initiated by the keyboard.',
      },
      {
        type: 'paragraph',
        text: 'For instance:',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'A character appears on the screen (the most obvious outcome).',
          'A character is deleted (Delete key).',
          'The page is scrolled (PageDown key).',
          'The browser opens the “Save Page” dialog (Ctrl+S)',
          '…and so on.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Preventing the default action on keydown can cancel most of them, with the exception of OS-based special keys. For instance, on Windows Alt+F4 closes the current browser window. And there’s no way to stop it by preventing the default action in JavaScript.',
      },
      {
        type: 'paragraph',
        text: 'For instance, the <input> below expects a phone number, so it does not accept keys except digits, +, () or -:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "<script>\nfunction checkPhoneKey(key) {\n  return (key >= '0' && key <= '9') || ['+','(',')','-'].includes(key);\n}\n</script>\n<input onkeydown=\"return checkPhoneKey(event.key)\" placeholder=\"Phone, please\" type=\"tel\">",
        },
      },
      {
        type: 'paragraph',
        text: 'The onkeydown handler here uses checkPhoneKey to check for the key pressed. If it’s valid (from 0..9 or one of +-()), then it returns true, otherwise false.',
      },
      {
        type: 'paragraph',
        text: 'As we know, the false value returned from the event handler, assigned using a DOM property or an attribute, such as above, prevents the default action, so nothing appears in the <input> for keys that don’t pass the test. (The true value returned doesn’t affect anything, only returning false matters)',
      },
      {
        type: 'paragraph',
        text: 'Please note that special keys, such as Backspace, Left, Right, do not work in the input. That’s a side effect of the strict filter checkPhoneKey. These keys make it return false.',
      },
      {
        type: 'paragraph',
        text: 'Let’s relax the filter a little bit by allowing arrow keys Left, Right and Delete, Backspace:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "<script>\nfunction checkPhoneKey(key) {\n  return (key >= '0' && key <= '9') ||\n    ['+','(',')','-','ArrowLeft','ArrowRight','Delete','Backspace'].includes(key);\n}\n</script>\n<input onkeydown=\"return checkPhoneKey(event.key)\" placeholder=\"Phone, please\" type=\"tel\">",
        },
      },
      {
        type: 'paragraph',
        text: 'Now arrows and deletion works well.',
      },
      {
        type: 'paragraph',
        text: 'Even though we have the key filter, one still can enter anything using a mouse and right-click + Paste. Mobile devices provide other means to enter values. So the filter is not 100% reliable.',
      },
      {
        type: 'paragraph',
        text: 'The alternative approach would be to track the oninput event – it triggers after any modification. There we can check the new input.value and modify it/highlight the <input> when it’s invalid. Or we can use both event handlers together.',
      },
      {
        type: 'paragraph',
        text: 'In the past, there was a keypress event, and also keyCode, charCode, which properties of the event object.',
      },
      {
        type: 'paragraph',
        text: 'There were so many browser incompatibilities while working with them, that developers of the specification had no way, other than deprecating all of them and creating new, modern events (described above in this chapter). The old code still works, as browsers keep supporting them, but there’s totally no need to use those any more.',
      },
      {
        type: 'paragraph',
        text: 'When using virtual/mobile keyboards, formally known as IME (Input-Method Editor), the W3C standard states that a KeyboardEvent’s e.keyCode should be 229 and e.key should be "Unidentified".',
      },
      {
        type: 'paragraph',
        text: 'While some of these keyboards might still use the right values for e.key, e.code, e.keyCode… when pressing certain keys such as arrows or backspace, there’s no guarantee, so your keyboard logic might not always work on mobile devices.',
      },
      {
        type: 'paragraph',
        text: 'Pressing a key always generates a keyboard event, be it symbol keys or special keys like Shift or Ctrl and so on. The only exception is Fn key that sometimes presents on a laptop keyboard. There’s no keyboard event for it, because it’s often implemented on lower level than OS.',
      },
      {
        type: 'paragraph',
        text: 'Keyboard events:',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'keydown – on pressing the key (auto-repeats if the key is pressed for long),',
          'keyup – on releasing the key.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Main keyboard event properties:',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'code – the “key code” ("KeyA", "ArrowLeft" and so on), specific to the physical location of the key on keyboard.',
          'key – the character ("A", "a" and so on), for non-character keys, such as Esc, usually has the same value as code.',
        ],
      },
      {
        type: 'paragraph',
        text: 'In the past, keyboard events were sometimes used to track user input in form fields. That’s not reliable, because the input can come from various sources. We have input and change events to handle any input (covered later in the chapter Events: change, input, cut, copy, paste). They trigger after any kind of input, including copy-pasting or speech recognition.',
      },
      {
        type: 'paragraph',
        text: 'We should use keyboard events when we really want keyboard. For example, to react on hotkeys or special keys.',
      },
    ],
  },
} satisfies Record<string, ContentTopic>;
