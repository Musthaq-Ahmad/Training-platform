import type { ContentTopic } from '../../../types';

export const jsClosureDeepDiveTopics = {
  'js-closure-deep-dive': {
    id: 'js-closure-deep-dive',
    heading: 'Code blocks',
    blocks: [
      {
        type: 'paragraph',
        text: 'If a variable is declared inside a code block {...}, it’s only visible inside that block.',
      },
      {
        type: 'paragraph',
        text: 'For example:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '{\n  // do some job with local variables that should not be seen outside\n\n  let message = "Hello"; // only visible in this block\n\n  alert(message); // Hello\n}\n\nalert(message); // Error: message is not defined',
        },
      },
      {
        type: 'paragraph',
        text: 'We can use this to isolate a piece of code that does its own task, with variables that only belong to it:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '{\n  // show message\n  let message = "Hello";\n  alert(message);\n}\n\n{\n  // show another message\n  let message = "Goodbye";\n  alert(message);\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'There’d be an error without blocks',
      },
      {
        type: 'paragraph',
        text: 'Please note, without separate blocks there would be an error, if we use let with the existing variable name:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '// show message\nlet message = "Hello";\nalert(message);\n\n// show another message\nlet message = "Goodbye"; // Error: variable already declared\nalert(message);',
        },
      },
      {
        type: 'paragraph',
        text: 'For if, for, while and so on, variables declared in {...} are also only visible inside:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'if (true) {\n  let phrase = "Hello!";\n\n  alert(phrase); // Hello!\n}\n\nalert(phrase); // Error, no such variable!',
        },
      },
      {
        type: 'paragraph',
        text: 'Here, after if finishes, the alert below won’t see the phrase, hence the error.',
      },
      {
        type: 'paragraph',
        text: 'That’s great, as it allows us to create block-local variables, specific to an if branch.',
      },
      {
        type: 'paragraph',
        text: 'The similar thing holds true for for and while loops:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'for (let i = 0; i < 3; i++) {\n  // the variable i is only visible inside this for\n  alert(i); // 0, then 1, then 2\n}\n\nalert(i); // Error, no such variable',
        },
      },
      {
        type: 'paragraph',
        text: 'Visually, let i is outside of {...}. But the for construct is special here: the variable, declared inside it, is considered a part of the block.',
      },
      {
        type: 'paragraph',
        text: 'A function is called “nested” when it is created inside another function.',
      },
      {
        type: 'paragraph',
        text: 'It is easily possible to do this with JavaScript.',
      },
      {
        type: 'paragraph',
        text: 'We can use it to organize our code, like this:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'function sayHiBye(firstName, lastName) {\n\n  // helper nested function to use below\n  function getFullName() {\n    return firstName + " " + lastName;\n  }\n\n  alert( "Hello, " + getFullName() );\n  alert( "Bye, " + getFullName() );\n\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'Here the nested function getFullName() is made for convenience. It can access the outer variables and so can return the full name. Nested functions are quite common in JavaScript.',
      },
      {
        type: 'paragraph',
        text: 'What’s much more interesting, a nested function can be returned: either as a property of a new object or as a result by itself. It can then be used somewhere else. No matter where, it still has access to the same outer variables.',
      },
      {
        type: 'paragraph',
        text: 'Below, makeCounter creates the “counter” function that returns the next number on each invocation:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'function makeCounter() {\n  let count = 0;\n\n  return function() {\n    return count++;\n  };\n}\n\nlet counter = makeCounter();\n\nalert( counter() ); // 0\nalert( counter() ); // 1\nalert( counter() ); // 2',
        },
      },
      {
        type: 'paragraph',
        text: 'Despite being simple, slightly modified variants of that code have practical uses, for instance, as a random number generator to generate random values for automated tests.',
      },
      {
        type: 'paragraph',
        text: 'How does this work? If we create multiple counters, will they be independent? What’s going on with the variables here?',
      },
      {
        type: 'paragraph',
        text: 'Understanding such things is great for the overall knowledge of JavaScript and beneficial for more complex scenarios. So let’s go a bit in-depth.',
      },
      {
        type: 'paragraph',
        text: 'Here be dragons!',
      },
      {
        type: 'paragraph',
        text: 'The in-depth technical explanation lies ahead.',
      },
      {
        type: 'paragraph',
        text: 'As far as I’d like to avoid low-level language details, any understanding without them would be lacking and incomplete, so get ready.',
      },
      {
        type: 'paragraph',
        text: 'For clarity, the explanation is split into multiple steps.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Step 1. Variables',
      },
      {
        type: 'paragraph',
        text: 'In JavaScript, every running function, code block {...}, and the script as a whole have an internal (hidden) associated object known as the Lexical Environment.',
      },
      {
        type: 'paragraph',
        text: 'The Lexical Environment object consists of two parts:',
      },
      {
        type: 'list',
        ordered: true,
        items: [
          'Environment Record – an object that stores all local variables as its properties (and some other information like the value of this).',
          'A reference to the outer lexical environment, the one associated with the outer code.',
        ],
      },
      {
        type: 'paragraph',
        text: 'A “variable” is just a property of the special internal object, Environment Record. “To get or change a variable” means “to get or change a property of that object”.',
      },
      {
        type: 'paragraph',
        text: 'In this simple code without functions, there is only one Lexical Environment:',
      },
      {
        type: 'paragraph',
        text: 'This is the so-called global Lexical Environment, associated with the whole script.',
      },
      {
        type: 'paragraph',
        text: 'On the picture above, the rectangle means Environment Record (variable store) and the arrow means the outer reference. The global Lexical Environment has no outer reference, that’s why the arrow points to null.',
      },
      {
        type: 'paragraph',
        text: 'As the code starts executing and goes on, the Lexical Environment changes.',
      },
      {
        type: 'paragraph',
        text: 'Here’s a little bit longer code:',
      },
      {
        type: 'paragraph',
        text: 'Rectangles on the right-hand side demonstrate how the global Lexical Environment changes during the execution:',
      },
      {
        type: 'list',
        ordered: true,
        items: [
          'When the script starts, the Lexical Environment is pre-populated with all declared variables. * Initially, they are in the “Uninitialized” state. That’s a special internal state, it means that the engine knows about the variable, but it cannot be referenced until it has been declared with let. It’s almost the same as if the variable didn’t exist.',
          'Then let phrase definition appears. There’s no assignment yet, so its value is undefined. We can use the variable from this point forward.',
          'phrase is assigned a value.',
          'phrase changes the value.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Everything looks simple for now, right?',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'A variable is a property of a special internal object, associated with the currently executing block/function/script.',
          'Working with variables is actually working with the properties of that object.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Lexical Environment is a specification object',
      },
      {
        type: 'paragraph',
        text: '“Lexical Environment” is a specification object: it only exists “theoretically” in the language specification to describe how things work. We can’t get this object in our code and manipulate it directly.',
      },
      {
        type: 'paragraph',
        text: 'JavaScript engines also may optimize it, discard variables that are unused to save memory and perform other internal tricks, as long as the visible behavior remains as described.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Step 2. Function Declarations',
      },
      {
        type: 'paragraph',
        text: 'A function is also a value, like a variable.',
      },
      {
        type: 'paragraph',
        text: 'The difference is that a Function Declaration is instantly fully initialized.',
      },
      {
        type: 'paragraph',
        text: 'When a Lexical Environment is created, a Function Declaration immediately becomes a ready-to-use function (unlike let, that is unusable till the declaration).',
      },
      {
        type: 'paragraph',
        text: 'That’s why we can use a function, declared as Function Declaration, even before the declaration itself.',
      },
      {
        type: 'paragraph',
        text: 'For example, here’s the initial state of the global Lexical Environment when we add a function:',
      },
      {
        type: 'paragraph',
        text: 'Naturally, this behavior only applies to Function Declarations, not Function Expressions where we assign a function to a variable, such as let say = function(name)....',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Step 3. Inner and outer Lexical Environment',
      },
      {
        type: 'paragraph',
        text: 'When a function runs, at the beginning of the call, a new Lexical Environment is created automatically to store local variables and parameters of the call.',
      },
      {
        type: 'paragraph',
        text: 'For instance, for say("John"), it looks like this (the execution is at the line, labelled with an arrow):',
      },
      {
        type: 'paragraph',
        text: 'During the function call we have two Lexical Environments: the inner one (for the function call) and the outer one (global):',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'The inner Lexical Environment corresponds to the current execution of say. It has a single property: name, the function argument. We called say("John"), so the value of the name is "John".',
          'The outer Lexical Environment is the global Lexical Environment. It has the phrase variable and the function itself.',
        ],
      },
      {
        type: 'paragraph',
        text: 'The inner Lexical Environment has a reference to the outer one.',
      },
      {
        type: 'paragraph',
        text: 'When the code wants to access a variable – the inner Lexical Environment is searched first, then the outer one, then the more outer one and so on until the global one.',
      },
      {
        type: 'paragraph',
        text: 'If a variable is not found anywhere, that’s an error in strict mode (without use strict, an assignment to a non-existing variable creates a new global variable, for compatibility with old code).',
      },
      {
        type: 'paragraph',
        text: 'In this example the search proceeds as follows:',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'For the name variable, the alert inside say finds it immediately in the inner Lexical Environment.',
          'When it wants to access phrase, then there is no phrase locally, so it follows the reference to the outer Lexical Environment and finds it there.',
        ],
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Step 4. Returning a function',
      },
      {
        type: 'paragraph',
        text: 'Let’s return to the makeCounter example.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'function makeCounter() {\n  let count = 0;\n\n  return function() {\n    return count++;\n  };\n}\n\nlet counter = makeCounter();',
        },
      },
      {
        type: 'paragraph',
        text: 'At the beginning of each makeCounter() call, a new Lexical Environment object is created, to store variables for this makeCounter run.',
      },
      {
        type: 'paragraph',
        text: 'So we have two nested Lexical Environments, just like in the example above:',
      },
      {
        type: 'paragraph',
        text: 'What’s different is that, during the execution of makeCounter(), a tiny nested function is created of only one line: return count++. We don’t run it yet, only create.',
      },
      {
        type: 'paragraph',
        text: 'All functions remember the Lexical Environment in which they were made. Technically, there’s no magic here: all functions have the hidden property named [[Environment]], that keeps the reference to the Lexical Environment where the function was created:',
      },
      {
        type: 'paragraph',
        text: 'So, counter.[[Environment]] has the reference to {count: 0} Lexical Environment. That’s how the function remembers where it was created, no matter where it’s called. The [[Environment]] reference is set once and forever at function creation time.',
      },
      {
        type: 'paragraph',
        text: 'Later, when counter() is called, a new Lexical Environment is created for the call, and its outer Lexical Environment reference is taken from counter.[[Environment]]:',
      },
      {
        type: 'paragraph',
        text: 'Now when the code inside counter() looks for count variable, it first searches its own Lexical Environment (empty, as there are no local variables there), then the Lexical Environment of the outer makeCounter() call, where it finds and changes it.',
      },
      {
        type: 'paragraph',
        text: 'A variable is updated in the Lexical Environment where it lives.',
      },
      {
        type: 'paragraph',
        text: 'Here’s the state after the execution:',
      },
      {
        type: 'paragraph',
        text: 'If we call counter() multiple times, the count variable will be increased to 2, 3 and so on, at the same place.',
      },
      {
        type: 'paragraph',
        text: 'Closure',
      },
      {
        type: 'paragraph',
        text: 'There is a general programming term “closure”, that developers generally should know.',
      },
      {
        type: 'paragraph',
        text: 'A closure is a function that remembers its outer variables and can access them. In some languages, that’s not possible, or a function should be written in a special way to make it happen. But as explained above, in JavaScript, all functions are naturally closures (there is only one exception, to be covered in The "new Function" syntax).',
      },
      {
        type: 'paragraph',
        text: 'That is: they automatically remember where they were created using a hidden [[Environment]] property, and then their code can access outer variables.',
      },
      {
        type: 'paragraph',
        text: 'When on an interview, a frontend developer gets a question about “what’s a closure?”, a valid answer would be a definition of the closure and an explanation that all functions in JavaScript are closures, and maybe a few more words about technical details: the [[Environment]] property and how Lexical Environments work.',
      },
      {
        type: 'paragraph',
        text: 'Usually, a Lexical Environment is removed from memory with all the variables after the function call finishes. That’s because there are no references to it. As any JavaScript object, it’s only kept in memory while it’s reachable.',
      },
      {
        type: 'paragraph',
        text: 'However, if there’s a nested function that is still reachable after the end of a function, then it has [[Environment]] property that references the lexical environment.',
      },
      {
        type: 'paragraph',
        text: 'In that case the Lexical Environment is still reachable even after the completion of the function, so it stays alive.',
      },
      {
        type: 'paragraph',
        text: 'For example:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'function f() {\n  let value = 123;\n\n  return function() {\n    alert(value);\n  }\n}\n\nlet g = f(); // g.[[Environment]] stores a reference to the Lexical Environment\n// of the corresponding f() call',
        },
      },
      {
        type: 'paragraph',
        text: 'Please note that if f() is called many times, and resulting functions are saved, then all corresponding Lexical Environment objects will also be retained in memory. In the code below, all 3 of them:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'function f() {\n  let value = Math.random();\n\n  return function() { alert(value); };\n}\n\n// 3 functions in array, every one of them links to Lexical Environment\n// from the corresponding f() run\nlet arr = [f(), f(), f()];',
        },
      },
      {
        type: 'paragraph',
        text: 'A Lexical Environment object dies when it becomes unreachable (just like any other object). In other words, it exists only while there’s at least one nested function referencing it.',
      },
      {
        type: 'paragraph',
        text: 'In the code below, after the nested function is removed, its enclosing Lexical Environment (and hence the value) is cleaned from memory:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'function f() {\n  let value = 123;\n\n  return function() {\n    alert(value);\n  }\n}\n\nlet g = f(); // while g function exists, the value stays in memory\n\ng = null; // ...and now the memory is cleaned up',
        },
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Real-life optimizations',
      },
      {
        type: 'paragraph',
        text: 'As we’ve seen, in theory while a function is alive, all outer variables are also retained.',
      },
      {
        type: 'paragraph',
        text: 'But in practice, JavaScript engines try to optimize that. They analyze variable usage and if it’s obvious from the code that an outer variable is not used – it is removed.',
      },
      {
        type: 'paragraph',
        text: 'An important side effect in V8 (Chrome, Edge, Opera) is that such variable will become unavailable in debugging.',
      },
      {
        type: 'paragraph',
        text: 'Try running the example below in Chrome with the Developer Tools open.',
      },
      {
        type: 'paragraph',
        text: 'When it pauses, in the console type alert(value).',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'function f() {\n  let value = Math.random();\n\n  function g() {\n    debugger; // in console: type alert(value); No such variable!\n  }\n\n  return g;\n}\n\nlet g = f();\ng();',
        },
      },
      {
        type: 'paragraph',
        text: 'As you could see – there is no such variable! In theory, it should be accessible, but the engine optimized it out.',
      },
      {
        type: 'paragraph',
        text: 'That may lead to funny (if not such time-consuming) debugging issues. One of them – we can see a same-named outer variable instead of the expected one:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'let value = "Surprise!";\n\nfunction f() {\n  let value = "the closest value";\n\n  function g() {\n    debugger; // in console: type alert(value); Surprise!\n  }\n\n  return g;\n}\n\nlet g = f();\ng();',
        },
      },
      {
        type: 'paragraph',
        text: 'This feature of V8 is good to know. If you are debugging with Chrome/Edge/Opera, sooner or later you will meet it.',
      },
      {
        type: 'paragraph',
        text: 'That is not a bug in the debugger, but rather a special feature of V8. Perhaps it will be changed sometime. You can always check for it by running the examples on this page.',
      },
    ],
  },
} satisfies Record<string, ContentTopic>;
