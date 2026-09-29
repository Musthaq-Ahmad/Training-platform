import type { ContentTopic } from '../../../types';

export const jsClassesTopics = {
  'js-classes': {
    id: 'js-classes',
    heading: 'The “class” syntax',
    blocks: [
      {
        type: 'paragraph',
        text: 'The basic syntax is:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'class MyClass {\n  // class methods\n  constructor() { ... }\n  method1() { ... }\n  method2() { ... }\n  method3() { ... }\n  ...\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'Then use new MyClass() to create a new object with all the listed methods.',
      },
      {
        type: 'paragraph',
        text: 'The constructor() method is called automatically by new, so we can initialize the object there.',
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
          code: 'class User {\n\n  constructor(name) {\n    this.name = name;\n  }\n\n  sayHi() {\n    alert(this.name);\n  }\n\n}\n\n// Usage:\nlet user = new User("John");\nuser.sayHi();',
        },
      },
      {
        type: 'paragraph',
        text: 'When new User("John") is called:',
      },
      {
        type: 'list',
        ordered: true,
        items: [
          'A new object is created.',
          'The constructor runs with the given argument and assigns it to this.name.',
        ],
      },
      {
        type: 'paragraph',
        text: '…Then we can call object methods, such as user.sayHi().',
      },
      {
        type: 'paragraph',
        text: 'No comma between class methods',
      },
      {
        type: 'paragraph',
        text: 'A common pitfall for novice developers is to put a comma between class methods, which would result in a syntax error.',
      },
      {
        type: 'paragraph',
        text: 'The notation here is not to be confused with object literals. Within the class, no commas are required.',
      },
      {
        type: 'paragraph',
        text: 'So, what exactly is a class? That’s not an entirely new language-level entity, as one might think.',
      },
      {
        type: 'paragraph',
        text: 'Let’s unveil any magic and see what a class really is. That’ll help in understanding many complex aspects.',
      },
      {
        type: 'paragraph',
        text: 'In JavaScript, a class is a kind of function.',
      },
      {
        type: 'paragraph',
        text: 'Here, take a look:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'class User {\n  constructor(name) { this.name = name; }\n  sayHi() { alert(this.name); }\n}\n\n// proof: User is a function\nalert(typeof User); // function',
        },
      },
      {
        type: 'paragraph',
        text: 'What class User {...} construct really does is:',
      },
      {
        type: 'list',
        ordered: true,
        items: [
          'Creates a function named User, that becomes the result of the class declaration. The function code is taken from the constructor method (assumed empty if we don’t write such method).',
          'Stores class methods, such as sayHi, in User.prototype.',
        ],
      },
      {
        type: 'paragraph',
        text: 'After new User object is created, when we call its method, it’s taken from the prototype, just as described in the chapter F.prototype. So the object has access to class methods.',
      },
      {
        type: 'paragraph',
        text: 'We can illustrate the result of class User declaration as:',
      },
      {
        type: 'paragraph',
        text: 'Here’s the code to introspect it:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'class User {\n  constructor(name) { this.name = name; }\n  sayHi() { alert(this.name); }\n}\n\n// class is a function\nalert(typeof User); // function\n\n// ...or, more precisely, the constructor method\nalert(User === User.prototype.constructor); // true\n\n// The methods are in User.prototype, e.g:\nalert(User.prototype.sayHi); // the code of the sayHi method\n\n// there are exactly two methods in the prototype\nalert(Object.getOwnPropertyNames(User.prototype)); // constructor, sayHi',
        },
      },
      {
        type: 'paragraph',
        text: 'Sometimes people say that class is a “syntactic sugar” (syntax that is designed to make things easier to read, but doesn’t introduce anything new), because we could actually declare the same thing without using the class keyword at all:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '// rewriting class User in pure functions\n\n// 1. Create constructor function\nfunction User(name) {\n  this.name = name;\n}\n// a function prototype has "constructor" property by default,\n// so we don\'t need to create it\n\n// 2. Add the method to prototype\nUser.prototype.sayHi = function() {\n  alert(this.name);\n};\n\n// Usage:\nlet user = new User("John");\nuser.sayHi();',
        },
      },
      {
        type: 'paragraph',
        text: 'The result of this definition is about the same. So, there are indeed reasons why class can be considered a syntactic sugar to define a constructor together with its prototype methods.',
      },
      {
        type: 'paragraph',
        text: 'Still, there are important differences.',
      },
      {
        type: 'list',
        ordered: true,
        items: [
          "First, a function created by class is labelled by a special internal property [[IsClassConstructor]]: true. So it’s not entirely the same as creating it manually. The language checks for that property in a variety of places. For example, unlike a regular function, it must be called with new: class User { constructor() {} } alert(typeof User); // function User(); // Error: Class constructor User cannot be invoked without 'new' Also, a string representation of a class constructor in most JavaScript engines starts with the “class…” class User { constructor() {} } alert(User); // class User { ... } There are other differences, we’ll see them soon.",
          'Class methods are non-enumerable. A class definition sets enumerable flag to false for all methods in the "prototype". That’s good, because if we for..in over an object, we usually don’t want its class methods.',
          'Classes always use strict. All code inside the class construct is automatically in strict mode.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Besides, class syntax brings many other features that we’ll explore later.',
      },
      {
        type: 'paragraph',
        text: 'Just like functions, classes can be defined inside another expression, passed around, returned, assigned, etc.',
      },
      {
        type: 'paragraph',
        text: 'Here’s an example of a class expression:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'let User = class {\n  sayHi() {\n    alert("Hello");\n  }\n};',
        },
      },
      {
        type: 'paragraph',
        text: 'Similar to Named Function Expressions, class expressions may have a name.',
      },
      {
        type: 'paragraph',
        text: 'If a class expression has a name, it’s visible inside the class only:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '// "Named Class Expression"\n// (no such term in the spec, but that\'s similar to Named Function Expression)\nlet User = class MyClass {\n  sayHi() {\n    alert(MyClass); // MyClass name is visible only inside the class\n  }\n};\n\nnew User().sayHi(); // works, shows MyClass definition\n\nalert(MyClass); // error, MyClass name isn\'t visible outside of the class',
        },
      },
      {
        type: 'paragraph',
        text: 'We can even make classes dynamically “on-demand”, like this:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'function makeClass(phrase) {\n  // declare a class and return it\n  return class {\n    sayHi() {\n      alert(phrase);\n    }\n  };\n}\n\n// Create a new class\nlet User = makeClass("Hello");\n\nnew User().sayHi(); // Hello',
        },
      },
      {
        type: 'paragraph',
        text: 'Just like literal objects, classes may include getters/setters, computed properties etc.',
      },
      {
        type: 'paragraph',
        text: 'Here’s an example for user.name implemented using get/set:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'class User {\n\n  constructor(name) {\n    // invokes the setter\n    this.name = name;\n  }\n\n  get name() {\n    return this._name;\n  }\n\n  set name(value) {\n    if (value.length < 4) {\n      alert("Name is too short.");\n      return;\n    }\n    this._name = value;\n  }\n\n}\n\nlet user = new User("John");\nalert(user.name); // John\n\nuser = new User(""); // Name is too short.',
        },
      },
      {
        type: 'paragraph',
        text: 'Technically, such class declaration works by creating getters and setters in User.prototype.',
      },
      {
        type: 'paragraph',
        text: 'Here’s an example with a computed method name using brackets [...]:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "class User {\n\n  ['say' + 'Hi']() {\n    alert(\"Hello\");\n  }\n\n}\n\nnew User().sayHi();",
        },
      },
      {
        type: 'paragraph',
        text: 'Such features are easy to remember, as they resemble that of literal objects.',
      },
      {
        type: 'paragraph',
        text: 'Old browsers may need a polyfill',
      },
      {
        type: 'paragraph',
        text: 'Class fields are a recent addition to the language.',
      },
      {
        type: 'paragraph',
        text: 'Previously, our classes only had methods.',
      },
      {
        type: 'paragraph',
        text: '“Class fields” is a syntax that allows to add any properties.',
      },
      {
        type: 'paragraph',
        text: 'For instance, let’s add name property to class User:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'class User {\n  name = "John";\n\n  sayHi() {\n    alert(`Hello, ${this.name}!`);\n  }\n}\n\nnew User().sayHi(); // Hello, John!',
        },
      },
      {
        type: 'paragraph',
        text: 'So, we just write “ = ” in the declaration, and that’s it.',
      },
      {
        type: 'paragraph',
        text: 'The important difference of class fields is that they are set on individual objects, not User.prototype:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'class User {\n  name = "John";\n}\n\nlet user = new User();\nalert(user.name); // John\nalert(User.prototype.name); // undefined',
        },
      },
      {
        type: 'paragraph',
        text: 'We can also assign values using more complex expressions and function calls:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'class User {\n  name = prompt("Name, please?", "John");\n}\n\nlet user = new User();\nalert(user.name); // John',
        },
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Making bound methods with class fields',
      },
      {
        type: 'paragraph',
        text: 'As demonstrated in the chapter Function binding functions in JavaScript have a dynamic this. It depends on the context of the call.',
      },
      {
        type: 'paragraph',
        text: 'So if an object method is passed around and called in another context, this won’t be a reference to its object any more.',
      },
      {
        type: 'paragraph',
        text: 'For instance, this code will show undefined:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'class Button {\n  constructor(value) {\n    this.value = value;\n  }\n\n  click() {\n    alert(this.value);\n  }\n}\n\nlet button = new Button("hello");\n\nsetTimeout(button.click, 1000); // undefined',
        },
      },
      {
        type: 'paragraph',
        text: 'The problem is called “losing this”.',
      },
      {
        type: 'paragraph',
        text: 'There are two approaches to fixing it, as discussed in the chapter Function binding:',
      },
      {
        type: 'list',
        ordered: true,
        items: [
          'Pass a wrapper-function, such as setTimeout(() =&gt; button.click(), 1000).',
          'Bind the method to object, e.g. in the constructor.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Class fields provide another, quite elegant syntax:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'class Button {\n  constructor(value) {\n    this.value = value;\n  }\n  click = () => {\n    alert(this.value);\n  }\n}\n\nlet button = new Button("hello");\n\nsetTimeout(button.click, 1000); // hello',
        },
      },
      {
        type: 'paragraph',
        text: 'The class field click = () =&gt; {...} is created on a per-object basis, there’s a separate function for each Button object, with this inside it referencing that object. We can pass button.click around anywhere, and the value of this will always be correct.',
      },
      {
        type: 'paragraph',
        text: 'That’s especially useful in browser environment, for event listeners.',
      },
      {
        type: 'paragraph',
        text: 'The basic class syntax looks like this:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'class MyClass {\n  prop = value; // property\n\n  constructor(...) { // constructor\n    // ...\n  }\n\n  method(...) {} // method\n\n  get something(...) {} // getter method\n  set something(...) {} // setter method\n\n  [Symbol.iterator]() {} // method with computed name (symbol here)\n  // ...\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'MyClass is technically a function (the one that we provide as constructor), while methods, getters and setters are written to MyClass.prototype.',
      },
      {
        type: 'paragraph',
        text: 'In the next chapters we’ll learn more about classes, including inheritance and other features.',
      },
      {
        type: 'paragraph',
        text: 'Class inheritance is a way for one class to extend another class.',
      },
      {
        type: 'paragraph',
        text: 'So we can create new functionality on top of the existing.',
      },
      {
        type: 'paragraph',
        text: 'Let’s say we have class Animal:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'class Animal {\n  constructor(name) {\n    this.speed = 0;\n    this.name = name;\n  }\n  run(speed) {\n    this.speed = speed;\n    alert(`${this.name} runs with speed ${this.speed}.`);\n  }\n  stop() {\n    this.speed = 0;\n    alert(`${this.name} stands still.`);\n  }\n}\n\nlet animal = new Animal("My animal");',
        },
      },
      {
        type: 'paragraph',
        text: 'Here’s how we can represent animal object and Animal class graphically:',
      },
      {
        type: 'paragraph',
        text: '…And we would like to create another class Rabbit.',
      },
      {
        type: 'paragraph',
        text: 'As rabbits are animals, Rabbit class should be based on Animal, have access to animal methods, so that rabbits can do what “generic” animals can do.',
      },
      {
        type: 'paragraph',
        text: 'The syntax to extend another class is: class Child extends Parent.',
      },
      {
        type: 'paragraph',
        text: 'Let’s create class Rabbit that inherits from Animal:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'class Rabbit extends Animal {\n  hide() {\n    alert(`${this.name} hides!`);\n  }\n}\n\nlet rabbit = new Rabbit("White Rabbit");\n\nrabbit.run(5); // White Rabbit runs with speed 5.\nrabbit.hide(); // White Rabbit hides!',
        },
      },
      {
        type: 'paragraph',
        text: 'Object of Rabbit class have access both to Rabbit methods, such as rabbit.hide(), and also to Animal methods, such as rabbit.run().',
      },
      {
        type: 'paragraph',
        text: 'Internally, extends keyword works using the good old prototype mechanics. It sets Rabbit.prototype.[[Prototype]] to Animal.prototype. So, if a method is not found in Rabbit.prototype, JavaScript takes it from Animal.prototype.',
      },
      {
        type: 'paragraph',
        text: 'For instance, to find rabbit.run method, the engine checks (bottom-up on the picture):',
      },
      {
        type: 'list',
        ordered: true,
        items: [
          'The rabbit object (has no run).',
          'Its prototype, that is Rabbit.prototype (has hide, but not run).',
          'Its prototype, that is (due to extends) Animal.prototype, that finally has the run method.',
        ],
      },
      {
        type: 'paragraph',
        text: 'As we can recall from the chapter Native prototypes, JavaScript itself uses prototypal inheritance for built-in objects. E.g. Date.prototype.[[Prototype]] is Object.prototype. That’s why dates have access to generic object methods.',
      },
      {
        type: 'paragraph',
        text: 'Any expression is allowed after extends',
      },
      {
        type: 'paragraph',
        text: 'Class syntax allows to specify not just a class, but any expression after extends.',
      },
      {
        type: 'paragraph',
        text: 'For instance, a function call that generates the parent class:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'function f(phrase) {\n  return class {\n    sayHi() { alert(phrase); }\n  };\n}\n\nclass User extends f("Hello") {}\n\nnew User().sayHi(); // Hello',
        },
      },
      {
        type: 'paragraph',
        text: 'Here class User inherits from the result of f("Hello").',
      },
      {
        type: 'paragraph',
        text: 'That may be useful for advanced programming patterns when we use functions to generate classes depending on many conditions and can inherit from them.',
      },
      {
        type: 'paragraph',
        text: 'Now let’s move forward and override a method. By default, all methods that are not specified in class Rabbit are taken directly “as is” from class Animal.',
      },
      {
        type: 'paragraph',
        text: 'But if we specify our own method in Rabbit, such as stop() then it will be used instead:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'class Rabbit extends Animal {\n  stop() {\n    // ...now this will be used for rabbit.stop()\n    // instead of stop() from class Animal\n  }\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'Usually, however, we don’t want to totally replace a parent method, but rather to build on top of it to tweak or extend its functionality. We do something in our method, but call the parent method before/after it or in the process.',
      },
      {
        type: 'paragraph',
        text: 'Classes provide "super" keyword for that.',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'super.method(...) to call a parent method.',
          'super(...) to call a parent constructor (inside our constructor only).',
        ],
      },
      {
        type: 'paragraph',
        text: 'For instance, let our rabbit autohide when stopped:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'class Animal {\n\n  constructor(name) {\n    this.speed = 0;\n    this.name = name;\n  }\n\n  run(speed) {\n    this.speed = speed;\n    alert(`${this.name} runs with speed ${this.speed}.`);\n  }\n\n  stop() {\n    this.speed = 0;\n    alert(`${this.name} stands still.`);\n  }\n\n}\n\nclass Rabbit extends Animal {\n  hide() {\n    alert(`${this.name} hides!`);\n  }\n\n  stop() {\n    super.stop(); // call parent stop\n    this.hide(); // and then hide\n  }\n}\n\nlet rabbit = new Rabbit("White Rabbit");\n\nrabbit.run(5); // White Rabbit runs with speed 5.\nrabbit.stop(); // White Rabbit stands still. White Rabbit hides!',
        },
      },
      {
        type: 'paragraph',
        text: 'Now Rabbit has the stop method that calls the parent super.stop() in the process.',
      },
      {
        type: 'paragraph',
        text: 'Arrow functions have no super',
      },
      {
        type: 'paragraph',
        text: 'As was mentioned in the chapter Arrow functions revisited, arrow functions do not have super.',
      },
      {
        type: 'paragraph',
        text: 'If accessed, it’s taken from the outer function. For instance:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'class Rabbit extends Animal {\n  stop() {\n    setTimeout(() => super.stop(), 1000); // call parent stop after 1sec\n  }\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'The super in the arrow function is the same as in stop(), so it works as intended. If we specified a “regular” function here, there would be an error:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '// Unexpected super\nsetTimeout(function() { super.stop() }, 1000);',
        },
      },
      {
        type: 'paragraph',
        text: 'With constructors it gets a little bit tricky.',
      },
      {
        type: 'paragraph',
        text: 'Until now, Rabbit did not have its own constructor.',
      },
      {
        type: 'paragraph',
        text: 'According to the specification, if a class extends another class and has no constructor, then the following “empty” constructor is generated:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'class Rabbit extends Animal {\n  // generated for extending classes without own constructors\n  constructor(...args) {\n    super(...args);\n  }\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'As we can see, it basically calls the parent constructor passing it all the arguments. That happens if we don’t write a constructor of our own.',
      },
      {
        type: 'paragraph',
        text: 'Now let’s add a custom constructor to Rabbit. It will specify the earLength in addition to name:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'class Animal {\n  constructor(name) {\n    this.speed = 0;\n    this.name = name;\n  }\n  // ...\n}\n\nclass Rabbit extends Animal {\n\n  constructor(name, earLength) {\n    this.speed = 0;\n    this.name = name;\n    this.earLength = earLength;\n  }\n\n  // ...\n}\n\n// Doesn\'t work!\nlet rabbit = new Rabbit("White Rabbit", 10); // Error: this is not defined.',
        },
      },
      {
        type: 'paragraph',
        text: 'Whoops! We’ve got an error. Now we can’t create rabbits. What went wrong?',
      },
      {
        type: 'paragraph',
        text: 'The short answer is:',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'Constructors in inheriting classes must call super(...), and (!) do it before using this.',
        ],
      },
      {
        type: 'paragraph',
        text: '…But why? What’s going on here? Indeed, the requirement seems strange.',
      },
      {
        type: 'paragraph',
        text: 'Of course, there’s an explanation. Let’s get into details, so you’ll really understand what’s going on.',
      },
      {
        type: 'paragraph',
        text: 'In JavaScript, there’s a distinction between a constructor function of an inheriting class (so-called “derived constructor”) and other functions. A derived constructor has a special internal property [[ConstructorKind]]:"derived". That’s a special internal label.',
      },
      {
        type: 'paragraph',
        text: 'That label affects its behavior with new.',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'When a regular function is executed with new, it creates an empty object and assigns it to this.',
          'But when a derived constructor runs, it doesn’t do this. It expects the parent constructor to do this job.',
        ],
      },
      {
        type: 'paragraph',
        text: 'So a derived constructor must call super in order to execute its parent (base) constructor, otherwise the object for this won’t be created. And we’ll get an error.',
      },
      {
        type: 'paragraph',
        text: 'For the Rabbit constructor to work, it needs to call super() before using this, like here:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'class Animal {\n\n  constructor(name) {\n    this.speed = 0;\n    this.name = name;\n  }\n\n  // ...\n}\n\nclass Rabbit extends Animal {\n\n  constructor(name, earLength) {\n    super(name);\n    this.earLength = earLength;\n  }\n\n  // ...\n}\n\n// now fine\nlet rabbit = new Rabbit("White Rabbit", 10);\nalert(rabbit.name); // White Rabbit\nalert(rabbit.earLength); // 10',
        },
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Overriding class fields: a tricky note',
      },
      {
        type: 'paragraph',
        text: 'Advanced note',
      },
      {
        type: 'paragraph',
        text: 'This note assumes you have a certain experience with classes, maybe in other programming languages.',
      },
      {
        type: 'paragraph',
        text: 'It provides better insight into the language and also explains the behavior that might be a source of bugs (but not very often).',
      },
      {
        type: 'paragraph',
        text: 'If you find it difficult to understand, just go on, continue reading, then return to it some time later.',
      },
      {
        type: 'paragraph',
        text: 'We can override not only methods, but also class fields.',
      },
      {
        type: 'paragraph',
        text: 'Although, there’s a tricky behavior when we access an overridden field in parent constructor, quite different from most other programming languages.',
      },
      {
        type: 'paragraph',
        text: 'Consider this example:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "class Animal {\n  name = 'animal';\n\n  constructor() {\n    alert(this.name); // (*)\n  }\n}\n\nclass Rabbit extends Animal {\n  name = 'rabbit';\n}\n\nnew Animal(); // animal\nnew Rabbit(); // animal",
        },
      },
      {
        type: 'paragraph',
        text: 'Here, class Rabbit extends Animal and overrides the name field with its own value.',
      },
      {
        type: 'paragraph',
        text: 'There’s no own constructor in Rabbit, so Animal constructor is called.',
      },
      {
        type: 'paragraph',
        text: 'What’s interesting is that in both cases: new Animal() and new Rabbit(), the alert in the line (*) shows animal.',
      },
      {
        type: 'paragraph',
        text: 'In other words, the parent constructor always uses its own field value, not the overridden one.',
      },
      {
        type: 'paragraph',
        text: 'What’s odd about it?',
      },
      {
        type: 'paragraph',
        text: 'If it’s not clear yet, please compare with methods.',
      },
      {
        type: 'paragraph',
        text: 'Here’s the same code, but instead of this.name field we call this.showName() method:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "class Animal {\n  showName() {  // instead of this.name = 'animal'\n    alert('animal');\n  }\n\n  constructor() {\n    this.showName(); // instead of alert(this.name);\n  }\n}\n\nclass Rabbit extends Animal {\n  showName() {\n    alert('rabbit');\n  }\n}\n\nnew Animal(); // animal\nnew Rabbit(); // rabbit",
        },
      },
      {
        type: 'paragraph',
        text: 'Please note: now the output is different.',
      },
      {
        type: 'paragraph',
        text: 'And that’s what we naturally expect. When the parent constructor is called in the derived class, it uses the overridden method.',
      },
      {
        type: 'paragraph',
        text: '…But for class fields it’s not so. As said, the parent constructor always uses the parent field.',
      },
      {
        type: 'paragraph',
        text: 'Why is there a difference?',
      },
      {
        type: 'paragraph',
        text: 'Well, the reason is the field initialization order. The class field is initialized:',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'Before constructor for the base class (that doesn’t extend anything),',
          'Immediately after super() for the derived class.',
        ],
      },
      {
        type: 'paragraph',
        text: 'In our case, Rabbit is the derived class. There’s no constructor() in it. As said previously, that’s the same as if there was an empty constructor with only super(...args).',
      },
      {
        type: 'paragraph',
        text: 'So, new Rabbit() calls super(), thus executing the parent constructor, and (per the rule for derived classes) only after that its class fields are initialized. At the time of the parent constructor execution, there are no Rabbit class fields yet, that’s why Animal fields are used.',
      },
      {
        type: 'paragraph',
        text: 'This subtle difference between fields and methods is specific to JavaScript.',
      },
      {
        type: 'paragraph',
        text: 'Luckily, this behavior only reveals itself if an overridden field is used in the parent constructor. Then it may be difficult to understand what’s going on, so we’re explaining it here.',
      },
      {
        type: 'paragraph',
        text: 'If it becomes a problem, one can fix it by using methods or getters/setters instead of fields.',
      },
      {
        type: 'paragraph',
        text: 'Advanced information',
      },
      {
        type: 'paragraph',
        text: 'If you’re reading the tutorial for the first time – this section may be skipped.',
      },
      {
        type: 'paragraph',
        text: 'It’s about the internal mechanisms behind inheritance and super.',
      },
      {
        type: 'paragraph',
        text: 'Let’s get a little deeper under the hood of super. We’ll see some interesting things along the way.',
      },
      {
        type: 'paragraph',
        text: 'First to say, from all that we’ve learned till now, it’s impossible for super to work at all!',
      },
      {
        type: 'paragraph',
        text: 'Yeah, indeed, let’s ask ourselves, how it should technically work? When an object method runs, it gets the current object as this. If we call super.method() then, the engine needs to get the method from the prototype of the current object. But how?',
      },
      {
        type: 'paragraph',
        text: 'The task may seem simple, but it isn’t. The engine knows the current object this, so it could get the parent method as this.__proto__.method. Unfortunately, such a “naive” solution won’t work.',
      },
      {
        type: 'paragraph',
        text: 'Let’s demonstrate the problem. Without classes, using plain objects for the sake of simplicity.',
      },
      {
        type: 'paragraph',
        text: 'You may skip this part and go below to the [[HomeObject]] subsection if you don’t want to know the details. That won’t harm. Or read on if you’re interested in understanding things in-depth.',
      },
      {
        type: 'paragraph',
        text: 'In the example below, rabbit.__proto__ = animal. Now let’s try: in rabbit.eat() we’ll call animal.eat(), using this.__proto__:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'let animal = {\n  name: "Animal",\n  eat() {\n    alert(`${this.name} eats.`);\n  }\n};\n\nlet rabbit = {\n  __proto__: animal,\n  name: "Rabbit",\n  eat() {\n    // that\'s how super.eat() could presumably work\n    this.__proto__.eat.call(this); // (*)\n  }\n};\n\nrabbit.eat(); // Rabbit eats.',
        },
      },
      {
        type: 'paragraph',
        text: 'At the line (*) we take eat from the prototype (animal) and call it in the context of the current object. Please note that .call(this) is important here, because a simple this.__proto__.eat() would execute parent eat in the context of the prototype, not the current object.',
      },
      {
        type: 'paragraph',
        text: 'And in the code above it actually works as intended: we have the correct alert.',
      },
      {
        type: 'paragraph',
        text: 'Now let’s add one more object to the chain. We’ll see how things break:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'let animal = {\n  name: "Animal",\n  eat() {\n    alert(`${this.name} eats.`);\n  }\n};\n\nlet rabbit = {\n  __proto__: animal,\n  eat() {\n    // ...bounce around rabbit-style and call parent (animal) method\n    this.__proto__.eat.call(this); // (*)\n  }\n};\n\nlet longEar = {\n  __proto__: rabbit,\n  eat() {\n    // ...do something with long ears and call parent (rabbit) method\n    this.__proto__.eat.call(this); // (**)\n  }\n};\n\nlongEar.eat(); // Error: Maximum call stack size exceeded',
        },
      },
      {
        type: 'paragraph',
        text: 'The code doesn’t work anymore! We can see the error trying to call longEar.eat().',
      },
      {
        type: 'paragraph',
        text: 'It may be not that obvious, but if we trace longEar.eat() call, then we can see why. In both lines (*) and (**) the value of this is the current object (longEar). That’s essential: all object methods get the current object as this, not a prototype or something.',
      },
      {
        type: 'paragraph',
        text: 'So, in both lines (*) and (**) the value of this.__proto__ is exactly the same: rabbit. They both call rabbit.eat without going up the chain in the endless loop.',
      },
      {
        type: 'paragraph',
        text: 'Here’s the picture of what happens:',
      },
      {
        type: 'list',
        ordered: true,
        items: [
          'Inside longEar.eat(), the line (**) calls rabbit.eat providing it with this=longEar. // inside longEar.eat() we have this = longEar this.__proto__.eat.call(this) // (**) // becomes longEar.__proto__.eat.call(this) // that is rabbit.eat.call(this);',
          'Then in the line (*) of rabbit.eat, we’d like to pass the call even higher in the chain, but this=longEar, so this.__proto__.eat is again rabbit.eat! // inside rabbit.eat() we also have this = longEar this.__proto__.eat.call(this) // (*) // becomes longEar.__proto__.eat.call(this) // or (again) rabbit.eat.call(this);',
          '…So rabbit.eat calls itself in the endless loop, because it can’t ascend any further.',
        ],
      },
      {
        type: 'paragraph',
        text: 'The problem can’t be solved by using this alone.',
      },
      {
        type: 'subheading',
        level: 3,
        text: '[[HomeObject]]',
      },
      {
        type: 'paragraph',
        text: 'To provide the solution, JavaScript adds one more special internal property for functions: [[HomeObject]].',
      },
      {
        type: 'paragraph',
        text: 'When a function is specified as a class or object method, its [[HomeObject]] property becomes that object.',
      },
      {
        type: 'paragraph',
        text: 'Then super uses it to resolve the parent prototype and its methods.',
      },
      {
        type: 'paragraph',
        text: 'Let’s see how it works, first with plain objects:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'let animal = {\n  name: "Animal",\n  eat() {         // animal.eat.[[HomeObject]] == animal\n    alert(`${this.name} eats.`);\n  }\n};\n\nlet rabbit = {\n  __proto__: animal,\n  name: "Rabbit",\n  eat() {         // rabbit.eat.[[HomeObject]] == rabbit\n    super.eat();\n  }\n};\n\nlet longEar = {\n  __proto__: rabbit,\n  name: "Long Ear",\n  eat() {         // longEar.eat.[[HomeObject]] == longEar\n    super.eat();\n  }\n};\n\n// works correctly\nlongEar.eat();  // Long Ear eats.',
        },
      },
      {
        type: 'paragraph',
        text: 'It works as intended, due to [[HomeObject]] mechanics. A method, such as longEar.eat, knows its [[HomeObject]] and takes the parent method from its prototype. Without any use of this.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Methods are not “free”',
      },
      {
        type: 'paragraph',
        text: 'As we’ve known before, generally functions are “free”, not bound to objects in JavaScript. So they can be copied between objects and called with another this.',
      },
      {
        type: 'paragraph',
        text: 'The very existence of [[HomeObject]] violates that principle, because methods remember their objects. [[HomeObject]] can’t be changed, so this bond is forever.',
      },
      {
        type: 'paragraph',
        text: 'The only place in the language where [[HomeObject]] is used – is super. So, if a method does not use super, then we can still consider it free and copy between objects. But with super things may go wrong.',
      },
      {
        type: 'paragraph',
        text: 'Here’s the demo of a wrong super result after copying:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "let animal = {\n  sayHi() {\n    alert(`I'm an animal`);\n  }\n};\n\n// rabbit inherits from animal\nlet rabbit = {\n  __proto__: animal,\n  sayHi() {\n    super.sayHi();\n  }\n};\n\nlet plant = {\n  sayHi() {\n    alert(\"I'm a plant\");\n  }\n};\n\n// tree inherits from plant\nlet tree = {\n  __proto__: plant,\n  sayHi: rabbit.sayHi // (*)\n};\n\ntree.sayHi();  // I'm an animal (?!?)",
        },
      },
      {
        type: 'paragraph',
        text: 'A call to tree.sayHi() shows “I’m an animal”. Definitely wrong.',
      },
      {
        type: 'paragraph',
        text: 'The reason is simple:',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'In the line (*), the method tree.sayHi was copied from rabbit. Maybe we just wanted to avoid code duplication?',
          'Its [[HomeObject]] is rabbit, as it was created in rabbit. There’s no way to change [[HomeObject]].',
          'The code of tree.sayHi() has super.sayHi() inside. It goes up from rabbit and takes the method from animal.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Here’s the diagram of what happens:',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Methods, not function properties',
      },
      {
        type: 'paragraph',
        text: '[[HomeObject]] is defined for methods both in classes and in plain objects. But for objects, methods must be specified exactly as method(), not as "method: function()".',
      },
      {
        type: 'paragraph',
        text: 'The difference may be non-essential for us, but it’s important for JavaScript.',
      },
      {
        type: 'paragraph',
        text: 'In the example below a non-method syntax is used for comparison. [[HomeObject]] property is not set and the inheritance doesn’t work:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "let animal = {\n  eat: function() { // intentionally writing like this instead of eat() {...\n    // ...\n  }\n};\n\nlet rabbit = {\n  __proto__: animal,\n  eat: function() {\n    super.eat();\n  }\n};\n\nrabbit.eat();  // Error calling super (because there's no [[HomeObject]])",
        },
      },
      {
        type: 'list',
        ordered: true,
        items: [
          'To extend a class: class Child extends Parent: * That means Child.prototype.__proto__ will be Parent.prototype, so methods are inherited.',
          'When overriding a constructor: * We must call parent constructor as super() in Child constructor before using this.',
          'When overriding another method: * We can use super.method() in a Child method to call Parent method.',
          'Internals: * Methods remember their class/object in the internal [[HomeObject]] property. That’s how super resolves parent methods. * So it’s not safe to copy a method with super from one object to another.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Also:',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'Arrow functions don’t have their own this or super, so they transparently fit into the surrounding context.',
        ],
      },
      {
        type: 'paragraph',
        text: 'We can also assign a method to the class as a whole. Such methods are called static.',
      },
      {
        type: 'paragraph',
        text: 'In a class declaration, they are prepended by static keyword, like this:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'class User {\n  static staticMethod() {\n    alert(this === User);\n  }\n}\n\nUser.staticMethod(); // true',
        },
      },
      {
        type: 'paragraph',
        text: 'That actually does the same as assigning it as a property directly:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'class User { }\n\nUser.staticMethod = function() {\n  alert(this === User);\n};\n\nUser.staticMethod(); // true',
        },
      },
      {
        type: 'paragraph',
        text: 'The value of this in User.staticMethod() call is the class constructor User itself (the “object before dot” rule).',
      },
      {
        type: 'paragraph',
        text: 'Usually, static methods are used to implement functions that belong to the class as a whole, but not to any particular object of it.',
      },
      {
        type: 'paragraph',
        text: 'For instance, we have Article objects and need a function to compare them.',
      },
      {
        type: 'paragraph',
        text: 'A natural solution would be to add Article.compare static method:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'class Article {\n  constructor(title, date) {\n    this.title = title;\n    this.date = date;\n  }\n\n  static compare(articleA, articleB) {\n    return articleA.date - articleB.date;\n  }\n}\n\n// usage\nlet articles = [\n  new Article("HTML", new Date(2019, 1, 1)),\n  new Article("CSS", new Date(2019, 0, 1)),\n  new Article("JavaScript", new Date(2019, 11, 1))\n];\n\narticles.sort(Article.compare);\n\nalert( articles[0].title ); // CSS',
        },
      },
      {
        type: 'paragraph',
        text: 'Here Article.compare method stands “above” articles, as a means to compare them. It’s not a method of an article, but rather of the whole class.',
      },
      {
        type: 'paragraph',
        text: 'Another example would be a so-called “factory” method.',
      },
      {
        type: 'paragraph',
        text: 'Let’s say, we need multiple ways to create an article:',
      },
      {
        type: 'list',
        ordered: true,
        items: [
          'Create by given parameters (title, date etc).',
          'Create an empty article with today’s date.',
          '…or else somehow.',
        ],
      },
      {
        type: 'paragraph',
        text: 'The first way can be implemented by the constructor. And for the second one we can make a static method of the class.',
      },
      {
        type: 'paragraph',
        text: 'Such as Article.createTodays() here:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'class Article {\n  constructor(title, date) {\n    this.title = title;\n    this.date = date;\n  }\n\n  static createTodays() {\n    // remember, this = Article\n    return new this("Today\'s digest", new Date());\n  }\n}\n\nlet article = Article.createTodays();\n\nalert( article.title ); // Today\'s digest',
        },
      },
      {
        type: 'paragraph',
        text: 'Now every time we need to create a today’s digest, we can call Article.createTodays(). Once again, that’s not a method of an article, but a method of the whole class.',
      },
      {
        type: 'paragraph',
        text: 'Static methods are also used in database-related classes to search/save/remove entries from the database, like this:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '// assuming Article is a special class for managing articles\n// static method to remove the article by id:\nArticle.remove({id: 12345});',
        },
      },
      {
        type: 'paragraph',
        text: 'Static methods aren’t available for individual objects',
      },
      {
        type: 'paragraph',
        text: 'Static methods are callable on classes, not on individual objects.',
      },
      {
        type: 'paragraph',
        text: 'E.g. such code won’t work:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '// ...\narticle.createTodays(); /// Error: article.createTodays is not a function',
        },
      },
      {
        type: 'paragraph',
        text: 'A recent addition',
      },
      {
        type: 'paragraph',
        text: 'This is a recent addition to the language. Examples work in the recent Chrome.',
      },
      {
        type: 'paragraph',
        text: 'Static properties are also possible, they look like regular class properties, but prepended by static:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'class Article {\n  static publisher = "Ilya Kantor";\n}\n\nalert( Article.publisher ); // Ilya Kantor',
        },
      },
      {
        type: 'paragraph',
        text: 'That is the same as a direct assignment to Article:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'Article.publisher = "Ilya Kantor";',
        },
      },
      {
        type: 'paragraph',
        text: 'Static properties and methods are inherited.',
      },
      {
        type: 'paragraph',
        text: 'For instance, Animal.compare and Animal.planet in the code below are inherited and accessible as Rabbit.compare and Rabbit.planet:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'class Animal {\n  static planet = "Earth";\n\n  constructor(name, speed) {\n    this.speed = speed;\n    this.name = name;\n  }\n\n  run(speed = 0) {\n    this.speed += speed;\n    alert(`${this.name} runs with speed ${this.speed}.`);\n  }\n\n  static compare(animalA, animalB) {\n    return animalA.speed - animalB.speed;\n  }\n\n}\n\n// Inherit from Animal\nclass Rabbit extends Animal {\n  hide() {\n    alert(`${this.name} hides!`);\n  }\n}\n\nlet rabbits = [\n  new Rabbit("White Rabbit", 10),\n  new Rabbit("Black Rabbit", 5)\n];\n\nrabbits.sort(Rabbit.compare);\n\nrabbits[0].run(); // Black Rabbit runs with speed 5.\n\nalert(Rabbit.planet); // Earth',
        },
      },
      {
        type: 'paragraph',
        text: 'Now when we call Rabbit.compare, the inherited Animal.compare will be called.',
      },
      {
        type: 'paragraph',
        text: 'How does it work? Again, using prototypes. As you might have already guessed, extends gives Rabbit the [[Prototype]] reference to Animal.',
      },
      {
        type: 'paragraph',
        text: 'So, Rabbit extends Animal creates two [[Prototype]] references:',
      },
      {
        type: 'list',
        ordered: true,
        items: [
          'Rabbit function prototypally inherits from Animal function.',
          'Rabbit.prototype prototypally inherits from Animal.prototype.',
        ],
      },
      {
        type: 'paragraph',
        text: 'As a result, inheritance works both for regular and static methods.',
      },
      {
        type: 'paragraph',
        text: 'Here, let’s check that by code:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'class Animal {}\nclass Rabbit extends Animal {}\n\n// for statics\nalert(Rabbit.__proto__ === Animal); // true\n\n// for regular methods\nalert(Rabbit.prototype.__proto__ === Animal.prototype); // true',
        },
      },
      {
        type: 'paragraph',
        text: 'Static methods are used for the functionality that belongs to the class “as a whole”. It doesn’t relate to a concrete class instance.',
      },
      {
        type: 'paragraph',
        text: 'For example, a method for comparison Article.compare(article1, article2) or a factory method Article.createTodays().',
      },
      {
        type: 'paragraph',
        text: 'They are labeled by the word static in class declaration.',
      },
      {
        type: 'paragraph',
        text: 'Static properties are used when we’d like to store class-level data, also not bound to an instance.',
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
          code: 'class MyClass {\n  static property = ...;\n\n  static method() {\n    ...\n  }\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'Technically, static declaration is the same as assigning to the class itself:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'MyClass.property = ...\nMyClass.method = ...',
        },
      },
      {
        type: 'paragraph',
        text: 'Static properties and methods are inherited.',
      },
      {
        type: 'paragraph',
        text: 'For class B extends A the prototype of the class B itself points to A: B.[[Prototype]] = A. So if a field is not found in B, the search continues in A.',
      },
      {
        type: 'paragraph',
        text: 'One of the most important principles of object oriented programming – delimiting internal interface from the external one.',
      },
      {
        type: 'paragraph',
        text: 'That is “a must” practice in developing anything more complex than a “hello world” app.',
      },
      {
        type: 'paragraph',
        text: 'To understand this, let’s break away from development and turn our eyes into the real world.',
      },
      {
        type: 'paragraph',
        text: 'Usually, devices that we’re using are quite complex. But delimiting the internal interface from the external one allows to use them without problems.',
      },
      {
        type: 'paragraph',
        text: 'For instance, a coffee machine. Simple from outside: a button, a display, a few holes…And, surely, the result – great coffee! :)',
      },
      {
        type: 'paragraph',
        text: 'But inside… (a picture from the repair manual)',
      },
      {
        type: 'paragraph',
        text: 'A lot of details. But we can use it without knowing anything.',
      },
      {
        type: 'paragraph',
        text: 'Coffee machines are quite reliable, aren’t they? We can use one for years, and only if something goes wrong – bring it for repairs.',
      },
      {
        type: 'paragraph',
        text: 'The secret of reliability and simplicity of a coffee machine – all details are well-tuned and hidden inside.',
      },
      {
        type: 'paragraph',
        text: 'If we remove the protective cover from the coffee machine, then using it will be much more complex (where to press?), and dangerous (it can electrocute).',
      },
      {
        type: 'paragraph',
        text: 'As we’ll see, in programming objects are like coffee machines.',
      },
      {
        type: 'paragraph',
        text: 'But in order to hide inner details, we’ll use not a protective cover, but rather special syntax of the language and conventions.',
      },
      {
        type: 'paragraph',
        text: 'In object-oriented programming, properties and methods are split into two groups:',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'Internal interface – methods and properties, accessible from other methods of the class, but not from the outside.',
          'External interface – methods and properties, accessible also from outside the class.',
        ],
      },
      {
        type: 'paragraph',
        text: 'If we continue the analogy with the coffee machine – what’s hidden inside: a boiler tube, heating element, and so on – is its internal interface.',
      },
      {
        type: 'paragraph',
        text: 'An internal interface is used for the object to work, its details use each other. For instance, a boiler tube is attached to the heating element.',
      },
      {
        type: 'paragraph',
        text: 'But from the outside a coffee machine is closed by the protective cover, so that no one can reach those. Details are hidden and inaccessible. We can use its features via the external interface.',
      },
      {
        type: 'paragraph',
        text: 'So, all we need to use an object is to know its external interface. We may be completely unaware how it works inside, and that’s great.',
      },
      {
        type: 'paragraph',
        text: 'That was a general introduction.',
      },
      {
        type: 'paragraph',
        text: 'In JavaScript, there are two types of object fields (properties and methods):',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'Public: accessible from anywhere. They comprise the external interface. Until now we were only using public properties and methods.',
          'Private: accessible only from inside the class. These are for the internal interface.',
        ],
      },
      {
        type: 'paragraph',
        text: 'In many other languages there also exist “protected” fields: accessible only from inside the class and those extending it (like private, but plus access from inheriting classes). They are also useful for the internal interface. They are in a sense more widespread than private ones, because we usually want inheriting classes to gain access to them.',
      },
      {
        type: 'paragraph',
        text: 'Protected fields are not implemented in JavaScript on the language level, but in practice they are very convenient, so they are emulated.',
      },
      {
        type: 'paragraph',
        text: 'Now we’ll make a coffee machine in JavaScript with all these types of properties. A coffee machine has a lot of details, we won’t model them to stay simple (though we could).',
      },
      {
        type: 'paragraph',
        text: 'Let’s make a simple coffee machine class first:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'class CoffeeMachine {\n  waterAmount = 0; // the amount of water inside\n\n  constructor(power) {\n    this.power = power;\n    alert( `Created a coffee-machine, power: ${power}` );\n  }\n\n}\n\n// create the coffee machine\nlet coffeeMachine = new CoffeeMachine(100);\n\n// add water\ncoffeeMachine.waterAmount = 200;',
        },
      },
      {
        type: 'paragraph',
        text: 'Right now the properties waterAmount and power are public. We can easily get/set them from the outside to any value.',
      },
      {
        type: 'paragraph',
        text: 'Let’s change waterAmount property to protected to have more control over it. For instance, we don’t want anyone to set it below zero.',
      },
      {
        type: 'paragraph',
        text: 'Protected properties are usually prefixed with an underscore _.',
      },
      {
        type: 'paragraph',
        text: 'That is not enforced on the language level, but there’s a well-known convention between programmers that such properties and methods should not be accessed from the outside.',
      },
      {
        type: 'paragraph',
        text: 'So our property will be called _waterAmount:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'class CoffeeMachine {\n  _waterAmount = 0;\n\n  set waterAmount(value) {\n    if (value < 0) {\n      value = 0;\n    }\n    this._waterAmount = value;\n  }\n\n  get waterAmount() {\n    return this._waterAmount;\n  }\n\n  constructor(power) {\n    this._power = power;\n  }\n\n}\n\n// create the coffee machine\nlet coffeeMachine = new CoffeeMachine(100);\n\n// add water\ncoffeeMachine.waterAmount = -10; // _waterAmount will become 0, not -10',
        },
      },
      {
        type: 'paragraph',
        text: 'Now the access is under control, so setting the water amount below zero becomes impossible.',
      },
      {
        type: 'paragraph',
        text: 'For power property, let’s make it read-only. It sometimes happens that a property must be set at creation time only, and then never modified.',
      },
      {
        type: 'paragraph',
        text: 'That’s exactly the case for a coffee machine: power never changes.',
      },
      {
        type: 'paragraph',
        text: 'To do so, we only need to make getter, but not the setter:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'class CoffeeMachine {\n  // ...\n\n  constructor(power) {\n    this._power = power;\n  }\n\n  get power() {\n    return this._power;\n  }\n\n}\n\n// create the coffee machine\nlet coffeeMachine = new CoffeeMachine(100);\n\nalert(`Power is: ${coffeeMachine.power}W`); // Power is: 100W\n\ncoffeeMachine.power = 25; // Error (no setter)',
        },
      },
      {
        type: 'paragraph',
        text: 'Getter/setter functions',
      },
      {
        type: 'paragraph',
        text: 'Here we used getter/setter syntax.',
      },
      {
        type: 'paragraph',
        text: 'But most of the time get.../set... functions are preferred, like this:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'class CoffeeMachine {\n  _waterAmount = 0;\n\n  setWaterAmount(value) {\n    if (value < 0) value = 0;\n    this._waterAmount = value;\n  }\n\n  getWaterAmount() {\n    return this._waterAmount;\n  }\n}\n\nnew CoffeeMachine().setWaterAmount(100);',
        },
      },
      {
        type: 'paragraph',
        text: 'That looks a bit longer, but functions are more flexible. They can accept multiple arguments (even if we don’t need them right now).',
      },
      {
        type: 'paragraph',
        text: 'On the other hand, get/set syntax is shorter, so ultimately there’s no strict rule, it’s up to you to decide.',
      },
      {
        type: 'paragraph',
        text: 'Protected fields are inherited',
      },
      {
        type: 'paragraph',
        text: 'If we inherit class MegaMachine extends CoffeeMachine, then nothing prevents us from accessing this._waterAmount or this._power from the methods of the new class.',
      },
      {
        type: 'paragraph',
        text: 'So protected fields are naturally inheritable. Unlike private ones that we’ll see below.',
      },
      {
        type: 'paragraph',
        text: 'A recent addition',
      },
      {
        type: 'paragraph',
        text: 'This is a recent addition to the language. Not supported in JavaScript engines, or supported partially yet, requires polyfilling.',
      },
      {
        type: 'paragraph',
        text: 'There’s a finished JavaScript proposal, almost in the standard, that provides language-level support for private properties and methods.',
      },
      {
        type: 'paragraph',
        text: 'Privates should start with #. They are only accessible from inside the class.',
      },
      {
        type: 'paragraph',
        text: 'For instance, here’s a private #waterLimit property and the water-checking private method #fixWaterAmount:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "class CoffeeMachine {\n  #waterLimit = 200;\n\n  #fixWaterAmount(value) {\n    if (value < 0) return 0;\n    if (value > this.#waterLimit) return this.#waterLimit;\n  }\n\n  setWaterAmount(value) {\n    this.#waterLimit = this.#fixWaterAmount(value);\n  }\n\n}\n\nlet coffeeMachine = new CoffeeMachine();\n\n// can't access privates from outside of the class\ncoffeeMachine.#fixWaterAmount(123); // Error\ncoffeeMachine.#waterLimit = 1000; // Error",
        },
      },
      {
        type: 'paragraph',
        text: 'On the language level, # is a special sign that the field is private. We can’t access it from outside or from inheriting classes.',
      },
      {
        type: 'paragraph',
        text: 'Private fields do not conflict with public ones. We can have both private #waterAmount and public waterAmount fields at the same time.',
      },
      {
        type: 'paragraph',
        text: 'For instance, let’s make waterAmount an accessor for #waterAmount:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'class CoffeeMachine {\n\n  #waterAmount = 0;\n\n  get waterAmount() {\n    return this.#waterAmount;\n  }\n\n  set waterAmount(value) {\n    if (value < 0) value = 0;\n    this.#waterAmount = value;\n  }\n}\n\nlet machine = new CoffeeMachine();\n\nmachine.waterAmount = 100;\nalert(machine.#waterAmount); // Error',
        },
      },
      {
        type: 'paragraph',
        text: 'Unlike protected ones, private fields are enforced by the language itself. That’s a good thing.',
      },
      {
        type: 'paragraph',
        text: 'But if we inherit from CoffeeMachine, then we’ll have no direct access to #waterAmount. We’ll need to rely on waterAmount getter/setter:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'class MegaCoffeeMachine extends CoffeeMachine {\n  method() {\n    alert( this.#waterAmount ); // Error: can only access from CoffeeMachine\n  }\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'In many scenarios such limitation is too severe. If we extend a CoffeeMachine, we may have legitimate reasons to access its internals. That’s why protected fields are used more often, even though they are not supported by the language syntax.',
      },
      {
        type: 'paragraph',
        text: 'Private fields are not available as this[name]',
      },
      {
        type: 'paragraph',
        text: 'Private fields are special.',
      },
      {
        type: 'paragraph',
        text: 'As we know, usually we can access fields using this[name]:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'class User {\n  ...\n  sayHi() {\n    let fieldName = "name";\n    alert(`Hello, ${this[fieldName]}`);\n  }\n}',
        },
      },
      {
        type: 'paragraph',
        text: "With private fields that’s impossible: this['#name'] doesn’t work. That’s a syntax limitation to ensure privacy.",
      },
      {
        type: 'paragraph',
        text: 'In terms of OOP, delimiting of the internal interface from the external one is called encapsulation.',
      },
      {
        type: 'paragraph',
        text: 'It gives the following benefits:',
      },
      {
        type: 'paragraph',
        text: 'Protection for users, so that they don’t shoot themselves in the foot',
      },
      {
        type: 'paragraph',
        text: 'Imagine, there’s a team of developers using a coffee machine. It was made by the “Best CoffeeMachine” company, and works fine, but a protective cover was removed. So the internal interface is exposed.',
      },
      {
        type: 'paragraph',
        text: 'All developers are civilized – they use the coffee machine as intended. But one of them, John, decided that he’s the smartest one, and made some tweaks in the coffee machine internals. So the coffee machine failed two days later.',
      },
      {
        type: 'paragraph',
        text: 'That’s surely not John’s fault, but rather the person who removed the protective cover and let John do his manipulations.',
      },
      {
        type: 'paragraph',
        text: 'The same in programming. If a user of a class will change things not intended to be changed from the outside – the consequences are unpredictable.',
      },
      {
        type: 'paragraph',
        text: 'Supportable',
      },
      {
        type: 'paragraph',
        text: 'The situation in programming is more complex than with a real-life coffee machine, because we don’t just buy it once. The code constantly undergoes development and improvement.',
      },
      {
        type: 'paragraph',
        text: 'If we strictly delimit the internal interface, then the developer of the class can freely change its internal properties and methods, even without informing the users.',
      },
      {
        type: 'paragraph',
        text: 'If you’re a developer of such class, it’s great to know that private methods can be safely renamed, their parameters can be changed, and even removed, because no external code depends on them.',
      },
      {
        type: 'paragraph',
        text: 'For users, when a new version comes out, it may be a total overhaul internally, but still simple to upgrade if the external interface is the same.',
      },
      {
        type: 'paragraph',
        text: 'Hiding complexity',
      },
      {
        type: 'paragraph',
        text: 'People adore using things that are simple. At least from outside. What’s inside is a different thing.',
      },
      {
        type: 'paragraph',
        text: 'Programmers are not an exception.',
      },
      {
        type: 'paragraph',
        text: 'It’s always convenient when implementation details are hidden, and a simple, well-documented external interface is available.',
      },
      {
        type: 'paragraph',
        text: 'To hide an internal interface we use either protected or private properties:',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'Protected fields start with _. That’s a well-known convention, not enforced at the language level. Programmers should only access a field starting with _ from its class and classes inheriting from it.',
          'Private fields start with #. JavaScript makes sure we can only access those from inside the class.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Right now, private fields are not well-supported among browsers, but can be polyfilled.',
      },
    ],
  },
} satisfies Record<string, ContentTopic>;
