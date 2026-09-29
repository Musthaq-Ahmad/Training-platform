import type { ContentTopic } from '../../../types';

export const mdnDataStructuresTopics = {
  'mdn-data-structures': {
    id: 'mdn-data-structures',
    heading: 'Dynamic and weak typing',
    blocks: [
      {
        type: 'paragraph',
        text: 'JavaScript is a dynamic language with dynamic types. Variables in JavaScript are not directly associated with any particular value type, and any variable can be assigned (and re-assigned) values of all types:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'let foo = 42; // foo is now a number\nfoo = "bar"; // foo is now a string\nfoo = true; // foo is now a boolean',
        },
      },
      {
        type: 'paragraph',
        text: 'JavaScript is also a weakly typed language, which means it allows implicit type conversion when an operation involves mismatched types, instead of throwing type errors.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'const foo = 42; // foo is a number\nconst result = foo + "1"; // JavaScript coerces foo to a string, so it can be concatenated with the other operand\nconsole.log(result); // 421',
        },
      },
      {
        type: 'paragraph',
        text: 'Implicit coercions are very convenient, but can create subtle bugs when conversions happen where they are not expected, or where they are expected to happen in the other direction (for example, string to number instead of number to string). For symbols and BigInts, JavaScript has intentionally disallowed certain implicit type conversions.',
      },
      {
        type: 'paragraph',
        text: 'All types except Object define immutable values represented directly at the lowest level of the language. We refer to values of these types as primitive values.',
      },
      {
        type: 'paragraph',
        text: 'All primitive types, except null, can be tested by the typeof operator. typeof null returns "object", so one has to use === null to test for null.',
      },
      {
        type: 'paragraph',
        text: 'All primitive types, except null and undefined, have their corresponding object wrapper types, which provide useful methods for working with the primitive values. For example, the Number object provides methods like toExponential(). When a property is accessed on a primitive value, JavaScript automatically wraps the value into the corresponding wrapper object and accesses the property on the object instead. However, accessing a property on null or undefined throws a TypeError exception, which necessitates the introduction of the optional chaining operator.',
      },
      {
        type: 'table',
        headers: ['Type', 'typeof return value', 'Object wrapper'],
        rows: [
          ['Null', '"object"', 'N/A'],
          ['Undefined', '"undefined"', 'N/A'],
          ['Boolean', '"boolean"', 'Boolean'],
          ['Number', '"number"', 'Number'],
          ['BigInt', '"bigint"', 'BigInt'],
          ['String', '"string"', 'String'],
          ['Symbol', '"symbol"', 'Symbol'],
        ],
      },
      {
        type: 'paragraph',
        text: "The object wrapper classes' reference pages contain more information about the methods and properties available for each type, as well as detailed descriptions for the semantics of the primitive types themselves.",
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Null type',
      },
      {
        type: 'paragraph',
        text: 'The Null type is inhabited by exactly one value: null.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Undefined type',
      },
      {
        type: 'paragraph',
        text: 'The Undefined type is inhabited by exactly one value: undefined.',
      },
      {
        type: 'paragraph',
        text: 'Conceptually, undefined indicates the absence of a value, while null indicates the absence of an object (which could also make up an excuse for typeof null === "object"). The language usually defaults to undefined when something is devoid of a value:',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'A return statement with no value (return;) implicitly returns undefined.',
          'Accessing a nonexistent object property (obj.iDontExist) returns undefined.',
          'A variable declaration without initialization (let x;) implicitly initializes the variable to undefined.',
          'Many methods, such as Array.prototype.find() and Map.prototype.get(), return undefined when no element is found.',
        ],
      },
      {
        type: 'paragraph',
        text: 'null is used much less often in the core language. The most important place is the end of the prototype chain — subsequently, methods that interact with prototypes, such as Object.getPrototypeOf(), Object.create(), etc., accept or return null instead of undefined.',
      },
      {
        type: 'paragraph',
        text: 'null is a keyword, but undefined is a normal identifier that happens to be a global property. In practice, the difference is minor, since undefined should not be redefined or shadowed.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Boolean type',
      },
      {
        type: 'paragraph',
        text: 'The Boolean type represents a logical entity and is inhabited by two values: true and false.',
      },
      {
        type: 'paragraph',
        text: 'Boolean values are usually used for conditional operations, including ternary operators, if...else, while, etc.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Number type',
      },
      {
        type: 'paragraph',
        text: 'The Number type is a double-precision 64-bit binary format IEEE 754 value. It is capable of storing positive floating-point numbers between 2-1074 (Number.MIN_VALUE) and 21023 × (2 - 2-52) (Number.MAX_VALUE) as well as negative floating-point numbers of the same magnitude, but it can only safely store integers in the range -(253 − 1) (Number.MIN_SAFE_INTEGER) to 253 − 1 (Number.MAX_SAFE_INTEGER). Outside this range, JavaScript can no longer safely represent integers; they will instead be represented by a double-precision floating point approximation. You can check if a number is within the range of safe integers using Number.isSafeInteger().',
      },
      {
        type: 'paragraph',
        text: 'Values outside the representable range are automatically converted:',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'Positive values greater than Number.MAX_VALUE are converted to Infinity.',
          'Positive values smaller than Number.MIN_VALUE are converted to 0.',
          'Negative values smaller than -Number.MAX_VALUE are converted to -Infinity.',
          'Negative values greater than -Number.MIN_VALUE are converted to -0.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Infinity and -Infinity behave similarly to mathematical infinity, but with some slight differences; see Number.POSITIVE_INFINITY and Number.NEGATIVE_INFINITY for details.',
      },
      {
        type: 'paragraph',
        text: 'The Number type has only one value with multiple representations: 0 is represented as both -0 and +0 (where 0 is an alias for +0). In practice, there is almost no difference between the different representations; for example, +0 === -0 is true. However, you are able to notice this when you divide by zero:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'console.log(42 / +0); // Infinity\nconsole.log(42 / -0); // -Infinity',
        },
      },
      {
        type: 'paragraph',
        text: 'NaN ("Not a Number") is a special kind of number value that\'s typically encountered when the result of an arithmetic operation cannot be expressed as a number. It is also the only value in JavaScript that is not equal to itself.',
      },
      {
        type: 'paragraph',
        text: 'Although a number is conceptually a "mathematical value" and is always implicitly floating-point-encoded, JavaScript provides bitwise operators. When applying bitwise operators, the number is first converted to a 32-bit integer.',
      },
      {
        type: 'paragraph',
        text: 'Note: Although bitwise operators can be used to represent several Boolean values within a single number using bit masking, this is usually considered a bad practice. JavaScript offers other means to represent a set of Booleans (like an array of Booleans, or an object with Boolean values assigned to named properties). Bit masking also tends to make the code more difficult to read, understand, and maintain.',
      },
      {
        type: 'paragraph',
        text: 'It may be necessary to use such techniques in very constrained environments, like when trying to cope with the limitations of local storage, or in extreme cases (such as when each bit over the network counts). This technique should only be considered when it is the last measure that can be taken to optimize size.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'BigInt type',
      },
      {
        type: 'paragraph',
        text: 'The BigInt type is a numeric primitive in JavaScript that can represent integers with arbitrary magnitude. With BigInts, you can safely store and operate on large integers even beyond the safe integer limit (Number.MAX_SAFE_INTEGER) for Numbers.',
      },
      {
        type: 'paragraph',
        text: 'A BigInt is created by appending n to the end of an integer or by calling the BigInt() function.',
      },
      {
        type: 'paragraph',
        text: 'This example demonstrates where incrementing the Number.MAX_SAFE_INTEGER returns the expected result:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '// BigInt\nconst x = BigInt(Number.MAX_SAFE_INTEGER); // 9007199254740991n\nx + 1n === x + 2n; // false because 9007199254740992n and 9007199254740993n are unequal\n\n// Number\nNumber.MAX_SAFE_INTEGER + 1 === Number.MAX_SAFE_INTEGER + 2; // true because both are 9007199254740992',
        },
      },
      {
        type: 'paragraph',
        text: 'You can use most operators to work with BigInts, including +, *, -, **, and % — the only forbidden one is &gt;&gt;&gt;. A BigInt is not strictly equal to a Number with the same mathematical value, but it is loosely so.',
      },
      {
        type: 'paragraph',
        text: 'BigInt values are neither always more precise nor always less precise than numbers, since BigInts cannot represent fractional numbers, but can represent big integers more accurately. Neither type entails the other, and they are not mutually substitutable. A TypeError is thrown if BigInt values are mixed with regular numbers in arithmetic expressions, or if they are implicitly converted to each other.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'String type',
      },
      {
        type: 'paragraph',
        text: 'The String type represents textual data and is encoded as a sequence of 16-bit unsigned integer values representing UTF-16 code units. Each element in the string occupies a position in the string. The first element is at index 0, the next at index 1, and so on. The length of a string is the number of UTF-16 code units in it, which may not correspond to the actual number of Unicode characters; see the String reference page for more details.',
      },
      {
        type: 'paragraph',
        text: 'JavaScript strings are immutable. This means that once a string is created, it is not possible to modify it. String methods create new strings based on the content of the current string — for example:',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'A substring of the original using substring().',
          'A concatenation of two strings using the concatenation operator (+) or concat().',
        ],
      },
      {
        type: 'subheading',
        level: 4,
        text: 'Beware of "stringly-typing" your code!',
      },
      {
        type: 'paragraph',
        text: 'It can be tempting to use strings to represent complex data. Doing this comes with short-term benefits:',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'It is easy to build complex strings with concatenation.',
          'Strings are easy to debug (what you see printed is always what is in the string).',
          'Strings are the common denominator of a lot of APIs (input fields, local storage values, fetch() responses when using Response.text(), etc.) and it can be tempting to only work with strings.',
        ],
      },
      {
        type: 'paragraph',
        text: 'With conventions, it is possible to represent any data structure in a string. This does not make it a good idea. For instance, with a separator, one could emulate a list (while a JavaScript array would be more suitable). Unfortunately, when the separator is used in one of the "list" elements, then, the list is broken. An escape character can be chosen, etc. All of this requires conventions and creates an unnecessary maintenance burden.',
      },
      {
        type: 'paragraph',
        text: 'Use strings for textual data. When representing complex data, parse strings, and use the appropriate abstraction.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Symbol type',
      },
      {
        type: 'paragraph',
        text: 'A Symbol is a unique and immutable primitive value and may be used as the key of an Object property (see below). In some programming languages, Symbols are called "atoms". The purpose of symbols is to create unique property keys that are guaranteed not to clash with keys from other code.',
      },
      {
        type: 'paragraph',
        text: 'In computer science, an object is a value in memory which is possibly referenced by an identifier. In JavaScript, objects are the only mutable values. Functions are, in fact, also objects with the additional capability of being callable.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Properties',
      },
      {
        type: 'paragraph',
        text: 'In JavaScript, objects can be seen as a collection of properties. With the object literal syntax, a limited set of properties are initialized; then properties can be added and removed. Object properties are equivalent to key-value pairs. Property keys are either strings or symbols. When other types (such as numbers) are used to index objects, the values are implicitly converted to strings. Property values can be values of any type, including other objects, which enables building complex data structures.',
      },
      {
        type: 'paragraph',
        text: 'There are two types of object properties: The data property and the accessor property. Each property has corresponding attributes. Each attribute is accessed internally by the JavaScript engine, but you can set them through Object.defineProperty(), or read them through Object.getOwnPropertyDescriptor(). You can read more about the various nuances on the Object.defineProperty() page.',
      },
      {
        type: 'subheading',
        level: 4,
        text: 'Data property',
      },
      {
        type: 'paragraph',
        text: 'Data properties associate a key with a value. It can be described by the following attributes:',
      },
      {
        type: 'paragraph',
        text: 'value',
      },
      {
        type: 'paragraph',
        text: 'The value retrieved by a get access of the property. Can be any JavaScript value.',
      },
      {
        type: 'paragraph',
        text: 'writable',
      },
      {
        type: 'paragraph',
        text: 'A boolean value indicating if the property can be changed with an assignment.',
      },
      {
        type: 'paragraph',
        text: 'enumerable',
      },
      {
        type: 'paragraph',
        text: 'A boolean value indicating if the property can be enumerated by a for...in loop. See also Enumerability and ownership of properties for how enumerability interacts with other functions and syntaxes.',
      },
      {
        type: 'paragraph',
        text: 'configurable',
      },
      {
        type: 'paragraph',
        text: 'A boolean value indicating if the property can be deleted, can be changed to an accessor property, and can have its attributes changed.',
      },
      {
        type: 'subheading',
        level: 4,
        text: 'Accessor property',
      },
      {
        type: 'paragraph',
        text: 'Associates a key with one of two accessor functions (get and set) to retrieve or store a value.',
      },
      {
        type: 'paragraph',
        text: "Note: It's important to recognize it's accessor property — not accessor method. We can give a JavaScript object class-like accessors by using a function as a value — but that doesn't make the object a class.",
      },
      {
        type: 'paragraph',
        text: 'An accessor property has the following attributes:',
      },
      {
        type: 'paragraph',
        text: 'get',
      },
      {
        type: 'paragraph',
        text: 'A function called with an empty argument list to retrieve the property value whenever a get access to the value is performed. See also getters. May be undefined.',
      },
      {
        type: 'paragraph',
        text: 'set',
      },
      {
        type: 'paragraph',
        text: 'A function called with an argument that contains the assigned value. Executed whenever a specified property is attempted to be changed. See also setters. May be undefined.',
      },
      {
        type: 'paragraph',
        text: 'enumerable',
      },
      {
        type: 'paragraph',
        text: 'A boolean value indicating if the property can be enumerated by a for...in loop. See also Enumerability and ownership of properties for how enumerability interacts with other functions and syntaxes.',
      },
      {
        type: 'paragraph',
        text: 'configurable',
      },
      {
        type: 'paragraph',
        text: 'A boolean value indicating if the property can be deleted, can be changed to a data property, and can have its attributes changed.',
      },
      {
        type: 'paragraph',
        text: "The prototype of an object points to another object or to null — it's conceptually a hidden property of the object, commonly represented as [[Prototype]]. Properties of the object's [[Prototype]] can also be accessed on the object itself.",
      },
      {
        type: 'paragraph',
        text: 'Objects are ad-hoc key-value pairs, so they are often used as maps. However, there can be ergonomics, security, and performance issues. Use a Map for storing arbitrary data instead. The Map reference contains a more detailed discussion of the pros & cons between plain objects and maps for storing key-value associations.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Dates',
      },
      {
        type: 'paragraph',
        text: 'JavaScript provides two sets of APIs for representing dates: the legacy Date object and the modern Temporal object. Date has many undesirable design choices and should be avoided in new code if possible.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Indexed collections: Arrays and typed Arrays',
      },
      {
        type: 'paragraph',
        text: 'Arrays are regular objects for which there is a particular relationship between integer-keyed properties and the length property.',
      },
      {
        type: 'paragraph',
        text: 'Additionally, arrays inherit from Array.prototype, which provides a handful of convenient methods to manipulate arrays. For example, indexOf() searches a value in the array and push() appends an element to the array. This makes Arrays a perfect candidate to represent ordered lists.',
      },
      {
        type: 'paragraph',
        text: 'Typed Arrays present an array-like view of an underlying binary data buffer, and offer many methods that have similar semantics to the array counterparts. "Typed array" is an umbrella term for a range of data structures, including Int8Array, Float32Array, etc. Check the typed array page for more information. Typed arrays are often used in conjunction with ArrayBuffer and DataView.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Keyed collections: Maps, Sets, WeakMaps, WeakSets',
      },
      {
        type: 'paragraph',
        text: 'These data structures take object references as keys. Set and WeakSet represent a collection of unique values, while Map and WeakMap represent a collection of key-value associations.',
      },
      {
        type: 'paragraph',
        text: 'You could implement Maps and Sets yourself. However, since objects cannot be compared (in the sense of &lt; "less than", for instance), neither does the engine expose its hash function for objects, look-up performance would necessarily be linear. Native implementations of them (including WeakMaps) can have look-up performance that is approximately logarithmic to constant time.',
      },
      {
        type: 'paragraph',
        text: 'Usually, to bind data to a DOM node, one could set properties directly on the object, or use data-* attributes. This has the downside that the data is available to any script running in the same context. Maps and WeakMaps make it easy to privately bind data to an object.',
      },
      {
        type: 'paragraph',
        text: 'WeakMap and WeakSet only allow garbage-collectable values as keys, which are either objects or non-registered symbols, and the keys may be collected even when they remain in the collection. They are specifically used for memory usage optimization.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Structured data: JSON',
      },
      {
        type: 'paragraph',
        text: 'JSON (JavaScript Object Notation) is a lightweight data-interchange format, derived from JavaScript, but used by many programming languages. JSON builds universal data structures that can be transferred between different environments and even across languages. See JSON for more details.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'More objects in the standard library',
      },
      {
        type: 'paragraph',
        text: 'JavaScript has a standard library of built-in objects. Read the reference to find out more about the built-in objects.',
      },
      {
        type: 'paragraph',
        text: 'As mentioned above, JavaScript is a weakly typed language. This means that you can often use a value of one type where another type is expected, and the language will convert it to the right type for you. To do so, JavaScript defines a handful of coercion rules.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Primitive coercion',
      },
      {
        type: 'paragraph',
        text: "The primitive coercion process is used where a primitive value is expected, but there's no strong preference for what the actual type should be. This is usually when a string, a number, or a BigInt are equally acceptable. For example:",
      },
      {
        type: 'list',
        ordered: false,
        items: [
          "The Date() constructor, when it receives one argument that's not a Date instance — strings represent date strings, while numbers represent timestamps.",
          'The + operator — if one operand is a string, string concatenation is performed; otherwise, numeric addition is performed.',
          'The == operator — if one operand is a primitive while the other is an object, the object is converted to a primitive value with no preferred type.',
        ],
      },
      {
        type: 'paragraph',
        text: 'This operation does not do any conversion if the value is already a primitive. Objects are converted to primitives by calling its [Symbol.toPrimitive]() (with "default" as hint), valueOf(), and toString() methods, in that order. Note that primitive conversion calls valueOf() before toString(), which is similar to the behavior of number coercion but different from string coercion.',
      },
      {
        type: 'paragraph',
        text: "The [Symbol.toPrimitive]() method, if present, must return a primitive — returning an object results in a TypeError. For valueOf() and toString(), if one returns an object, the return value is ignored and the other's return value is used instead; if neither is present, or neither returns a primitive, a TypeError is thrown. For example, in the following code:",
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'console.log({} + []); // "[object Object]"',
        },
      },
      {
        type: 'paragraph',
        text: 'Neither {} nor [] have a [Symbol.toPrimitive]() method. Both {} and [] inherit valueOf() from Object.prototype.valueOf, which returns the object itself. Since the return value is an object, it is ignored. Therefore, toString() is called instead. {}.toString() returns "[object Object]", while [].toString() returns "", so the result is their concatenation: "[object Object]".',
      },
      {
        type: 'paragraph',
        text: 'The [Symbol.toPrimitive]() method always takes precedence when doing conversion to any primitive type. Primitive conversion generally behaves like number conversion, because valueOf() is called in priority; however, objects with custom [Symbol.toPrimitive]() methods can choose to return any primitive. Date and Symbol objects are the only built-in objects that override the [Symbol.toPrimitive]() method. Date.prototype[Symbol.toPrimitive]() treats the "default" hint as if it\'s "string", while Symbol.prototype[Symbol.toPrimitive]() ignores the hint and always returns a symbol.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Numeric coercion',
      },
      {
        type: 'paragraph',
        text: "There are two numeric types: Number and BigInt. Sometimes the language specifically expects a number or a BigInt (such as Array.prototype.slice(), where the index must be a number); other times, it may tolerate either and perform different operations depending on the operand's type. For strict coercion processes that do not allow implicit conversion from the other type, see number coercion and BigInt coercion.",
      },
      {
        type: 'paragraph',
        text: 'Numeric coercion is nearly the same as number coercion, except that BigInts are returned as-is instead of causing a TypeError. Numeric coercion is used by all arithmetic operators, since they are overloaded for both numbers and BigInts. The only exception is unary plus, which always does number coercion.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Other coercions',
      },
      {
        type: 'paragraph',
        text: 'All data types, except Null, Undefined, and Symbol, have their respective coercion process. See string coercion, boolean coercion, and object coercion for more details.',
      },
      {
        type: 'paragraph',
        text: 'As you may have noticed, there are three distinct paths through which objects may be converted to primitives:',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'Primitive coercion: [Symbol.toPrimitive]("default") → valueOf() → toString()',
          'Numeric coercion, number coercion, BigInt coercion: [Symbol.toPrimitive]("number") → valueOf() → toString()',
          'String coercion: [Symbol.toPrimitive]("string") → toString() → valueOf()',
        ],
      },
      {
        type: 'paragraph',
        text: 'In all cases, [Symbol.toPrimitive](), if present, must be callable and return a primitive, while valueOf or toString will be ignored if they are not callable or return an object. At the end of the process, if successful, the result is guaranteed to be a primitive. The resulting primitive is then subject to further coercions depending on the context.',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'JavaScript Data Structures and Algorithms by Oleksii Trekhleb',
          'Computer Science in JavaScript by Nicholas C. Zakas',
        ],
      },
    ],
  },
} satisfies Record<string, ContentTopic>;
