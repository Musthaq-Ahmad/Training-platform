Quite often we need to perform a similar action in many places of the script.

For example, we need to show a nice-looking message when a visitor logs in, logs out and maybe somewhere else.

Functions are the main “building blocks” of the program. They allow the code to be called many times without repetition.

We’ve already seen examples of built-in functions, like `alert(message)`, `prompt(message, default)` and `confirm(question)`. But we can create functions of our own as well.

## [Function Declaration](#function-declaration)

To create a function we can use a _function declaration_.

It looks like this:

```
function showMessage() {
  alert( 'Hello everyone!' );
}
```

The `function` keyword goes first, then goes the _name of the function_, then a list of _parameters_ between the parentheses (comma-separated, empty in the example above, we’ll see examples later) and finally the code of the function, also named “the function body”, between curly braces.

```
function name(parameter1, parameter2, ... parameterN) {
 // body
}
```

Our new function can be called by its name: `showMessage()`.

For instance:

```
function showMessage() {
  alert( 'Hello everyone!' );
}

showMessage();
showMessage();
```

The call `showMessage()` executes the code of the function. Here we will see the message two times.

This example clearly demonstrates one of the main purposes of functions: to avoid code duplication.

If we ever need to change the message or the way it is shown, it’s enough to modify the code in one place: the function which outputs it.

## [Local variables](#local-variables)

A variable declared inside a function is only visible inside that function.

For example:

```
function showMessage() {
  let message = "Hello, I'm JavaScript!"; // local variable

  alert( message );
}

showMessage(); // Hello, I'm JavaScript!

alert( message ); // <-- Error! The variable is local to the function
```

## [Outer variables](#outer-variables)

A function can access an outer variable as well, for example:

```
let userName = 'John';

function showMessage() {
  let message = 'Hello, ' + userName;
  alert(message);
}

showMessage(); // Hello, John
```

The function has full access to the outer variable. It can modify it as well.

For instance:

```
let userName = 'John';

function showMessage() {
  userName = "Bob"; // (1) changed the outer variable

  let message = 'Hello, ' + userName;
  alert(message);
}

alert( userName ); // John before the function call

showMessage();

alert( userName ); // Bob, the value was modified by the function
```

The outer variable is only used if there’s no local one.

If a same-named variable is declared inside the function then it _shadows_ the outer one. For instance, in the code below the function uses the local `userName`. The outer one is ignored:

```
let userName = 'John';

function showMessage() {
  let userName = "Bob"; // declare a local variable

  let message = 'Hello, ' + userName; // Bob
  alert(message);
}

// the function will create and use its own userName
showMessage();

alert( userName ); // John, unchanged, the function did not access the outer variable
```

Global variables

Variables declared outside of any function, such as the outer `userName` in the code above, are called _global_.

Global variables are visible from any function (unless shadowed by locals).

It’s a good practice to minimize the use of global variables. Modern code has few or no globals. Most variables reside in their functions. Sometimes though, they can be useful to store project-level data.

## [Parameters](#parameters)

We can pass arbitrary data to functions using parameters.

In the example below, the function has two parameters: `from` and `text`.

```
function showMessage(from, text) { // parameters: from, text
  alert(from + ': ' + text);
}

showMessage('Ann', 'Hello!'); // Ann: Hello! (*)
showMessage('Ann', "What's up?"); // Ann: What's up? (**)
```

When the function is called in lines `(*)` and `(**)`, the given values are copied to local variables `from` and `text`. Then the function uses them.

Here’s one more example: we have a variable `from` and pass it to the function. Please note: the function changes `from`, but the change is not seen outside, because a function always gets a copy of the value:

```
function showMessage(from, text) {

  from = '*' + from + '*'; // make "from" look nicer

  alert( from + ': ' + text );
}

let from = "Ann";

showMessage(from, "Hello"); // *Ann*: Hello

// the value of "from" is the same, the function modified a local copy
alert( from ); // Ann
```

When a value is passed as a function parameter, it’s also called an _argument_.

In other words, to put these terms straight:

- A parameter is the variable listed inside the parentheses in the function declaration (it’s a declaration time term).
- An argument is the value that is passed to the function when it is called (it’s a call time term).

We declare functions listing their parameters, then call them passing arguments.

In the example above, one might say: “the function `showMessage` is declared with two parameters, then called with two arguments: `from` and `"Hello"`”.

## [Default values](#default-values)

If a function is called, but an argument is not provided, then the corresponding value becomes `undefined`.

For instance, the aforementioned function `showMessage(from, text)` can be called with a single argument:

```
showMessage("Ann");
```

That’s not an error. Such a call would output `"*Ann*: undefined"`. As the value for `text` isn’t passed, it becomes `undefined`.

We can specify the so-called “default” (to use if omitted) value for a parameter in the function declaration, using `=`:

```
function showMessage(from, text = "no text given") {
  alert( from + ": " + text );
}

showMessage("Ann"); // Ann: no text given
```

Now if the `text` parameter is not passed, it will get the value `"no text given"`.

The default value also jumps in if the parameter exists, but strictly equals `undefined`, like this:

```
showMessage("Ann", undefined); // Ann: no text given
```

Here `"no text given"` is a string, but it can be a more complex expression, which is only evaluated and assigned if the parameter is missing. So, this is also possible:

```
function showMessage(from, text = anotherFunction()) {
  // anotherFunction() only executed if no text given
  // its result becomes the value of text
}
```

Evaluation of default parameters

In JavaScript, a default parameter is evaluated every time the function is called without the respective parameter.

In the example above, `anotherFunction()` isn’t called at all, if the `text` parameter is provided.

On the other hand, it’s independently called every time when `text` is missing.

Default parameters in old JavaScript code

Several years ago, JavaScript didn’t support the syntax for default parameters. So people used other ways to specify them.

Nowadays, we can come across them in old scripts.

For example, an explicit check for `undefined`:

```
function showMessage(from, text) {
  if (text === undefined) {
    text = 'no text given';
  }

  alert( from + ": " + text );
}
```

…Or using the `||` operator:

```
function showMessage(from, text) {
  // If the value of text is falsy, assign the default value
  // this assumes that text == "" is the same as no text at all
  text = text || 'no text given';
  ...
}
```

### [Alternative default parameters](#alternative-default-parameters)

Sometimes it makes sense to assign default values for parameters at a later stage after the function declaration.

We can check if the parameter is passed during the function execution, by comparing it with `undefined`:

```
function showMessage(text) {
  // ...

  if (text === undefined) { // if the parameter is missing
    text = 'empty message';
  }

  alert(text);
}

showMessage(); // empty message
```

…Or we could use the `||` operator:

```
function showMessage(text) {
  // if text is undefined or otherwise falsy, set it to 'empty'
  text = text || 'empty';
  ...
}
```

Modern JavaScript engines support the [nullish coalescing operator](https://javascript.info/nullish-coalescing-operator) `??`, it’s better when most falsy values, such as `0`, should be considered “normal”:

```
function showCount(count) {
  // if count is undefined or null, show "unknown"
  alert(count ?? "unknown");
}

showCount(0); // 0
showCount(null); // unknown
showCount(); // unknown
```

## [Returning a value](#returning-a-value)

A function can return a value back into the calling code as the result.

The simplest example would be a function that sums two values:

```
function sum(a, b) {
  return a + b;
}

let result = sum(1, 2);
alert( result ); // 3
```

The directive `return` can be in any place of the function. When the execution reaches it, the function stops, and the value is returned to the calling code (assigned to `result` above).

There may be many occurrences of `return` in a single function. For instance:

```
function checkAge(age) {
  if (age >= 18) {
    return true;
  } else {
    return confirm('Do you have permission from your parents?');
  }
}

let age = prompt('How old are you?', 18);

if ( checkAge(age) ) {
  alert( 'Access granted' );
} else {
  alert( 'Access denied' );
}
```

It is possible to use `return` without a value. That causes the function to exit immediately.

For example:

```
function showMovie(age) {
  if ( !checkAge(age) ) {
    return;
  }

  alert( "Showing you the movie" ); // (*)
  // ...
}
```

In the code above, if `checkAge(age)` returns `false`, then `showMovie` won’t proceed to the `alert`.

A function with an empty `return` or without it returns `undefined`

If a function does not return a value, it is the same as if it returns `undefined`:

```
function doNothing() { /* empty */ }

alert( doNothing() === undefined ); // true
```

An empty `return` is also the same as `return undefined`:

```
function doNothing() {
  return;
}

alert( doNothing() === undefined ); // true
```

Never add a newline between `return` and the value

For a long expression in `return`, it might be tempting to put it on a separate line, like this:

```
return
 (some + long + expression + or + whatever * f(a) + f(b))
```

That doesn’t work, because JavaScript assumes a semicolon after `return`. That’ll work the same as:

```
return;
 (some + long + expression + or + whatever * f(a) + f(b))
```

So, it effectively becomes an empty return.

If we want the returned expression to wrap across multiple lines, we should start it at the same line as `return`. Or at least put the opening parentheses there as follows:

```
return (
  some + long + expression
  + or +
  whatever * f(a) + f(b)
  )
```

And it will work just as we expect it to.

## [Naming a function](#function-naming)

Functions are actions. So their name is usually a verb. It should be brief, as accurate as possible and describe what the function does, so that someone reading the code gets an indication of what the function does.

It is a widespread practice to start a function with a verbal prefix which vaguely describes the action. There must be an agreement within the team on the meaning of the prefixes.

For instance, functions that start with `"show"` usually show something.

Function starting with…

- `"get…"` – return a value,
- `"calc…"` – calculate something,
- `"create…"` – create something,
- `"check…"` – check something and return a boolean, etc.

Examples of such names:

```
showMessage(..)     // shows a message
getAge(..)          // returns the age (gets it somehow)
calcSum(..)         // calculates a sum and returns the result
createForm(..)      // creates a form (and usually returns it)
checkPermission(..) // checks a permission, returns true/false
```

With prefixes in place, a glance at a function name gives an understanding what kind of work it does and what kind of value it returns.

One function – one action

A function should do exactly what is suggested by its name, no more.

Two independent actions usually deserve two functions, even if they are usually called together (in that case we can make a 3rd function that calls those two).

A few examples of breaking this rule:

- `getAge` – would be bad if it shows an `alert` with the age (should only get).
- `createForm` – would be bad if it modifies the document, adding a form to it (should only create it and return).
- `checkPermission` – would be bad if it displays the `access granted/denied` message (should only perform the check and return the result).

These examples assume common meanings of prefixes. You and your team are free to agree on other meanings, but usually they’re not much different. In any case, you should have a firm understanding of what a prefix means, what a prefixed function can and cannot do. All same-prefixed functions should obey the rules. And the team should share the knowledge.

Ultrashort function names

Functions that are used _very often_ sometimes have ultrashort names.

For example, the [jQuery](https://jquery.com/) framework defines a function with `$`. The [Lodash](https://lodash.com/) library has its core function named `_`.

These are exceptions. Generally function names should be concise and descriptive.

## [Functions == Comments](#functions-comments)

Functions should be short and do exactly one thing. If that thing is big, maybe it’s worth it to split the function into a few smaller functions. Sometimes following this rule may not be that easy, but it’s definitely a good thing.

A separate function is not only easier to test and debug – its very existence is a great comment!

For instance, compare the two functions `showPrimes(n)` below. Each one outputs [prime numbers](https://en.wikipedia.org/wiki/Prime_number) up to `n`.

The first variant uses a label:

```
function showPrimes(n) {
  nextPrime: for (let i = 2; i < n; i++) {

    for (let j = 2; j < i; j++) {
      if (i % j == 0) continue nextPrime;
    }

    alert( i ); // a prime
  }
}
```

The second variant uses an additional function `isPrime(n)` to test for primality:

```
function showPrimes(n) {

  for (let i = 2; i < n; i++) {
    if (!isPrime(i)) continue;

    alert(i);  // a prime
  }
}

function isPrime(n) {
  for (let i = 2; i < n; i++) {
    if ( n % i == 0) return false;
  }
  return true;
}
```

The second variant is easier to understand, isn’t it? Instead of the code piece we see a name of the action (`isPrime`). Sometimes people refer to such code as _self-describing_.

So, functions can be created even if we don’t intend to reuse them. They structure the code and make it readable.

## [Summary](#summary)

A function declaration looks like this:

```
function name(parameters, delimited, by, comma) {
  /* code */
}
```

- Values passed to a function as parameters are copied to its local variables.
- A function may access outer variables. But it works only from inside out. The code outside of the function doesn’t see its local variables.
- A function can return a value. If it doesn’t, then its result is `undefined`.

To make the code clean and easy to understand, it’s recommended to use mainly local variables and parameters in the function, not outer variables.

It is always easier to understand a function which gets parameters, works with them and returns a result than a function which gets no parameters, but modifies outer variables as a side effect.

Function naming:

- A name should clearly describe what the function does. When we see a function call in the code, a good name instantly gives us an understanding what it does and returns.
- A function is an action, so function names are usually verbal.
- There exist many well-known function prefixes like `create…`, `show…`, `get…`, `check…` and so on. Use them to hint what a function does.

Functions are the main building blocks of scripts. Now we’ve covered the basics, so we actually can start creating and using them. But that’s only the beginning of the path. We are going to return to them many times, going more deeply into their advanced features.

---

In JavaScript, a function is not a “magical language structure”, but a special kind of value.

The syntax that we used before is called a _Function Declaration_:

```
function sayHi() {
  alert( "Hello" );
}
```

There is another syntax for creating a function that is called a _Function Expression_.

It allows us to create a new function in the middle of any expression.

For example:

```
let sayHi = function() {
  alert( "Hello" );
};
```

Here we can see a variable `sayHi` getting a value, the new function, created as `function() { alert("Hello"); }`.

As the function creation happens in the context of the assignment expression (to the right side of `=`), this is a _Function Expression_.

Please note, there’s no name after the `function` keyword. Omitting a name is allowed for Function Expressions.

Here we immediately assign it to the variable, so the meaning of these code samples is the same: “create a function and put it into the variable `sayHi`”.

In more advanced situations, that we’ll come across later, a function may be created and immediately called or scheduled for a later execution, not stored anywhere, thus remaining anonymous.

## [Function is a value](#function-is-a-value)

Let’s reiterate: no matter how the function is created, a function is a value. Both examples above store a function in the `sayHi` variable.

We can even print out that value using `alert`:

```
function sayHi() {
  alert( "Hello" );
}

alert( sayHi ); // shows the function code
```

Please note that the last line does not run the function, because there are no parentheses after `sayHi`. There are programming languages where any mention of a function name causes its execution, but JavaScript is not like that.

In JavaScript, a function is a value, so we can deal with it as a value. The code above shows its string representation, which is the source code.

Surely, a function is a special value, in the sense that we can call it like `sayHi()`.

But it’s still a value. So we can work with it like with other kinds of values.

We can copy a function to another variable:

```
function sayHi() {   // (1) create
  alert( "Hello" );
}

let func = sayHi;    // (2) copy

func(); // Hello     // (3) run the copy (it works)!
sayHi(); // Hello    //     this still works too (why wouldn't it)
```

Here’s what happens above in detail:

1.  The Function Declaration `(1)` creates the function and puts it into the variable named `sayHi`.
2.  Line `(2)` copies it into the variable `func`. Please note again: there are no parentheses after `sayHi`. If there were, then `func = sayHi()` would write _the result of the call_ `sayHi()` into `func`, not _the function_ `sayHi` itself.
3.  Now the function can be called as both `sayHi()` and `func()`.

We could also have used a Function Expression to declare `sayHi`, in the first line:

```
let sayHi = function() { // (1) create
  alert( "Hello" );
};

let func = sayHi;  //(2)
// ...
```

Everything would work the same.

Why is there a semicolon at the end?

You might wonder, why do Function Expressions have a semicolon `;` at the end, but Function Declarations do not:

```
function sayHi() {
  // ...
}

let sayHi = function() {
  // ...
};
```

The answer is simple: a Function Expression is created here as `function(…) {…}` inside the assignment statement: `let sayHi = …;`. The semicolon `;` is recommended at the end of the statement, it’s not a part of the function syntax.

The semicolon would be there for a simpler assignment, such as `let sayHi = 5;`, and it’s also there for a function assignment.

## [Callback functions](#callback-functions)

Let’s look at more examples of passing functions as values and using function expressions.

We’ll write a function `ask(question, yes, no)` with three parameters:

`question`

Text of the question

`yes`

Function to run if the answer is “Yes”

`no`

Function to run if the answer is “No”

The function should ask the `question` and, depending on the user’s answer, call `yes()` or `no()`:

```
function ask(question, yes, no) {
  if (confirm(question)) yes()
  else no();
}

function showOk() {
  alert( "You agreed." );
}

function showCancel() {
  alert( "You canceled the execution." );
}

// usage: functions showOk, showCancel are passed as arguments to ask
ask("Do you agree?", showOk, showCancel);
```

In practice, such functions are quite useful. The major difference between a real-life `ask` and the example above is that real-life functions use more complex ways to interact with the user than a simple `confirm`. In the browser, such functions usually draw a nice-looking question window. But that’s another story.

**The arguments `showOk` and `showCancel` of `ask` are called _callback functions_ or just _callbacks_.**

The idea is that we pass a function and expect it to be “called back” later if necessary. In our case, `showOk` becomes the callback for “yes” answer, and `showCancel` for “no” answer.

We can use Function Expressions to write an equivalent, shorter function:

```
function ask(question, yes, no) {
  if (confirm(question)) yes()
  else no();
}

ask(
  "Do you agree?",
  function() { alert("You agreed."); },
  function() { alert("You canceled the execution."); }
);
```

Here, functions are declared right inside the `ask(...)` call. They have no name, and so are called _anonymous_. Such functions are not accessible outside of `ask` (because they are not assigned to variables), but that’s just what we want here.

Such code appears in our scripts very naturally, it’s in the spirit of JavaScript.

A function is a value representing an “action”

Regular values like strings or numbers represent the _data_.

A function can be perceived as an _action_.

We can pass it between variables and run when we want.

## [Function Expression vs Function Declaration](#function-expression-vs-function-declaration)

Let’s formulate the key differences between Function Declarations and Expressions.

First, the syntax: how to differentiate between them in the code.

- _Function Declaration:_ a function, declared as a separate statement, in the main code flow:

  ```
  // Function Declaration
  function sum(a, b) {
    return a + b;
  }
  ```

- _Function Expression:_ a function, created inside an expression or inside another syntax construct. Here, the function is created on the right side of the “assignment expression” `=`:

  ```
  // Function Expression
  let sum = function(a, b) {
    return a + b;
  };
  ```

The more subtle difference is _when_ a function is created by the JavaScript engine.

**A Function Expression is created when the execution reaches it and is usable only from that moment.**

Once the execution flow passes to the right side of the assignment `let sum = function…` – here we go, the function is created and can be used (assigned, called, etc. ) from now on.

Function Declarations are different.

**A Function Declaration can be called earlier than it is defined.**

For example, a global Function Declaration is visible in the whole script, no matter where it is.

That’s due to internal algorithms. When JavaScript prepares to run the script, it first looks for global Function Declarations in it and creates the functions. We can think of it as an “initialization stage”.

And after all Function Declarations are processed, the code is executed. So it has access to these functions.

For example, this works:

```
sayHi("John"); // Hello, John

function sayHi(name) {
  alert( `Hello, ${name}` );
}
```

The Function Declaration `sayHi` is created when JavaScript is preparing to start the script and is visible everywhere in it.

…If it were a Function Expression, then it wouldn’t work:

```
sayHi("John"); // error!

let sayHi = function(name) {  // (*) no magic any more
  alert( `Hello, ${name}` );
};
```

Function Expressions are created when the execution reaches them. That would happen only in the line `(*)`. Too late.

Another special feature of Function Declarations is their block scope.

**In strict mode, when a Function Declaration is within a code block, it’s visible everywhere inside that block. But not outside of it.**

For instance, let’s imagine that we need to declare a function `welcome()` depending on the `age` variable that we get during runtime. And then we plan to use it some time later.

If we use Function Declaration, it won’t work as intended:

```
let age = prompt("What is your age?", 18);

// conditionally declare a function
if (age < 18) {

  function welcome() {
    alert("Hello!");
  }

} else {

  function welcome() {
    alert("Greetings!");
  }

}

// ...use it later
welcome(); // Error: welcome is not defined
```

That’s because a Function Declaration is only visible inside the code block in which it resides.

Here’s another example:

```
let age = 16; // take 16 as an example

if (age < 18) {
  welcome();               // \   (runs)
                           //  |
  function welcome() {     //  |
    alert("Hello!");       //  |  Function Declaration is available
  }                        //  |  everywhere in the block where it's declared
                           //  |
  welcome();               // /   (runs)

} else {

  function welcome() {
    alert("Greetings!");
  }
}

// Here we're out of curly braces,
// so we can not see Function Declarations made inside of them.

welcome(); // Error: welcome is not defined
```

What can we do to make `welcome` visible outside of `if`?

The correct approach would be to use a Function Expression and assign `welcome` to the variable that is declared outside of `if` and has the proper visibility.

This code works as intended:

```
let age = prompt("What is your age?", 18);

let welcome;

if (age < 18) {

  welcome = function() {
    alert("Hello!");
  };

} else {

  welcome = function() {
    alert("Greetings!");
  };

}

welcome(); // ok now
```

Or we could simplify it even further using a question mark operator `?`:

```
let age = prompt("What is your age?", 18);

let welcome = (age < 18) ?
  function() { alert("Hello!"); } :
  function() { alert("Greetings!"); };

welcome(); // ok now
```

When to choose Function Declaration versus Function Expression?

As a rule of thumb, when we need to declare a function, the first thing to consider is Function Declaration syntax. It gives more freedom in how to organize our code, because we can call such functions before they are declared.

That’s also better for readability, as it’s easier to look up `function f(…) {…}` in the code than `let f = function(…) {…};`. Function Declarations are more “eye-catching”.

…But if a Function Declaration does not suit us for some reason, or we need a conditional declaration (we’ve just seen an example), then Function Expression should be used.

## [Summary](#summary)

- Functions are values. They can be assigned, copied or declared in any place of the code.
- If the function is declared as a separate statement in the main code flow, that’s called a “Function Declaration”.
- If the function is created as a part of an expression, it’s called a “Function Expression”.
- Function Declarations are processed before the code block is executed. They are visible everywhere in the block.
- Function Expressions are created when the execution flow reaches them.

In most cases when we need to declare a function, a Function Declaration is preferable, because it is visible prior to the declaration itself. That gives us more flexibility in code organization, and is usually more readable.

So we should use a Function Expression only when a Function Declaration is not fit for the task. We’ve seen a couple of examples of that in this chapter, and will see more in the future.

---

There’s another very simple and concise syntax for creating functions, that’s often better than Function Expressions.

It’s called “arrow functions”, because it looks like this:

```
let func = (arg1, arg2, ..., argN) => expression;
```

This creates a function `func` that accepts arguments `arg1..argN`, then evaluates the `expression` on the right side with their use and returns its result.

In other words, it’s the shorter version of:

```
let func = function(arg1, arg2, ..., argN) {
  return expression;
};
```

Let’s see a concrete example:

```
let sum = (a, b) => a + b;

/* This arrow function is a shorter form of:

let sum = function(a, b) {
  return a + b;
};
*/

alert( sum(1, 2) ); // 3
```

As you can see, `(a, b) => a + b` means a function that accepts two arguments named `a` and `b`. Upon the execution, it evaluates the expression `a + b` and returns the result.

- If we have only one argument, then parentheses around parameters can be omitted, making that even shorter.

  For example:

  ```
  let double = n => n * 2;
  // roughly the same as: let double = function(n) { return n * 2 }

  alert( double(3) ); // 6
  ```

- If there are no arguments, parentheses are empty, but they must be present:

  ```
  let sayHi = () => alert("Hello!");

  sayHi();
  ```

Arrow functions can be used in the same way as Function Expressions.

For instance, to dynamically create a function:

```
let age = prompt("What is your age?", 18);

let welcome = (age < 18) ?
  () => alert('Hello!') :
  () => alert("Greetings!");

welcome();
```

Arrow functions may appear unfamiliar and not very readable at first, but that quickly changes as the eyes get used to the structure.

They are very convenient for simple one-line actions, when we’re just too lazy to write many words.

## [Multiline arrow functions](#multiline-arrow-functions)

The arrow functions that we’ve seen so far were very simple. They took arguments from the left of `=>`, evaluated and returned the right-side expression with them.

Sometimes we need a more complex function, with multiple expressions and statements. In that case, we can enclose them in curly braces. The major difference is that curly braces require a `return` within them to return a value (just like a regular function does).

Like this:

```
let sum = (a, b) => {  // the curly brace opens a multiline function
  let result = a + b;
  return result; // if we use curly braces, then we need an explicit "return"
};

alert( sum(1, 2) ); // 3
```

More to come

Here we praised arrow functions for brevity. But that’s not all!

Arrow functions have other interesting features.

To study them in-depth, we first need to get to know some other aspects of JavaScript, so we’ll return to arrow functions later in the chapter [Arrow functions revisited](https://javascript.info/arrow-functions).

For now, we can already use arrow functions for one-line actions and callbacks.

## [Summary](#summary)

Arrow functions are handy for simple actions, especially for one-liners. They come in two flavors:

1.  Without curly braces: `(...args) => expression` – the right side is an expression: the function evaluates it and returns the result. Parentheses can be omitted, if there’s only a single argument, e.g. `n => n*2`.
2.  With curly braces: `(...args) => { body }` – brackets allow us to write multiple statements inside the function, but we need an explicit `return` to return something.

## [Tasks](#tasks)

Replace Function Expressions with arrow functions in the code below:

```
function ask(question, yes, no) {
  if (confirm(question)) yes();
  else no();
}

ask(
  "Do you agree?",
  function() { alert("You agreed."); },
  function() { alert("You canceled the execution."); }
);
```

```
function ask(question, yes, no) {
  if (confirm(question)) yes();
  else no();
}

ask(
  "Do you agree?",
  () => alert("You agreed."),
  () => alert("You canceled the execution.")
);
```

Looks short and clean, right?

---

JavaScript is a very function-oriented language. It gives us a lot of freedom. A function can be created at any moment, passed as an argument to another function, and then called from a totally different place of code later.

We already know that a function can access variables outside of it (“outer” variables).

But what happens if outer variables change since a function is created? Will the function get newer values or the old ones?

And what if a function is passed along as an argument and called from another place of code, will it get access to outer variables at the new place?

Let’s expand our knowledge to understand these scenarios and more complex ones.

We’ll talk about `let/const` variables here

In JavaScript, there are 3 ways to declare a variable: `let`, `const` (the modern ones), and `var` (the remnant of the past).

- In this article we’ll use `let` variables in examples.
- Variables, declared with `const`, behave the same, so this article is about `const` too.
- The old `var` has some notable differences, they will be covered in the article [The old "var"](https://javascript.info/var).

## [Code blocks](#code-blocks)

If a variable is declared inside a code block `{...}`, it’s only visible inside that block.

For example:

```
{
  // do some job with local variables that should not be seen outside

  let message = "Hello"; // only visible in this block

  alert(message); // Hello
}

alert(message); // Error: message is not defined
```

We can use this to isolate a piece of code that does its own task, with variables that only belong to it:

```
{
  // show message
  let message = "Hello";
  alert(message);
}

{
  // show another message
  let message = "Goodbye";
  alert(message);
}
```

There’d be an error without blocks

Please note, without separate blocks there would be an error, if we use `let` with the existing variable name:

```
// show message
let message = "Hello";
alert(message);

// show another message
let message = "Goodbye"; // Error: variable already declared
alert(message);
```

For `if`, `for`, `while` and so on, variables declared in `{...}` are also only visible inside:

```
if (true) {
  let phrase = "Hello!";

  alert(phrase); // Hello!
}

alert(phrase); // Error, no such variable!
```

Here, after `if` finishes, the `alert` below won’t see the `phrase`, hence the error.

That’s great, as it allows us to create block-local variables, specific to an `if` branch.

The similar thing holds true for `for` and `while` loops:

```
for (let i = 0; i < 3; i++) {
  // the variable i is only visible inside this for
  alert(i); // 0, then 1, then 2
}

alert(i); // Error, no such variable
```

Visually, `let i` is outside of `{...}`. But the `for` construct is special here: the variable, declared inside it, is considered a part of the block.

## [Nested functions](#nested-functions)

A function is called “nested” when it is created inside another function.

It is easily possible to do this with JavaScript.

We can use it to organize our code, like this:

```
function sayHiBye(firstName, lastName) {

  // helper nested function to use below
  function getFullName() {
    return firstName + " " + lastName;
  }

  alert( "Hello, " + getFullName() );
  alert( "Bye, " + getFullName() );

}
```

Here the _nested_ function `getFullName()` is made for convenience. It can access the outer variables and so can return the full name. Nested functions are quite common in JavaScript.

What’s much more interesting, a nested function can be returned: either as a property of a new object or as a result by itself. It can then be used somewhere else. No matter where, it still has access to the same outer variables.

Below, `makeCounter` creates the “counter” function that returns the next number on each invocation:

```
function makeCounter() {
  let count = 0;

  return function() {
    return count++;
  };
}

let counter = makeCounter();

alert( counter() ); // 0
alert( counter() ); // 1
alert( counter() ); // 2
```

Despite being simple, slightly modified variants of that code have practical uses, for instance, as a [random number generator](https://en.wikipedia.org/wiki/Pseudorandom_number_generator) to generate random values for automated tests.

How does this work? If we create multiple counters, will they be independent? What’s going on with the variables here?

Understanding such things is great for the overall knowledge of JavaScript and beneficial for more complex scenarios. So let’s go a bit in-depth.

## [Lexical Environment](#lexical-environment)

Here be dragons!

The in-depth technical explanation lies ahead.

As far as I’d like to avoid low-level language details, any understanding without them would be lacking and incomplete, so get ready.

For clarity, the explanation is split into multiple steps.

### [Step 1. Variables](#step-1-variables)

In JavaScript, every running function, code block `{...}`, and the script as a whole have an internal (hidden) associated object known as the _Lexical Environment_.

The Lexical Environment object consists of two parts:

1.  _Environment Record_ – an object that stores all local variables as its properties (and some other information like the value of `this`).
2.  A reference to the _outer lexical environment_, the one associated with the outer code.

**A “variable” is just a property of the special internal object, `Environment Record`. “To get or change a variable” means “to get or change a property of that object”.**

In this simple code without functions, there is only one Lexical Environment:

This is the so-called _global_ Lexical Environment, associated with the whole script.

On the picture above, the rectangle means Environment Record (variable store) and the arrow means the outer reference. The global Lexical Environment has no outer reference, that’s why the arrow points to `null`.

As the code starts executing and goes on, the Lexical Environment changes.

Here’s a little bit longer code:

Rectangles on the right-hand side demonstrate how the global Lexical Environment changes during the execution:

1.  When the script starts, the Lexical Environment is pre-populated with all declared variables.
    - Initially, they are in the “Uninitialized” state. That’s a special internal state, it means that the engine knows about the variable, but it cannot be referenced until it has been declared with `let`. It’s almost the same as if the variable didn’t exist.
2.  Then `let phrase` definition appears. There’s no assignment yet, so its value is `undefined`. We can use the variable from this point forward.
3.  `phrase` is assigned a value.
4.  `phrase` changes the value.

Everything looks simple for now, right?

- A variable is a property of a special internal object, associated with the currently executing block/function/script.
- Working with variables is actually working with the properties of that object.

Lexical Environment is a specification object

“Lexical Environment” is a specification object: it only exists “theoretically” in the [language specification](https://tc39.es/ecma262/#sec-lexical-environments) to describe how things work. We can’t get this object in our code and manipulate it directly.

JavaScript engines also may optimize it, discard variables that are unused to save memory and perform other internal tricks, as long as the visible behavior remains as described.

### [Step 2. Function Declarations](#step-2-function-declarations)

A function is also a value, like a variable.

**The difference is that a Function Declaration is instantly fully initialized.**

When a Lexical Environment is created, a Function Declaration immediately becomes a ready-to-use function (unlike `let`, that is unusable till the declaration).

That’s why we can use a function, declared as Function Declaration, even before the declaration itself.

For example, here’s the initial state of the global Lexical Environment when we add a function:

Naturally, this behavior only applies to Function Declarations, not Function Expressions where we assign a function to a variable, such as `let say = function(name)...`.

### [Step 3. Inner and outer Lexical Environment](#step-3-inner-and-outer-lexical-environment)

When a function runs, at the beginning of the call, a new Lexical Environment is created automatically to store local variables and parameters of the call.

For instance, for `say("John")`, it looks like this (the execution is at the line, labelled with an arrow):

During the function call we have two Lexical Environments: the inner one (for the function call) and the outer one (global):

- The inner Lexical Environment corresponds to the current execution of `say`. It has a single property: `name`, the function argument. We called `say("John")`, so the value of the `name` is `"John"`.
- The outer Lexical Environment is the global Lexical Environment. It has the `phrase` variable and the function itself.

The inner Lexical Environment has a reference to the `outer` one.

**When the code wants to access a variable – the inner Lexical Environment is searched first, then the outer one, then the more outer one and so on until the global one.**

If a variable is not found anywhere, that’s an error in strict mode (without `use strict`, an assignment to a non-existing variable creates a new global variable, for compatibility with old code).

In this example the search proceeds as follows:

- For the `name` variable, the `alert` inside `say` finds it immediately in the inner Lexical Environment.
- When it wants to access `phrase`, then there is no `phrase` locally, so it follows the reference to the outer Lexical Environment and finds it there.

### [Step 4. Returning a function](#step-4-returning-a-function)

Let’s return to the `makeCounter` example.

```
function makeCounter() {
  let count = 0;

  return function() {
    return count++;
  };
}

let counter = makeCounter();
```

At the beginning of each `makeCounter()` call, a new Lexical Environment object is created, to store variables for this `makeCounter` run.

So we have two nested Lexical Environments, just like in the example above:

What’s different is that, during the execution of `makeCounter()`, a tiny nested function is created of only one line: `return count++`. We don’t run it yet, only create.

All functions remember the Lexical Environment in which they were made. Technically, there’s no magic here: all functions have the hidden property named `[[Environment]]`, that keeps the reference to the Lexical Environment where the function was created:

So, `counter.[[Environment]]` has the reference to `{count: 0}` Lexical Environment. That’s how the function remembers where it was created, no matter where it’s called. The `[[Environment]]` reference is set once and forever at function creation time.

Later, when `counter()` is called, a new Lexical Environment is created for the call, and its outer Lexical Environment reference is taken from `counter.[[Environment]]`:

Now when the code inside `counter()` looks for `count` variable, it first searches its own Lexical Environment (empty, as there are no local variables there), then the Lexical Environment of the outer `makeCounter()` call, where it finds and changes it.

**A variable is updated in the Lexical Environment where it lives.**

Here’s the state after the execution:

If we call `counter()` multiple times, the `count` variable will be increased to `2`, `3` and so on, at the same place.

Closure

There is a general programming term “closure”, that developers generally should know.

A [closure](<https://en.wikipedia.org/wiki/Closure_(computer_programming)>) is a function that remembers its outer variables and can access them. In some languages, that’s not possible, or a function should be written in a special way to make it happen. But as explained above, in JavaScript, all functions are naturally closures (there is only one exception, to be covered in [The "new Function" syntax](https://javascript.info/new-function)).

That is: they automatically remember where they were created using a hidden `[[Environment]]` property, and then their code can access outer variables.

When on an interview, a frontend developer gets a question about “what’s a closure?”, a valid answer would be a definition of the closure and an explanation that all functions in JavaScript are closures, and maybe a few more words about technical details: the `[[Environment]]` property and how Lexical Environments work.

## [Garbage collection](#garbage-collection)

Usually, a Lexical Environment is removed from memory with all the variables after the function call finishes. That’s because there are no references to it. As any JavaScript object, it’s only kept in memory while it’s reachable.

However, if there’s a nested function that is still reachable after the end of a function, then it has `[[Environment]]` property that references the lexical environment.

In that case the Lexical Environment is still reachable even after the completion of the function, so it stays alive.

For example:

```
function f() {
  let value = 123;

  return function() {
    alert(value);
  }
}

let g = f(); // g.[[Environment]] stores a reference to the Lexical Environment
// of the corresponding f() call
```

Please note that if `f()` is called many times, and resulting functions are saved, then all corresponding Lexical Environment objects will also be retained in memory. In the code below, all 3 of them:

```
function f() {
  let value = Math.random();

  return function() { alert(value); };
}

// 3 functions in array, every one of them links to Lexical Environment
// from the corresponding f() run
let arr = [f(), f(), f()];
```

A Lexical Environment object dies when it becomes unreachable (just like any other object). In other words, it exists only while there’s at least one nested function referencing it.

In the code below, after the nested function is removed, its enclosing Lexical Environment (and hence the `value`) is cleaned from memory:

```
function f() {
  let value = 123;

  return function() {
    alert(value);
  }
}

let g = f(); // while g function exists, the value stays in memory

g = null; // ...and now the memory is cleaned up
```

### [Real-life optimizations](#real-life-optimizations)

As we’ve seen, in theory while a function is alive, all outer variables are also retained.

But in practice, JavaScript engines try to optimize that. They analyze variable usage and if it’s obvious from the code that an outer variable is not used – it is removed.

**An important side effect in V8 (Chrome, Edge, Opera) is that such variable will become unavailable in debugging.**

Try running the example below in Chrome with the Developer Tools open.

When it pauses, in the console type `alert(value)`.

```
function f() {
  let value = Math.random();

  function g() {
    debugger; // in console: type alert(value); No such variable!
  }

  return g;
}

let g = f();
g();
```

As you could see – there is no such variable! In theory, it should be accessible, but the engine optimized it out.

That may lead to funny (if not such time-consuming) debugging issues. One of them – we can see a same-named outer variable instead of the expected one:

```
let value = "Surprise!";

function f() {
  let value = "the closest value";

  function g() {
    debugger; // in console: type alert(value); Surprise!
  }

  return g;
}

let g = f();
g();
```

This feature of V8 is good to know. If you are debugging with Chrome/Edge/Opera, sooner or later you will meet it.

That is not a bug in the debugger, but rather a special feature of V8. Perhaps it will be changed sometime. You can always check for it by running the examples on this page.
