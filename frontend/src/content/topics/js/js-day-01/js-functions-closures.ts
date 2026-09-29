import type { ContentTopic } from '../../../types';

export const jsFunctionsClosuresTopics = {
  'js-functions-closures': {
    id: 'js-functions-closures',
    heading: 'Function Declaration',
    blocks: [
      {
        type: 'paragraph',
        text: 'To create a function we can use a function declaration.',
      },
      {
        type: 'paragraph',
        text: 'It looks like this:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "function showMessage() {\n  alert( 'Hello everyone!' );\n}",
        },
      },
      {
        type: 'paragraph',
        text: 'The function keyword goes first, then goes the name of the function, then a list of parameters between the parentheses (comma-separated, empty in the example above, we’ll see examples later) and finally the code of the function, also named “the function body”, between curly braces.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'function name(parameter1, parameter2, ... parameterN) {\n // body\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'Our new function can be called by its name: showMessage().',
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
          code: "function showMessage() {\n  alert( 'Hello everyone!' );\n}\n\nshowMessage();\nshowMessage();",
        },
      },
      {
        type: 'paragraph',
        text: 'The call showMessage() executes the code of the function. Here we will see the message two times.',
      },
      {
        type: 'paragraph',
        text: 'This example clearly demonstrates one of the main purposes of functions: to avoid code duplication.',
      },
      {
        type: 'paragraph',
        text: 'If we ever need to change the message or the way it is shown, it’s enough to modify the code in one place: the function which outputs it.',
      },
      {
        type: 'paragraph',
        text: 'A variable declared inside a function is only visible inside that function.',
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
          code: 'function showMessage() {\n  let message = "Hello, I\'m JavaScript!"; // local variable\n\n  alert( message );\n}\n\nshowMessage(); // Hello, I\'m JavaScript!\n\nalert( message ); // <-- Error! The variable is local to the function',
        },
      },
      {
        type: 'paragraph',
        text: 'A function can access an outer variable as well, for example:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "let userName = 'John';\n\nfunction showMessage() {\n  let message = 'Hello, ' + userName;\n  alert(message);\n}\n\nshowMessage(); // Hello, John",
        },
      },
      {
        type: 'paragraph',
        text: 'The function has full access to the outer variable. It can modify it as well.',
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
          code: "let userName = 'John';\n\nfunction showMessage() {\n  userName = \"Bob\"; // (1) changed the outer variable\n\n  let message = 'Hello, ' + userName;\n  alert(message);\n}\n\nalert( userName ); // John before the function call\n\nshowMessage();\n\nalert( userName ); // Bob, the value was modified by the function",
        },
      },
      {
        type: 'paragraph',
        text: 'The outer variable is only used if there’s no local one.',
      },
      {
        type: 'paragraph',
        text: 'If a same-named variable is declared inside the function then it shadows the outer one. For instance, in the code below the function uses the local userName. The outer one is ignored:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "let userName = 'John';\n\nfunction showMessage() {\n  let userName = \"Bob\"; // declare a local variable\n\n  let message = 'Hello, ' + userName; // Bob\n  alert(message);\n}\n\n// the function will create and use its own userName\nshowMessage();\n\nalert( userName ); // John, unchanged, the function did not access the outer variable",
        },
      },
      {
        type: 'paragraph',
        text: 'Global variables',
      },
      {
        type: 'paragraph',
        text: 'Variables declared outside of any function, such as the outer userName in the code above, are called global.',
      },
      {
        type: 'paragraph',
        text: 'Global variables are visible from any function (unless shadowed by locals).',
      },
      {
        type: 'paragraph',
        text: 'It’s a good practice to minimize the use of global variables. Modern code has few or no globals. Most variables reside in their functions. Sometimes though, they can be useful to store project-level data.',
      },
      {
        type: 'paragraph',
        text: 'We can pass arbitrary data to functions using parameters.',
      },
      {
        type: 'paragraph',
        text: 'In the example below, the function has two parameters: from and text.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "function showMessage(from, text) { // parameters: from, text\n  alert(from + ': ' + text);\n}\n\nshowMessage('Ann', 'Hello!'); // Ann: Hello! (*)\nshowMessage('Ann', \"What's up?\"); // Ann: What's up? (**)",
        },
      },
      {
        type: 'paragraph',
        text: 'When the function is called in lines (*) and (**), the given values are copied to local variables from and text. Then the function uses them.',
      },
      {
        type: 'paragraph',
        text: 'Here’s one more example: we have a variable from and pass it to the function. Please note: the function changes from, but the change is not seen outside, because a function always gets a copy of the value:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'function showMessage(from, text) {\n\n  from = \'*\' + from + \'*\'; // make "from" look nicer\n\n  alert( from + \': \' + text );\n}\n\nlet from = "Ann";\n\nshowMessage(from, "Hello"); // *Ann*: Hello\n\n// the value of "from" is the same, the function modified a local copy\nalert( from ); // Ann',
        },
      },
      {
        type: 'paragraph',
        text: 'When a value is passed as a function parameter, it’s also called an argument.',
      },
      {
        type: 'paragraph',
        text: 'In other words, to put these terms straight:',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'A parameter is the variable listed inside the parentheses in the function declaration (it’s a declaration time term).',
          'An argument is the value that is passed to the function when it is called (it’s a call time term).',
        ],
      },
      {
        type: 'paragraph',
        text: 'We declare functions listing their parameters, then call them passing arguments.',
      },
      {
        type: 'paragraph',
        text: 'In the example above, one might say: “the function showMessage is declared with two parameters, then called with two arguments: from and "Hello"”.',
      },
      {
        type: 'paragraph',
        text: 'If a function is called, but an argument is not provided, then the corresponding value becomes undefined.',
      },
      {
        type: 'paragraph',
        text: 'For instance, the aforementioned function showMessage(from, text) can be called with a single argument:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'showMessage("Ann");',
        },
      },
      {
        type: 'paragraph',
        text: 'That’s not an error. Such a call would output "*Ann*: undefined". As the value for text isn’t passed, it becomes undefined.',
      },
      {
        type: 'paragraph',
        text: 'We can specify the so-called “default” (to use if omitted) value for a parameter in the function declaration, using =:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'function showMessage(from, text = "no text given") {\n  alert( from + ": " + text );\n}\n\nshowMessage("Ann"); // Ann: no text given',
        },
      },
      {
        type: 'paragraph',
        text: 'Now if the text parameter is not passed, it will get the value "no text given".',
      },
      {
        type: 'paragraph',
        text: 'The default value also jumps in if the parameter exists, but strictly equals undefined, like this:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'showMessage("Ann", undefined); // Ann: no text given',
        },
      },
      {
        type: 'paragraph',
        text: 'Here "no text given" is a string, but it can be a more complex expression, which is only evaluated and assigned if the parameter is missing. So, this is also possible:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'function showMessage(from, text = anotherFunction()) {\n  // anotherFunction() only executed if no text given\n  // its result becomes the value of text\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'Evaluation of default parameters',
      },
      {
        type: 'paragraph',
        text: 'In JavaScript, a default parameter is evaluated every time the function is called without the respective parameter.',
      },
      {
        type: 'paragraph',
        text: 'In the example above, anotherFunction() isn’t called at all, if the text parameter is provided.',
      },
      {
        type: 'paragraph',
        text: 'On the other hand, it’s independently called every time when text is missing.',
      },
      {
        type: 'paragraph',
        text: 'Default parameters in old JavaScript code',
      },
      {
        type: 'paragraph',
        text: 'Several years ago, JavaScript didn’t support the syntax for default parameters. So people used other ways to specify them.',
      },
      {
        type: 'paragraph',
        text: 'Nowadays, we can come across them in old scripts.',
      },
      {
        type: 'paragraph',
        text: 'For example, an explicit check for undefined:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'function showMessage(from, text) {\n  if (text === undefined) {\n    text = \'no text given\';\n  }\n\n  alert( from + ": " + text );\n}',
        },
      },
      {
        type: 'paragraph',
        text: '…Or using the || operator:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'function showMessage(from, text) {\n  // If the value of text is falsy, assign the default value\n  // this assumes that text == "" is the same as no text at all\n  text = text || \'no text given\';\n  ...\n}',
        },
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Alternative default parameters',
      },
      {
        type: 'paragraph',
        text: 'Sometimes it makes sense to assign default values for parameters at a later stage after the function declaration.',
      },
      {
        type: 'paragraph',
        text: 'We can check if the parameter is passed during the function execution, by comparing it with undefined:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "function showMessage(text) {\n  // ...\n\n  if (text === undefined) { // if the parameter is missing\n    text = 'empty message';\n  }\n\n  alert(text);\n}\n\nshowMessage(); // empty message",
        },
      },
      {
        type: 'paragraph',
        text: '…Or we could use the || operator:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "function showMessage(text) {\n  // if text is undefined or otherwise falsy, set it to 'empty'\n  text = text || 'empty';\n  ...\n}",
        },
      },
      {
        type: 'paragraph',
        text: 'Modern JavaScript engines support the nullish coalescing operator ??, it’s better when most falsy values, such as 0, should be considered “normal”:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'function showCount(count) {\n  // if count is undefined or null, show "unknown"\n  alert(count ?? "unknown");\n}\n\nshowCount(0); // 0\nshowCount(null); // unknown\nshowCount(); // unknown',
        },
      },
      {
        type: 'paragraph',
        text: 'A function can return a value back into the calling code as the result.',
      },
      {
        type: 'paragraph',
        text: 'The simplest example would be a function that sums two values:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'function sum(a, b) {\n  return a + b;\n}\n\nlet result = sum(1, 2);\nalert( result ); // 3',
        },
      },
      {
        type: 'paragraph',
        text: 'The directive return can be in any place of the function. When the execution reaches it, the function stops, and the value is returned to the calling code (assigned to result above).',
      },
      {
        type: 'paragraph',
        text: 'There may be many occurrences of return in a single function. For instance:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "function checkAge(age) {\n  if (age >= 18) {\n    return true;\n  } else {\n    return confirm('Do you have permission from your parents?');\n  }\n}\n\nlet age = prompt('How old are you?', 18);\n\nif ( checkAge(age) ) {\n  alert( 'Access granted' );\n} else {\n  alert( 'Access denied' );\n}",
        },
      },
      {
        type: 'paragraph',
        text: 'It is possible to use return without a value. That causes the function to exit immediately.',
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
          code: 'function showMovie(age) {\n  if ( !checkAge(age) ) {\n    return;\n  }\n\n  alert( "Showing you the movie" ); // (*)\n  // ...\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'In the code above, if checkAge(age) returns false, then showMovie won’t proceed to the alert.',
      },
      {
        type: 'paragraph',
        text: 'A function with an empty return or without it returns undefined',
      },
      {
        type: 'paragraph',
        text: 'If a function does not return a value, it is the same as if it returns undefined:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'function doNothing() { /* empty */ }\n\nalert( doNothing() === undefined ); // true',
        },
      },
      {
        type: 'paragraph',
        text: 'An empty return is also the same as return undefined:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'function doNothing() {\n  return;\n}\n\nalert( doNothing() === undefined ); // true',
        },
      },
      {
        type: 'paragraph',
        text: 'Never add a newline between return and the value',
      },
      {
        type: 'paragraph',
        text: 'For a long expression in return, it might be tempting to put it on a separate line, like this:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'return\n (some + long + expression + or + whatever * f(a) + f(b))',
        },
      },
      {
        type: 'paragraph',
        text: 'That doesn’t work, because JavaScript assumes a semicolon after return. That’ll work the same as:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'return;\n (some + long + expression + or + whatever * f(a) + f(b))',
        },
      },
      {
        type: 'paragraph',
        text: 'So, it effectively becomes an empty return.',
      },
      {
        type: 'paragraph',
        text: 'If we want the returned expression to wrap across multiple lines, we should start it at the same line as return. Or at least put the opening parentheses there as follows:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'return (\n  some + long + expression\n  + or +\n  whatever * f(a) + f(b)\n  )',
        },
      },
      {
        type: 'paragraph',
        text: 'And it will work just as we expect it to.',
      },
      {
        type: 'paragraph',
        text: 'Functions are actions. So their name is usually a verb. It should be brief, as accurate as possible and describe what the function does, so that someone reading the code gets an indication of what the function does.',
      },
      {
        type: 'paragraph',
        text: 'It is a widespread practice to start a function with a verbal prefix which vaguely describes the action. There must be an agreement within the team on the meaning of the prefixes.',
      },
      {
        type: 'paragraph',
        text: 'For instance, functions that start with "show" usually show something.',
      },
      {
        type: 'paragraph',
        text: 'Function starting with…',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          '"get…" – return a value,',
          '"calc…" – calculate something,',
          '"create…" – create something,',
          '"check…" – check something and return a boolean, etc.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Examples of such names:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'showMessage(..)     // shows a message\ngetAge(..)          // returns the age (gets it somehow)\ncalcSum(..)         // calculates a sum and returns the result\ncreateForm(..)      // creates a form (and usually returns it)\ncheckPermission(..) // checks a permission, returns true/false',
        },
      },
      {
        type: 'paragraph',
        text: 'With prefixes in place, a glance at a function name gives an understanding what kind of work it does and what kind of value it returns.',
      },
      {
        type: 'paragraph',
        text: 'One function – one action',
      },
      {
        type: 'paragraph',
        text: 'A function should do exactly what is suggested by its name, no more.',
      },
      {
        type: 'paragraph',
        text: 'Two independent actions usually deserve two functions, even if they are usually called together (in that case we can make a 3rd function that calls those two).',
      },
      {
        type: 'paragraph',
        text: 'A few examples of breaking this rule:',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'getAge – would be bad if it shows an alert with the age (should only get).',
          'createForm – would be bad if it modifies the document, adding a form to it (should only create it and return).',
          'checkPermission – would be bad if it displays the access granted/denied message (should only perform the check and return the result).',
        ],
      },
      {
        type: 'paragraph',
        text: 'These examples assume common meanings of prefixes. You and your team are free to agree on other meanings, but usually they’re not much different. In any case, you should have a firm understanding of what a prefix means, what a prefixed function can and cannot do. All same-prefixed functions should obey the rules. And the team should share the knowledge.',
      },
      {
        type: 'paragraph',
        text: 'Ultrashort function names',
      },
      {
        type: 'paragraph',
        text: 'Functions that are used very often sometimes have ultrashort names.',
      },
      {
        type: 'paragraph',
        text: 'For example, the jQuery framework defines a function with $. The Lodash library has its core function named _.',
      },
      {
        type: 'paragraph',
        text: 'These are exceptions. Generally function names should be concise and descriptive.',
      },
      {
        type: 'paragraph',
        text: 'Functions should be short and do exactly one thing. If that thing is big, maybe it’s worth it to split the function into a few smaller functions. Sometimes following this rule may not be that easy, but it’s definitely a good thing.',
      },
      {
        type: 'paragraph',
        text: 'A separate function is not only easier to test and debug – its very existence is a great comment!',
      },
      {
        type: 'paragraph',
        text: 'For instance, compare the two functions showPrimes(n) below. Each one outputs prime numbers up to n.',
      },
      {
        type: 'paragraph',
        text: 'The first variant uses a label:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'function showPrimes(n) {\n  nextPrime: for (let i = 2; i < n; i++) {\n\n    for (let j = 2; j < i; j++) {\n      if (i % j == 0) continue nextPrime;\n    }\n\n    alert( i ); // a prime\n  }\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'The second variant uses an additional function isPrime(n) to test for primality:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'function showPrimes(n) {\n\n  for (let i = 2; i < n; i++) {\n    if (!isPrime(i)) continue;\n\n    alert(i);  // a prime\n  }\n}\n\nfunction isPrime(n) {\n  for (let i = 2; i < n; i++) {\n    if ( n % i == 0) return false;\n  }\n  return true;\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'The second variant is easier to understand, isn’t it? Instead of the code piece we see a name of the action (isPrime). Sometimes people refer to such code as self-describing.',
      },
      {
        type: 'paragraph',
        text: 'So, functions can be created even if we don’t intend to reuse them. They structure the code and make it readable.',
      },
      {
        type: 'paragraph',
        text: 'A function declaration looks like this:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'function name(parameters, delimited, by, comma) {\n  /* code */\n}',
        },
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'Values passed to a function as parameters are copied to its local variables.',
          'A function may access outer variables. But it works only from inside out. The code outside of the function doesn’t see its local variables.',
          'A function can return a value. If it doesn’t, then its result is undefined.',
        ],
      },
      {
        type: 'paragraph',
        text: 'To make the code clean and easy to understand, it’s recommended to use mainly local variables and parameters in the function, not outer variables.',
      },
      {
        type: 'paragraph',
        text: 'It is always easier to understand a function which gets parameters, works with them and returns a result than a function which gets no parameters, but modifies outer variables as a side effect.',
      },
      {
        type: 'paragraph',
        text: 'Function naming:',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'A name should clearly describe what the function does. When we see a function call in the code, a good name instantly gives us an understanding what it does and returns.',
          'A function is an action, so function names are usually verbal.',
          'There exist many well-known function prefixes like create…, show…, get…, check… and so on. Use them to hint what a function does.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Functions are the main building blocks of scripts. Now we’ve covered the basics, so we actually can start creating and using them. But that’s only the beginning of the path. We are going to return to them many times, going more deeply into their advanced features.',
      },
      {
        type: 'paragraph',
        text: 'In JavaScript, a function is not a “magical language structure”, but a special kind of value.',
      },
      {
        type: 'paragraph',
        text: 'The syntax that we used before is called a Function Declaration:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'function sayHi() {\n  alert( "Hello" );\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'There is another syntax for creating a function that is called a Function Expression.',
      },
      {
        type: 'paragraph',
        text: 'It allows us to create a new function in the middle of any expression.',
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
          code: 'let sayHi = function() {\n  alert( "Hello" );\n};',
        },
      },
      {
        type: 'paragraph',
        text: 'Here we can see a variable sayHi getting a value, the new function, created as function() { alert("Hello"); }.',
      },
      {
        type: 'paragraph',
        text: 'As the function creation happens in the context of the assignment expression (to the right side of =), this is a Function Expression.',
      },
      {
        type: 'paragraph',
        text: 'Please note, there’s no name after the function keyword. Omitting a name is allowed for Function Expressions.',
      },
      {
        type: 'paragraph',
        text: 'Here we immediately assign it to the variable, so the meaning of these code samples is the same: “create a function and put it into the variable sayHi”.',
      },
      {
        type: 'paragraph',
        text: 'In more advanced situations, that we’ll come across later, a function may be created and immediately called or scheduled for a later execution, not stored anywhere, thus remaining anonymous.',
      },
      {
        type: 'paragraph',
        text: 'Let’s reiterate: no matter how the function is created, a function is a value. Both examples above store a function in the sayHi variable.',
      },
      {
        type: 'paragraph',
        text: 'We can even print out that value using alert:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'function sayHi() {\n  alert( "Hello" );\n}\n\nalert( sayHi ); // shows the function code',
        },
      },
      {
        type: 'paragraph',
        text: 'Please note that the last line does not run the function, because there are no parentheses after sayHi. There are programming languages where any mention of a function name causes its execution, but JavaScript is not like that.',
      },
      {
        type: 'paragraph',
        text: 'In JavaScript, a function is a value, so we can deal with it as a value. The code above shows its string representation, which is the source code.',
      },
      {
        type: 'paragraph',
        text: 'Surely, a function is a special value, in the sense that we can call it like sayHi().',
      },
      {
        type: 'paragraph',
        text: 'But it’s still a value. So we can work with it like with other kinds of values.',
      },
      {
        type: 'paragraph',
        text: 'We can copy a function to another variable:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'function sayHi() {   // (1) create\n  alert( "Hello" );\n}\n\nlet func = sayHi;    // (2) copy\n\nfunc(); // Hello     // (3) run the copy (it works)!\nsayHi(); // Hello    //     this still works too (why wouldn\'t it)',
        },
      },
      {
        type: 'paragraph',
        text: 'Here’s what happens above in detail:',
      },
      {
        type: 'list',
        ordered: true,
        start: 1,
        items: [
          'The Function Declaration (1) creates the function and puts it into the variable named sayHi.',
          'Line (2) copies it into the variable func. Please note again: there are no parentheses after sayHi. If there were, then func = sayHi() would write the result of the call sayHi() into func, not the function sayHi itself.',
          'Now the function can be called as both sayHi() and func().',
        ],
      },
      {
        type: 'paragraph',
        text: 'We could also have used a Function Expression to declare sayHi, in the first line:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'let sayHi = function() { // (1) create\n  alert( "Hello" );\n};\n\nlet func = sayHi;  //(2)\n// ...',
        },
      },
      {
        type: 'paragraph',
        text: 'Everything would work the same.',
      },
      {
        type: 'paragraph',
        text: 'Why is there a semicolon at the end?',
      },
      {
        type: 'paragraph',
        text: 'You might wonder, why do Function Expressions have a semicolon ; at the end, but Function Declarations do not:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'function sayHi() {\n  // ...\n}\n\nlet sayHi = function() {\n  // ...\n};',
        },
      },
      {
        type: 'paragraph',
        text: 'The answer is simple: a Function Expression is created here as function(…) {…} inside the assignment statement: let sayHi = …;. The semicolon ; is recommended at the end of the statement, it’s not a part of the function syntax.',
      },
      {
        type: 'paragraph',
        text: 'The semicolon would be there for a simpler assignment, such as let sayHi = 5;, and it’s also there for a function assignment.',
      },
      {
        type: 'paragraph',
        text: 'Let’s look at more examples of passing functions as values and using function expressions.',
      },
      {
        type: 'paragraph',
        text: 'We’ll write a function ask(question, yes, no) with three parameters:',
      },
      {
        type: 'paragraph',
        text: 'question',
      },
      {
        type: 'paragraph',
        text: 'Text of the question',
      },
      {
        type: 'paragraph',
        text: 'yes',
      },
      {
        type: 'paragraph',
        text: 'Function to run if the answer is “Yes”',
      },
      {
        type: 'paragraph',
        text: 'no',
      },
      {
        type: 'paragraph',
        text: 'Function to run if the answer is “No”',
      },
      {
        type: 'paragraph',
        text: 'The function should ask the question and, depending on the user’s answer, call yes() or no():',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'function ask(question, yes, no) {\n  if (confirm(question)) yes()\n  else no();\n}\n\nfunction showOk() {\n  alert( "You agreed." );\n}\n\nfunction showCancel() {\n  alert( "You canceled the execution." );\n}\n\n// usage: functions showOk, showCancel are passed as arguments to ask\nask("Do you agree?", showOk, showCancel);',
        },
      },
      {
        type: 'paragraph',
        text: 'In practice, such functions are quite useful. The major difference between a real-life ask and the example above is that real-life functions use more complex ways to interact with the user than a simple confirm. In the browser, such functions usually draw a nice-looking question window. But that’s another story.',
      },
      {
        type: 'paragraph',
        text: 'The arguments showOk and showCancel of ask are called callback functions or just callbacks.',
      },
      {
        type: 'paragraph',
        text: 'The idea is that we pass a function and expect it to be “called back” later if necessary. In our case, showOk becomes the callback for “yes” answer, and showCancel for “no” answer.',
      },
      {
        type: 'paragraph',
        text: 'We can use Function Expressions to write an equivalent, shorter function:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'function ask(question, yes, no) {\n  if (confirm(question)) yes()\n  else no();\n}\n\nask(\n  "Do you agree?",\n  function() { alert("You agreed."); },\n  function() { alert("You canceled the execution."); }\n);',
        },
      },
      {
        type: 'paragraph',
        text: 'Here, functions are declared right inside the ask(...) call. They have no name, and so are called anonymous. Such functions are not accessible outside of ask (because they are not assigned to variables), but that’s just what we want here.',
      },
      {
        type: 'paragraph',
        text: 'Such code appears in our scripts very naturally, it’s in the spirit of JavaScript.',
      },
      {
        type: 'paragraph',
        text: 'A function is a value representing an “action”',
      },
      {
        type: 'paragraph',
        text: 'Regular values like strings or numbers represent the data.',
      },
      {
        type: 'paragraph',
        text: 'A function can be perceived as an action.',
      },
      {
        type: 'paragraph',
        text: 'We can pass it between variables and run when we want.',
      },
      {
        type: 'paragraph',
        text: 'Let’s formulate the key differences between Function Declarations and Expressions.',
      },
      {
        type: 'paragraph',
        text: 'First, the syntax: how to differentiate between them in the code.',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'Function Declaration: a function, declared as a separate statement, in the main code flow: // Function Declaration function sum(a, b) { return a + b; }',
          'Function Expression: a function, created inside an expression or inside another syntax construct. Here, the function is created on the right side of the “assignment expression” =: // Function Expression let sum = function(a, b) { return a + b; };',
        ],
      },
      {
        type: 'paragraph',
        text: 'The more subtle difference is when a function is created by the JavaScript engine.',
      },
      {
        type: 'paragraph',
        text: 'A Function Expression is created when the execution reaches it and is usable only from that moment.',
      },
      {
        type: 'paragraph',
        text: 'Once the execution flow passes to the right side of the assignment let sum = function… – here we go, the function is created and can be used (assigned, called, etc. ) from now on.',
      },
      {
        type: 'paragraph',
        text: 'Function Declarations are different.',
      },
      {
        type: 'paragraph',
        text: 'A Function Declaration can be called earlier than it is defined.',
      },
      {
        type: 'paragraph',
        text: 'For example, a global Function Declaration is visible in the whole script, no matter where it is.',
      },
      {
        type: 'paragraph',
        text: 'That’s due to internal algorithms. When JavaScript prepares to run the script, it first looks for global Function Declarations in it and creates the functions. We can think of it as an “initialization stage”.',
      },
      {
        type: 'paragraph',
        text: 'And after all Function Declarations are processed, the code is executed. So it has access to these functions.',
      },
      {
        type: 'paragraph',
        text: 'For example, this works:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'sayHi("John"); // Hello, John\n\nfunction sayHi(name) {\n  alert( `Hello, ${name}` );\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'The Function Declaration sayHi is created when JavaScript is preparing to start the script and is visible everywhere in it.',
      },
      {
        type: 'paragraph',
        text: '…If it were a Function Expression, then it wouldn’t work:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'sayHi("John"); // error!\n\nlet sayHi = function(name) {  // (*) no magic any more\n  alert( `Hello, ${name}` );\n};',
        },
      },
      {
        type: 'paragraph',
        text: 'Function Expressions are created when the execution reaches them. That would happen only in the line (*). Too late.',
      },
      {
        type: 'paragraph',
        text: 'Another special feature of Function Declarations is their block scope.',
      },
      {
        type: 'paragraph',
        text: 'In strict mode, when a Function Declaration is within a code block, it’s visible everywhere inside that block. But not outside of it.',
      },
      {
        type: 'paragraph',
        text: 'For instance, let’s imagine that we need to declare a function welcome() depending on the age variable that we get during runtime. And then we plan to use it some time later.',
      },
      {
        type: 'paragraph',
        text: 'If we use Function Declaration, it won’t work as intended:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'let age = prompt("What is your age?", 18);\n\n// conditionally declare a function\nif (age < 18) {\n\n  function welcome() {\n    alert("Hello!");\n  }\n\n} else {\n\n  function welcome() {\n    alert("Greetings!");\n  }\n\n}\n\n// ...use it later\nwelcome(); // Error: welcome is not defined',
        },
      },
      {
        type: 'paragraph',
        text: 'That’s because a Function Declaration is only visible inside the code block in which it resides.',
      },
      {
        type: 'paragraph',
        text: 'Here’s another example:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'let age = 16; // take 16 as an example\n\nif (age < 18) {\n  welcome();               // \\   (runs)\n                           //  |\n  function welcome() {     //  |\n    alert("Hello!");       //  |  Function Declaration is available\n  }                        //  |  everywhere in the block where it\'s declared\n                           //  |\n  welcome();               // /   (runs)\n\n} else {\n\n  function welcome() {\n    alert("Greetings!");\n  }\n}\n\n// Here we\'re out of curly braces,\n// so we can not see Function Declarations made inside of them.\n\nwelcome(); // Error: welcome is not defined',
        },
      },
      {
        type: 'paragraph',
        text: 'What can we do to make welcome visible outside of if?',
      },
      {
        type: 'paragraph',
        text: 'The correct approach would be to use a Function Expression and assign welcome to the variable that is declared outside of if and has the proper visibility.',
      },
      {
        type: 'paragraph',
        text: 'This code works as intended:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'let age = prompt("What is your age?", 18);\n\nlet welcome;\n\nif (age < 18) {\n\n  welcome = function() {\n    alert("Hello!");\n  };\n\n} else {\n\n  welcome = function() {\n    alert("Greetings!");\n  };\n\n}\n\nwelcome(); // ok now',
        },
      },
      {
        type: 'paragraph',
        text: 'Or we could simplify it even further using a question mark operator ?:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'let age = prompt("What is your age?", 18);\n\nlet welcome = (age < 18) ?\n  function() { alert("Hello!"); } :\n  function() { alert("Greetings!"); };\n\nwelcome(); // ok now',
        },
      },
      {
        type: 'paragraph',
        text: 'When to choose Function Declaration versus Function Expression?',
      },
      {
        type: 'paragraph',
        text: 'As a rule of thumb, when we need to declare a function, the first thing to consider is Function Declaration syntax. It gives more freedom in how to organize our code, because we can call such functions before they are declared.',
      },
      {
        type: 'paragraph',
        text: 'That’s also better for readability, as it’s easier to look up function f(…) {…} in the code than let f = function(…) {…};. Function Declarations are more “eye-catching”.',
      },
      {
        type: 'paragraph',
        text: '…But if a Function Declaration does not suit us for some reason, or we need a conditional declaration (we’ve just seen an example), then Function Expression should be used.',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'Functions are values. They can be assigned, copied or declared in any place of the code.',
          'If the function is declared as a separate statement in the main code flow, that’s called a “Function Declaration”.',
          'If the function is created as a part of an expression, it’s called a “Function Expression”.',
          'Function Declarations are processed before the code block is executed. They are visible everywhere in the block.',
          'Function Expressions are created when the execution flow reaches them.',
        ],
      },
      {
        type: 'paragraph',
        text: 'In most cases when we need to declare a function, a Function Declaration is preferable, because it is visible prior to the declaration itself. That gives us more flexibility in code organization, and is usually more readable.',
      },
      {
        type: 'paragraph',
        text: 'So we should use a Function Expression only when a Function Declaration is not fit for the task. We’ve seen a couple of examples of that in this chapter, and will see more in the future.',
      },
      {
        type: 'paragraph',
        text: 'There’s another very simple and concise syntax for creating functions, that’s often better than Function Expressions.',
      },
      {
        type: 'paragraph',
        text: 'It’s called “arrow functions”, because it looks like this:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'let func = (arg1, arg2, ..., argN) => expression;',
        },
      },
      {
        type: 'paragraph',
        text: 'This creates a function func that accepts arguments arg1..argN, then evaluates the expression on the right side with their use and returns its result.',
      },
      {
        type: 'paragraph',
        text: 'In other words, it’s the shorter version of:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'let func = function(arg1, arg2, ..., argN) {\n  return expression;\n};',
        },
      },
      {
        type: 'paragraph',
        text: 'Let’s see a concrete example:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'let sum = (a, b) => a + b;\n\n/* This arrow function is a shorter form of:\n\nlet sum = function(a, b) {\n  return a + b;\n};\n*/\n\nalert( sum(1, 2) ); // 3',
        },
      },
      {
        type: 'paragraph',
        text: 'As you can see, (a, b) =&gt; a + b means a function that accepts two arguments named a and b. Upon the execution, it evaluates the expression a + b and returns the result.',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'If we have only one argument, then parentheses around parameters can be omitted, making that even shorter. For example: let double = n =&gt; n * 2; // roughly the same as: let double = function(n) { return n * 2 } alert( double(3) ); // 6',
          'If there are no arguments, parentheses are empty, but they must be present: let sayHi = () =&gt; alert("Hello!"); sayHi();',
        ],
      },
      {
        type: 'paragraph',
        text: 'Arrow functions can be used in the same way as Function Expressions.',
      },
      {
        type: 'paragraph',
        text: 'For instance, to dynamically create a function:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'let age = prompt("What is your age?", 18);\n\nlet welcome = (age < 18) ?\n  () => alert(\'Hello!\') :\n  () => alert("Greetings!");\n\nwelcome();',
        },
      },
      {
        type: 'paragraph',
        text: 'Arrow functions may appear unfamiliar and not very readable at first, but that quickly changes as the eyes get used to the structure.',
      },
      {
        type: 'paragraph',
        text: 'They are very convenient for simple one-line actions, when we’re just too lazy to write many words.',
      },
      {
        type: 'paragraph',
        text: 'The arrow functions that we’ve seen so far were very simple. They took arguments from the left of =&gt;, evaluated and returned the right-side expression with them.',
      },
      {
        type: 'paragraph',
        text: 'Sometimes we need a more complex function, with multiple expressions and statements. In that case, we can enclose them in curly braces. The major difference is that curly braces require a return within them to return a value (just like a regular function does).',
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
          code: 'let sum = (a, b) => {  // the curly brace opens a multiline function\n  let result = a + b;\n  return result; // if we use curly braces, then we need an explicit "return"\n};\n\nalert( sum(1, 2) ); // 3',
        },
      },
      {
        type: 'paragraph',
        text: 'More to come',
      },
      {
        type: 'paragraph',
        text: 'Here we praised arrow functions for brevity. But that’s not all!',
      },
      {
        type: 'paragraph',
        text: 'Arrow functions have other interesting features.',
      },
      {
        type: 'paragraph',
        text: 'To study them in-depth, we first need to get to know some other aspects of JavaScript, so we’ll return to arrow functions later in the chapter Arrow functions revisited.',
      },
      {
        type: 'paragraph',
        text: 'For now, we can already use arrow functions for one-line actions and callbacks.',
      },
      {
        type: 'paragraph',
        text: 'Arrow functions are handy for simple actions, especially for one-liners. They come in two flavors:',
      },
      {
        type: 'list',
        ordered: true,
        start: 1,
        items: [
          'Without curly braces: (...args) =&gt; expression – the right side is an expression: the function evaluates it and returns the result. Parentheses can be omitted, if there’s only a single argument, e.g. n =&gt; n*2.',
          'With curly braces: (...args) =&gt; { body } – brackets allow us to write multiple statements inside the function, but we need an explicit return to return something.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Replace Function Expressions with arrow functions in the code below:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'function ask(question, yes, no) {\n  if (confirm(question)) yes();\n  else no();\n}\n\nask(\n  "Do you agree?",\n  function() { alert("You agreed."); },\n  function() { alert("You canceled the execution."); }\n);',
        },
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'function ask(question, yes, no) {\n  if (confirm(question)) yes();\n  else no();\n}\n\nask(\n  "Do you agree?",\n  () => alert("You agreed."),\n  () => alert("You canceled the execution.")\n);',
        },
      },
      {
        type: 'paragraph',
        text: 'Looks short and clean, right?',
      },
      {
        type: 'paragraph',
        text: 'JavaScript is a very function-oriented language. It gives us a lot of freedom. A function can be created at any moment, passed as an argument to another function, and then called from a totally different place of code later.',
      },
      {
        type: 'paragraph',
        text: 'We already know that a function can access variables outside of it (“outer” variables).',
      },
      {
        type: 'paragraph',
        text: 'But what happens if outer variables change since a function is created? Will the function get newer values or the old ones?',
      },
      {
        type: 'paragraph',
        text: 'And what if a function is passed along as an argument and called from another place of code, will it get access to outer variables at the new place?',
      },
      {
        type: 'paragraph',
        text: 'Let’s expand our knowledge to understand these scenarios and more complex ones.',
      },
      {
        type: 'paragraph',
        text: 'We’ll talk about let/const variables here',
      },
      {
        type: 'paragraph',
        text: 'In JavaScript, there are 3 ways to declare a variable: let, const (the modern ones), and var (the remnant of the past).',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'In this article we’ll use let variables in examples.',
          'Variables, declared with const, behave the same, so this article is about const too.',
          'The old var has some notable differences, they will be covered in the article The old "var".',
        ],
      },
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
        start: 1,
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
        start: 1,
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
