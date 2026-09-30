import type { ContentTopic } from '../../../types';

export const tseverydaytypesTopics = {
  tseverydaytypes: {
    id: 'tseverydaytypes',
    heading: 'The primitives: string, number, and boolean',
    blocks: [
      {
        type: 'paragraph',
        text: 'JavaScript has three very commonly used primitives: string, number, and boolean. Each has a corresponding type in TypeScript. As you might expect, these are the same names you’d see if you used the JavaScript typeof operator on a value of those types:',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'string represents string values like "Hello, world"',
          'number is for numbers like 42. JavaScript does not have a special runtime value for integers, so there’s no equivalent to int or float - everything is simply number',
          'boolean is for the two values true and false',
        ],
      },
      {
        type: 'paragraph',
        text: 'To specify the type of an array like [1, 2, 3], you can use the syntax number[]; this syntax works for any type (e.g. string[] is an array of strings, and so on). You may also see this written as Array<number>, which means the same thing. We’ll learn more about the syntax T<U> when we cover generics.',
      },
      {
        type: 'paragraph',
        text: 'TypeScript also has a special type, any, that you can use whenever you don’t want a particular value to cause typechecking errors.',
      },
      {
        type: 'paragraph',
        text: 'When a value is of type any, you can access any properties of it (which will in turn be of type any), call it like a function, assign it to (or from) a value of any type, or pretty much anything else that’s syntactically legal:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'let obj: any = { x: 0 };\n// None of the following lines of code will throw compiler errors.\n// Using `any` disables all further type checking, and it is assumed\n// you know the environment better than TypeScript.\nobj.foo();\nobj();\nobj.bar = 100;\nobj = "hello";\nconst n: number = obj;',
        },
      },
      {
        type: 'paragraph',
        text: 'The any type is useful when you don’t want to write out a long type just to convince TypeScript that a particular line of code is okay.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'noImplicitAny',
      },
      {
        type: 'paragraph',
        text: 'When you don’t specify a type, and TypeScript can’t infer it from context, the compiler will typically default to any.',
      },
      {
        type: 'paragraph',
        text: 'You usually want to avoid this, though, because any isn’t type-checked. Use the compiler flag noImplicitAny to flag any implicit any as an error.',
      },
      {
        type: 'paragraph',
        text: 'When you declare a variable using const, var, or let, you can optionally add a type annotation to explicitly specify the type of the variable:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'let myName: string = "Alice";',
        },
      },
      {
        type: 'paragraph',
        text: 'In most cases, though, this isn’t needed. Wherever possible, TypeScript tries to automatically infer the types in your code. For example, the type of a variable is inferred based on the type of its initializer:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: "// No type annotation needed -- 'myName' inferred as type 'string'\nlet myName = \"Alice\";",
        },
      },
      {
        type: 'paragraph',
        text: 'For the most part you don’t need to explicitly learn the rules of inference. If you’re starting out, try using fewer type annotations than you think - you might be surprised how few you need for TypeScript to fully understand what’s going on.',
      },
      {
        type: 'paragraph',
        text: 'Functions are the primary means of passing data around in JavaScript. TypeScript allows you to specify the types of both the input and output values of functions.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Parameter Type Annotations',
      },
      {
        type: 'paragraph',
        text: 'When you declare a function, you can add type annotations after each parameter to declare what types of parameters the function accepts. Parameter type annotations go after the parameter name:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: '// Parameter type annotation\nfunction greet(name: string) {\n  console.log("Hello, " + name.toUpperCase() + "!!");\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'When a parameter has a type annotation, arguments to that function will be checked:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: '// Would be a runtime error if executed!\ngreet(42);',
        },
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Return Type Annotations',
      },
      {
        type: 'paragraph',
        text: 'You can also add return type annotations. Return type annotations appear after the parameter list:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'function getFavoriteNumber(): number {\n  return 26;\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'Much like variable type annotations, you usually don’t need a return type annotation because TypeScript will infer the function’s return type based on its return statements. The type annotation in the above example doesn’t change anything. Some codebases will explicitly specify a return type for documentation purposes, to prevent accidental changes, or just for personal preference.',
      },
      {
        type: 'subheading',
        level: 4,
        text: 'Functions Which Return Promises',
      },
      {
        type: 'paragraph',
        text: 'If you want to annotate the return type of a function which returns a promise, you should use the Promise type:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'async function getFavoriteNumber(): Promise<number> {\n  return 26;\n}',
        },
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Anonymous Functions',
      },
      {
        type: 'paragraph',
        text: 'Anonymous functions are a little bit different from function declarations. When a function appears in a place where TypeScript can determine how it’s going to be called, the parameters of that function are automatically given types.',
      },
      {
        type: 'paragraph',
        text: 'Here’s an example:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'const names = ["Alice", "Bob", "Eve"];\n \n// Contextual typing for function - parameter s inferred to have type string\nnames.forEach(function (s) {\n  console.log(s.toUpperCase());\n});\n \n// Contextual typing also applies to arrow functions\nnames.forEach((s) => {\n  console.log(s.toUpperCase());\n});',
        },
      },
      {
        type: 'paragraph',
        text: 'Even though the parameter s didn’t have a type annotation, TypeScript used the types of the forEach function, along with the inferred type of the array, to determine the type s will have.',
      },
      {
        type: 'paragraph',
        text: 'This process is called contextual typing because the context that the function occurred within informs what type it should have.',
      },
      {
        type: 'paragraph',
        text: 'Similar to the inference rules, you don’t need to explicitly learn how this happens, but understanding that it does happen can help you notice when type annotations aren’t needed. Later, we’ll see more examples of how the context that a value occurs in can affect its type.',
      },
      {
        type: 'paragraph',
        text: 'Apart from primitives, the most common sort of type you’ll encounter is an object type. This refers to any JavaScript value with properties, which is almost all of them! To define an object type, we simply list its properties and their types.',
      },
      {
        type: 'paragraph',
        text: 'For example, here’s a function that takes a point-like object:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: '// The parameter\'s type annotation is an object type\nfunction printCoord(pt: { x: number; y: number }) {\n  console.log("The coordinate\'s x value is " + pt.x);\n  console.log("The coordinate\'s y value is " + pt.y);\n}\nprintCoord({ x: 3, y: 7 });',
        },
      },
      {
        type: 'paragraph',
        text: 'Here, we annotated the parameter with a type with two properties - x and y - which are both of type number. You can use , or ; to separate the properties, and the last separator is optional either way.',
      },
      {
        type: 'paragraph',
        text: 'The type part of each property is also optional. If you don’t specify a type, it will be assumed to be any.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Optional Properties',
      },
      {
        type: 'paragraph',
        text: 'Object types can also specify that some or all of their properties are optional. To do this, add a ? after the property name:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'function printName(obj: { first: string; last?: string }) {\n  // ...\n}\n// Both OK\nprintName({ first: "Bob" });\nprintName({ first: "Alice", last: "Alisson" });',
        },
      },
      {
        type: 'paragraph',
        text: 'In JavaScript, if you access a property that doesn’t exist, you’ll get the value undefined rather than a runtime error. Because of this, when you read from an optional property, you’ll have to check for undefined before using it.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: "function printName(obj: { first: string; last?: string }) {\n  // Error - might crash if 'obj.last' wasn't provided!\n  console.log(obj.last.toUpperCase());\n  if (obj.last !== undefined) {\n    // OK\n    console.log(obj.last.toUpperCase());\n  }\n \n  // A safe alternative using modern JavaScript syntax:\n  console.log(obj.last?.toUpperCase());\n}",
        },
      },
      {
        type: 'paragraph',
        text: 'TypeScript’s type system allows you to build new types out of existing ones using a large variety of operators. Now that we know how to write a few types, it’s time to start combining them in interesting ways.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Defining a Union Type',
      },
      {
        type: 'paragraph',
        text: 'The first way to combine types you might see is a union type. A union type is a type formed from two or more other types, representing values that may be any one of those types. We refer to each of these types as the union’s members.',
      },
      {
        type: 'paragraph',
        text: 'Let’s write a function that can operate on strings or numbers:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'function printId(id: number | string) {\n  console.log("Your ID is: " + id);\n}\n// OK\nprintId(101);\n// OK\nprintId("202");\n// Error\nprintId({ myID: 22342 });',
        },
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Working with Union Types',
      },
      {
        type: 'paragraph',
        text: 'It’s easy to provide a value matching a union type - simply provide a type matching any of the union’s members. If you have a value of a union type, how do you work with it?',
      },
      {
        type: 'paragraph',
        text: 'TypeScript will only allow an operation if it is valid for every member of the union. For example, if you have the union string | number, you can’t use methods that are only available on string:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'function printId(id: number | string) {\n  console.log(id.toUpperCase());\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'The solution is to narrow the union with code, the same as you would in JavaScript without type annotations. Narrowing occurs when TypeScript can deduce a more specific type for a value based on the structure of the code.',
      },
      {
        type: 'paragraph',
        text: 'For example, TypeScript knows that only a string value will have a typeof value "string":',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: "function printId(id: number | string) {\n  if (typeof id === \"string\") {\n    // In this branch, id is of type 'string'\n    console.log(id.toUpperCase());\n  } else {\n    // Here, id is of type 'number'\n    console.log(id);\n  }\n}",
        },
      },
      {
        type: 'paragraph',
        text: 'Another example is to use a function like Array.isArray:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: "function welcomePeople(x: string[] | string) {\n  if (Array.isArray(x)) {\n    // Here: 'x' is 'string[]'\n    console.log(\"Hello, \" + x.join(\" and \"));\n  } else {\n    // Here: 'x' is 'string'\n    console.log(\"Welcome lone traveler \" + x);\n  }\n}",
        },
      },
      {
        type: 'paragraph',
        text: 'Notice that in the else branch, we don’t need to do anything special - if x wasn’t a string[], then it must have been a string.',
      },
      {
        type: 'paragraph',
        text: 'Sometimes you’ll have a union where all the members have something in common. For example, both arrays and strings have a slice method. If every member in a union has a property in common, you can use that property without narrowing:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: '// Return type is inferred as number[] | string\nfunction getFirstThree(x: number[] | string) {\n  return x.slice(0, 3);\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'We’ve been using object types and union types by writing them directly in type annotations. This is convenient, but it’s common to want to use the same type more than once and refer to it by a single name.',
      },
      {
        type: 'paragraph',
        text: 'A type alias is exactly that - a name for any type. The syntax for a type alias is:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'type Point = {\n  x: number;\n  y: number;\n};\n \n// Exactly the same as the earlier example\nfunction printCoord(pt: Point) {\n  console.log("The coordinate\'s x value is " + pt.x);\n  console.log("The coordinate\'s y value is " + pt.y);\n}\n \nprintCoord({ x: 100, y: 100 });',
        },
      },
      {
        type: 'paragraph',
        text: 'You can actually use a type alias to give a name to any type at all, not just an object type. For example, a type alias can name a union type:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'type ID = number | string;',
        },
      },
      {
        type: 'paragraph',
        text: 'Note that aliases are only aliases - you cannot use type aliases to create different/distinct “versions” of the same type. When you use the alias, it’s exactly as if you had written the aliased type. In other words, this code might look illegal, but is OK according to TypeScript because both types are aliases for the same type:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'type UserInputSanitizedString = string;\n \nfunction sanitizeInput(str: string): UserInputSanitizedString {\n  return sanitize(str);\n}\n \n// Create a sanitized input\nlet userInput = sanitizeInput(getInput());\n \n// Can still be re-assigned with a string though\nuserInput = "new input";',
        },
      },
      {
        type: 'paragraph',
        text: 'An interface declaration is another way to name an object type:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'interface Point {\n  x: number;\n  y: number;\n}\n \nfunction printCoord(pt: Point) {\n  console.log("The coordinate\'s x value is " + pt.x);\n  console.log("The coordinate\'s y value is " + pt.y);\n}\n \nprintCoord({ x: 100, y: 100 });',
        },
      },
      {
        type: 'paragraph',
        text: 'Just like when we used a type alias above, the example works just as if we had used an anonymous object type. TypeScript is only concerned with the structure of the value we passed to printCoord - it only cares that it has the expected properties. Being concerned only with the structure and capabilities of types is why we call TypeScript a structurally typed type system.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Differences Between Type Aliases and Interfaces',
      },
      {
        type: 'paragraph',
        text: 'Type aliases and interfaces are very similar, and in many cases you can choose between them freely. Almost all features of an interface are available in type, the key distinction is that a type cannot be re-opened to add new properties vs an interface which is always extendable.',
      },
      {
        type: 'table',
        headers: ['Interface', 'Type'],
        rows: [
          ['', ''],
          ['Extending an interface', ''],
        ],
      },
      {
        type: 'paragraph',
        text: '``` interface Animal { name: string; } interface Bear extends Animal { honey: boolean; } const bear = getBear(); bear.name; bear.honey; ``` |',
      },
      {
        type: 'paragraph',
        text: 'Extending a type via intersections',
      },
      {
        type: 'paragraph',
        text: '``` type Animal = { name: string; } type Bear = Animal & { honey: boolean; } const bear = getBear(); bear.name; bear.honey; ``` | |',
      },
      {
        type: 'paragraph',
        text: 'Adding new fields to an existing interface',
      },
      {
        type: 'paragraph',
        text: '``` interface Window { title: string; } interface Window { ts: TypeScriptAPI; } const src = \'const a = "Hello World"\'; window.ts.transpileModule(src, {}); ``` |',
      },
      {
        type: 'paragraph',
        text: 'A type cannot be changed after being created',
      },
      {
        type: 'paragraph',
        text: "``` type Window = { title: string; } type Window = { ts: TypeScriptAPI; } // Error: Duplicate identifier 'Window'. ``` |",
      },
      {
        type: 'paragraph',
        text: 'You’ll learn more about these concepts in later chapters, so don’t worry if you don’t understand all of these right away.',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'Prior to TypeScript version 4.2, type alias names may appear in error messages, sometimes in place of the equivalent anonymous type (which may or may not be desirable). Interfaces will always be named in error messages.',
          'Type aliases may not participate in declaration merging, but interfaces can.',
          'Interfaces may only be used to declare the shapes of objects, not rename primitives.',
          'Interface names will always appear in their original form in error messages, but only when they are used by name.',
          'Using interfaces with extends can often be more performant for the compiler than type aliases with intersections',
        ],
      },
      {
        type: 'paragraph',
        text: 'For the most part, you can choose based on personal preference, and TypeScript will tell you if it needs something to be the other kind of declaration. If you would like a heuristic, use interface until you need to use features from type.',
      },
      {
        type: 'paragraph',
        text: 'Sometimes you will have information about the type of a value that TypeScript can’t know about.',
      },
      {
        type: 'paragraph',
        text: 'For example, if you’re using document.getElementById, TypeScript only knows that this will return some kind of HTMLElement, but you might know that your page will always have an HTMLCanvasElement with a given ID.',
      },
      {
        type: 'paragraph',
        text: 'In this situation, you can use a type assertion to specify a more specific type:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'const myCanvas = document.getElementById("main_canvas") as HTMLCanvasElement;',
        },
      },
      {
        type: 'paragraph',
        text: 'Like a type annotation, type assertions are removed by the compiler and won’t affect the runtime behavior of your code.',
      },
      {
        type: 'paragraph',
        text: 'You can also use the angle-bracket syntax (except if the code is in a .tsx file), which is equivalent:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'const myCanvas = <HTMLCanvasElement>document.getElementById("main_canvas");',
        },
      },
      {
        type: 'paragraph',
        text: 'TypeScript only allows type assertions which convert to a more specific or less specific version of a type. This rule prevents “impossible” coercions like:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'const x = "hello" as number;',
        },
      },
      {
        type: 'paragraph',
        text: 'Sometimes this rule can be too conservative and will disallow more complex coercions that might be valid. If this happens, you can use two assertions, first to any (or unknown, which we’ll introduce later), then to the desired type:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'const a = expr as any as T;',
        },
      },
      {
        type: 'paragraph',
        text: 'In addition to the general types string and number, we can refer to specific strings and numbers in type positions.',
      },
      {
        type: 'paragraph',
        text: 'One way to think about this is to consider how JavaScript comes with different ways to declare a variable. Both var and let allow for changing what is held inside the variable, and const does not. This is reflected in how TypeScript creates types for literals.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'let changingString = "Hello World";\nchangingString = "Olá Mundo";\n// Because `changingString` can represent any possible string, that\n// is how TypeScript describes it in the type system\nchangingString;\n \nconst constantString = "Hello World";\n// Because `constantString` can only represent 1 possible string, it\n// has a literal type representation\nconstantString;',
        },
      },
      {
        type: 'paragraph',
        text: 'By themselves, literal types aren’t very valuable:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'let x: "hello" = "hello";\n// OK\nx = "hello";\n// ...\nx = "howdy";',
        },
      },
      {
        type: 'paragraph',
        text: 'It’s not much use to have a variable that can only have one value!',
      },
      {
        type: 'paragraph',
        text: 'But by combining literals into unions, you can express a much more useful concept - for example, functions that only accept a certain set of known values:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'function printText(s: string, alignment: "left" | "right" | "center") {\n  // ...\n}\nprintText("Hello, world", "left");\nprintText("G\'day, mate", "centre");',
        },
      },
      {
        type: 'paragraph',
        text: 'Numeric literal types work the same way:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'function compare(a: string, b: string): -1 | 0 | 1 {\n  return a === b ? 0 : a > b ? 1 : -1;\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'Of course, you can combine these with non-literal types:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'interface Options {\n  width: number;\n}\nfunction configure(x: Options | "auto") {\n  // ...\n}\nconfigure({ width: 100 });\nconfigure("auto");\nconfigure("automatic");',
        },
      },
      {
        type: 'paragraph',
        text: 'There’s one more kind of literal type: boolean literals. There are only two boolean literal types, and as you might guess, they are the types true and false. The type boolean itself is actually just an alias for the union true | false.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Literal Inference',
      },
      {
        type: 'paragraph',
        text: 'When you initialize a variable with an object, TypeScript assumes that the properties of that object might change values later. For example, if you wrote code like this:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'const obj = { counter: 0 };\nif (someCondition) {\n  obj.counter = 1;\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'TypeScript doesn’t assume the assignment of 1 to a field which previously had 0 is an error. Another way of saying this is that obj.counter must have the type number, not 0, because types are used to determine both reading and writing behavior.',
      },
      {
        type: 'paragraph',
        text: 'The same applies to strings:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'declare function handleRequest(url: string, method: "GET" | "POST"): void;\n \nconst req = { url: "https://example.com", method: "GET" };\nhandleRequest(req.url, req.method);',
        },
      },
      {
        type: 'paragraph',
        text: 'In the above example req.method is inferred to be string, not "GET". Because code can be evaluated between the creation of req and the call of handleRequest which could assign a new string like "GUESS" to req.method, TypeScript considers this code to have an error.',
      },
      {
        type: 'paragraph',
        text: 'There are two ways to work around this.',
      },
      {
        type: 'list',
        ordered: true,
        start: 1,
        items: [
          'You can change the inference by adding a type assertion in either location: // Change 1: const req = { url: "https://example.com", method: "GET" as "GET" }; // Change 2 handleRequest(req.url, req.method as "GET"); Change 1 means “I intend for req.method to always have the literal type "GET"”, preventing the possible assignment of "GUESS" to that field after. Change 2 means “I know for other reasons that req.method has the value "GET"“.',
          'You can use as const to convert the entire object to be type literals: const req = { url: "https://example.com", method: "GET" } as const; handleRequest(req.url, req.method);',
        ],
      },
      {
        type: 'paragraph',
        text: 'The as const suffix acts like const but for the type system, ensuring that all properties are assigned the literal type instead of a more general version like string or number.',
      },
      {
        type: 'paragraph',
        text: 'JavaScript has two primitive values used to signal absent or uninitialized value: null and undefined.',
      },
      {
        type: 'paragraph',
        text: 'TypeScript has two corresponding types by the same names. How these types behave depends on whether you have the strictNullChecks option on.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'strictNullChecks off',
      },
      {
        type: 'paragraph',
        text: 'With strictNullChecks off, values that might be null or undefined can still be accessed normally, and the values null and undefined can be assigned to a property of any type. This is similar to how languages without null checks (e.g. C#, Java) behave. The lack of checking for these values tends to be a major source of bugs; we always recommend people turn strictNullChecks on if it’s practical to do so in their codebase.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'strictNullChecks on',
      },
      {
        type: 'paragraph',
        text: 'With strictNullChecks on, when a value is null or undefined, you will need to test for those values before using methods or properties on that value. Just like checking for undefined before using an optional property, we can use narrowing to check for values that might be null:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'function doSomething(x: string | null) {\n  if (x === null) {\n    // do nothing\n  } else {\n    console.log("Hello, " + x.toUpperCase());\n  }\n}',
        },
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Non-null Assertion Operator (Postfix !)',
      },
      {
        type: 'paragraph',
        text: 'TypeScript also has a special syntax for removing null and undefined from a type without doing any explicit checking. Writing ! after any expression is effectively a type assertion that the value isn’t null or undefined:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'function liveDangerously(x?: number | null) {\n  // No error\n  console.log(x!.toFixed());\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'Just like other type assertions, this doesn’t change the runtime behavior of your code, so it’s important to only use ! when you know that the value can’t be null or undefined.',
      },
      {
        type: 'paragraph',
        text: 'Enums are a feature added to JavaScript by TypeScript which allows for describing a value which could be one of a set of possible named constants. Unlike most TypeScript features, this is not a type-level addition to JavaScript but something added to the language and runtime. Because of this, it’s a feature which you should know exists, but maybe hold off on using unless you are sure. You can read more about enums in the Enum reference page.',
      },
      {
        type: 'paragraph',
        text: 'It’s worth mentioning the rest of the primitives in JavaScript which are represented in the type system. Though we will not go into depth here.',
      },
      {
        type: 'subheading',
        level: 4,
        text: 'bigint',
      },
      {
        type: 'paragraph',
        text: 'From ES2020 onwards, there is a primitive in JavaScript used for very large integers, BigInt:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: '// Creating a bigint via the BigInt function\nconst oneHundred: bigint = BigInt(100);\n \n// Creating a BigInt via the literal syntax\nconst anotherHundred: bigint = 100n;',
        },
      },
      {
        type: 'paragraph',
        text: 'You can learn more about BigInt in the TypeScript 3.2 release notes.',
      },
      {
        type: 'subheading',
        level: 4,
        text: 'symbol',
      },
      {
        type: 'paragraph',
        text: 'There is a primitive in JavaScript used to create a globally unique reference via the function Symbol():',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'const firstName = Symbol("name");\nconst secondName = Symbol("name");\n \nif (firstName === secondName) {\n  // Can\'t ever happen\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'You can learn more about them in Symbols reference page.',
      },
    ],
  },
} satisfies Record<string, ContentTopic>;
