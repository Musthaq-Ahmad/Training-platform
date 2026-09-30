import type { ContentTopic } from '../../../types';

export const tsclassesTopics = {
  tsclasses: {
    id: 'tsclasses',
    heading: 'Class Members',
    blocks: [
      {
        type: 'paragraph',
        text: 'Here’s the most basic class - an empty one:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'class Point {}',
        },
      },
      {
        type: 'paragraph',
        text: 'This class isn’t very useful yet, so let’s start adding some members.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Fields',
      },
      {
        type: 'paragraph',
        text: 'A field declaration creates a public writeable property on a class:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'class Point {\n  x: number;\n  y: number;\n}\n \nconst pt = new Point();\npt.x = 0;\npt.y = 0;',
        },
      },
      {
        type: 'paragraph',
        text: 'As with other locations, the type annotation is optional, but will be an implicit any if not specified.',
      },
      {
        type: 'paragraph',
        text: 'Fields can also have initializers; these will run automatically when the class is instantiated:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'class Point {\n  x = 0;\n  y = 0;\n}\n \nconst pt = new Point();\n// Prints 0, 0\nconsole.log(`${pt.x}, ${pt.y}`);',
        },
      },
      {
        type: 'paragraph',
        text: 'Just like with const, let, and var, the initializer of a class property will be used to infer its type:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'const pt = new Point();\npt.x = "0";',
        },
      },
      {
        type: 'subheading',
        level: 4,
        text: '--strictPropertyInitialization',
      },
      {
        type: 'paragraph',
        text: 'The strictPropertyInitialization setting controls whether class fields need to be initialized in the constructor.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'class BadGreeter {\n  name: string;\n}',
        },
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'class GoodGreeter {\n  name: string;\n \n  constructor() {\n    this.name = "hello";\n  }\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'Note that the field needs to be initialized in the constructor itself. TypeScript does not analyze methods you invoke from the constructor to detect initializations, because a derived class might override those methods and fail to initialize the members.',
      },
      {
        type: 'paragraph',
        text: 'If you intend to definitely initialize a field through means other than the constructor (for example, maybe an external library is filling in part of your class for you), you can use the definite assignment assertion operator, !:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'class OKGreeter {\n  // Not initialized, but no error\n  name!: string;\n}',
        },
      },
      {
        type: 'subheading',
        level: 3,
        text: 'readonly',
      },
      {
        type: 'paragraph',
        text: 'Fields may be prefixed with the readonly modifier. This prevents assignments to the field outside of the constructor.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'class Greeter {\n  readonly name: string = "world";\n \n  constructor(otherName?: string) {\n    if (otherName !== undefined) {\n      this.name = otherName;\n    }\n  }\n \n  err() {\n    this.name = "not ok";\n  }\n}\nconst g = new Greeter();\ng.name = "also not ok";',
        },
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Constructors',
      },
      {
        type: 'paragraph',
        text: 'Class constructors are very similar to functions. You can add parameters with type annotations, default values, and overloads:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'class Point {\n  x: number;\n  y: number;\n \n  // Normal signature with defaults\n  constructor(x = 0, y = 0) {\n    this.x = x;\n    this.y = y;\n  }\n}',
        },
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'class Point {\n  x: number = 0;\n  y: number = 0;\n \n  // Constructor overloads\n  constructor(x: number, y: number);\n  constructor(xy: string);\n  constructor(x: string | number, y: number = 0) {\n    // Code logic here\n  }\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'There are just a few differences between class constructor signatures and function signatures:',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'Constructors can’t have type parameters - these belong on the outer class declaration, which we’ll learn about later',
          'Constructors can’t have return type annotations - the class instance type is always what’s returned',
        ],
      },
      {
        type: 'subheading',
        level: 4,
        text: 'Super Calls',
      },
      {
        type: 'paragraph',
        text: 'Just as in JavaScript, if you have a base class, you’ll need to call super(); in your constructor body before using any this. members:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'class Base {\n  k = 4;\n}\n \nclass Derived extends Base {\n  constructor() {\n    // Prints a wrong value in ES5; throws exception in ES6\n    console.log(this.k);\n    super();\n  }\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'Forgetting to call super is an easy mistake to make in JavaScript, but TypeScript will tell you when it’s necessary.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Methods',
      },
      {
        type: 'paragraph',
        text: 'A function property on a class is called a method. Methods can use all the same type annotations as functions and constructors:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'class Point {\n  x = 10;\n  y = 10;\n \n  scale(n: number): void {\n    this.x *= n;\n    this.y *= n;\n  }\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'Other than the standard type annotations, TypeScript doesn’t add anything else new to methods.',
      },
      {
        type: 'paragraph',
        text: 'Note that inside a method body, it is still mandatory to access fields and other methods via this.. An unqualified name in a method body will always refer to something in the enclosing scope:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'let x: number = 0;\n \nclass C {\n  x: string = "hello";\n \n  m() {\n    // This is trying to modify \'x\' from line 1, not the class property\n    x = "world";\n  }\n}',
        },
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Getters / Setters',
      },
      {
        type: 'paragraph',
        text: 'Classes can also have accessors:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'class C {\n  _length = 0;\n  get length() {\n    return this._length;\n  }\n  set length(value) {\n    this._length = value;\n  }\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'TypeScript has some special inference rules for accessors:',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'If get exists but no set, the property is automatically readonly',
          'If the type of the setter parameter is not specified, it is inferred from the return type of the getter',
        ],
      },
      {
        type: 'paragraph',
        text: 'Since TypeScript 4.3, it is possible to have accessors with different types for getting and setting.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: "class Thing {\n  _size = 0;\n \n  get size(): number {\n    return this._size;\n  }\n \n  set size(value: string | number | boolean) {\n    let num = Number(value);\n \n    // Don't allow NaN, Infinity, etc\n \n    if (!Number.isFinite(num)) {\n      this._size = 0;\n      return;\n    }\n \n    this._size = num;\n  }\n}",
        },
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Index Signatures',
      },
      {
        type: 'paragraph',
        text: 'Classes can declare index signatures; these work the same as Index Signatures for other object types:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'class MyClass {\n  [s: string]: boolean | ((s: string) => boolean);\n \n  check(s: string) {\n    return this[s] as boolean;\n  }\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'Because the index signature type needs to also capture the types of methods, it’s not easy to usefully use these types. Generally it’s better to store indexed data in another place instead of on the class instance itself.',
      },
      {
        type: 'paragraph',
        text: 'Like other languages with object-oriented features, classes in JavaScript can inherit from base classes.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'implements Clauses',
      },
      {
        type: 'paragraph',
        text: 'You can use an implements clause to check that a class satisfies a particular interface. An error will be issued if a class fails to correctly implement it:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'interface Pingable {\n  ping(): void;\n}\n \nclass Sonar implements Pingable {\n  ping() {\n    console.log("ping!");\n  }\n}\n \nclass Ball implements Pingable {\n  pong() {\n    console.log("pong!");\n  }\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'Classes may also implement multiple interfaces, e.g. class C implements A, B {.',
      },
      {
        type: 'subheading',
        level: 4,
        text: 'Cautions',
      },
      {
        type: 'paragraph',
        text: 'It’s important to understand that an implements clause is only a check that the class can be treated as the interface type. It doesn’t change the type of the class or its methods at all. A common source of error is to assume that an implements clause will change the class type - it doesn’t!',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'interface Checkable {\n  check(name: string): boolean;\n}\n \nclass NameChecker implements Checkable {\n  check(s) {\n    // Notice no error here\n    return s.toLowerCase() === "ok";\n  }\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'In this example, we perhaps expected that s’s type would be influenced by the name: string parameter of check. It is not - implements clauses don’t change how the class body is checked or its type inferred.',
      },
      {
        type: 'paragraph',
        text: 'Similarly, implementing an interface with an optional property doesn’t create that property:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'interface A {\n  x: number;\n  y?: number;\n}\nclass C implements A {\n  x = 0;\n}\nconst c = new C();\nc.y = 10;',
        },
      },
      {
        type: 'subheading',
        level: 3,
        text: 'extends Clauses',
      },
      {
        type: 'paragraph',
        text: 'Classes may extend from a base class. A derived class has all the properties and methods of its base class, and can also define additional members.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'class Animal {\n  move() {\n    console.log("Moving along!");\n  }\n}\n \nclass Dog extends Animal {\n  woof(times: number) {\n    for (let i = 0; i < times; i++) {\n      console.log("woof!");\n    }\n  }\n}\n \nconst d = new Dog();\n// Base class method\nd.move();\n// Derived class method\nd.woof(3);',
        },
      },
      {
        type: 'subheading',
        level: 4,
        text: 'Overriding Methods',
      },
      {
        type: 'paragraph',
        text: 'A derived class can also override a base class field or property. You can use the super. syntax to access base class methods. Note that because JavaScript classes are a simple lookup object, there is no notion of a “super field”.',
      },
      {
        type: 'paragraph',
        text: 'TypeScript enforces that a derived class is always a subtype of its base class.',
      },
      {
        type: 'paragraph',
        text: 'For example, here’s a legal way to override a method:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'class Base {\n  greet() {\n    console.log("Hello, world!");\n  }\n}\n \nclass Derived extends Base {\n  greet(name?: string) {\n    if (name === undefined) {\n      super.greet();\n    } else {\n      console.log(`Hello, ${name.toUpperCase()}`);\n    }\n  }\n}\n \nconst d = new Derived();\nd.greet();\nd.greet("reader");',
        },
      },
      {
        type: 'paragraph',
        text: 'It’s important that a derived class follow its base class contract. Remember that it’s very common (and always legal!) to refer to a derived class instance through a base class reference:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: '// Alias the derived instance through a base class reference\nconst b: Base = d;\n// No problem\nb.greet();',
        },
      },
      {
        type: 'paragraph',
        text: 'What if Derived didn’t follow Base’s contract?',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'class Base {\n  greet() {\n    console.log("Hello, world!");\n  }\n}\n \nclass Derived extends Base {\n  // Make this parameter required\n  greet(name: string) {\n    console.log(`Hello, ${name.toUpperCase()}`);\n  }\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'If we compiled this code despite the error, this sample would then crash:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'const b: Base = new Derived();\n// Crashes because "name" will be undefined\nb.greet();',
        },
      },
      {
        type: 'subheading',
        level: 4,
        text: 'Type-only Field Declarations',
      },
      {
        type: 'paragraph',
        text: 'When target &gt;= ES2022 or useDefineForClassFields is true, class fields are initialized after the parent class constructor completes, overwriting any value set by the parent class. This can be a problem when you only want to re-declare a more accurate type for an inherited field. To handle these cases, you can write declare to indicate to TypeScript that there should be no runtime effect for this field declaration.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'interface Animal {\n  dateOfBirth: any;\n}\n \ninterface Dog extends Animal {\n  breed: any;\n}\n \nclass AnimalHouse {\n  resident: Animal;\n  constructor(animal: Animal) {\n    this.resident = animal;\n  }\n}\n \nclass DogHouse extends AnimalHouse {\n  // Does not emit JavaScript code,\n  // only ensures the types are correct\n  declare resident: Dog;\n  constructor(dog: Dog) {\n    super(dog);\n  }\n}',
        },
      },
      {
        type: 'subheading',
        level: 4,
        text: 'Initialization Order',
      },
      {
        type: 'paragraph',
        text: 'The order that JavaScript classes initialize can be surprising in some cases. Let’s consider this code:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'class Base {\n  name = "base";\n  constructor() {\n    console.log("My name is " + this.name);\n  }\n}\n \nclass Derived extends Base {\n  name = "derived";\n}\n \n// Prints "base", not "derived"\nconst d = new Derived();',
        },
      },
      {
        type: 'paragraph',
        text: 'What happened here?',
      },
      {
        type: 'paragraph',
        text: 'The order of class initialization, as defined by JavaScript, is:',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'The base class fields are initialized',
          'The base class constructor runs',
          'The derived class fields are initialized',
          'The derived class constructor runs',
        ],
      },
      {
        type: 'paragraph',
        text: 'This means that the base class constructor saw its own value for name during its own constructor, because the derived class field initializations hadn’t run yet.',
      },
      {
        type: 'subheading',
        level: 4,
        text: 'Inheriting Built-in Types',
      },
      {
        type: 'paragraph',
        text: 'In ES2015, constructors which return an object implicitly substitute the value of this for any callers of super(...). It is necessary for generated constructor code to capture any potential return value of super(...) and replace it with this.',
      },
      {
        type: 'paragraph',
        text: 'As a result, subclassing Error, Array, and others may no longer work as expected. This is due to the fact that constructor functions for Error, Array, and the like use ECMAScript 6’s new.target to adjust the prototype chain; however, there is no way to ensure a value for new.target when invoking a constructor in ECMAScript 5. Other downlevel compilers generally have the same limitation by default.',
      },
      {
        type: 'paragraph',
        text: 'For a subclass like the following:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'class MsgError extends Error {\n  constructor(m: string) {\n    super(m);\n  }\n  sayHello() {\n    return "hello " + this.message;\n  }\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'you may find that:',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'methods may be undefined on objects returned by constructing these subclasses, so calling sayHello will result in an error.',
          'instanceof will be broken between instances of the subclass and their instances, so (new MsgError()) instanceof MsgError will return false.',
        ],
      },
      {
        type: 'paragraph',
        text: 'As a recommendation, you can manually adjust the prototype immediately after any super(...) calls.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'class MsgError extends Error {\n  constructor(m: string) {\n    super(m);\n \n    // Set the prototype explicitly.\n    Object.setPrototypeOf(this, MsgError.prototype);\n  }\n \n  sayHello() {\n    return "hello " + this.message;\n  }\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'However, any subclass of MsgError will have to manually set the prototype as well. For runtimes that don’t support Object.setPrototypeOf, you may instead be able to use __proto__.',
      },
      {
        type: 'paragraph',
        text: 'Unfortunately, these workarounds will not work on Internet Explorer 10 and prior. One can manually copy methods from the prototype onto the instance itself (i.e. MsgError.prototype onto this), but the prototype chain itself cannot be fixed.',
      },
      {
        type: 'paragraph',
        text: 'You can use TypeScript to control whether certain methods or properties are visible to code outside the class.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'public',
      },
      {
        type: 'paragraph',
        text: 'The default visibility of class members is public. A public member can be accessed anywhere:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'class Greeter {\n  public greet() {\n    console.log("hi!");\n  }\n}\nconst g = new Greeter();\ng.greet();',
        },
      },
      {
        type: 'paragraph',
        text: 'Because public is already the default visibility modifier, you don’t ever need to write it on a class member, but might choose to do so for style/readability reasons.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'protected',
      },
      {
        type: 'paragraph',
        text: 'protected members are only visible to subclasses of the class they’re declared in.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'class Greeter {\n  public greet() {\n    console.log("Hello, " + this.getName());\n  }\n  protected getName() {\n    return "hi";\n  }\n}\n \nclass SpecialGreeter extends Greeter {\n  public howdy() {\n    // OK to access protected member here\n    console.log("Howdy, " + this.getName());\n  }\n}\nconst g = new SpecialGreeter();\ng.greet(); // OK\ng.getName();',
        },
      },
      {
        type: 'subheading',
        level: 4,
        text: 'Exposure of protected members',
      },
      {
        type: 'paragraph',
        text: 'Derived classes need to follow their base class contracts, but may choose to expose a subtype of base class with more capabilities. This includes making protected members public:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: "class Base {\n  protected m = 10;\n}\nclass Derived extends Base {\n  // No modifier, so default is 'public'\n  m = 15;\n}\nconst d = new Derived();\nconsole.log(d.m); // OK",
        },
      },
      {
        type: 'paragraph',
        text: 'Note that Derived was already able to freely read and write m, so this doesn’t meaningfully alter the “security” of this situation. The main thing to note here is that in the derived class, we need to be careful to repeat the protected modifier if this exposure isn’t intentional.',
      },
      {
        type: 'subheading',
        level: 4,
        text: 'Cross-hierarchy protected access',
      },
      {
        type: 'paragraph',
        text: 'TypeScript doesn’t allow accessing protected members of a sibling class in a class hierarchy:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'class Base {\n  protected x: number = 1;\n}\nclass Derived1 extends Base {\n  protected x: number = 5;\n}\nclass Derived2 extends Base {\n  f1(other: Derived2) {\n    other.x = 10;\n  }\n  f2(other: Derived1) {\n    other.x = 10;\n  }\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'This is because accessing x in Derived2 should only be legal from Derived2’s subclasses, and Derived1 isn’t one of them. Moreover, if accessing x through a Derived1 reference is illegal (which it certainly should be!), then accessing it through a base class reference should never improve the situation.',
      },
      {
        type: 'paragraph',
        text: 'See also Why Can’t I Access A Protected Member From A Derived Class? which explains more of C#‘s reasoning on the same topic.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'private',
      },
      {
        type: 'paragraph',
        text: 'private is like protected, but doesn’t allow access to the member even from subclasses:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: "class Base {\n  private x = 0;\n}\nconst b = new Base();\n// Can't access from outside the class\nconsole.log(b.x);",
        },
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: "class Derived extends Base {\n  showX() {\n    // Can't access in subclasses\n    console.log(this.x);\n  }\n}",
        },
      },
      {
        type: 'paragraph',
        text: 'Because private members aren’t visible to derived classes, a derived class can’t increase their visibility:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'class Base {\n  private x = 0;\n}\nclass Derived extends Base {\n  x = 1;\n}',
        },
      },
      {
        type: 'subheading',
        level: 4,
        text: 'Cross-instance private access',
      },
      {
        type: 'paragraph',
        text: 'Different OOP languages disagree about whether different instances of the same class may access each others’ private members. While languages like Java, C#, C++, Swift, and PHP allow this, Ruby does not.',
      },
      {
        type: 'paragraph',
        text: 'TypeScript does allow cross-instance private access:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'class A {\n  private x = 10;\n \n  public sameAs(other: A) {\n    // No error\n    return other.x === this.x;\n  }\n}',
        },
      },
      {
        type: 'subheading',
        level: 4,
        text: 'Caveats',
      },
      {
        type: 'paragraph',
        text: 'Like other aspects of TypeScript’s type system, private and protected are only enforced during type checking.',
      },
      {
        type: 'paragraph',
        text: 'This means that JavaScript runtime constructs like in or simple property lookup can still access a private or protected member:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'class MySafe {\n  private secretKey = 12345;\n}',
        },
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: '// In a JavaScript file...\nconst s = new MySafe();\n// Will print 12345\nconsole.log(s.secretKey);',
        },
      },
      {
        type: 'paragraph',
        text: 'private also allows access using bracket notation during type checking. This makes private-declared fields potentially easier to access for things like unit tests, with the drawback that these fields are soft private and don’t strictly enforce privacy.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'class MySafe {\n  private secretKey = 12345;\n}\n \nconst s = new MySafe();\n \n// Not allowed during type checking\nconsole.log(s.secretKey);\n \n// OK\nconsole.log(s["secretKey"]);',
        },
      },
      {
        type: 'paragraph',
        text: 'Unlike TypeScripts’s private, JavaScript’s private fields (#) remain private after compilation and do not provide the previously mentioned escape hatches like bracket notation access, making them hard private.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'class Dog {\n  #barkAmount = 0;\n  personality = "happy";\n \n  constructor() {}\n}',
        },
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: '"use strict";\nclass Dog {\n    #barkAmount = 0;\n    personality = "happy";\n    constructor() { }\n}\n ',
        },
      },
      {
        type: 'paragraph',
        text: 'When compiling to ES2021 or less, TypeScript will use WeakMaps in place of #.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: '"use strict";\nvar _Dog_barkAmount;\nclass Dog {\n    constructor() {\n        _Dog_barkAmount.set(this, 0);\n        this.personality = "happy";\n    }\n}\n_Dog_barkAmount = new WeakMap();\n ',
        },
      },
      {
        type: 'paragraph',
        text: 'If you need to protect values in your class from malicious actors, you should use mechanisms that offer hard runtime privacy, such as closures, WeakMaps, or private fields. Note that these added privacy checks during runtime could affect performance.',
      },
      {
        type: 'paragraph',
        text: 'Classes may have static members. These members aren’t associated with a particular instance of the class. They can be accessed through the class constructor object itself:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'class MyClass {\n  static x = 0;\n  static printX() {\n    console.log(MyClass.x);\n  }\n}\nconsole.log(MyClass.x);\nMyClass.printX();',
        },
      },
      {
        type: 'paragraph',
        text: 'Static members can also use the same public, protected, and private visibility modifiers:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'class MyClass {\n  private static x = 0;\n}\nconsole.log(MyClass.x);',
        },
      },
      {
        type: 'paragraph',
        text: 'Static members are also inherited:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'class Base {\n  static getGreeting() {\n    return "Hello world";\n  }\n}\nclass Derived extends Base {\n  myGreeting = Derived.getGreeting();\n}',
        },
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Special Static Names',
      },
      {
        type: 'paragraph',
        text: 'It’s generally not safe/possible to overwrite properties from the Function prototype. Because classes are themselves functions that can be invoked with new, certain static names can’t be used. Function properties like name, length, and call aren’t valid to define as static members:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'class S {\n  static name = "S!";\n}',
        },
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Why No Static Classes?',
      },
      {
        type: 'paragraph',
        text: 'TypeScript (and JavaScript) don’t have a construct called static class the same way as, for example, C# does.',
      },
      {
        type: 'paragraph',
        text: 'Those constructs only exist because those languages force all data and functions to be inside a class; because that restriction doesn’t exist in TypeScript, there’s no need for them. A class with only a single instance is typically just represented as a normal object in JavaScript/TypeScript.',
      },
      {
        type: 'paragraph',
        text: 'For example, we don’t need a “static class” syntax in TypeScript because a regular object (or even top-level function) will do the job just as well:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: '// Unnecessary "static" class\nclass MyStaticClass {\n  static doSomething() {}\n}\n \n// Preferred (alternative 1)\nfunction doSomething() {}\n \n// Preferred (alternative 2)\nconst MyHelperObject = {\n  dosomething() {},\n};',
        },
      },
      {
        type: 'paragraph',
        text: 'Static blocks allow you to write a sequence of statements with their own scope that can access private fields within the containing class. This means that we can write initialization code with all the capabilities of writing statements, no leakage of variables, and full access to our class’s internals.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'class Foo {\n    static #count = 0;\n \n    get count() {\n        return Foo.#count;\n    }\n \n    static {\n        try {\n            const lastInstances = loadLastInstances();\n            Foo.#count += lastInstances.length;\n        }\n        catch {}\n    }\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'Classes, much like interfaces, can be generic. When a generic class is instantiated with new, its type parameters are inferred the same way as in a function call:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'class Box<Type> {\n  contents: Type;\n  constructor(value: Type) {\n    this.contents = value;\n  }\n}\n \nconst b = new Box("hello!");',
        },
      },
      {
        type: 'paragraph',
        text: 'Classes can use generic constraints and defaults the same way as interfaces.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Type Parameters in Static Members',
      },
      {
        type: 'paragraph',
        text: 'This code isn’t legal, and it may not be obvious why:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'class Box<Type> {\n  static defaultValue: Type;\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'Remember that types are always fully erased! At runtime, there’s only one Box.defaultValue property slot. This means that setting Box<string>.defaultValue (if that were possible) would also change Box<number>.defaultValue - not good. The static members of a generic class can never refer to the class’s type parameters.',
      },
      {
        type: 'paragraph',
        text: 'It’s important to remember that TypeScript doesn’t change the runtime behavior of JavaScript, and that JavaScript is somewhat famous for having some peculiar runtime behaviors.',
      },
      {
        type: 'paragraph',
        text: 'JavaScript’s handling of this is indeed unusual:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'class MyClass {\n  name = "MyClass";\n  getName() {\n    return this.name;\n  }\n}\nconst c = new MyClass();\nconst obj = {\n  name: "obj",\n  getName: c.getName,\n};\n \n// Prints "obj", not "MyClass"\nconsole.log(obj.getName());',
        },
      },
      {
        type: 'paragraph',
        text: 'Long story short, by default, the value of this inside a function depends on how the function was called. In this example, because the function was called through the obj reference, its value of this was obj rather than the class instance.',
      },
      {
        type: 'paragraph',
        text: 'This is rarely what you want to happen! TypeScript provides some ways to mitigate or prevent this kind of error.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Arrow Functions',
      },
      {
        type: 'paragraph',
        text: 'If you have a function that will often be called in a way that loses its this context, it can make sense to use an arrow function property instead of a method definition:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'class MyClass {\n  name = "MyClass";\n  getName = () => {\n    return this.name;\n  };\n}\nconst c = new MyClass();\nconst g = c.getName;\n// Prints "MyClass" instead of crashing\nconsole.log(g());',
        },
      },
      {
        type: 'paragraph',
        text: 'This has some trade-offs:',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'The this value is guaranteed to be correct at runtime, even for code not checked with TypeScript',
          'This will use more memory, because each class instance will have its own copy of each function defined this way',
          'You can’t use super.getName in a derived class, because there’s no entry in the prototype chain to fetch the base class method from',
        ],
      },
      {
        type: 'subheading',
        level: 3,
        text: 'this parameters',
      },
      {
        type: 'paragraph',
        text: 'In a method or function definition, an initial parameter named this has special meaning in TypeScript. These parameters are erased during compilation:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: "// TypeScript input with 'this' parameter\nfunction fn(this: SomeType, x: number) {\n  /* ... */\n}",
        },
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: '// JavaScript output\nfunction fn(x) {\n  /* ... */\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'TypeScript checks that calling a function with a this parameter is done so with a correct context. Instead of using an arrow function, we can add a this parameter to method definitions to statically enforce that the method is called correctly:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'class MyClass {\n  name = "MyClass";\n  getName(this: MyClass) {\n    return this.name;\n  }\n}\nconst c = new MyClass();\n// OK\nc.getName();\n \n// Error, would crash\nconst g = c.getName;\nconsole.log(g());',
        },
      },
      {
        type: 'paragraph',
        text: 'This method makes the opposite trade-offs of the arrow function approach:',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'JavaScript callers might still use the class method incorrectly without realizing it',
          'Only one function per class definition gets allocated, rather than one per class instance',
          'Base method definitions can still be called via super.',
        ],
      },
      {
        type: 'paragraph',
        text: 'In classes, a special type called this refers dynamically to the type of the current class. Let’s see how this is useful:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'class Box {\n  contents: string = "";\n  set(value: string) {\n    this.contents = value;\n    return this;\n  }\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'Here, TypeScript inferred the return type of set to be this, rather than Box. Now let’s make a subclass of Box:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'class ClearableBox extends Box {\n  clear() {\n    this.contents = "";\n  }\n}\n \nconst a = new ClearableBox();\nconst b = a.set("hello");',
        },
      },
      {
        type: 'paragraph',
        text: 'You can also use this in a parameter type annotation:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'class Box {\n  content: string = "";\n  sameAs(other: this) {\n    return other.content === this.content;\n  }\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'This is different from writing other: Box — if you have a derived class, its sameAs method will now only accept other instances of that same derived class:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'class Box {\n  content: string = "";\n  sameAs(other: this) {\n    return other.content === this.content;\n  }\n}\n \nclass DerivedBox extends Box {\n  otherContent: string = "?";\n}\n \nconst base = new Box();\nconst derived = new DerivedBox();\nderived.sameAs(base);',
        },
      },
      {
        type: 'subheading',
        level: 3,
        text: 'this-based type guards',
      },
      {
        type: 'paragraph',
        text: 'You can use this is Type in the return position for methods in classes and interfaces. When mixed with a type narrowing (e.g. if statements) the type of the target object would be narrowed to the specified Type.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'class FileSystemObject {\n  isFile(): this is FileRep {\n    return this instanceof FileRep;\n  }\n  isDirectory(): this is Directory {\n    return this instanceof Directory;\n  }\n  isNetworked(): this is Networked & this {\n    return this.networked;\n  }\n  constructor(public path: string, private networked: boolean) {}\n}\n \nclass FileRep extends FileSystemObject {\n  constructor(path: string, public content: string) {\n    super(path, false);\n  }\n}\n \nclass Directory extends FileSystemObject {\n  children: FileSystemObject[];\n}\n \ninterface Networked {\n  host: string;\n}\n \nconst fso: FileSystemObject = new FileRep("foo/bar.txt", "foo");\n \nif (fso.isFile()) {\n  fso.content;\n} else if (fso.isDirectory()) {\n  fso.children;\n} else if (fso.isNetworked()) {\n  fso.host;\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'A common use-case for a this-based type guard is to allow for lazy validation of a particular field. For example, this case removes an undefined from the value held inside box when hasValue has been verified to be true:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'class Box<T> {\n  value?: T;\n \n  hasValue(): this is { value: T } {\n    return this.value !== undefined;\n  }\n}\n \nconst box = new Box<string>();\nbox.value = "Gameboy";\n \nbox.value;\n \nif (box.hasValue()) {\n  box.value;\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'TypeScript offers special syntax for turning a constructor parameter into a class property with the same name and value. These are called parameter properties and are created by prefixing a constructor argument with one of the visibility modifiers public, private, protected, or readonly. The resulting field gets those modifier(s):',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'class Params {\n  constructor(\n    public readonly x: number,\n    protected y: number,\n    private z: number\n  ) {\n    // No body necessary\n  }\n}\nconst a = new Params(1, 2, 3);\nconsole.log(a.x);\nconsole.log(a.z);',
        },
      },
      {
        type: 'paragraph',
        text: 'Class expressions are very similar to class declarations. The only real difference is that class expressions don’t need a name, though we can refer to them via whatever identifier they ended up bound to:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'const someClass = class<Type> {\n  content: Type;\n  constructor(value: Type) {\n    this.content = value;\n  }\n};\n \nconst m = new someClass("Hello, world");',
        },
      },
      {
        type: 'paragraph',
        text: 'JavaScript classes are instantiated with the new operator. Given the type of a class itself, the InstanceType utility type models this operation.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'class Point {\n  createdAt: number;\n  x: number;\n  y: number\n  constructor(x: number, y: number) {\n    this.createdAt = Date.now()\n    this.x = x;\n    this.y = y;\n  }\n}\ntype PointInstance = InstanceType<typeof Point>\n \nfunction moveRight(point: PointInstance) {\n  point.x += 5;\n}\n \nconst point = new Point(3, 4);\nmoveRight(point);\npoint.x; // => 8',
        },
      },
      {
        type: 'paragraph',
        text: 'Classes, methods, and fields in TypeScript may be abstract.',
      },
      {
        type: 'paragraph',
        text: 'An abstract method or abstract field is one that hasn’t had an implementation provided. These members must exist inside an abstract class, which cannot be directly instantiated.',
      },
      {
        type: 'paragraph',
        text: 'The role of abstract classes is to serve as a base class for subclasses which do implement all the abstract members. When a class doesn’t have any abstract members, it is said to be concrete.',
      },
      {
        type: 'paragraph',
        text: 'Let’s look at an example:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'abstract class Base {\n  abstract getName(): string;\n \n  printName() {\n    console.log("Hello, " + this.getName());\n  }\n}\n \nconst b = new Base();',
        },
      },
      {
        type: 'paragraph',
        text: 'We can’t instantiate Base with new because it’s abstract. Instead, we need to make a derived class and implement the abstract members:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'class Derived extends Base {\n  getName() {\n    return "world";\n  }\n}\n \nconst d = new Derived();\nd.printName();',
        },
      },
      {
        type: 'paragraph',
        text: 'Notice that if we forget to implement the base class’s abstract members, we’ll get an error:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'class Derived extends Base {\n  // forgot to do anything\n}',
        },
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Abstract Construct Signatures',
      },
      {
        type: 'paragraph',
        text: 'Sometimes you want to accept some class constructor function that produces an instance of a class which derives from some abstract class.',
      },
      {
        type: 'paragraph',
        text: 'For example, you might want to write this code:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'function greet(ctor: typeof Base) {\n  const instance = new ctor();\n  instance.printName();\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'TypeScript is correctly telling you that you’re trying to instantiate an abstract class. After all, given the definition of greet, it’s perfectly legal to write this code, which would end up constructing an abstract class:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: '// Bad!\ngreet(Base);',
        },
      },
      {
        type: 'paragraph',
        text: 'Instead, you want to write a function that accepts something with a construct signature:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'function greet(ctor: new () => Base) {\n  const instance = new ctor();\n  instance.printName();\n}\ngreet(Derived);\ngreet(Base);',
        },
      },
      {
        type: 'paragraph',
        text: 'Now TypeScript correctly tells you about which class constructor functions can be invoked - Derived can because it’s concrete, but Base cannot.',
      },
      {
        type: 'paragraph',
        text: 'In most cases, classes in TypeScript are compared structurally, the same as other types.',
      },
      {
        type: 'paragraph',
        text: 'For example, these two classes can be used in place of each other because they’re identical:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'class Point1 {\n  x = 0;\n  y = 0;\n}\n \nclass Point2 {\n  x = 0;\n  y = 0;\n}\n \n// OK\nconst p: Point1 = new Point2();',
        },
      },
      {
        type: 'paragraph',
        text: 'Similarly, subtype relationships between classes exist even if there’s no explicit inheritance:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'class Person {\n  name: string;\n  age: number;\n}\n \nclass Employee {\n  name: string;\n  age: number;\n  salary: number;\n}\n \n// OK\nconst p: Person = new Employee();',
        },
      },
      {
        type: 'paragraph',
        text: 'This sounds straightforward, but there are a few cases that seem stranger than others.',
      },
      {
        type: 'paragraph',
        text: 'Empty classes have no members. In a structural type system, a type with no members is generally a supertype of anything else. So if you write an empty class (don’t!), anything can be used in place of it:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: "class Empty {}\n \nfunction fn(x: Empty) {\n  // can't do anything with 'x', so I won't\n}\n \n// All OK!\nfn(window);\nfn({});\nfn(fn);",
        },
      },
    ],
  },
} satisfies Record<string, ContentTopic>;
