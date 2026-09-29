import type { ContentTopic } from '../../../types';

export const jsPromisesAsyncTopics = {
  'js-promises-async': {
    id: 'js-promises-async',
    heading: 'Callback in callback',
    blocks: [
      {
        type: 'paragraph',
        text: 'How can we load two scripts sequentially: the first one, and then the second one after it?',
      },
      {
        type: 'paragraph',
        text: 'The natural solution would be to put the second loadScript call inside the callback, like this:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "loadScript('/my/script.js', function(script) {\n\n  alert(`Cool, the ${script.src} is loaded, let's load one more`);\n\n  loadScript('/my/script2.js', function(script) {\n    alert(`Cool, the second script is loaded`);\n  });\n\n});",
        },
      },
      {
        type: 'paragraph',
        text: 'After the outer loadScript is complete, the callback initiates the inner one.',
      },
      {
        type: 'paragraph',
        text: 'What if we want one more script…?',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "loadScript('/my/script.js', function(script) {\n\n  loadScript('/my/script2.js', function(script) {\n\n    loadScript('/my/script3.js', function(script) {\n      // ...continue after all scripts are loaded\n    });\n\n  });\n\n});",
        },
      },
      {
        type: 'paragraph',
        text: 'So, every new action is inside a callback. That’s fine for few actions, but not good for many, so we’ll see other variants soon.',
      },
      {
        type: 'paragraph',
        text: 'In the above examples we didn’t consider errors. What if the script loading fails? Our callback should be able to react on that.',
      },
      {
        type: 'paragraph',
        text: 'Here’s an improved version of loadScript that tracks loading errors:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "function loadScript(src, callback) {\n  let script = document.createElement('script');\n  script.src = src;\n\n  script.onload = () => callback(null, script);\n  script.onerror = () => callback(new Error(`Script load error for ${src}`));\n\n  document.head.append(script);\n}",
        },
      },
      {
        type: 'paragraph',
        text: 'It calls callback(null, script) for successful load and callback(error) otherwise.',
      },
      {
        type: 'paragraph',
        text: 'The usage:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "loadScript('/my/script.js', function(error, script) {\n  if (error) {\n    // handle error\n  } else {\n    // script loaded successfully\n  }\n});",
        },
      },
      {
        type: 'paragraph',
        text: 'Once again, the recipe that we used for loadScript is actually quite common. It’s called the “error-first callback” style.',
      },
      {
        type: 'paragraph',
        text: 'The convention is:',
      },
      {
        type: 'list',
        ordered: true,
        start: 1,
        items: [
          'The first argument of the callback is reserved for an error if it occurs. Then callback(err) is called.',
          'The second argument (and the next ones if needed) are for the successful result. Then callback(null, result1, result2…) is called.',
        ],
      },
      {
        type: 'paragraph',
        text: 'So the single callback function is used both for reporting errors and passing back results.',
      },
      {
        type: 'paragraph',
        text: 'At first glance, it looks like a viable approach to asynchronous coding. And indeed it is. For one or maybe two nested calls it looks fine.',
      },
      {
        type: 'paragraph',
        text: 'But for multiple asynchronous actions that follow one after another, we’ll have code like this:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "loadScript('1.js', function(error, script) {\n\n  if (error) {\n    handleError(error);\n  } else {\n    // ...\n    loadScript('2.js', function(error, script) {\n      if (error) {\n        handleError(error);\n      } else {\n        // ...\n        loadScript('3.js', function(error, script) {\n          if (error) {\n            handleError(error);\n          } else {\n            // ...continue after all scripts are loaded (*)\n          }\n        });\n\n      }\n    });\n  }\n});",
        },
      },
      {
        type: 'paragraph',
        text: 'In the code above:',
      },
      {
        type: 'list',
        ordered: true,
        start: 1,
        items: [
          'We load 1.js, then if there’s no error…',
          'We load 2.js, then if there’s no error…',
          'We load 3.js, then if there’s no error – do something else (*).',
        ],
      },
      {
        type: 'paragraph',
        text: 'As calls become more nested, the code becomes deeper and increasingly more difficult to manage, especially if we have real code instead of ... that may include more loops, conditional statements and so on.',
      },
      {
        type: 'paragraph',
        text: 'That’s sometimes called “callback hell” or “pyramid of doom.”',
      },
      {
        type: 'paragraph',
        text: 'The “pyramid” of nested calls grows to the right with every asynchronous action. Soon it spirals out of control.',
      },
      {
        type: 'paragraph',
        text: 'So this way of coding isn’t very good.',
      },
      {
        type: 'paragraph',
        text: 'We can try to alleviate the problem by making every action a standalone function, like this:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "loadScript('1.js', step1);\n\nfunction step1(error, script) {\n  if (error) {\n    handleError(error);\n  } else {\n    // ...\n    loadScript('2.js', step2);\n  }\n}\n\nfunction step2(error, script) {\n  if (error) {\n    handleError(error);\n  } else {\n    // ...\n    loadScript('3.js', step3);\n  }\n}\n\nfunction step3(error, script) {\n  if (error) {\n    handleError(error);\n  } else {\n    // ...continue after all scripts are loaded (*)\n  }\n}",
        },
      },
      {
        type: 'paragraph',
        text: 'See? It does the same thing, and there’s no deep nesting now because we made every action a separate top-level function.',
      },
      {
        type: 'paragraph',
        text: 'It works, but the code looks like a torn apart spreadsheet. It’s difficult to read, and you probably noticed that one needs to eye-jump between pieces while reading it. That’s inconvenient, especially if the reader is not familiar with the code and doesn’t know where to eye-jump.',
      },
      {
        type: 'paragraph',
        text: 'Also, the functions named step* are all of single use, they are created only to avoid the “pyramid of doom.” No one is going to reuse them outside of the action chain. So there’s a bit of namespace cluttering here.',
      },
      {
        type: 'paragraph',
        text: 'We’d like to have something better.',
      },
      {
        type: 'paragraph',
        text: 'Luckily, there are other ways to avoid such pyramids. One of the best ways is to use “promises”, described in the next chapter.',
      },
      {
        type: 'paragraph',
        text: 'Imagine that you’re a top singer, and fans ask day and night for your upcoming song.',
      },
      {
        type: 'paragraph',
        text: 'To get some relief, you promise to send it to them when it’s published. You give your fans a list. They can fill in their email addresses, so that when the song becomes available, all subscribed parties instantly receive it. And even if something goes very wrong, say, a fire in the studio, so that you can’t publish the song, they will still be notified.',
      },
      {
        type: 'paragraph',
        text: 'Everyone is happy: you, because the people don’t crowd you anymore, and fans, because they won’t miss the song.',
      },
      {
        type: 'paragraph',
        text: 'This is a real-life analogy for things we often have in programming:',
      },
      {
        type: 'list',
        ordered: true,
        start: 1,
        items: [
          'A “producing code” that does something and takes time. For instance, some code that loads the data over a network. That’s a “singer”.',
          'A “consuming code” that wants the result of the “producing code” once it’s ready. Many functions may need that result. These are the “fans”.',
          'A promise is a special JavaScript object that links the “producing code” and the “consuming code” together. In terms of our analogy: this is the “subscription list”. The “producing code” takes whatever time it needs to produce the promised result, and the “promise” makes that result available to all of the subscribed code when it’s ready.',
        ],
      },
      {
        type: 'paragraph',
        text: 'The analogy isn’t terribly accurate, because JavaScript promises are more complex than a simple subscription list: they have additional features and limitations. But it’s fine to begin with.',
      },
      {
        type: 'paragraph',
        text: 'The constructor syntax for a promise object is:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'let promise = new Promise(function(resolve, reject) {\n  // executor (the producing code, "singer")\n});',
        },
      },
      {
        type: 'paragraph',
        text: 'The function passed to new Promise is called the executor. When new Promise is created, the executor runs automatically. It contains the producing code which should eventually produce the result. In terms of the analogy above: the executor is the “singer”.',
      },
      {
        type: 'paragraph',
        text: 'Its arguments resolve and reject are callbacks provided by JavaScript itself. Our code is only inside the executor.',
      },
      {
        type: 'paragraph',
        text: 'When the executor obtains the result, be it soon or late, doesn’t matter, it should call one of these callbacks:',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'resolve(value) — if the job is finished successfully, with result value.',
          'reject(error) — if an error has occurred, error is the error object.',
        ],
      },
      {
        type: 'paragraph',
        text: 'So to summarize: the executor runs automatically and attempts to perform a job. When it is finished with the attempt, it calls resolve if it was successful or reject if there was an error.',
      },
      {
        type: 'paragraph',
        text: 'The promise object returned by the new Promise constructor has these internal properties:',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'state — initially "pending", then changes to either "fulfilled" when resolve is called or "rejected" when reject is called.',
          'result — initially undefined, then changes to value when resolve(value) is called or error when reject(error) is called.',
        ],
      },
      {
        type: 'paragraph',
        text: 'So the executor eventually moves promise to one of these states:',
      },
      {
        type: 'paragraph',
        text: 'Later we’ll see how “fans” can subscribe to these changes.',
      },
      {
        type: 'paragraph',
        text: 'Here’s an example of a promise constructor and a simple executor function with “producing code” that takes time (via setTimeout):',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'let promise = new Promise(function(resolve, reject) {\n  // the function is executed automatically when the promise is constructed\n\n  // after 1 second signal that the job is done with the result "done"\n  setTimeout(() => resolve("done"), 1000);\n});',
        },
      },
      {
        type: 'paragraph',
        text: 'We can see two things by running the code above:',
      },
      {
        type: 'list',
        ordered: true,
        start: 1,
        items: [
          'The executor is called automatically and immediately (by new Promise).',
          'The executor receives two arguments: resolve and reject. These functions are pre-defined by the JavaScript engine, so we don’t need to create them. We should only call one of them when ready. After one second of “processing”, the executor calls resolve("done") to produce the result. This changes the state of the promise object:',
        ],
      },
      {
        type: 'paragraph',
        text: 'That was an example of a successful job completion, a “fulfilled promise”.',
      },
      {
        type: 'paragraph',
        text: 'And now an example of the executor rejecting the promise with an error:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'let promise = new Promise(function(resolve, reject) {\n  // after 1 second signal that the job is finished with an error\n  setTimeout(() => reject(new Error("Whoops!")), 1000);\n});',
        },
      },
      {
        type: 'paragraph',
        text: 'The call to reject(...) moves the promise object to "rejected" state:',
      },
      {
        type: 'paragraph',
        text: 'To summarize, the executor should perform a job (usually something that takes time) and then call resolve or reject to change the state of the corresponding promise object.',
      },
      {
        type: 'paragraph',
        text: 'A promise that is either resolved or rejected is called “settled”, as opposed to an initially “pending” promise.',
      },
      {
        type: 'paragraph',
        text: 'There can be only a single result or an error',
      },
      {
        type: 'paragraph',
        text: 'The executor should call only one resolve or one reject. Any state change is final.',
      },
      {
        type: 'paragraph',
        text: 'All further calls of resolve and reject are ignored:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'let promise = new Promise(function(resolve, reject) {\n  resolve("done");\n\n  reject(new Error("…")); // ignored\n  setTimeout(() => resolve("…")); // ignored\n});',
        },
      },
      {
        type: 'paragraph',
        text: 'The idea is that a job done by the executor may have only one result or an error.',
      },
      {
        type: 'paragraph',
        text: 'Also, resolve/reject expect only one argument (or none) and will ignore additional arguments.',
      },
      {
        type: 'paragraph',
        text: 'Reject with Error objects',
      },
      {
        type: 'paragraph',
        text: 'In case something goes wrong, the executor should call reject. That can be done with any type of argument (just like resolve). But it is recommended to use Error objects (or objects that inherit from Error). The reasoning for that will soon become apparent.',
      },
      {
        type: 'paragraph',
        text: 'Immediately calling resolve/reject',
      },
      {
        type: 'paragraph',
        text: 'In practice, an executor usually does something asynchronously and calls resolve/reject after some time, but it doesn’t have to. We also can call resolve or reject immediately, like this:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'let promise = new Promise(function(resolve, reject) {\n  // not taking our time to do the job\n  resolve(123); // immediately give the result: 123\n});',
        },
      },
      {
        type: 'paragraph',
        text: 'For instance, this might happen when we start to do a job but then see that everything has already been completed and cached.',
      },
      {
        type: 'paragraph',
        text: 'That’s fine. We immediately have a resolved promise.',
      },
      {
        type: 'paragraph',
        text: 'The state and result are internal',
      },
      {
        type: 'paragraph',
        text: 'The properties state and result of the Promise object are internal. We can’t directly access them. We can use the methods .then/.catch/.finally for that. They are described below.',
      },
      {
        type: 'paragraph',
        text: 'A Promise object serves as a link between the executor (the “producing code” or “singer”) and the consuming functions (the “fans”), which will receive the result or error. Consuming functions can be registered (subscribed) using the methods .then and .catch.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'then',
      },
      {
        type: 'paragraph',
        text: 'The most important, fundamental one is .then.',
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
          code: 'promise.then(\n  function(result) { /* handle a successful result */ },\n  function(error) { /* handle an error */ }\n);',
        },
      },
      {
        type: 'paragraph',
        text: 'The first argument of .then is a function that runs when the promise is resolved and receives the result.',
      },
      {
        type: 'paragraph',
        text: 'The second argument of .then is a function that runs when the promise is rejected and receives the error.',
      },
      {
        type: 'paragraph',
        text: 'For instance, here’s a reaction to a successfully resolved promise:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'let promise = new Promise(function(resolve, reject) {\n  setTimeout(() => resolve("done!"), 1000);\n});\n\n// resolve runs the first function in .then\npromise.then(\n  result => alert(result), // shows "done!" after 1 second\n  error => alert(error) // doesn\'t run\n);',
        },
      },
      {
        type: 'paragraph',
        text: 'The first function was executed.',
      },
      {
        type: 'paragraph',
        text: 'And in the case of a rejection, the second one:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'let promise = new Promise(function(resolve, reject) {\n  setTimeout(() => reject(new Error("Whoops!")), 1000);\n});\n\n// reject runs the second function in .then\npromise.then(\n  result => alert(result), // doesn\'t run\n  error => alert(error) // shows "Error: Whoops!" after 1 second\n);',
        },
      },
      {
        type: 'paragraph',
        text: 'If we’re interested only in successful completions, then we can provide only one function argument to .then:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'let promise = new Promise(resolve => {\n  setTimeout(() => resolve("done!"), 1000);\n});\n\npromise.then(alert); // shows "done!" after 1 second',
        },
      },
      {
        type: 'subheading',
        level: 3,
        text: 'catch',
      },
      {
        type: 'paragraph',
        text: 'If we’re interested only in errors, then we can use null as the first argument: .then(null, errorHandlingFunction). Or we can use .catch(errorHandlingFunction), which is exactly the same:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'let promise = new Promise((resolve, reject) => {\n  setTimeout(() => reject(new Error("Whoops!")), 1000);\n});\n\n// .catch(f) is the same as promise.then(null, f)\npromise.catch(alert); // shows "Error: Whoops!" after 1 second',
        },
      },
      {
        type: 'paragraph',
        text: 'The call .catch(f) is a complete analog of .then(null, f), it’s just a shorthand.',
      },
      {
        type: 'paragraph',
        text: 'Just like there’s a finally clause in a regular try {...} catch {...}, there’s finally in promises.',
      },
      {
        type: 'paragraph',
        text: 'The call .finally(f) is similar to .then(f, f) in the sense that f runs always, when the promise is settled: be it resolve or reject.',
      },
      {
        type: 'paragraph',
        text: 'The idea of finally is to set up a handler for performing cleanup/finalizing after the previous operations are complete.',
      },
      {
        type: 'paragraph',
        text: 'E.g. stopping loading indicators, closing no longer needed connections, etc.',
      },
      {
        type: 'paragraph',
        text: 'Think of it as a party finisher. Irresepective of whether a party was good or bad, how many friends were in it, we still need (or at least should) do a cleanup after it.',
      },
      {
        type: 'paragraph',
        text: 'The code may look like this:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "new Promise((resolve, reject) => {\n  /* do something that takes time, and then call resolve or maybe reject */\n})\n  // runs when the promise is settled, doesn't matter successfully or not\n  .finally(() => stop loading indicator)\n  // so the loading indicator is always stopped before we go on\n  .then(result => show result, err => show error)",
        },
      },
      {
        type: 'paragraph',
        text: 'Please note that finally(f) isn’t exactly an alias of then(f,f) though.',
      },
      {
        type: 'paragraph',
        text: 'There are important differences:',
      },
      {
        type: 'list',
        ordered: true,
        start: 1,
        items: [
          'A finally handler has no arguments. In finally we don’t know whether the promise is successful or not. That’s all right, as our task is usually to perform “general” finalizing procedures. Please take a look at the example above: as you can see, the finally handler has no arguments, and the promise outcome is handled by the next handler.',
          'A finally handler “passes through” the result or error to the next suitable handler. For instance, here the result is passed through finally to then: new Promise((resolve, reject) =&gt; { setTimeout(() =&gt; resolve("value"), 2000); }) .finally(() =&gt; alert("Promise ready")) // triggers first .then(result =&gt; alert(result)); // &lt;-- .then shows "value" As you can see, the value returned by the first promise is passed through finally to the next then. That’s very convenient, because finally is not meant to process a promise result. As said, it’s a place to do generic cleanup, no matter what the outcome was. And here’s an example of an error, for us to see how it’s passed through finally to catch: new Promise((resolve, reject) =&gt; { throw new Error("error"); }) .finally(() =&gt; alert("Promise ready")) // triggers first .catch(err =&gt; alert(err)); // &lt;-- .catch shows the error',
          'A finally handler also shouldn’t return anything. If it does, the returned value is silently ignored. The only exception to this rule is when a finally handler throws an error. Then this error goes to the next handler, instead of any previous outcome.',
        ],
      },
      {
        type: 'paragraph',
        text: 'To summarize:',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'A finally handler doesn’t get the outcome of the previous handler (it has no arguments). This outcome is passed through instead, to the next suitable handler.',
          'If a finally handler returns something, it’s ignored.',
          'When finally throws an error, then the execution goes to the nearest error handler.',
        ],
      },
      {
        type: 'paragraph',
        text: 'These features are helpful and make things work just the right way if we use finally how it’s supposed to be used: for generic cleanup procedures.',
      },
      {
        type: 'paragraph',
        text: 'We can attach handlers to settled promises',
      },
      {
        type: 'paragraph',
        text: 'If a promise is pending, .then/catch/finally handlers wait for its outcome.',
      },
      {
        type: 'paragraph',
        text: 'Sometimes, it might be that a promise is already settled when we add a handler to it.',
      },
      {
        type: 'paragraph',
        text: 'In such case, these handlers just run immediately:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '// the promise becomes resolved immediately upon creation\nlet promise = new Promise(resolve => resolve("done!"));\n\npromise.then(alert); // done! (shows up right now)',
        },
      },
      {
        type: 'paragraph',
        text: 'Note that this makes promises more powerful than the real life “subscription list” scenario. If the singer has already released their song and then a person signs up on the subscription list, they probably won’t receive that song. Subscriptions in real life must be done prior to the event.',
      },
      {
        type: 'paragraph',
        text: 'Promises are more flexible. We can add handlers any time: if the result is already there, they just execute.',
      },
      {
        type: 'paragraph',
        text: 'Next, let’s see more practical examples of how promises can help us write asynchronous code.',
      },
      {
        type: 'paragraph',
        text: 'We’ve got the loadScript function for loading a script from the previous chapter.',
      },
      {
        type: 'paragraph',
        text: 'Here’s the callback-based variant, just to remind us of it:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "function loadScript(src, callback) {\n  let script = document.createElement('script');\n  script.src = src;\n\n  script.onload = () => callback(null, script);\n  script.onerror = () => callback(new Error(`Script load error for ${src}`));\n\n  document.head.append(script);\n}",
        },
      },
      {
        type: 'paragraph',
        text: 'Let’s rewrite it using Promises.',
      },
      {
        type: 'paragraph',
        text: 'The new function loadScript will not require a callback. Instead, it will create and return a Promise object that resolves when the loading is complete. The outer code can add handlers (subscribing functions) to it using .then:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "function loadScript(src) {\n  return new Promise(function(resolve, reject) {\n    let script = document.createElement('script');\n    script.src = src;\n\n    script.onload = () => resolve(script);\n    script.onerror = () => reject(new Error(`Script load error for ${src}`));\n\n    document.head.append(script);\n  });\n}",
        },
      },
      {
        type: 'paragraph',
        text: 'Usage:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'let promise = loadScript("https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.js");\n\npromise.then(\n  script => alert(`${script.src} is loaded!`),\n  error => alert(`Error: ${error.message}`)\n);\n\npromise.then(script => alert(\'Another handler...\'));',
        },
      },
      {
        type: 'paragraph',
        text: 'We can immediately see a few benefits over the callback-based pattern:',
      },
      {
        type: 'table',
        headers: ['Promises', 'Callbacks'],
        rows: [
          [
            'Promises allow us to do things in the natural order. First, we run loadScript(script), and .then we write what to do with the result.',
            'We must have a callback function at our disposal when calling loadScript(script, callback). In other words, we must know what to do with the result before loadScript is called.',
          ],
          [
            'We can call .then on a Promise as many times as we want. Each time, we’re adding a new “fan”, a new subscribing function, to the “subscription list”. More about this in the next chapter: Promises chaining.',
            'There can be only one callback.',
          ],
        ],
      },
      {
        type: 'paragraph',
        text: 'So promises give us better code flow and flexibility. But there’s more. We’ll see that in the next chapters.',
      },
      {
        type: 'paragraph',
        text: 'Let’s return to the problem mentioned in the chapter Introduction: callbacks: we have a sequence of asynchronous tasks to be performed one after another — for instance, loading scripts. How can we code it well?',
      },
      {
        type: 'paragraph',
        text: 'Promises provide a couple of recipes to do that.',
      },
      {
        type: 'paragraph',
        text: 'In this chapter we cover promise chaining.',
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
          code: 'new Promise(function(resolve, reject) {\n\n  setTimeout(() => resolve(1), 1000); // (*)\n\n}).then(function(result) { // (**)\n\n  alert(result); // 1\n  return result * 2;\n\n}).then(function(result) { // (***)\n\n  alert(result); // 2\n  return result * 2;\n\n}).then(function(result) {\n\n  alert(result); // 4\n  return result * 2;\n\n});',
        },
      },
      {
        type: 'paragraph',
        text: 'The idea is that the result is passed through the chain of .then handlers.',
      },
      {
        type: 'paragraph',
        text: 'Here the flow is:',
      },
      {
        type: 'list',
        ordered: true,
        start: 1,
        items: [
          'The initial promise resolves in 1 second (*),',
          'Then the .then handler is called (**), which in turn creates a new promise (resolved with 2 value).',
          'The next then (***) gets the result of the previous one, processes it (doubles) and passes it to the next handler.',
          '…and so on.',
        ],
      },
      {
        type: 'paragraph',
        text: 'As the result is passed along the chain of handlers, we can see a sequence of alert calls: 1 → 2 → 4.',
      },
      {
        type: 'paragraph',
        text: 'The whole thing works, because every call to a .then returns a new promise, so that we can call the next .then on it.',
      },
      {
        type: 'paragraph',
        text: 'When a handler returns a value, it becomes the result of that promise, so the next .then is called with it.',
      },
      {
        type: 'paragraph',
        text: 'A classic newbie error: technically we can also add many .then to a single promise. This is not chaining.',
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
          code: 'let promise = new Promise(function(resolve, reject) {\n  setTimeout(() => resolve(1), 1000);\n});\n\npromise.then(function(result) {\n  alert(result); // 1\n  return result * 2;\n});\n\npromise.then(function(result) {\n  alert(result); // 1\n  return result * 2;\n});\n\npromise.then(function(result) {\n  alert(result); // 1\n  return result * 2;\n});',
        },
      },
      {
        type: 'paragraph',
        text: 'What we did here is just adding several handlers to one promise. They don’t pass the result to each other; instead they process it independently.',
      },
      {
        type: 'paragraph',
        text: 'Here’s the picture (compare it with the chaining above):',
      },
      {
        type: 'paragraph',
        text: 'All .then on the same promise get the same result – the result of that promise. So in the code above all alert show the same: 1.',
      },
      {
        type: 'paragraph',
        text: 'In practice we rarely need multiple handlers for one promise. Chaining is used much more often.',
      },
      {
        type: 'paragraph',
        text: 'A handler, used in .then(handler) may create and return a promise.',
      },
      {
        type: 'paragraph',
        text: 'In that case further handlers wait until it settles, and then get its result.',
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
          code: 'new Promise(function(resolve, reject) {\n\n  setTimeout(() => resolve(1), 1000);\n\n}).then(function(result) {\n\n  alert(result); // 1\n\n  return new Promise((resolve, reject) => { // (*)\n    setTimeout(() => resolve(result * 2), 1000);\n  });\n\n}).then(function(result) { // (**)\n\n  alert(result); // 2\n\n  return new Promise((resolve, reject) => {\n    setTimeout(() => resolve(result * 2), 1000);\n  });\n\n}).then(function(result) {\n\n  alert(result); // 4\n\n});',
        },
      },
      {
        type: 'paragraph',
        text: 'Here the first .then shows 1 and returns new Promise(…) in the line (*). After one second it resolves, and the result (the argument of resolve, here it’s result * 2) is passed on to the handler of the second .then. That handler is in the line (**), it shows 2 and does the same thing.',
      },
      {
        type: 'paragraph',
        text: 'So the output is the same as in the previous example: 1 → 2 → 4, but now with 1 second delay between alert calls.',
      },
      {
        type: 'paragraph',
        text: 'Returning promises allows us to build chains of asynchronous actions.',
      },
      {
        type: 'paragraph',
        text: 'Let’s use this feature with the promisified loadScript, defined in the previous chapter, to load scripts one by one, in sequence:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'loadScript("/article/promise-chaining/one.js")\n  .then(function(script) {\n    return loadScript("/article/promise-chaining/two.js");\n  })\n  .then(function(script) {\n    return loadScript("/article/promise-chaining/three.js");\n  })\n  .then(function(script) {\n    // use functions declared in scripts\n    // to show that they indeed loaded\n    one();\n    two();\n    three();\n  });',
        },
      },
      {
        type: 'paragraph',
        text: 'This code can be made bit shorter with arrow functions:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'loadScript("/article/promise-chaining/one.js")\n  .then(script => loadScript("/article/promise-chaining/two.js"))\n  .then(script => loadScript("/article/promise-chaining/three.js"))\n  .then(script => {\n    // scripts are loaded, we can use functions declared there\n    one();\n    two();\n    three();\n  });',
        },
      },
      {
        type: 'paragraph',
        text: 'Here each loadScript call returns a promise, and the next .then runs when it resolves. Then it initiates the loading of the next script. So scripts are loaded one after another.',
      },
      {
        type: 'paragraph',
        text: 'We can add more asynchronous actions to the chain. Please note that the code is still “flat” — it grows down, not to the right. There are no signs of the “pyramid of doom”.',
      },
      {
        type: 'paragraph',
        text: 'Technically, we could add .then directly to each loadScript, like this:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'loadScript("/article/promise-chaining/one.js").then(script1 => {\n  loadScript("/article/promise-chaining/two.js").then(script2 => {\n    loadScript("/article/promise-chaining/three.js").then(script3 => {\n      // this function has access to variables script1, script2 and script3\n      one();\n      two();\n      three();\n    });\n  });\n});',
        },
      },
      {
        type: 'paragraph',
        text: 'This code does the same: loads 3 scripts in sequence. But it “grows to the right”. So we have the same problem as with callbacks.',
      },
      {
        type: 'paragraph',
        text: 'People who start to use promises sometimes don’t know about chaining, so they write it this way. Generally, chaining is preferred.',
      },
      {
        type: 'paragraph',
        text: 'Sometimes it’s ok to write .then directly, because the nested function has access to the outer scope. In the example above the most nested callback has access to all variables script1, script2, script3. But that’s an exception rather than a rule.',
      },
      {
        type: 'paragraph',
        text: 'Thenables',
      },
      {
        type: 'paragraph',
        text: 'To be precise, a handler may return not exactly a promise, but a so-called “thenable” object – an arbitrary object that has a method .then. It will be treated the same way as a promise.',
      },
      {
        type: 'paragraph',
        text: 'The idea is that 3rd-party libraries may implement “promise-compatible” objects of their own. They can have an extended set of methods, but also be compatible with native promises, because they implement .then.',
      },
      {
        type: 'paragraph',
        text: 'Here’s an example of a thenable object:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'class Thenable {\n  constructor(num) {\n    this.num = num;\n  }\n  then(resolve, reject) {\n    alert(resolve); // function() { native code }\n    // resolve with this.num*2 after the 1 second\n    setTimeout(() => resolve(this.num * 2), 1000); // (**)\n  }\n}\n\nnew Promise(resolve => resolve(1))\n  .then(result => {\n    return new Thenable(result); // (*)\n  })\n  .then(alert); // shows 2 after 1000ms',
        },
      },
      {
        type: 'paragraph',
        text: 'JavaScript checks the object returned by the .then handler in line (*): if it has a callable method named then, then it calls that method providing native functions resolve, reject as arguments (similar to an executor) and waits until one of them is called. In the example above resolve(2) is called after 1 second (**). Then the result is passed further down the chain.',
      },
      {
        type: 'paragraph',
        text: 'This feature allows us to integrate custom objects with promise chains without having to inherit from Promise.',
      },
      {
        type: 'paragraph',
        text: 'In frontend programming, promises are often used for network requests. So let’s see an extended example of that.',
      },
      {
        type: 'paragraph',
        text: 'We’ll use the fetch method to load the information about the user from the remote server. It has a lot of optional parameters covered in separate chapters, but the basic syntax is quite simple:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'let promise = fetch(url);',
        },
      },
      {
        type: 'paragraph',
        text: 'This makes a network request to the url and returns a promise. The promise resolves with a response object when the remote server responds with headers, but before the full response is downloaded.',
      },
      {
        type: 'paragraph',
        text: 'To read the full response, we should call the method response.text(): it returns a promise that resolves when the full text is downloaded from the remote server, with that text as a result.',
      },
      {
        type: 'paragraph',
        text: 'The code below makes a request to user.json and loads its text from the server:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'fetch(\'/article/promise-chaining/user.json\')\n  // .then below runs when the remote server responds\n  .then(function(response) {\n    // response.text() returns a new promise that resolves with the full response text\n    // when it loads\n    return response.text();\n  })\n  .then(function(text) {\n    // ...and here\'s the content of the remote file\n    alert(text); // {"name": "iliakan", "isAdmin": true}\n  });',
        },
      },
      {
        type: 'paragraph',
        text: 'The response object returned from fetch also includes the method response.json() that reads the remote data and parses it as JSON. In our case that’s even more convenient, so let’s switch to it.',
      },
      {
        type: 'paragraph',
        text: 'We’ll also use arrow functions for brevity:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "// same as above, but response.json() parses the remote content as JSON\nfetch('/article/promise-chaining/user.json')\n  .then(response => response.json())\n  .then(user => alert(user.name)); // iliakan, got user name",
        },
      },
      {
        type: 'paragraph',
        text: 'Now let’s do something with the loaded user.',
      },
      {
        type: 'paragraph',
        text: 'For instance, we can make one more request to GitHub, load the user profile and show the avatar:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "// Make a request for user.json\nfetch('/article/promise-chaining/user.json')\n  // Load it as json\n  .then(response => response.json())\n  // Make a request to GitHub\n  .then(user => fetch(`https://api.github.com/users/${user.name}`))\n  // Load the response as json\n  .then(response => response.json())\n  // Show the avatar image (githubUser.avatar_url) for 3 seconds (maybe animate it)\n  .then(githubUser => {\n    let img = document.createElement('img');\n    img.src = githubUser.avatar_url;\n    img.className = \"promise-avatar-example\";\n    document.body.append(img);\n\n    setTimeout(() => img.remove(), 3000); // (*)\n  });",
        },
      },
      {
        type: 'paragraph',
        text: 'The code works; see comments about the details. However, there’s a potential problem in it, a typical error for those who begin to use promises.',
      },
      {
        type: 'paragraph',
        text: 'Look at the line (*): how can we do something after the avatar has finished showing and gets removed? For instance, we’d like to show a form for editing that user or something else. As of now, there’s no way.',
      },
      {
        type: 'paragraph',
        text: 'To make the chain extendable, we need to return a promise that resolves when the avatar finishes showing.',
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
          code: "fetch('/article/promise-chaining/user.json')\n  .then(response => response.json())\n  .then(user => fetch(`https://api.github.com/users/${user.name}`))\n  .then(response => response.json())\n  .then(githubUser => new Promise(function(resolve, reject) { // (*)\n    let img = document.createElement('img');\n    img.src = githubUser.avatar_url;\n    img.className = \"promise-avatar-example\";\n    document.body.append(img);\n\n    setTimeout(() => {\n      img.remove();\n      resolve(githubUser); // (**)\n    }, 3000);\n  }))\n  // triggers after 3 seconds\n  .then(githubUser => alert(`Finished showing ${githubUser.name}`));",
        },
      },
      {
        type: 'paragraph',
        text: 'That is, the .then handler in line (*) now returns new Promise, that becomes settled only after the call of resolve(githubUser) in setTimeout (**). The next .then in the chain will wait for that.',
      },
      {
        type: 'paragraph',
        text: 'As a good practice, an asynchronous action should always return a promise. That makes it possible to plan actions after it; even if we don’t plan to extend the chain now, we may need it later.',
      },
      {
        type: 'paragraph',
        text: 'Finally, we can split the code into reusable functions:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "function loadJson(url) {\n  return fetch(url)\n    .then(response => response.json());\n}\n\nfunction loadGithubUser(name) {\n  return loadJson(`https://api.github.com/users/${name}`);\n}\n\nfunction showAvatar(githubUser) {\n  return new Promise(function(resolve, reject) {\n    let img = document.createElement('img');\n    img.src = githubUser.avatar_url;\n    img.className = \"promise-avatar-example\";\n    document.body.append(img);\n\n    setTimeout(() => {\n      img.remove();\n      resolve(githubUser);\n    }, 3000);\n  });\n}\n\n// Use them:\nloadJson('/article/promise-chaining/user.json')\n  .then(user => loadGithubUser(user.name))\n  .then(showAvatar)\n  .then(githubUser => alert(`Finished showing ${githubUser.name}`));\n  // ...",
        },
      },
      {
        type: 'paragraph',
        text: 'If a .then (or catch/finally, doesn’t matter) handler returns a promise, the rest of the chain waits until it settles. When it does, its result (or error) is passed further.',
      },
      {
        type: 'paragraph',
        text: 'Here’s a full picture:',
      },
      {
        type: 'paragraph',
        text: 'Promise chains are great at error handling. When a promise rejects, the control jumps to the closest rejection handler. That’s very convenient in practice.',
      },
      {
        type: 'paragraph',
        text: 'For instance, in the code below the URL to fetch is wrong (no such site) and .catch handles the error:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "fetch('https://no-such-server.blabla') // rejects\n  .then(response => response.json())\n  .catch(err => alert(err)) // TypeError: failed to fetch (the text may vary)",
        },
      },
      {
        type: 'paragraph',
        text: 'As you can see, the .catch doesn’t have to be immediate. It may appear after one or maybe several .then.',
      },
      {
        type: 'paragraph',
        text: 'Or, maybe, everything is all right with the site, but the response is not valid JSON. The easiest way to catch all errors is to append .catch to the end of chain:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "fetch('/article/promise-chaining/user.json')\n  .then(response => response.json())\n  .then(user => fetch(`https://api.github.com/users/${user.name}`))\n  .then(response => response.json())\n  .then(githubUser => new Promise((resolve, reject) => {\n    let img = document.createElement('img');\n    img.src = githubUser.avatar_url;\n    img.className = \"promise-avatar-example\";\n    document.body.append(img);\n\n    setTimeout(() => {\n      img.remove();\n      resolve(githubUser);\n    }, 3000);\n  }))\n  .catch(error => alert(error.message));",
        },
      },
      {
        type: 'paragraph',
        text: 'Normally, such .catch doesn’t trigger at all. But if any of the promises above rejects (a network problem or invalid json or whatever), then it would catch it.',
      },
      {
        type: 'paragraph',
        text: 'The code of a promise executor and promise handlers has an “invisible try..catch” around it. If an exception happens, it gets caught and treated as a rejection.',
      },
      {
        type: 'paragraph',
        text: 'For instance, this code:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'new Promise((resolve, reject) => {\n  throw new Error("Whoops!");\n}).catch(alert); // Error: Whoops!',
        },
      },
      {
        type: 'paragraph',
        text: '…Works exactly the same as this:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'new Promise((resolve, reject) => {\n  reject(new Error("Whoops!"));\n}).catch(alert); // Error: Whoops!',
        },
      },
      {
        type: 'paragraph',
        text: 'The “invisible try..catch” around the executor automatically catches the error and turns it into rejected promise.',
      },
      {
        type: 'paragraph',
        text: 'This happens not only in the executor function, but in its handlers as well. If we throw inside a .then handler, that means a rejected promise, so the control jumps to the nearest error handler.',
      },
      {
        type: 'paragraph',
        text: 'Here’s an example:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'new Promise((resolve, reject) => {\n  resolve("ok");\n}).then((result) => {\n  throw new Error("Whoops!"); // rejects the promise\n}).catch(alert); // Error: Whoops!',
        },
      },
      {
        type: 'paragraph',
        text: 'This happens for all errors, not just those caused by the throw statement. For example, a programming error:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'new Promise((resolve, reject) => {\n  resolve("ok");\n}).then((result) => {\n  blabla(); // no such function\n}).catch(alert); // ReferenceError: blabla is not defined',
        },
      },
      {
        type: 'paragraph',
        text: 'The final .catch not only catches explicit rejections, but also accidental errors in the handlers above.',
      },
      {
        type: 'paragraph',
        text: 'As we already noticed, .catch at the end of the chain is similar to try..catch. We may have as many .then handlers as we want, and then use a single .catch at the end to handle errors in all of them.',
      },
      {
        type: 'paragraph',
        text: 'In a regular try..catch we can analyze the error and maybe rethrow it if it can’t be handled. The same thing is possible for promises.',
      },
      {
        type: 'paragraph',
        text: 'If we throw inside .catch, then the control goes to the next closest error handler. And if we handle the error and finish normally, then it continues to the next closest successful .then handler.',
      },
      {
        type: 'paragraph',
        text: 'In the example below the .catch successfully handles the error:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '// the execution: catch -> then\nnew Promise((resolve, reject) => {\n\n  throw new Error("Whoops!");\n\n}).catch(function(error) {\n\n  alert("The error is handled, continue normally");\n\n}).then(() => alert("Next successful handler runs"));',
        },
      },
      {
        type: 'paragraph',
        text: 'Here the .catch block finishes normally. So the next successful .then handler is called.',
      },
      {
        type: 'paragraph',
        text: 'In the example below we see the other situation with .catch. The handler (*) catches the error and just can’t handle it (e.g. it only knows how to handle URIError), so it throws it again:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '// the execution: catch -> catch\nnew Promise((resolve, reject) => {\n\n  throw new Error("Whoops!");\n\n}).catch(function(error) { // (*)\n\n  if (error instanceof URIError) {\n    // handle it\n  } else {\n    alert("Can\'t handle such error");\n\n    throw error; // throwing this or another error jumps to the next catch\n  }\n\n}).then(function() {\n  /* doesn\'t run here */\n}).catch(error => { // (**)\n\n  alert(`The unknown error has occurred: ${error}`);\n  // don\'t return anything => execution goes the normal way\n\n});',
        },
      },
      {
        type: 'paragraph',
        text: 'The execution jumps from the first .catch (*) to the next one (**) down the chain.',
      },
      {
        type: 'paragraph',
        text: 'What happens when an error is not handled? For instance, we forgot to append .catch to the end of the chain, like here:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'new Promise(function() {\n  noSuchFunction(); // Error here (no such function)\n})\n  .then(() => {\n    // successful promise handlers, one or more\n  }); // without .catch at the end!',
        },
      },
      {
        type: 'paragraph',
        text: 'In case of an error, the promise becomes rejected, and the execution should jump to the closest rejection handler. But there is none. So the error gets “stuck”. There’s no code to handle it.',
      },
      {
        type: 'paragraph',
        text: 'In practice, just like with regular unhandled errors in code, it means that something has gone terribly wrong.',
      },
      {
        type: 'paragraph',
        text: 'What happens when a regular error occurs and is not caught by try..catch? The script dies with a message in the console. A similar thing happens with unhandled promise rejections.',
      },
      {
        type: 'paragraph',
        text: 'The JavaScript engine tracks such rejections and generates a global error in that case. You can see it in the console if you run the example above.',
      },
      {
        type: 'paragraph',
        text: 'In the browser we can catch such errors using the event unhandledrejection:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'window.addEventListener(\'unhandledrejection\', function(event) {\n  // the event object has two special properties:\n  alert(event.promise); // [object Promise] - the promise that generated the error\n  alert(event.reason); // Error: Whoops! - the unhandled error object\n});\n\nnew Promise(function() {\n  throw new Error("Whoops!");\n}); // no catch to handle the error',
        },
      },
      {
        type: 'paragraph',
        text: 'The event is the part of the HTML standard.',
      },
      {
        type: 'paragraph',
        text: 'If an error occurs, and there’s no .catch, the unhandledrejection handler triggers, and gets the event object with the information about the error, so we can do something.',
      },
      {
        type: 'paragraph',
        text: 'Usually such errors are unrecoverable, so our best way out is to inform the user about the problem and probably report the incident to the server.',
      },
      {
        type: 'paragraph',
        text: 'In non-browser environments like Node.js there are other ways to track unhandled errors.',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          '.catch handles errors in promises of all kinds: be it a reject() call, or an error thrown in a handler.',
          '.then also catches errors in the same manner, if given the second argument (which is the error handler).',
          'We should place .catch exactly in places where we want to handle errors and know how to handle them. The handler should analyze errors (custom error classes help) and rethrow unknown ones (maybe they are programming mistakes).',
          'It’s ok not to use .catch at all, if there’s no way to recover from an error.',
          'In any case we should have the unhandledrejection event handler (for browsers, and analogs for other environments) to track unhandled errors and inform the user (and probably our server) about them, so that our app never “just dies”.',
        ],
      },
      {
        type: 'paragraph',
        text: 'There are 6 static methods in the Promise class. We’ll quickly cover their use cases here.',
      },
      {
        type: 'paragraph',
        text: 'Let’s say we want many promises to execute in parallel and wait until all of them are ready.',
      },
      {
        type: 'paragraph',
        text: 'For instance, download several URLs in parallel and process the content once they are all done.',
      },
      {
        type: 'paragraph',
        text: 'That’s what Promise.all is for.',
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
          code: 'let promise = Promise.all(iterable);',
        },
      },
      {
        type: 'paragraph',
        text: 'Promise.all takes an iterable (usually, an array of promises) and returns a new promise.',
      },
      {
        type: 'paragraph',
        text: 'The new promise resolves when all listed promises are resolved, and the array of their results becomes its result.',
      },
      {
        type: 'paragraph',
        text: 'For instance, the Promise.all below settles after 3 seconds, and then its result is an array [1, 2, 3]:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'Promise.all([\n  new Promise(resolve => setTimeout(() => resolve(1), 3000)), // 1\n  new Promise(resolve => setTimeout(() => resolve(2), 2000)), // 2\n  new Promise(resolve => setTimeout(() => resolve(3), 1000))  // 3\n]).then(alert); // 1,2,3 when promises are ready: each promise contributes an array member',
        },
      },
      {
        type: 'paragraph',
        text: 'Please note that the order of the resulting array members is the same as in its source promises. Even though the first promise takes the longest time to resolve, it’s still first in the array of results.',
      },
      {
        type: 'paragraph',
        text: 'A common trick is to map an array of job data into an array of promises, and then wrap that into Promise.all.',
      },
      {
        type: 'paragraph',
        text: 'For instance, if we have an array of URLs, we can fetch them all like this:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "let urls = [\n  'https://api.github.com/users/iliakan',\n  'https://api.github.com/users/remy',\n  'https://api.github.com/users/jeresig'\n];\n\n// map every url to the promise of the fetch\nlet requests = urls.map(url => fetch(url));\n\n// Promise.all waits until all jobs are resolved\nPromise.all(requests)\n  .then(responses => responses.forEach(\n    response => alert(`${response.url}: ${response.status}`)\n  ));",
        },
      },
      {
        type: 'paragraph',
        text: 'A bigger example with fetching user information for an array of GitHub users by their names (we could fetch an array of goods by their ids, the logic is identical):',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "let names = ['iliakan', 'remy', 'jeresig'];\n\nlet requests = names.map(name => fetch(`https://api.github.com/users/${name}`));\n\nPromise.all(requests)\n  .then(responses => {\n    // all responses are resolved successfully\n    for(let response of responses) {\n      alert(`${response.url}: ${response.status}`); // shows 200 for every url\n    }\n\n    return responses;\n  })\n  // map array of responses into an array of response.json() to read their content\n  .then(responses => Promise.all(responses.map(r => r.json())))\n  // all JSON answers are parsed: \"users\" is the array of them\n  .then(users => users.forEach(user => alert(user.name)));",
        },
      },
      {
        type: 'paragraph',
        text: 'If any of the promises is rejected, the promise returned by Promise.all immediately rejects with that error.',
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
          code: 'Promise.all([\n  new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),\n  new Promise((resolve, reject) => setTimeout(() => reject(new Error("Whoops!")), 2000)),\n  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))\n]).catch(alert); // Error: Whoops!',
        },
      },
      {
        type: 'paragraph',
        text: 'Here the second promise rejects in two seconds. That leads to an immediate rejection of Promise.all, so .catch executes: the rejection error becomes the outcome of the entire Promise.all.',
      },
      {
        type: 'paragraph',
        text: 'In case of an error, other promises are ignored',
      },
      {
        type: 'paragraph',
        text: 'If one promise rejects, Promise.all immediately rejects, completely forgetting about the other ones in the list. Their results are ignored.',
      },
      {
        type: 'paragraph',
        text: 'For example, if there are multiple fetch calls, like in the example above, and one fails, the others will still continue to execute, but Promise.all won’t watch them anymore. They will probably settle, but their results will be ignored.',
      },
      {
        type: 'paragraph',
        text: 'Promise.all does nothing to cancel them, as there’s no concept of “cancellation” in promises. In another chapter we’ll cover AbortController that can help with that, but it’s not a part of the Promise API.',
      },
      {
        type: 'paragraph',
        text: 'Promise.all(iterable) allows non-promise “regular” values in iterable',
      },
      {
        type: 'paragraph',
        text: 'Normally, Promise.all(...) accepts an iterable (in most cases an array) of promises. But if any of those objects is not a promise, it’s passed to the resulting array “as is”.',
      },
      {
        type: 'paragraph',
        text: 'For instance, here the results are [1, 2, 3]:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'Promise.all([\n  new Promise((resolve, reject) => {\n    setTimeout(() => resolve(1), 1000)\n  }),\n  2,\n  3\n]).then(alert); // 1, 2, 3',
        },
      },
      {
        type: 'paragraph',
        text: 'So we are able to pass ready values to Promise.all where convenient.',
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
        text: 'Promise.all rejects as a whole if any promise rejects. That’s good for “all or nothing” cases, when we need all results successful to proceed:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "Promise.all([\n  fetch('/template.html'),\n  fetch('/style.css'),\n  fetch('/data.json')\n]).then(render); // render method needs results of all fetches",
        },
      },
      {
        type: 'paragraph',
        text: 'Promise.allSettled just waits for all promises to settle, regardless of the result. The resulting array has:',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          '{status:"fulfilled", value:result} for successful responses,',
          '{status:"rejected", reason:error} for errors.',
        ],
      },
      {
        type: 'paragraph',
        text: 'For example, we’d like to fetch the information about multiple users. Even if one request fails, we’re still interested in the others.',
      },
      {
        type: 'paragraph',
        text: 'Let’s use Promise.allSettled:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "let urls = [\n  'https://api.github.com/users/iliakan',\n  'https://api.github.com/users/remy',\n  'https://no-such-url'\n];\n\nPromise.allSettled(urls.map(url => fetch(url)))\n  .then(results => { // (*)\n    results.forEach((result, num) => {\n      if (result.status == \"fulfilled\") {\n        alert(`${urls[num]}: ${result.value.status}`);\n      }\n      if (result.status == \"rejected\") {\n        alert(`${urls[num]}: ${result.reason}`);\n      }\n    });\n  });",
        },
      },
      {
        type: 'paragraph',
        text: 'The results in the line (*) above will be:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "[\n  {status: 'fulfilled', value: ...response...},\n  {status: 'fulfilled', value: ...response...},\n  {status: 'rejected', reason: ...error object...}\n]",
        },
      },
      {
        type: 'paragraph',
        text: 'So for each promise we get its status and value/error.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Polyfill',
      },
      {
        type: 'paragraph',
        text: 'If the browser doesn’t support Promise.allSettled, it’s easy to polyfill:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "if (!Promise.allSettled) {\n  const rejectHandler = reason => ({ status: 'rejected', reason });\n\n  const resolveHandler = value => ({ status: 'fulfilled', value });\n\n  Promise.allSettled = function (promises) {\n    const convertedPromises = promises.map(p => Promise.resolve(p).then(resolveHandler, rejectHandler));\n    return Promise.all(convertedPromises);\n  };\n}",
        },
      },
      {
        type: 'paragraph',
        text: 'In this code, promises.map takes input values, turns them into promises (just in case a non-promise was passed) with p =&gt; Promise.resolve(p), and then adds .then handler to every one.',
      },
      {
        type: 'paragraph',
        text: "That handler turns a successful result value into {status:'fulfilled', value}, and an error reason into {status:'rejected', reason}. That’s exactly the format of Promise.allSettled.",
      },
      {
        type: 'paragraph',
        text: 'Now we can use Promise.allSettled to get the results of all given promises, even if some of them reject.',
      },
      {
        type: 'paragraph',
        text: 'Similar to Promise.all, but waits only for the first settled promise and gets its result (or error).',
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
          code: 'let promise = Promise.race(iterable);',
        },
      },
      {
        type: 'paragraph',
        text: 'For instance, here the result will be 1:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'Promise.race([\n  new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),\n  new Promise((resolve, reject) => setTimeout(() => reject(new Error("Whoops!")), 2000)),\n  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))\n]).then(alert); // 1',
        },
      },
      {
        type: 'paragraph',
        text: 'The first promise here was fastest, so it became the result. After the first settled promise “wins the race”, all further results/errors are ignored.',
      },
      {
        type: 'paragraph',
        text: 'Similar to Promise.race, but waits only for the first fulfilled promise and gets its result. If all of the given promises are rejected, then the returned promise is rejected with AggregateError – a special error object that stores all promise errors in its errors property.',
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
          code: 'let promise = Promise.any(iterable);',
        },
      },
      {
        type: 'paragraph',
        text: 'For instance, here the result will be 1:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'Promise.any([\n  new Promise((resolve, reject) => setTimeout(() => reject(new Error("Whoops!")), 1000)),\n  new Promise((resolve, reject) => setTimeout(() => resolve(1), 2000)),\n  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))\n]).then(alert); // 1',
        },
      },
      {
        type: 'paragraph',
        text: 'The first promise here was fastest, but it was rejected, so the second promise became the result. After the first fulfilled promise “wins the race”, all further results are ignored.',
      },
      {
        type: 'paragraph',
        text: 'Here’s an example when all promises fail:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'Promise.any([\n  new Promise((resolve, reject) => setTimeout(() => reject(new Error("Ouch!")), 1000)),\n  new Promise((resolve, reject) => setTimeout(() => reject(new Error("Error!")), 2000))\n]).catch(error => {\n  console.log(error.constructor.name); // AggregateError\n  console.log(error.errors[0]); // Error: Ouch!\n  console.log(error.errors[1]); // Error: Error!\n});',
        },
      },
      {
        type: 'paragraph',
        text: 'As you can see, error objects for failed promises are available in the errors property of the AggregateError object.',
      },
      {
        type: 'paragraph',
        text: 'Methods Promise.resolve and Promise.reject are rarely needed in modern code, because async/await syntax (we’ll cover it a bit later) makes them somewhat obsolete.',
      },
      {
        type: 'paragraph',
        text: 'We cover them here for completeness and for those who can’t use async/await for some reason.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Promise.resolve',
      },
      {
        type: 'paragraph',
        text: 'Promise.resolve(value) creates a resolved promise with the result value.',
      },
      {
        type: 'paragraph',
        text: 'Same as:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'let promise = new Promise(resolve => resolve(value));',
        },
      },
      {
        type: 'paragraph',
        text: 'The method is used for compatibility, when a function is expected to return a promise.',
      },
      {
        type: 'paragraph',
        text: 'For example, the loadCached function below fetches a URL and remembers (caches) its content. For future calls with the same URL it immediately gets the previous content from cache, but uses Promise.resolve to make a promise of it, so the returned value is always a promise:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'let cache = new Map();\n\nfunction loadCached(url) {\n  if (cache.has(url)) {\n    return Promise.resolve(cache.get(url)); // (*)\n  }\n\n  return fetch(url)\n    .then(response => response.text())\n    .then(text => {\n      cache.set(url,text);\n      return text;\n    });\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'We can write loadCached(url).then(…), because the function is guaranteed to return a promise. We can always use .then after loadCached. That’s the purpose of Promise.resolve in the line (*).',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Promise.reject',
      },
      {
        type: 'paragraph',
        text: 'Promise.reject(error) creates a rejected promise with error.',
      },
      {
        type: 'paragraph',
        text: 'Same as:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'let promise = new Promise((resolve, reject) => reject(error));',
        },
      },
      {
        type: 'paragraph',
        text: 'In practice, this method is almost never used.',
      },
      {
        type: 'paragraph',
        text: 'There are 6 static methods of Promise class:',
      },
      {
        type: 'list',
        ordered: true,
        start: 1,
        items: [
          'Promise.all(promises) – waits for all promises to resolve and returns an array of their results. If any of the given promises rejects, it becomes the error of Promise.all, and all other results are ignored.',
          'Promise.allSettled(promises) (recently added method) – waits for all promises to settle and returns their results as an array of objects with: * status: "fulfilled" or "rejected" * value (if fulfilled) or reason (if rejected).',
          'Promise.race(promises) – waits for the first promise to settle, and its result/error becomes the outcome.',
          'Promise.any(promises) (recently added method) – waits for the first promise to fulfill, and its result becomes the outcome. If all of the given promises are rejected, AggregateError becomes the error of Promise.any.',
          'Promise.resolve(value) – makes a resolved promise with the given value.',
          'Promise.reject(error) – makes a rejected promise with the given error.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Of all these, Promise.all is probably the most common in practice.',
      },
      {
        type: 'paragraph',
        text: 'There’s a special syntax to work with promises in a more comfortable fashion, called “async/await”. It’s surprisingly easy to understand and use.',
      },
      {
        type: 'paragraph',
        text: 'Let’s start with the async keyword. It can be placed before a function, like this:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'async function f() {\n  return 1;\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'The word “async” before a function means one simple thing: a function always returns a promise. Other values are wrapped in a resolved promise automatically.',
      },
      {
        type: 'paragraph',
        text: 'For instance, this function returns a resolved promise with the result of 1; let’s test it:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'async function f() {\n  return 1;\n}\n\nf().then(alert); // 1',
        },
      },
      {
        type: 'paragraph',
        text: '…We could explicitly return a promise, which would be the same:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'async function f() {\n  return Promise.resolve(1);\n}\n\nf().then(alert); // 1',
        },
      },
      {
        type: 'paragraph',
        text: 'So, async ensures that the function returns a promise, and wraps non-promises in it. Simple enough, right? But not only that. There’s another keyword, await, that works only inside async functions, and it’s pretty cool.',
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
          code: '// works only inside async functions\nlet value = await promise;',
        },
      },
      {
        type: 'paragraph',
        text: 'The keyword await makes JavaScript wait until that promise settles and returns its result.',
      },
      {
        type: 'paragraph',
        text: 'Here’s an example with a promise that resolves in 1 second:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'async function f() {\n\n  let promise = new Promise((resolve, reject) => {\n    setTimeout(() => resolve("done!"), 1000)\n  });\n\n  let result = await promise; // wait until the promise resolves (*)\n\n  alert(result); // "done!"\n}\n\nf();',
        },
      },
      {
        type: 'paragraph',
        text: 'The function execution “pauses” at the line (*) and resumes when the promise settles, with result becoming its result. So the code above shows “done!” in one second.',
      },
      {
        type: 'paragraph',
        text: 'Let’s emphasize: await literally suspends the function execution until the promise settles, and then resumes it with the promise result. That doesn’t cost any CPU resources, because the JavaScript engine can do other jobs in the meantime: execute other scripts, handle events, etc.',
      },
      {
        type: 'paragraph',
        text: 'It’s just a more elegant syntax of getting the promise result than promise.then. And, it’s easier to read and write.',
      },
      {
        type: 'paragraph',
        text: 'Can’t use await in regular functions',
      },
      {
        type: 'paragraph',
        text: 'If we try to use await in a non-async function, there would be a syntax error:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'function f() {\n  let promise = Promise.resolve(1);\n  let result = await promise; // Syntax error\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'We may get this error if we forget to put async before a function. As stated earlier, await only works inside an async function.',
      },
      {
        type: 'paragraph',
        text: 'Let’s take the showAvatar() example from the chapter Promises chaining and rewrite it using async/await:',
      },
      {
        type: 'list',
        ordered: true,
        start: 1,
        items: [
          'We’ll need to replace .then calls with await.',
          'Also we should make the function async for them to work.',
        ],
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "async function showAvatar() {\n\n  // read our JSON\n  let response = await fetch('/article/promise-chaining/user.json');\n  let user = await response.json();\n\n  // read github user\n  let githubResponse = await fetch(`https://api.github.com/users/${user.name}`);\n  let githubUser = await githubResponse.json();\n\n  // show the avatar\n  let img = document.createElement('img');\n  img.src = githubUser.avatar_url;\n  img.className = \"promise-avatar-example\";\n  document.body.append(img);\n\n  // wait 3 seconds\n  await new Promise((resolve, reject) => setTimeout(resolve, 3000));\n\n  img.remove();\n\n  return githubUser;\n}\n\nshowAvatar();",
        },
      },
      {
        type: 'paragraph',
        text: 'Pretty clean and easy to read, right? Much better than before.',
      },
      {
        type: 'paragraph',
        text: 'Modern browsers allow top-level await in modules',
      },
      {
        type: 'paragraph',
        text: 'In modern browsers, await on top level works just fine, when we’re inside a module. We’ll cover modules in article Modules, introduction.',
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
          code: "// we assume this code runs at top level, inside a module\nlet response = await fetch('/article/promise-chaining/user.json');\nlet user = await response.json();\n\nconsole.log(user);",
        },
      },
      {
        type: 'paragraph',
        text: 'If we’re not using modules, or older browsers must be supported, there’s a universal recipe: wrapping into an anonymous async function.',
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
          code: "(async () => {\n  let response = await fetch('/article/promise-chaining/user.json');\n  let user = await response.json();\n  ...\n})();",
        },
      },
      {
        type: 'paragraph',
        text: 'await accepts “thenables”',
      },
      {
        type: 'paragraph',
        text: 'Like promise.then, await allows us to use thenable objects (those with a callable then method). The idea is that a third-party object may not be a promise, but promise-compatible: if it supports .then, that’s enough to use it with await.',
      },
      {
        type: 'paragraph',
        text: 'Here’s a demo Thenable class; the await below accepts its instances:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'class Thenable {\n  constructor(num) {\n    this.num = num;\n  }\n  then(resolve, reject) {\n    alert(resolve);\n    // resolve with this.num*2 after 1000ms\n    setTimeout(() => resolve(this.num * 2), 1000); // (*)\n  }\n}\n\nasync function f() {\n  // waits for 1 second, then result becomes 2\n  let result = await new Thenable(1);\n  alert(result);\n}\n\nf();',
        },
      },
      {
        type: 'paragraph',
        text: 'If await gets a non-promise object with .then, it calls that method providing the built-in functions resolve and reject as arguments (just as it does for a regular Promise executor). Then await waits until one of them is called (in the example above it happens in the line (*)) and then proceeds with the result.',
      },
      {
        type: 'paragraph',
        text: 'Async class methods',
      },
      {
        type: 'paragraph',
        text: 'To declare an async class method, just prepend it with async:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'class Waiter {\n  async wait() {\n    return await Promise.resolve(1);\n  }\n}\n\nnew Waiter()\n  .wait()\n  .then(alert); // 1 (this is the same as (result => alert(result)))',
        },
      },
      {
        type: 'paragraph',
        text: 'The meaning is the same: it ensures that the returned value is a promise and enables await.',
      },
      {
        type: 'paragraph',
        text: 'If a promise resolves normally, then await promise returns the result. But in the case of a rejection, it throws the error, just as if there were a throw statement at that line.',
      },
      {
        type: 'paragraph',
        text: 'This code:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'async function f() {\n  await Promise.reject(new Error("Whoops!"));\n}',
        },
      },
      {
        type: 'paragraph',
        text: '…is the same as this:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'async function f() {\n  throw new Error("Whoops!");\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'In real situations, the promise may take some time before it rejects. In that case there will be a delay before await throws an error.',
      },
      {
        type: 'paragraph',
        text: 'We can catch that error using try..catch, the same way as a regular throw:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "async function f() {\n\n  try {\n    let response = await fetch('http://no-such-url');\n  } catch(err) {\n    alert(err); // TypeError: failed to fetch\n  }\n}\n\nf();",
        },
      },
      {
        type: 'paragraph',
        text: 'In the case of an error, the control jumps to the catch block. We can also wrap multiple lines:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "async function f() {\n\n  try {\n    let response = await fetch('/no-user-here');\n    let user = await response.json();\n  } catch(err) {\n    // catches errors both in fetch and response.json\n    alert(err);\n  }\n}\n\nf();",
        },
      },
      {
        type: 'paragraph',
        text: 'If we don’t have try..catch, then the promise generated by the call of the async function f() becomes rejected. We can append .catch to handle it:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "async function f() {\n  let response = await fetch('http://no-such-url');\n}\n\n// f() becomes a rejected promise\nf().catch(alert); // TypeError: failed to fetch // (*)",
        },
      },
      {
        type: 'paragraph',
        text: 'If we forget to add .catch there, then we get an unhandled promise error (viewable in the console). We can catch such errors using a global unhandledrejection event handler as described in the chapter Error handling with promises.',
      },
      {
        type: 'paragraph',
        text: 'async/await and promise.then/catch',
      },
      {
        type: 'paragraph',
        text: 'When we use async/await, we rarely need .then, because await handles the waiting for us. And we can use a regular try..catch instead of .catch. That’s usually (but not always) more convenient.',
      },
      {
        type: 'paragraph',
        text: 'But at the top level of the code, when we’re outside any async function, we’re syntactically unable to use await, so it’s a normal practice to add .then/catch to handle the final result or falling-through error, like in the line (*) of the example above.',
      },
      {
        type: 'paragraph',
        text: 'async/await works well with Promise.all',
      },
      {
        type: 'paragraph',
        text: 'When we need to wait for multiple promises, we can wrap them in Promise.all and then await:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '// wait for the array of results\nlet results = await Promise.all([\n  fetch(url1),\n  fetch(url2),\n  ...\n]);',
        },
      },
      {
        type: 'paragraph',
        text: 'In the case of an error, it propagates as usual, from the failed promise to Promise.all, and then becomes an exception that we can catch using try..catch around the call.',
      },
      {
        type: 'paragraph',
        text: 'The async keyword before a function has two effects:',
      },
      {
        type: 'list',
        ordered: true,
        start: 1,
        items: ['Makes it always return a promise.', 'Allows await to be used in it.'],
      },
      {
        type: 'paragraph',
        text: 'The await keyword before a promise makes JavaScript wait until that promise settles, and then:',
      },
      {
        type: 'list',
        ordered: true,
        start: 1,
        items: [
          'If it’s an error, an exception is generated — same as if throw error were called at that very place.',
          'Otherwise, it returns the result.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Together they provide a great framework to write asynchronous code that is easy to both read and write.',
      },
      {
        type: 'paragraph',
        text: 'With async/await we rarely need to write promise.then/catch, but we still shouldn’t forget that they are based on promises, because sometimes (e.g. in the outermost scope) we have to use these methods. Also Promise.all is nice when we are waiting for many tasks simultaneously.',
      },
    ],
  },
} satisfies Record<string, ContentTopic>;
