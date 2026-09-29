import type { ContentTopic } from '../../../types';

export const jsErrorHandlingTopics = {
  'js-error-handling': {
    id: 'js-error-handling',
    heading: 'The “try…catch” syntax',
    blocks: [
      {
        type: 'paragraph',
        text: 'The try...catch construct has two main blocks: try, and then catch:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'try {\n\n  // code...\n\n} catch (err) {\n\n  // error handling\n\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'It works like this:',
      },
      {
        type: 'list',
        ordered: true,
        items: [
          'First, the code in try {...} is executed.',
          'If there were no errors, then catch (err) is ignored: the execution reaches the end of try and goes on, skipping catch.',
          'If an error occurs, then the try execution is stopped, and control flows to the beginning of catch (err). The err variable (we can use any name for it) will contain an error object with details about what happened.',
        ],
      },
      {
        type: 'paragraph',
        text: 'So, an error inside the try {...} block does not kill the script – we have a chance to handle it in catch.',
      },
      {
        type: 'paragraph',
        text: 'Let’s look at some examples.',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          "An errorless example: shows alert (1) and (2): try { alert('Start of try runs'); // (1) &lt;-- // ...no errors here alert('End of try runs'); // (2) &lt;-- } catch (err) { alert('Catch is ignored, because there are no errors'); // (3) }",
          "An example with an error: shows (1) and (3): try { alert('Start of try runs'); // (1) &lt;-- lalala; // error, variable is not defined! alert('End of try (never reached)'); // (2) } catch (err) { alert(`Error has occurred!`); // (3) &lt;-- }",
        ],
      },
      {
        type: 'paragraph',
        text: 'try...catch only works for runtime errors',
      },
      {
        type: 'paragraph',
        text: 'For try...catch to work, the code must be runnable. In other words, it should be valid JavaScript.',
      },
      {
        type: 'paragraph',
        text: 'It won’t work if the code is syntactically wrong, for instance it has unmatched curly braces:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'try {\n  {{{{{{{{{{{{\n} catch (err) {\n  alert("The engine can\'t understand this code, it\'s invalid");\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'The JavaScript engine first reads the code, and then runs it. The errors that occur on the reading phase are called “parse-time” errors and are unrecoverable (from inside that code). That’s because the engine can’t understand the code.',
      },
      {
        type: 'paragraph',
        text: 'So, try...catch can only handle errors that occur in valid code. Such errors are called “runtime errors” or, sometimes, “exceptions”.',
      },
      {
        type: 'paragraph',
        text: 'try...catch works synchronously',
      },
      {
        type: 'paragraph',
        text: 'If an exception happens in “scheduled” code, like in setTimeout, then try...catch won’t catch it:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'try {\n  setTimeout(function() {\n    noSuchVariable; // script will die here\n  }, 1000);\n} catch (err) {\n  alert( "won\'t work" );\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'That’s because the function itself is executed later, when the engine has already left the try...catch construct.',
      },
      {
        type: 'paragraph',
        text: 'To catch an exception inside a scheduled function, try...catch must be inside that function:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'setTimeout(function() {\n  try {\n    noSuchVariable; // try...catch handles the error!\n  } catch {\n    alert( "error is caught here!" );\n  }\n}, 1000);',
        },
      },
      {
        type: 'paragraph',
        text: 'When an error occurs, JavaScript generates an object containing the details about it. The object is then passed as an argument to catch:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'try {\n  // ...\n} catch (err) { // <-- the "error object", could use another word instead of err\n  // ...\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'For all built-in errors, the error object has two main properties:',
      },
      {
        type: 'paragraph',
        text: 'name',
      },
      {
        type: 'paragraph',
        text: 'Error name. For instance, for an undefined variable that’s "ReferenceError".',
      },
      {
        type: 'paragraph',
        text: 'message',
      },
      {
        type: 'paragraph',
        text: 'Textual message about error details.',
      },
      {
        type: 'paragraph',
        text: 'There are other non-standard properties available in most environments. One of most widely used and supported is:',
      },
      {
        type: 'paragraph',
        text: 'stack',
      },
      {
        type: 'paragraph',
        text: 'Current call stack: a string with information about the sequence of nested calls that led to the error. Used for debugging purposes.',
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
          code: 'try {\n  lalala; // error, variable is not defined!\n} catch (err) {\n  alert(err.name); // ReferenceError\n  alert(err.message); // lalala is not defined\n  alert(err.stack); // ReferenceError: lalala is not defined at (...call stack)\n\n  // Can also show an error as a whole\n  // The error is converted to string as "name: message"\n  alert(err); // ReferenceError: lalala is not defined\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'A recent addition',
      },
      {
        type: 'paragraph',
        text: 'This is a recent addition to the language. Old browsers may need polyfills.',
      },
      {
        type: 'paragraph',
        text: 'If we don’t need error details, catch may omit it:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'try {\n  // ...\n} catch { // <-- without (err)\n  // ...\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'Let’s explore a real-life use case of try...catch.',
      },
      {
        type: 'paragraph',
        text: 'As we already know, JavaScript supports the JSON.parse(str) method to read JSON-encoded values.',
      },
      {
        type: 'paragraph',
        text: 'Usually it’s used to decode data received over the network, from the server or another source.',
      },
      {
        type: 'paragraph',
        text: 'We receive it and call JSON.parse like this:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'let json = \'{"name":"John", "age": 30}\'; // data from the server\n\nlet user = JSON.parse(json); // convert the text representation to JS object\n\n// now user is an object with properties from the string\nalert( user.name ); // John\nalert( user.age );  // 30',
        },
      },
      {
        type: 'paragraph',
        text: 'You can find more detailed information about JSON in the JSON methods, toJSON chapter.',
      },
      {
        type: 'paragraph',
        text: 'If json is malformed, JSON.parse generates an error, so the script “dies”.',
      },
      {
        type: 'paragraph',
        text: 'Should we be satisfied with that? Of course not!',
      },
      {
        type: 'paragraph',
        text: 'This way, if something’s wrong with the data, the visitor will never know that (unless they open the developer console). And people really don’t like when something “just dies” without any error message.',
      },
      {
        type: 'paragraph',
        text: 'Let’s use try...catch to handle the error:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'let json = "{ bad json }";\n\ntry {\n\n  let user = JSON.parse(json); // <-- when an error occurs...\n  alert( user.name ); // doesn\'t work\n\n} catch (err) {\n  // ...the execution jumps here\n  alert( "Our apologies, the data has errors, we\'ll try to request it one more time." );\n  alert( err.name );\n  alert( err.message );\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'Here we use the catch block only to show the message, but we can do much more: send a new network request, suggest an alternative to the visitor, send information about the error to a logging facility, … . All much better than just dying.',
      },
      {
        type: 'paragraph',
        text: 'What if json is syntactically correct, but doesn’t have a required name property?',
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
          code: 'let json = \'{ "age": 30 }\'; // incomplete data\n\ntry {\n\n  let user = JSON.parse(json); // <-- no errors\n  alert( user.name ); // no name!\n\n} catch (err) {\n  alert( "doesn\'t execute" );\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'Here JSON.parse runs normally, but the absence of name is actually an error for us.',
      },
      {
        type: 'paragraph',
        text: 'To unify error handling, we’ll use the throw operator.',
      },
      {
        type: 'subheading',
        level: 3,
        text: '“Throw” operator',
      },
      {
        type: 'paragraph',
        text: 'The throw operator generates an error.',
      },
      {
        type: 'paragraph',
        text: 'The syntax is:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'throw <error object>',
        },
      },
      {
        type: 'paragraph',
        text: 'Technically, we can use anything as an error object. That may be even a primitive, like a number or a string, but it’s better to use objects, preferably with name and message properties (to stay somewhat compatible with built-in errors).',
      },
      {
        type: 'paragraph',
        text: 'JavaScript has many built-in constructors for standard errors: Error, SyntaxError, ReferenceError, TypeError and others. We can use them to create error objects as well.',
      },
      {
        type: 'paragraph',
        text: 'Their syntax is:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'let error = new Error(message);\n// or\nlet error = new SyntaxError(message);\nlet error = new ReferenceError(message);\n// ...',
        },
      },
      {
        type: 'paragraph',
        text: 'For built-in errors (not for any objects, just for errors), the name property is exactly the name of the constructor. And message is taken from the argument.',
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
          code: 'let error = new Error("Things happen o_O");\n\nalert(error.name); // Error\nalert(error.message); // Things happen o_O',
        },
      },
      {
        type: 'paragraph',
        text: 'Let’s see what kind of error JSON.parse generates:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'try {\n  JSON.parse("{ bad json o_O }");\n} catch (err) {\n  alert(err.name); // SyntaxError\n  alert(err.message); // Unexpected token b in JSON at position 2\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'As we can see, that’s a SyntaxError.',
      },
      {
        type: 'paragraph',
        text: 'And in our case, the absence of name is an error, as users must have a name.',
      },
      {
        type: 'paragraph',
        text: 'So let’s throw it:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'let json = \'{ "age": 30 }\'; // incomplete data\n\ntry {\n\n  let user = JSON.parse(json); // <-- no errors\n\n  if (!user.name) {\n    throw new SyntaxError("Incomplete data: no name"); // (*)\n  }\n\n  alert( user.name );\n\n} catch (err) {\n  alert( "JSON Error: " + err.message ); // JSON Error: Incomplete data: no name\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'In the line (*), the throw operator generates a SyntaxError with the given message, the same way as JavaScript would generate it itself. The execution of try immediately stops and the control flow jumps into catch.',
      },
      {
        type: 'paragraph',
        text: 'Now catch became a single place for all error handling: both for JSON.parse and other cases.',
      },
      {
        type: 'paragraph',
        text: 'In the example above we use try...catch to handle incorrect data. But is it possible that another unexpected error occurs within the try {...} block? Like a programming error (variable is not defined) or something else, not just this “incorrect data” thing.',
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
          code: 'let json = \'{ "age": 30 }\'; // incomplete data\n\ntry {\n  user = JSON.parse(json); // <-- forgot to put "let" before user\n\n  // ...\n} catch (err) {\n  alert("JSON Error: " + err); // JSON Error: ReferenceError: user is not defined\n  // (no JSON Error actually)\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'Of course, everything’s possible! Programmers do make mistakes. Even in open-source utilities used by millions for decades – suddenly a bug may be discovered that leads to terrible hacks.',
      },
      {
        type: 'paragraph',
        text: 'In our case, try...catch is placed to catch “incorrect data” errors. But by its nature, catch gets all errors from try. Here it gets an unexpected error, but still shows the same "JSON Error" message. That’s wrong and also makes the code more difficult to debug.',
      },
      {
        type: 'paragraph',
        text: 'To avoid such problems, we can employ the “rethrowing” technique. The rule is simple:',
      },
      {
        type: 'paragraph',
        text: 'Catch should only process errors that it knows and “rethrow” all others.',
      },
      {
        type: 'paragraph',
        text: 'The “rethrowing” technique can be explained in more detail as:',
      },
      {
        type: 'list',
        ordered: true,
        items: [
          'Catch gets all errors.',
          'In the catch (err) {...} block we analyze the error object err.',
          'If we don’t know how to handle it, we do throw err.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Usually, we can check the error type using the instanceof operator:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'try {\n  user = { /*...*/ };\n} catch (err) {\n  if (err instanceof ReferenceError) {\n    alert(\'ReferenceError\'); // "ReferenceError" for accessing an undefined variable\n  }\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'We can also get the error class name from err.name property. All native errors have it. Another option is to read err.constructor.name.',
      },
      {
        type: 'paragraph',
        text: 'In the code below, we use rethrowing so that catch only handles SyntaxError:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'let json = \'{ "age": 30 }\'; // incomplete data\ntry {\n\n  let user = JSON.parse(json);\n\n  if (!user.name) {\n    throw new SyntaxError("Incomplete data: no name");\n  }\n\n  blabla(); // unexpected error\n\n  alert( user.name );\n\n} catch (err) {\n\n  if (err instanceof SyntaxError) {\n    alert( "JSON Error: " + err.message );\n  } else {\n    throw err; // rethrow (*)\n  }\n\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'The error throwing on line (*) from inside catch block “falls out” of try...catch and can be either caught by an outer try...catch construct (if it exists), or it kills the script.',
      },
      {
        type: 'paragraph',
        text: 'So the catch block actually handles only errors that it knows how to deal with and “skips” all others.',
      },
      {
        type: 'paragraph',
        text: 'The example below demonstrates how such errors can be caught by one more level of try...catch:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'function readData() {\n  let json = \'{ "age": 30 }\';\n\n  try {\n    // ...\n    blabla(); // error!\n  } catch (err) {\n    // ...\n    if (!(err instanceof SyntaxError)) {\n      throw err; // rethrow (don\'t know how to deal with it)\n    }\n  }\n}\n\ntry {\n  readData();\n} catch (err) {\n  alert( "External catch got: " + err ); // caught it!\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'Here readData only knows how to handle SyntaxError, while the outer try...catch knows how to handle everything.',
      },
      {
        type: 'paragraph',
        text: 'Wait, that’s not all.',
      },
      {
        type: 'paragraph',
        text: 'The try...catch construct may have one more code clause: finally.',
      },
      {
        type: 'paragraph',
        text: 'If it exists, it runs in all cases:',
      },
      {
        type: 'list',
        ordered: false,
        items: ['after try, if there were no errors,', 'after catch, if there were errors.'],
      },
      {
        type: 'paragraph',
        text: 'The extended syntax looks like this:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'try {\n   ... try to execute the code ...\n} catch (err) {\n   ... handle errors ...\n} finally {\n   ... execute always ...\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'Try running this code:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "try {\n  alert( 'try' );\n  if (confirm('Make an error?')) BAD_CODE();\n} catch (err) {\n  alert( 'catch' );\n} finally {\n  alert( 'finally' );\n}",
        },
      },
      {
        type: 'paragraph',
        text: 'The code has two ways of execution:',
      },
      {
        type: 'list',
        ordered: true,
        items: [
          'If you answer “Yes” to “Make an error?”, then try -&gt; catch -&gt; finally.',
          'If you say “No”, then try -&gt; finally.',
        ],
      },
      {
        type: 'paragraph',
        text: 'The finally clause is often used when we start doing something and want to finalize it in any case of outcome.',
      },
      {
        type: 'paragraph',
        text: 'For instance, we want to measure the time that a Fibonacci numbers function fib(n) takes. Naturally, we can start measuring before it runs and finish afterwards. But what if there’s an error during the function call? In particular, the implementation of fib(n) in the code below returns an error for negative or non-integer numbers.',
      },
      {
        type: 'paragraph',
        text: 'The finally clause is a great place to finish the measurements no matter what.',
      },
      {
        type: 'paragraph',
        text: 'Here finally guarantees that the time will be measured correctly in both situations – in case of a successful execution of fib and in case of an error in it:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'let num = +prompt("Enter a positive integer number?", 35)\n\nlet diff, result;\n\nfunction fib(n) {\n  if (n < 0 || Math.trunc(n) != n) {\n    throw new Error("Must not be negative, and also an integer.");\n  }\n  return n <= 1 ? n : fib(n - 1) + fib(n - 2);\n}\n\nlet start = Date.now();\n\ntry {\n  result = fib(num);\n} catch (err) {\n  result = 0;\n} finally {\n  diff = Date.now() - start;\n}\n\nalert(result || "error occurred");\n\nalert( `execution took ${diff}ms` );',
        },
      },
      {
        type: 'paragraph',
        text: 'You can check by running the code with entering 35 into prompt – it executes normally, finally after try. And then enter -1 – there will be an immediate error, and the execution will take 0ms. Both measurements are done correctly.',
      },
      {
        type: 'paragraph',
        text: 'In other words, the function may finish with return or throw, that doesn’t matter. The finally clause executes in both cases.',
      },
      {
        type: 'paragraph',
        text: 'Variables are local inside try...catch...finally',
      },
      {
        type: 'paragraph',
        text: 'Please note that result and diff variables in the code above are declared before try...catch.',
      },
      {
        type: 'paragraph',
        text: 'Otherwise, if we declared let in try block, it would only be visible inside of it.',
      },
      {
        type: 'paragraph',
        text: 'finally and return',
      },
      {
        type: 'paragraph',
        text: 'The finally clause works for any exit from try...catch. That includes an explicit return.',
      },
      {
        type: 'paragraph',
        text: 'In the example below, there’s a return in try. In this case, finally is executed just before the control returns to the outer code.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "function func() {\n\n  try {\n    return 1;\n\n  } catch (err) {\n    /* ... */\n  } finally {\n    alert( 'finally' );\n  }\n}\n\nalert( func() ); // first works alert from finally, and then this one",
        },
      },
      {
        type: 'paragraph',
        text: 'try...finally',
      },
      {
        type: 'paragraph',
        text: 'The try...finally construct, without catch clause, is also useful. We apply it when we don’t want to handle errors here (let them fall through), but want to be sure that processes that we started are finalized.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'function func() {\n  // start doing something that needs completion (like measurements)\n  try {\n    // ...\n  } finally {\n    // complete that thing even if all dies\n  }\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'In the code above, an error inside try always falls out, because there’s no catch. But finally works before the execution flow leaves the function.',
      },
      {
        type: 'paragraph',
        text: 'Environment-specific',
      },
      {
        type: 'paragraph',
        text: 'The information from this section is not a part of the core JavaScript.',
      },
      {
        type: 'paragraph',
        text: 'Let’s imagine we’ve got a fatal error outside of try...catch, and the script died. Like a programming error or some other terrible thing.',
      },
      {
        type: 'paragraph',
        text: 'Is there a way to react on such occurrences? We may want to log the error, show something to the user (normally they don’t see error messages), etc.',
      },
      {
        type: 'paragraph',
        text: 'There is none in the specification, but environments usually provide it, because it’s really useful. For instance, Node.js has process.on("uncaughtException") for that. And in the browser we can assign a function to the special window.onerror property, that will run in case of an uncaught error.',
      },
      {
        type: 'paragraph',
        text: 'The syntax:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'window.onerror = function(message, url, line, col, error) {\n  // ...\n};',
        },
      },
      {
        type: 'paragraph',
        text: 'message',
      },
      {
        type: 'paragraph',
        text: 'Error message.',
      },
      {
        type: 'paragraph',
        text: 'url',
      },
      {
        type: 'paragraph',
        text: 'URL of the script where error happened.',
      },
      {
        type: 'paragraph',
        text: 'line, col',
      },
      {
        type: 'paragraph',
        text: 'Line and column numbers where error happened.',
      },
      {
        type: 'paragraph',
        text: 'error',
      },
      {
        type: 'paragraph',
        text: 'Error object.',
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
          code: '<script>\n  window.onerror = function(message, url, line, col, error) {\n    alert(`${message}\\n At ${line}:${col} of ${url}`);\n  };\n\n  function readData() {\n    badFunc(); // Whoops, something went wrong!\n  }\n\n  readData();\n</script>',
        },
      },
      {
        type: 'paragraph',
        text: 'The role of the global handler window.onerror is usually not to recover the script execution – that’s probably impossible in case of programming errors, but to send the error message to developers.',
      },
      {
        type: 'paragraph',
        text: 'There are also web-services that provide error-logging for such cases, like https://muscula.com or https://www.sentry.io.',
      },
      {
        type: 'paragraph',
        text: 'They work like this:',
      },
      {
        type: 'list',
        ordered: true,
        items: [
          'We register at the service and get a piece of JS (or a script URL) from them to insert on pages.',
          'That JS script sets a custom window.onerror function.',
          'When an error occurs, it sends a network request about it to the service.',
          'We can log in to the service web interface and see errors.',
        ],
      },
      {
        type: 'paragraph',
        text: 'The try...catch construct allows to handle runtime errors. It literally allows to “try” running the code and “catch” errors that may occur in it.',
      },
      {
        type: 'paragraph',
        text: 'The syntax is:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'try {\n  // run this code\n} catch (err) {\n  // if an error happened, then jump here\n  // err is the error object\n} finally {\n  // do in any case after try/catch\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'There may be no catch section or no finally, so shorter constructs try...catch and try...finally are also valid.',
      },
      {
        type: 'paragraph',
        text: 'Error objects have following properties:',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'message – the human-readable error message.',
          'name – the string with error name (error constructor name).',
          'stack (non-standard, but well-supported) – the stack at the moment of error creation.',
        ],
      },
      {
        type: 'paragraph',
        text: 'If an error object is not needed, we can omit it by using catch { instead of catch (err) {.',
      },
      {
        type: 'paragraph',
        text: 'We can also generate our own errors using the throw operator. Technically, the argument of throw can be anything, but usually it’s an error object inheriting from the built-in Error class. More on extending errors in the next chapter.',
      },
      {
        type: 'paragraph',
        text: 'Rethrowing is a very important pattern of error handling: a catch block usually expects and knows how to handle the particular error type, so it should rethrow errors it doesn’t know.',
      },
      {
        type: 'paragraph',
        text: 'Even if we don’t have try...catch, most environments allow us to setup a “global” error handler to catch errors that “fall out”. In-browser, that’s window.onerror.',
      },
      {
        type: 'paragraph',
        text: 'When we develop something, we often need our own error classes to reflect specific things that may go wrong in our tasks. For errors in network operations we may need HttpError, for database operations DbError, for searching operations NotFoundError and so on.',
      },
      {
        type: 'paragraph',
        text: 'Our errors should support basic error properties like message, name and, preferably, stack. But they also may have other properties of their own, e.g. HttpError objects may have a statusCode property with a value like 404 or 403 or 500.',
      },
      {
        type: 'paragraph',
        text: 'JavaScript allows to use throw with any argument, so technically our custom error classes don’t need to inherit from Error. But if we inherit, then it becomes possible to use obj instanceof Error to identify error objects. So it’s better to inherit from it.',
      },
      {
        type: 'paragraph',
        text: 'As the application grows, our own errors naturally form a hierarchy. For instance, HttpTimeoutError may inherit from HttpError, and so on.',
      },
      {
        type: 'paragraph',
        text: 'As an example, let’s consider a function readUser(json) that should read JSON with user data.',
      },
      {
        type: 'paragraph',
        text: 'Here’s an example of how a valid json may look:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'let json = `{ "name": "John", "age": 30 }`;',
        },
      },
      {
        type: 'paragraph',
        text: 'Internally, we’ll use JSON.parse. If it receives malformed json, then it throws SyntaxError. But even if json is syntactically correct, that doesn’t mean that it’s a valid user, right? It may miss the necessary data. For instance, it may not have name and age properties that are essential for our users.',
      },
      {
        type: 'paragraph',
        text: 'Our function readUser(json) will not only read JSON, but check (“validate”) the data. If there are no required fields, or the format is wrong, then that’s an error. And that’s not a SyntaxError, because the data is syntactically correct, but another kind of error. We’ll call it ValidationError and create a class for it. An error of that kind should also carry the information about the offending field.',
      },
      {
        type: 'paragraph',
        text: 'Our ValidationError class should inherit from the Error class.',
      },
      {
        type: 'paragraph',
        text: 'The Error class is built-in, but here’s its approximate code so we can understand what we’re extending:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '// The "pseudocode" for the built-in Error class defined by JavaScript itself\nclass Error {\n  constructor(message) {\n    this.message = message;\n    this.name = "Error"; // (different names for different built-in error classes)\n    this.stack = <call stack>; // non-standard, but most environments support it\n  }\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'Now let’s inherit ValidationError from it and try it in action:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'class ValidationError extends Error {\n  constructor(message) {\n    super(message); // (1)\n    this.name = "ValidationError"; // (2)\n  }\n}\n\nfunction test() {\n  throw new ValidationError("Whoops!");\n}\n\ntry {\n  test();\n} catch(err) {\n  alert(err.message); // Whoops!\n  alert(err.name); // ValidationError\n  alert(err.stack); // a list of nested calls with line numbers for each\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'Please note: in the line (1) we call the parent constructor. JavaScript requires us to call super in the child constructor, so that’s obligatory. The parent constructor sets the message property.',
      },
      {
        type: 'paragraph',
        text: 'The parent constructor also sets the name property to "Error", so in the line (2) we reset it to the right value.',
      },
      {
        type: 'paragraph',
        text: 'Let’s try to use it in readUser(json):',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'class ValidationError extends Error {\n  constructor(message) {\n    super(message);\n    this.name = "ValidationError";\n  }\n}\n\n// Usage\nfunction readUser(json) {\n  let user = JSON.parse(json);\n\n  if (!user.age) {\n    throw new ValidationError("No field: age");\n  }\n  if (!user.name) {\n    throw new ValidationError("No field: name");\n  }\n\n  return user;\n}\n\n// Working example with try..catch\n\ntry {\n  let user = readUser(\'{ "age": 25 }\');\n} catch (err) {\n  if (err instanceof ValidationError) {\n    alert("Invalid data: " + err.message); // Invalid data: No field: name\n  } else if (err instanceof SyntaxError) { // (*)\n    alert("JSON Syntax Error: " + err.message);\n  } else {\n    throw err; // unknown error, rethrow it (**)\n  }\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'The try..catch block in the code above handles both our ValidationError and the built-in SyntaxError from JSON.parse.',
      },
      {
        type: 'paragraph',
        text: 'Please take a look at how we use instanceof to check for the specific error type in the line (*).',
      },
      {
        type: 'paragraph',
        text: 'We could also look at err.name, like this:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '// ...\n// instead of (err instanceof SyntaxError)\n} else if (err.name == "SyntaxError") { // (*)\n// ...',
        },
      },
      {
        type: 'paragraph',
        text: 'The instanceof version is much better, because in the future we are going to extend ValidationError, make subtypes of it, like PropertyRequiredError. And instanceof check will continue to work for new inheriting classes. So that’s future-proof.',
      },
      {
        type: 'paragraph',
        text: 'Also it’s important that if catch meets an unknown error, then it rethrows it in the line (**). The catch block only knows how to handle validation and syntax errors, other kinds (caused by a typo in the code or other unknown reasons) should fall through.',
      },
      {
        type: 'paragraph',
        text: 'The ValidationError class is very generic. Many things may go wrong. The property may be absent or it may be in a wrong format (like a string value for age instead of a number). Let’s make a more concrete class PropertyRequiredError, exactly for absent properties. It will carry additional information about the property that’s missing.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'class ValidationError extends Error {\n  constructor(message) {\n    super(message);\n    this.name = "ValidationError";\n  }\n}\n\nclass PropertyRequiredError extends ValidationError {\n  constructor(property) {\n    super("No property: " + property);\n    this.name = "PropertyRequiredError";\n    this.property = property;\n  }\n}\n\n// Usage\nfunction readUser(json) {\n  let user = JSON.parse(json);\n\n  if (!user.age) {\n    throw new PropertyRequiredError("age");\n  }\n  if (!user.name) {\n    throw new PropertyRequiredError("name");\n  }\n\n  return user;\n}\n\n// Working example with try..catch\n\ntry {\n  let user = readUser(\'{ "age": 25 }\');\n} catch (err) {\n  if (err instanceof ValidationError) {\n    alert("Invalid data: " + err.message); // Invalid data: No property: name\n    alert(err.name); // PropertyRequiredError\n    alert(err.property); // name\n  } else if (err instanceof SyntaxError) {\n    alert("JSON Syntax Error: " + err.message);\n  } else {\n    throw err; // unknown error, rethrow it\n  }\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'The new class PropertyRequiredError is easy to use: we only need to pass the property name: new PropertyRequiredError(property). The human-readable message is generated by the constructor.',
      },
      {
        type: 'paragraph',
        text: 'Please note that this.name in PropertyRequiredError constructor is again assigned manually. That may become a bit tedious – to assign this.name = &lt;class name&gt; in every custom error class. We can avoid it by making our own “basic error” class that assigns this.name = this.constructor.name. And then inherit all our custom errors from it.',
      },
      {
        type: 'paragraph',
        text: 'Let’s call it MyError.',
      },
      {
        type: 'paragraph',
        text: 'Here’s the code with MyError and other custom error classes, simplified:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'class MyError extends Error {\n  constructor(message) {\n    super(message);\n    this.name = this.constructor.name;\n  }\n}\n\nclass ValidationError extends MyError { }\n\nclass PropertyRequiredError extends ValidationError {\n  constructor(property) {\n    super("No property: " + property);\n    this.property = property;\n  }\n}\n\n// name is correct\nalert( new PropertyRequiredError("field").name ); // PropertyRequiredError',
        },
      },
      {
        type: 'paragraph',
        text: 'Now custom errors are much shorter, especially ValidationError, as we got rid of the "this.name = ..." line in the constructor.',
      },
      {
        type: 'paragraph',
        text: 'The purpose of the function readUser in the code above is “to read the user data”. There may occur different kinds of errors in the process. Right now we have SyntaxError and ValidationError, but in the future readUser function may grow and probably generate other kinds of errors.',
      },
      {
        type: 'paragraph',
        text: 'The code which calls readUser should handle these errors. Right now it uses multiple ifs in the catch block, that check the class and handle known errors and rethrow the unknown ones.',
      },
      {
        type: 'paragraph',
        text: 'The scheme is like this:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'try {\n  ...\n  readUser()  // the potential error source\n  ...\n} catch (err) {\n  if (err instanceof ValidationError) {\n    // handle validation errors\n  } else if (err instanceof SyntaxError) {\n    // handle syntax errors\n  } else {\n    throw err; // unknown error, rethrow it\n  }\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'In the code above we can see two types of errors, but there can be more.',
      },
      {
        type: 'paragraph',
        text: 'If the readUser function generates several kinds of errors, then we should ask ourselves: do we really want to check for all error types one-by-one every time?',
      },
      {
        type: 'paragraph',
        text: 'Often the answer is “No”: we’d like to be “one level above all that”. We just want to know if there was a “data reading error” – why exactly it happened is often irrelevant (the error message describes it). Or, even better, we’d like to have a way to get the error details, but only if we need to.',
      },
      {
        type: 'paragraph',
        text: 'The technique that we describe here is called “wrapping exceptions”.',
      },
      {
        type: 'list',
        ordered: true,
        items: [
          'We’ll make a new class ReadError to represent a generic “data reading” error.',
          'The function readUser will catch data reading errors that occur inside it, such as ValidationError and SyntaxError, and generate a ReadError instead.',
          'The ReadError object will keep the reference to the original error in its cause property.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Then the code that calls readUser will only have to check for ReadError, not for every kind of data reading errors. And if it needs more details of an error, it can check its cause property.',
      },
      {
        type: 'paragraph',
        text: 'Here’s the code that defines ReadError and demonstrates its use in readUser and try..catch:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'class ReadError extends Error {\n  constructor(message, cause) {\n    super(message);\n    this.cause = cause;\n    this.name = \'ReadError\';\n  }\n}\n\nclass ValidationError extends Error { /*...*/ }\nclass PropertyRequiredError extends ValidationError { /* ... */ }\n\nfunction validateUser(user) {\n  if (!user.age) {\n    throw new PropertyRequiredError("age");\n  }\n\n  if (!user.name) {\n    throw new PropertyRequiredError("name");\n  }\n}\n\nfunction readUser(json) {\n  let user;\n\n  try {\n    user = JSON.parse(json);\n  } catch (err) {\n    if (err instanceof SyntaxError) {\n      throw new ReadError("Syntax Error", err);\n    } else {\n      throw err;\n    }\n  }\n\n  try {\n    validateUser(user);\n  } catch (err) {\n    if (err instanceof ValidationError) {\n      throw new ReadError("Validation Error", err);\n    } else {\n      throw err;\n    }\n  }\n\n}\n\ntry {\n  readUser(\'{bad json}\');\n} catch (e) {\n  if (e instanceof ReadError) {\n    alert(e);\n    // Original error: SyntaxError: Unexpected token b in JSON at position 1\n    alert("Original error: " + e.cause);\n  } else {\n    throw e;\n  }\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'In the code above, readUser works exactly as described – catches syntax and validation errors and throws ReadError errors instead (unknown errors are rethrown as usual).',
      },
      {
        type: 'paragraph',
        text: 'So the outer code checks instanceof ReadError and that’s it. No need to list all possible error types.',
      },
      {
        type: 'paragraph',
        text: 'The approach is called “wrapping exceptions”, because we take “low level” exceptions and “wrap” them into ReadError that is more abstract. It is widely used in object-oriented programming.',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'We can inherit from Error and other built-in error classes normally. We just need to take care of the name property and don’t forget to call super.',
          'We can use instanceof to check for particular errors. It also works with inheritance. But sometimes we have an error object coming from a 3rd-party library and there’s no easy way to get its class. Then name property can be used for such checks.',
          'Wrapping exceptions is a widespread technique: a function handles low-level exceptions and creates higher-level errors instead of various low-level ones. Low-level exceptions sometimes become properties of that object like err.cause in the examples above, but that’s not strictly required.',
        ],
      },
    ],
  },
} satisfies Record<string, ContentTopic>;
